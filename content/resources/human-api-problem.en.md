---
slug: human-api-problem
locale: en
category: essay
series: field
seriesOrder: 1
title: The Human API Problem
subtitle: Why middle managers became the integration layer — and how to fix it
date: '2026-04-03'
readMinutes: 8
tags:
  - coordination
  - middle-management
  - agent-architecture
  - enterprise-integration
sources:
  - >-
    https://www.mckinsey.com/capabilities/people-and-organizational-performance/our-insights/stop-wasting-your-most-precious-resource-middle-managers
  - >-
    https://www.webpronews.com/ai-agents-as-middle-managers-the-great-flattening-hype-meets-organizational-reality/
  - 'https://speakwiseapp.com/blog/context-switching-statistics'
  - 'https://www.oneio.cloud/blog/state-of-integration-solutions'
  - >-
    https://www.deloitte.com/us/en/insights/focus/human-capital-trends/2025/future-of-the-middle-manager.html
status: published
---

Here is a workflow that plays out thousands of times per day in industrial enterprises worldwide. A production scheduler opens the ERP to check current inventory levels. She switches to the MES to see which lines are running and what their output rates look like. She pulls up a shared spreadsheet where maintenance has logged upcoming downtime windows. She checks email for the latest demand forecast from sales. She opens the WMS to verify raw material availability. Then she synthesizes all of this in her head, makes a decision about tomorrow's production sequence, and communicates it via three separate channels to three separate teams.

She is not doing production scheduling. She is doing system integration. Her actual judgment — the part where she weighs trade-offs between on-time delivery, changeover costs, and maintenance windows — takes maybe 20 minutes. The other two hours are spent being a human API: receiving data from one system, reformatting it, and passing it to another.

This pattern is so pervasive that most organizations don't even see it. It's just "what managers do."

## How Managers Became Middleware

Enterprise software was never designed as a unified system. It accumulated. The ERP came first. Then the MES. Then the WMS, the CMMS, the QMS, the CRM. Each system was purchased to solve a specific problem, deployed by a different team, and configured according to different assumptions about how the business operates.

The average enterprise now runs roughly 900 applications, according to recent industry data. Only about 29% of those applications are integrated with each other. The rest exist as islands — each holding a piece of the operational picture, none holding the whole thing.

Someone has to bridge those islands. In theory, that's what integration platforms, ETL pipelines, and APIs are for. In practice, the integration layer is incomplete, brittle, or simply nonexistent for many critical workflows. So the bridge becomes a person. Usually a middle manager.

This is not a failure of the people in these roles. It's an architectural inevitability. When systems don't talk to each other, humans fill the gap. They become the glue — pulling a report from System A, re-keying the relevant numbers into System B, and calling someone in Department C to confirm the context that neither system captures.

McKinsey's research on middle management found that managers spend the majority of their time on precisely this kind of operational coordination — status compilation, information relay, approval routing — rather than on the strategic and people-development work that organizations claim to value. Their data suggests that approximately 60% of management activities could theoretically be automated with current technology, though only about 25% would be cost-effective to automate within five years.

## The Actual Cost

The coordination tax essay in this series laid out the broad cost structure. The human API problem is a specific, measurable subset of that tax. It manifests in three ways.

**Time cost.** According to research from Asana, 60% of knowledge workers' time goes to coordination activities — communicating about work, searching for information, switching between apps, chasing status updates. Only 40% goes to the skilled work they were hired for. Harvard Business Review research found that the average knowledge worker toggles between applications approximately 1,200 times per day — roughly once every 24 seconds during an eight-hour shift. Each switch carries a cognitive recovery cost. Gloria Mark's research at UC Irvine established that regaining deep focus after an interruption takes an average of 23 minutes. Not every app switch triggers a full 23-minute recovery, but the cumulative drag is enormous. Workers lose roughly four hours per week — five full working weeks per year — just to the overhead of navigating between digital tools.

**Error cost.** Every manual data transfer is an opportunity for transcription errors, stale data, and lost context. When a manager re-keys a number from the MES into a planning spreadsheet, there is no validation layer, no audit trail, no automatic reconciliation. The error rate for manual data entry is well-documented at 1-3% per field. In a workflow where a manager touches 50-100 data points per day across systems, that's 1-3 errors daily that may propagate downstream before anyone notices.

**Latency cost.** Human APIs don't operate at machine speed. They have meetings, lunch breaks, PTO, and competing priorities. A procurement approval that requires a manager to manually assemble context from five systems doesn't take five minutes — it takes five hours, or five days, depending on that manager's workload. The bottleneck isn't decision complexity; it's assembly time.

## Why Traditional Integration Doesn't Solve It

If the problem is that systems don't talk to each other, the obvious answer is: make them talk to each other. Build APIs. Deploy an integration platform (iPaaS). Set up ETL pipelines.

This is necessary but insufficient, for three reasons.

First, the integration backlog is infinite. Every enterprise has more integration requirements than its IT team can deliver. Simple REST API integrations cost $5,000-$20,000 each. Complex legacy system integrations run $20,000-$80,000 or more. With hundreds of systems and thousands of potential connection points, no organization can afford to integrate everything. So they prioritize, and the long tail of unintegrated workflows stays manual.

