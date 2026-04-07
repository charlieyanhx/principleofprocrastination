---
slug: agent-supervision-design
locale: en
category: framework
title: Designing Agent Supervision Protocols
subtitle: >-
  Trust calibration, exception handling, and human override patterns for
  production agent systems
date: '2024-10-15'
readMinutes: 14
tags: []
sources: []
status: published
series: management
seriesOrder: 4
---

Deploying an agent system is not the hard part. The hard part is designing the supervision layer — the set of protocols that determine how much autonomy the agent has, when it escalates to humans, and how humans intervene when the agent gets it wrong.

We use a three-tier supervision model:

Tier 1: Full Autonomy. The agent handles routine cases end-to-end without human involvement. Criteria: the decision is well-structured, the stakes are low-to-medium, and historical accuracy exceeds 98%. Example: routing a standard purchase order for approved materials to the correct approver with pre-assembled context.

Tier 2: Human-in-the-Loop. The agent assembles context, makes a recommendation, and routes to a human for confirmation. Criteria: the decision involves ambiguity, higher stakes, or edge cases the agent hasn't encountered frequently. Example: a quality exception that falls outside normal parameters but doesn't clearly match any known failure pattern.

Tier 3: Human Override. The agent detects a situation outside its operational envelope and escalates immediately without recommendation. Criteria: novel situations, conflicting signals, or cases where the cost of an incorrect autonomous action is high. Example: a production schedule conflict that involves customer commitments and supply chain disruptions simultaneously.

The supervision tier for each decision type isn't static — it evolves as the system accumulates operational history and the team develops calibrated trust. A decision that starts at Tier 2 may graduate to Tier 1 after three months of validated performance.

The key design principle: err on the side of more supervision at deployment, then relax as trust is earned. An agent system that over-escalates is annoying but safe. An agent system that under-escalates is dangerous.
