---
slug: herbert-simon-was-right
locale: en
category: essay
title: Herbert Simon Was Right About Everything
subtitle: >-
  His 1955 theory of bounded rationality predicted exactly why AI agents are
  valuable — and why most organizations deploy them wrong
date: '2026-04-03'
readMinutes: 10
tags:
  - bounded-rationality
  - herbert-simon
  - decision-making
  - agent-architecture
  - management-science
sources:
  - https://onlinelibrary.wiley.com/doi/10.1111/puar.13540
  - https://plato.stanford.edu/entries/bounded-rationality/
  - https://onlinelibrary.wiley.com/doi/10.1111/padm.13051
  - https://link.springer.com/article/10.1007/s10203-024-00436-2
status: published
series: management
seriesOrder: 7
---

In 1955, Herbert Simon argued that humans don't optimize — they satisfice. Seventy years later, this single insight explains why AI agents are valuable, why dashboards aren't enough, and why most organizations still struggle with the same decision-making bottlenecks Simon diagnosed before the transistor radio was mainstream.

Simon's core claim was simple: the classical economic model of rational decision-making is fiction. Real humans operating in real organizations don't survey all available options, rank them by expected utility, and select the optimal choice. They can't. They lack the information, the cognitive capacity, and the time. Instead, they search through options until they find one that meets a minimum threshold of acceptability — what Simon called "satisficing," a portmanteau of "satisfy" and "suffice."

This wasn't a moral judgment. Simon wasn't calling managers lazy or irrational. He was describing a structural constraint. The human brain processes roughly 50 bits per second of conscious information. The average mid-level manager in an industrial organization receives hundreds of data points per day across email, ERP dashboards, chat messages, and verbal reports. The math doesn't work. Satisficing isn't a failure mode — it's the only available strategy.

## The Three Constraints

Simon identified three boundaries on rational decision-making that remain precisely accurate seventy years later.

**Information asymmetry.** Decision-makers rarely have access to all relevant information. In a manufacturing environment, the procurement manager approving a supplier change doesn't see the real-time quality data from the production floor, the logistics team's capacity constraints, or the finance department's cash flow projections — at least not in one place, not in real time, and not without spending hours assembling the picture manually.

**Cognitive limitation.** Even when information is theoretically available, the human brain cannot process it all simultaneously. Simon drew on his work with Allen Newell in early artificial intelligence research to formalize this: human cognition is serial, attention is finite, and working memory holds roughly four to seven items at a time. A supply chain director evaluating a disruption scenario involving 200 SKUs, 15 suppliers, and 8 production lines cannot hold the full combinatorial space in mind. They simplify. They use heuristics. They satisfice.

**Time pressure.** Real decisions have deadlines. The plant manager dealing with a quality excursion at 2 PM doesn't have until Friday to gather data. They need to make a call with whatever information is available right now. Simon observed that organizations develop standard operating procedures and decision rules precisely to compress decision time — but at the cost of decision quality.

These three constraints haven't changed. What has changed is our ability to address them computationally.

## From Satisficing to Agent Architecture

Here is where Simon's framework maps onto modern AI agent design with uncomfortable precision.

An AI agent, stripped to its essentials, is a system that perceives its environment, processes information, and takes or recommends action. The standard agent architecture — sense, plan, act — is a direct computational response to Simon's three constraints.

**Agents address information asymmetry by aggregation.** A well-designed agent pulls data from multiple systems in real time: ERP, MES, quality databases, logistics platforms, financial systems. It assembles the context that a human decision-maker would need hours to compile manually. This is not intelligence. This is plumbing. But it is plumbing that directly attacks Simon's first constraint.

**Agents address cognitive limitation by compression.** The agent doesn't hand the human 200 data points and say "decide." It processes the combinatorial space, applies constraints, filters noise, and surfaces the three or four options that actually matter — along with the reasoning. This is what Simon and Newell were working toward when they built the Logic Theorist in 1956 and the General Problem Solver in 1957: computational systems that handle the search through solution space so humans don't have to.

**Agents address time pressure by pre-computation.** Instead of waiting for the human to request a report, the agent monitors conditions continuously and alerts when thresholds are crossed. The quality excursion at 2 PM doesn't start a scramble for data — the agent already has the supplier history, the defect pattern, and the three most likely root causes assembled before the manager opens the notification.

