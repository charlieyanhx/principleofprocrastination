---
slug: mcp-in-practice
locale: en
category: technical
title: 'MCP in Practice: Building Tool Interfaces for Enterprise Systems'
subtitle: >-
  Connecting LLM agents to ERP, MES, and WMS through the Model Context Protocol
  — schema design, authentication, error handling, and the patterns that survive
  production
date: '2026-04-03'
readMinutes: 12
tags:
  - mcp
  - tool-use
  - enterprise-integration
  - agent-architecture
sources:
  - 'https://modelcontextprotocol.io/specification/2025-11-25'
  - 'https://modelcontextprotocol.io/specification/2025-11-25/server/tools'
  - 'https://modelcontextprotocol.io/specification/2025-11-25/basic/authorization'
  - 'https://www.kingdee.com/article/1913102603487625217.html'
  - >-
    https://learn.microsoft.com/en-us/dynamics365/fin-ops-core/dev-itpro/copilot/copilot-mcp
status: published
series: tools
seriesOrder: 3
---

A procurement agent needs to check inventory levels in a WMS, validate a supplier quote against the ERP's pricing history, and update the purchase order status in the MES — all within a single decision cycle. Without a shared protocol for tool interfaces, every one of those integrations is a bespoke adapter with its own authentication dance, error semantics, and schema format. Multiply this across six enterprise systems and three agent types, and you have an integration surface that no team can maintain.

The Model Context Protocol (MCP) solves a specific problem: it standardizes how LLM-based agents discover, invoke, and receive results from external tools. It does not replace your enterprise APIs. It wraps them in a uniform interface that any MCP-compatible agent can consume without system-specific integration code.

This article is a hands-on guide to implementing MCP tool interfaces for enterprise systems. It builds on the Signal-Decision-Execution architecture described in [Multi-Agent Coordination Patterns](/resources/agent-coordination-patterns) and the orchestration principles from [LLM Orchestration in Industrial Contexts](/resources/llm-orchestration-industrial). If those articles explained *why* agent systems need structured tool interfaces, this one explains *how* to build them.

## What MCP Actually Is (and Is Not)

MCP is a JSON-RPC 2.0 protocol that defines three primitives: **Resources** (data the agent can read), **Prompts** (templated workflows), and **Tools** (functions the agent can invoke). For enterprise integration, Tools are the critical primitive.

The architecture has three roles:

- **Host**: the LLM application (your agent runtime)
- **Client**: a connector within the host that manages the MCP session
- **Server**: a service that exposes tools wrapping your enterprise system APIs

The server advertises available tools, their input schemas, and their output schemas. The client discovers tools via `tools/list`, selects appropriate tools based on the agent's reasoning, and invokes them via `tools/call`. Results come back as structured content (JSON) or unstructured content (text, images).

What MCP is *not*: an agent framework, an API gateway, or a workflow engine. It is an interface protocol. Your ERP's REST API still handles business logic. MCP provides the typed contract between the LLM and that API.

## Tool Schema Design for Enterprise Systems

The tool definition is where most enterprise MCP implementations succeed or fail. A poorly designed tool schema forces the LLM to guess at parameter formats, produces ambiguous results, and generates cascading errors downstream.

Every MCP tool definition has four components: `name`, `description`, `inputSchema`, and optionally `outputSchema`. Here is what a production-grade tool looks like for querying purchase order status from an ERP system:

```json
{
  "name": "erp.purchase_order.get_status",
  "description": "Retrieve the current status and approval chain of a purchase order by PO number. Returns order status, line items, approval history, and any blocking exceptions. Use this when you need to check whether a PO has been approved, is pending review, or has been rejected.",
  "inputSchema": {
    "type": "object",
    "properties": {
      "po_number": {
        "type": "string",
        "description": "Purchase order number in format PO-YYYYMMDD-XXXX",
        "pattern": "^PO-\\d{8}-\\d{4}$"
      },
      "include_line_items": {
        "type": "boolean",
        "description": "Whether to include individual line items in the response. Set to false for status-only checks to reduce response size.",
        "default": false
      }
    },
    "required": ["po_number"],
    "additionalProperties": false
  },
  "outputSchema": {
    "type": "object",
    "properties": {
      "po_number": { "type": "string" },
      "status": {
        "type": "string",
        "enum": ["draft", "pending_approval", "approved", "rejected", "cancelled", "received"]
      },
      "current_approver": { "type": "string" },
      "total_amount": { "type": "number" },
      "currency": { "type": "string" },
      "blocking_exceptions": {
        "type": "array",
        "items": { "type": "string" }
      }
    },
    "required": ["po_number", "status"]
  }
}
```