Second, static integrations break. Systems get updated. Fields get renamed. Workflows change. An integration built in 2023 for a specific data flow may not reflect how the business actually operates in 2026. Maintaining integrations is a continuous cost that most organizations underinvest in — Gartner's research indicates that 40% of ERP implementations underperform specifically due to underinvestment in integration.

Third, and most importantly, many coordination workflows involve judgment, not just data movement. A manager checking inventory isn't just reading a number — she's assessing whether that number makes sense given what she knows about supplier reliability, seasonal patterns, and the current production plan. A point-to-point API can move the number. It can't assess the context.

This is exactly where the previous article in this series — [The Case Against RPA](/resources/case-against-rpa) — becomes relevant. RPA attempted to solve the human API problem by automating the clicks. It mimicked what the manager did at the UI layer: open this screen, copy this field, paste it there. But it automated the mechanics without addressing the architecture. Agent systems operate at a different level entirely.

## The Agent Architecture for Coordination

Agent systems don't replace the human in the coordination loop. They replace the relay function while preserving — and amplifying — the judgment function. The distinction matters.

Consider the production scheduler from the opening example. An agent system doesn't make the scheduling decision for her. Instead, it does the following:

**Signal aggregation.** The agent connects to the ERP, MES, WMS, and CMMS via their APIs (or, where APIs don't exist, via structured data extraction from databases or even screen scraping as a last resort). It pulls current inventory, line status, maintenance schedules, and material availability into a unified operational picture. This happens continuously, not once a day when someone has time to check.

**Context assembly.** The agent doesn't just collect raw data — it assembles context. It flags that Line 3 has been running below rated capacity for two shifts (possible mechanical issue). It notes that the aluminum supplier has been late on three of the last five deliveries (adjust buffer assumptions). It identifies that tomorrow's demand forecast implies a product mix that requires a changeover the maintenance team hasn't been informed about.

**Decision support.** The agent presents the scheduler with a structured briefing: here's the situation, here are the constraints, here are two or three viable sequences with their trade-offs quantified. The scheduler applies judgment — she knows that the plant manager cares more about the automotive customer's order than the fill rate for the retail channel this week — and makes the call.

**Execution routing.** Once the decision is made, the agent pushes it to the relevant systems: updates the production schedule in the ERP, notifies maintenance via CMMS, triggers material staging in the WMS, and sends structured notifications to shift supervisors. No re-keying. No "I'll send an email about that."

The scheduler's two-hour ritual collapses to a 20-minute decision session. The same 20 minutes she was spending on actual judgment before — now without the two hours of system integration that preceded it.

## The Judgment Preservation Principle

The anxiety around agent systems in enterprise management — and it is real anxiety, not hypothetical — centers on a legitimate concern: if you automate coordination, do you eventually automate the coordinator out of existence?

The data suggests a more nuanced outcome. Among organizations with extensive agentic AI adoption, 45% expect reductions in middle management layers, but even aggressive estimates (Forrester) project only 10-15% displacement of management roles by 2030. The reason is that coordination and judgment are interleaved in practice. A manager doesn't first do all the coordination and then do all the judgment. She exercises micro-judgments throughout the coordination process: noticing that a number looks wrong, remembering that a supplier is unreliable, recognizing that two departments are about to create a conflict.

The well-designed agent system surfaces these judgment points explicitly rather than burying them in a two-hour data-gathering slog. It says: "here's an anomaly that needs your attention" rather than requiring the manager to discover the anomaly while manually assembling a report.

This is a better use of human cognition, not a replacement for it. The managers who spend their mornings as human APIs are the same people who have deep institutional knowledge, relationship capital, and operational intuition. Currently, those capabilities are diluted by hours of data plumbing. Agent systems concentrate them.

## Where to Start

The human API problem is diagnosable. Walk through your operational workflows and identify where information changes hands between humans not because a decision is required, but because a system boundary exists. Common examples:

- A plant manager who starts every day by manually compiling a status report from four systems
- A procurement coordinator who spends half her day assembling context for approval decisions
- A quality engineer who manually correlates defect data from the QMS with production data from the MES
- A logistics planner who re-enters shipment data from the TMS into the ERP because the integration was never built

Each of these is a human API pattern. The person isn't making decisions in those hours — they're moving data across system boundaries. That's the work that agent systems are built to absorb.

The question, as always, is whether the cost justifies the intervention. For a single manager spending 10 hours per week on cross-system data relay, the direct cost might be $30,000-$50,000 per year in loaded salary. But the real cost includes the errors, the latency, and the opportunity cost of that manager not doing the strategic and relationship work the organization actually needs. When you multiply across an organization with dozens of these patterns, the coordination cost calculator starts producing numbers that make the business case straightforward.

The first two articles in this series established that the coordination tax is real and that RPA is the wrong tool to address it. The human API problem is the specific mechanism through which that tax gets collected — one manager, one system boundary, one manual data transfer at a time. Agent systems don't eliminate the manager. They eliminate the reason the manager is functioning as middleware.