Simon would have recognized this architecture immediately. It is, in effect, what he spent his career arguing organizations should build — computational decision support that respects human cognitive limits rather than pretending they don't exist.

## Where Most Deployments Get Simon Wrong

Simon's framework also explains why most enterprise AI projects fail to deliver on their promises. The error is subtle but fundamental: they try to replace satisficing with optimizing, when they should be replacing bad satisficing with good satisficing.

Consider a common deployment pattern: an organization builds a demand forecasting model that produces an optimal production schedule. The model is technically excellent. It accounts for historical patterns, seasonal trends, and capacity constraints. It outputs a plan that, on paper, maximizes throughput while minimizing cost.

The plant manager ignores it.

Not because the model is wrong, but because the model doesn't account for the three things the plant manager knows that aren't in the data: the maintenance crew is short-staffed this week, supplier X has been delivering late but hasn't updated their promised dates, and the VP of sales just called about a rush order for a key customer.

This is Simon's insight in action. The model optimizes within its information boundary. The human satisfices across a broader information boundary that includes tacit knowledge, relationship context, and real-time signals that never made it into a database. The model's "optimal" solution is optimal only within its bounded view. The human's "satisficed" solution is often more robust because it accounts for more of the actual operating environment.

The productive approach — and the one Simon's framework predicts — is to build agents that expand the human's information boundary rather than replacing the human's judgment. Give the plant manager the forecasting model's output as one input among several, pre-assembled alongside the maintenance schedule, supplier delivery performance data, and the sales pipeline. Let the human satisfice across a richer information set. The decision will still be satisficed, not optimized. But it will be satisficed from a much better starting position.

## Satisficing as Design Principle

There is a deeper lesson here for anyone building agent systems. Simon's satisficing isn't just a description of how humans decide — it's a viable design principle for agents themselves.

Modern LLM-based agents don't optimize either. They generate responses that are good enough given their training data, context window, and inference budget. They satisfice. The question isn't whether an agent's output is globally optimal — it never is. The question is whether its satisficing threshold is calibrated correctly for the operational context.

An agent that recommends the three lowest-cost suppliers is satisficing on price. An agent that recommends the three suppliers with the best combination of price, delivery reliability, and quality history is satisficing across a richer objective function. Both are bounded. The second is more useful because its bounds are better aligned with operational reality.

This is why agent design is fundamentally a management science problem, not just an engineering problem. The engineering determines what the agent can perceive and compute. The management science determines what it should satisfice on — which variables matter, what thresholds are acceptable, and when to escalate to human judgment.

## The Organization as Information-Processing System

Simon's later work, particularly "Organizations" (1958, with James March), extended bounded rationality from individuals to organizations. His argument: organizations exist because they are more effective information-processing systems than markets or individuals operating alone. Departments specialize in processing certain types of information. Hierarchies exist to aggregate and route decisions. Standard operating procedures encode past learning into repeatable patterns.

This is exactly what a multi-agent system does. One agent monitors quality data. Another tracks supplier performance. A coordination layer aggregates their outputs and routes decisions to the appropriate human. The architecture recapitulates the organizational structure — not because someone designed it that way on purpose, but because Simon identified the correct underlying logic seventy years ago.

The implication for organizations deploying agent systems is direct: don't start with the technology. Start with Simon's question. Where in your organization are people satisficing poorly — making decisions with inadequate information, under excessive time pressure, with cognitive overload? Those are your high-leverage deployment targets. The agent's job isn't to be smarter than the human. It's to make the human's satisficing less bounded.

## What Simon Got Right

Herbert Simon received the Nobel Prize in Economics in 1978, the Turing Award in 1975, and the National Medal of Science in 1986. He was one of the founders of artificial intelligence as a field, alongside Allen Newell, John McCarthy, and Marvin Minsky. He spent decades at Carnegie Mellon building computational models of human cognition.

But his most enduring contribution might be the simplest one: the recognition that the bottleneck in organizational performance isn't the quality of decisions per se, but the quality of the decision environment. Give people better information, structured more clearly, delivered faster, and they will make better decisions — not optimal ones, but better satisficed ones.

That is precisely what agent systems do when they are designed well. They don't replace human judgment. They improve the environment in which human judgment operates. Simon said this in 1947. The technology to act on it at scale arrived roughly seventy years later.

He was right about everything. We just needed the compute to prove it.