Several design decisions matter here:

**Namespaced tool names.** Using `erp.purchase_order.get_status` rather than `getPOStatus` makes tool discovery predictable across systems. When your agent has access to 40+ tools across ERP, MES, and WMS, namespace structure is the difference between reliable tool selection and random misfire.

**Descriptions that guide the LLM.** The description is not documentation for humans — it is the primary signal the LLM uses to decide whether to invoke this tool. "Use this when you need to check whether a PO has been approved" is more useful to the model than a generic "Gets purchase order status."

**Constrained input schemas.** The `pattern` field on `po_number` prevents the LLM from passing a supplier name where a PO number is expected. Every parameter that has a known format should declare it. Enums, patterns, min/max values — these are not nice-to-haves, they are guardrails.

**Output schemas for structured content.** The November 2025 MCP spec introduced `outputSchema` and `structuredContent` in tool results. For enterprise integrations, always define an output schema. This lets the LLM parse results programmatically rather than extracting data from free text.

**`additionalProperties: false`.** This prevents the LLM from inventing parameters that your server does not expect. Without it, you will see models confidently passing fields like `urgent: true` that your API silently ignores.

### Tool Granularity

A common mistake is designing tools that mirror the enterprise system's API surface one-to-one. An ERP might expose 200+ REST endpoints. Exposing 200 MCP tools is a recipe for selection confusion.

Instead, design tools around agent tasks, not system capabilities:

- **Too granular**: `erp.item.get`, `erp.item.get_price`, `erp.item.get_stock`, `erp.item.get_supplier`
- **Too coarse**: `erp.query` (takes a natural language question)
- **Right level**: `erp.item.lookup` (returns item details, current stock, price, and primary supplier in one call)

The right granularity depends on your agent's decision topology. A signal agent that aggregates inventory state needs a `wms.inventory.get_levels` tool that returns multi-warehouse stock in a single call. A decision agent that routes approvals needs `erp.purchase_order.get_status` and `erp.purchase_order.approve` as separate tools — because reading and writing are different authorization scopes and different audit events.

## Authentication Patterns

The November 2025 MCP specification introduced a full OAuth 2.1 authorization framework. This is worth understanding in detail because enterprise systems never allow unauthenticated access.

### Transport-Level Authentication

MCP supports two transport mechanisms, each with different auth patterns:

**stdio transport** (local processes): The MCP server runs as a subprocess. Authentication is inherited from the environment — the server process reads credentials from environment variables, config files, or a secrets manager. There is no token exchange over the wire. This is appropriate for single-tenant deployments where the agent runtime and MCP server share a trust boundary.

**HTTP-based transport** (remote servers): The MCP server is a networked service. OAuth 2.1 applies. The flow:

1. Client sends an unauthenticated request
2. Server responds with `401 Unauthorized` and a `WWW-Authenticate` header containing the Protected Resource Metadata URL
3. Client discovers the authorization server via RFC 9728
4. Client performs OAuth 2.1 authorization (with PKCE, always)
5. Client includes `Bearer` token in every subsequent request

### Enterprise Auth Topology

In practice, the MCP server rarely owns its own auth. Enterprise systems have existing identity providers — Active Directory, Okta, Keycloak, or the ERP's built-in auth (SAP's XSUAA, Oracle's IDCS). The MCP server acts as an OAuth 2.1 resource server that delegates authentication to the enterprise IdP.

A common pattern:

```
Agent Runtime (MCP Client)
  → MCP Server (Resource Server, validates tokens)
    → Enterprise IdP (Authorization Server, issues tokens)
      → ERP/MES/WMS API (accepts service-to-service credentials)
```

The MCP server validates the agent's token against the IdP, then uses a separate service account or client credentials grant to call the enterprise API. The agent's token and the ERP's token are never the same token. The spec is explicit: MCP servers MUST NOT pass through tokens received from MCP clients to upstream APIs.

### Scope-Based Tool Access

MCP's authorization framework supports incremental scope negotiation. This maps naturally to enterprise permission models:

- `erp:po:read` — query purchase order status
- `erp:po:write` — approve or reject purchase orders
- `wms:inventory:read` — check stock levels
- `mes:schedule:write` — adjust production schedules

When an agent attempts to invoke a tool it lacks permission for, the server returns `403 Forbidden` with `error="insufficient_scope"` and the required scope. The agent runtime can then trigger a step-up authorization flow — request the additional scope, get user consent if needed, and retry.

This is not theoretical. In industrial deployments, a signal agent operates with read-only scopes by default. If it encounters an exception that requires a decision agent to approve a purchase, the decision agent's tool invocation carries write scopes. The scope boundary enforces the separation between observation and action.

## Error Handling That the LLM Can Act On

MCP distinguishes two categories of errors, and getting this distinction right is critical for enterprise integrations:

**Protocol errors** (JSON-RPC error responses): The request itself is malformed — unknown tool name, invalid JSON, server crash. These return standard JSON-RPC error codes (-32600 for invalid request, -32601 for method not found, -32602 for invalid params). The LLM generally cannot self-correct from these.

**Tool execution errors** (result with `isError: true`): The tool ran but the operation failed — the PO number does not exist, the inventory API timed out, the approval was rejected by a business rule. These are returned in the normal result structure with `isError: true` and a text message. The LLM *can* self-correct from these.

The implementation pattern for enterprise systems:

```json
{
  "jsonrpc": "2.0",
  "id": 42,
  "result": {
    "content": [
      {
        "type": "text",
        "text": "Purchase order PO-20260401-0127 not found. The PO number format is valid but no matching record exists. Verify the PO number with the requestor, or search by supplier name using erp.purchase_order.search."
      }
    ],
    "isError": true
  }
}
```

The error message does three things: (1) confirms what was attempted, (2) explains why it failed, (3) suggests an alternative action. This is not just good practice — it is the difference between an agent that retries the same failed call five times and an agent that pivots to a search-based approach.

### Enterprise-Specific Error Categories

For each enterprise system integration, define error categories that map to actionable responses:

| Error Category | Example | Agent Response |
|---|---|---|
| Not Found | PO number does not exist | Search by alternative identifier |
| Permission Denied | User lacks approval authority | Escalate to authorized approver |
| Validation Failed | Amount exceeds approval limit | Break into multiple POs or escalate |
| System Unavailable | ERP maintenance window | Queue action and retry with backoff |
| Stale Data | Inventory count outdated | Refresh from source system |
| Business Rule Violation | Supplier on hold list | Flag exception for human review |

Each category should produce error messages that guide the LLM toward the correct recovery path. Generic "operation failed" messages are useless — they produce retry loops.

### Circuit Breaker Pattern

Enterprise systems have maintenance windows, performance degradation, and occasional outages. The MCP server should implement circuit breakers per upstream system:

- **Closed** (normal): requests pass through
- **Open** (system down): fail immediately with a clear error ("ERP system is currently unavailable for scheduled maintenance until 06:00 UTC. No purchase order operations can be performed.")
- **Half-open** (probing): allow one request through to test recovery

The circuit breaker state should be reflected in the tool's error messages so the LLM knows not to retry. An agent that keeps hammering a down ERP system is not just wasteful — it can trigger rate limiting that affects other systems.

## Enterprise System Integration Specifics

### ERP Integration (SAP, Oracle, Dynamics 365)

ERP systems are the most complex MCP integration target. They have deep object models, transaction semantics, and business rules that span multiple entities.

Key patterns:

**Read-heavy tool design.** Most agent interactions with ERP are reads: check PO status, look up pricing, verify supplier details. Design your read tools to return denormalized views — the agent should not need to make five calls to assemble the context for a single decision.

**Transactional writes.** ERP writes (creating a PO, posting a goods receipt) are transactional. The MCP server must handle the ERP's transaction lifecycle: open transaction, validate, commit or rollback. Never expose partial writes as separate tools — a `create_purchase_order` tool should handle line items atomically, not require separate `add_line_item` calls.

**RFC/BAPI wrappers for SAP.** SAP's native interface uses BAPIs (Business Application Programming Interfaces) and RFCs (Remote Function Calls). The MCP server wraps these behind clean tool schemas, translating between SAP's idiosyncratic parameter naming and sensible JSON properties.

Microsoft Dynamics 365 already offers a native MCP server with three tool categories: Data tools (CRUD operations), Form tools (page-level operations), and Action tools (class invocations). If you are on Dynamics, start with their MCP server and extend it with custom tools for agent-specific workflows.

### MES Integration

Manufacturing Execution Systems operate at a faster cadence than ERP — production orders, work center status, quality holds change in minutes, not days.

**Real-time read patterns.** MES tools should return current state, not cached state. The `mes.work_order.get_status` tool should hit the MES API directly, not read from a sync table.

**Guard rails on writes.** Production schedule changes can stop a factory line. MES write tools need additional confirmation mechanisms: the tool should return a preview of the impact ("Rescheduling WO-4521 will delay downstream orders WO-4522 and WO-4523 by 2 hours") and require explicit confirmation before execution.

### WMS Integration

Warehouse Management Systems provide inventory visibility and control picking/packing/shipping workflows.

**Multi-location aggregation.** A useful WMS tool returns inventory across all relevant locations in a single response, including reserved stock, in-transit quantities, and available-to-promise figures. Exposing per-location queries forces the agent to make N calls and aggregate — a task the MCP server should handle.

**Batch and serial number handling.** Regulated industries (pharma, food, aerospace) require lot traceability. WMS tools must include batch/serial information in both inputs and outputs. A `wms.inventory.get_levels` tool that omits batch data is useless for quality-hold decisions.

## Deployment Architecture

A production MCP deployment for enterprise integration typically looks like this:

```
┌─────────────────────────────────────┐
│         Agent Runtime (Host)        │
│  ┌─────────┐  ┌─────────┐          │
│  │ Signal  │  │Decision │          │
│  │ Agent   │  │ Agent   │          │
│  └────┬────┘  └────┬────┘          │
│       │            │               │
│  ┌────┴────────────┴────┐          │
│  │     MCP Client       │          │
│  └──────────┬───────────┘          │
└─────────────┼───────────────────────┘
              │ JSON-RPC / HTTP+SSE
              │
┌─────────────┼───────────────────────┐
│  MCP Gateway (Load Balancer)        │
│  - Rate limiting                    │
│  - Token validation                 │
│  - Request routing                  │
└──────┬──────────┬──────────┬────────┘
       │          │          │
┌──────┴───┐ ┌───┴─────┐ ┌─┴────────┐
│ ERP MCP  │ │ MES MCP │ │ WMS MCP  │
│ Server   │ │ Server  │ │ Server   │
│          │ │         │ │          │
│ SAP RFC  │ │ REST API│ │ REST API │
└──────┬───┘ └───┬─────┘ └┬─────────┘
       │         │        │
   [SAP S/4]  [MES]    [WMS]
```

Each enterprise system gets its own MCP server. An MCP gateway handles cross-cutting concerns: authentication, rate limiting, audit logging. The agent runtime's MCP client connects to the gateway, which routes `tools/call` requests to the appropriate backend server.

This separation matters for operational reasons:

- **Independent scaling.** The WMS MCP server might handle 10x the request volume of the ERP server during a warehouse peak.
- **Independent lifecycle.** You can update the MES MCP server without touching the ERP integration.
- **Blast radius.** If the SAP connection fails, MES and WMS tools remain available.

## What This Gets You

A well-implemented MCP layer between your agents and enterprise systems produces three measurable outcomes:

**Integration velocity.** Adding a new tool takes hours, not weeks. The schema contract is standardized — a new `erp.supplier.lookup` tool follows the same patterns as every other tool. No new adapter code, no custom serialization, no novel error handling.

**Agent reliability.** Typed input schemas prevent parameter confusion. Output schemas enable deterministic result parsing. Error messages guide self-correction. The LLM spends its context window on reasoning, not on figuring out API quirks.

**Operational governance.** Every tool invocation is a discrete, logged event with a clear schema. You can audit exactly what the agent read from the ERP, what parameters it passed, and what result it received. Combined with the scope-based authorization model, you have the control surface that enterprise IT requires.

MCP is not the final answer to enterprise AI integration — the protocol is still maturing, and the November 2025 spec was a significant step toward production readiness but not the last one. What it does provide is a rational starting point: a typed, authenticated, auditable interface between LLM reasoning and enterprise system operations. For teams building agent systems that need to ship, that is enough to get started.
