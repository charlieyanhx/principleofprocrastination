---
slug: what-is-an-agent
locale: en
category: essay
title: "What Is an AI Agent, Actually?"
subtitle: "Strip away the hype. An agent is a program that perceives, decides, and acts. Start from there."
series: fundamentals
seriesOrder: 1
date: '2026-04-03'
readMinutes: 8
tags: [agents, fundamentals, LLM, multi-agent-systems]
sources:
  - "https://aima.cs.berkeley.edu/"
  - "https://singularityhub.com/2025/01/04/what-is-an-ai-agent-a-computer-scientist-explains-the-next-wave-of-ai-tools/"
  - "https://mitsloan.mit.edu/ideas-made-to-matter/agentic-ai-explained"
  - "https://www.gao.gov/products/gao-25-108519"
status: published
---

An AI agent is a program that can perceive its environment, make decisions, and take actions. That's it. Everything else is engineering detail.

This definition has been stable for over thirty years. Stuart Russell and Peter Norvig wrote it in the first edition of *Artificial Intelligence: A Modern Approach* in 1995, and it still holds in the fourth edition published in 2020. An agent perceives through sensors, decides through some internal logic, and acts through actuators. Whether the agent is a thermostat or a large language model orchestrating a dozen API calls, the structure is the same.

The recent excitement around "AI agents" isn't about a new idea. It's about an old idea getting dramatically more capable. To understand what changed and what it means, it helps to start from the ground up.

## The simplest agent you already know

A thermostat is an agent. It perceives the room temperature through a sensor. It has a decision rule: if the temperature drops below the setpoint, turn on the heat. It acts by switching the furnace on or off.

This isn't a metaphor. In the formal definition used by computer scientists, the thermostat qualifies. It has sensors, a decision function, and actuators. It perceives, decides, acts.

Of course, nobody calls a thermostat an "AI agent" in casual conversation. That's because the decision logic is trivial -- a single if-then rule. But the architecture is identical to what powers the most sophisticated agent systems being deployed today. The difference is what sits in the middle, between perceiving and acting.

## Four levels of decision-making

Russell and Norvig describe a spectrum of agent architectures, organized by the complexity of their decision logic.

**Simple reflex agents** respond directly to what they perceive right now. The thermostat is one. A spam filter that blocks emails containing certain keywords is another. No memory, no planning, just stimulus and response.

**Model-based agents** maintain an internal model of the world. They remember things. A robot vacuum that maps your apartment is a model-based agent. It doesn't just react to obstacles as it bumps into them -- it builds a map and uses that map to decide where to go next.

**Goal-based agents** have explicit objectives. They don't just react or model -- they plan. A GPS navigation system is goal-based: given your destination and a map of road conditions, it searches for a route that gets you there. It can evaluate multiple possible paths and pick the best one.

**Utility-based agents** can weigh trade-offs. A self-driving car doesn't just find *a* route -- it balances travel time, fuel efficiency, passenger comfort, and safety. It has a utility function that lets it rank different outcomes and choose the option with the highest expected value.

These four levels are not rigid categories. They're points along a continuum. But they illustrate a key insight: making agents more capable means giving them richer ways to decide. Better perception helps. More actions help. But the real leverage is in the decision logic.

## What changed: language models as reasoning engines

For decades, the "decide" part of the perceive-decide-act loop was the hard problem. Building decision logic meant hand-coding rules, training specialized models, or painstakingly defining reward functions. Each approach worked within narrow domains but broke down when the task required general reasoning or understanding of natural language.

Large language models changed this. Models like GPT-4, Claude, and their successors turned out to be surprisingly good at the kinds of reasoning that agent decision-making requires: breaking a goal into steps, evaluating options, interpreting ambiguous instructions, and adapting when things don't go as planned.

This was not what LLMs were originally built for. They were trained to predict the next token in a sequence of text. But that training -- on trillions of words of human writing about every subject imaginable -- produced something that could function as a general-purpose reasoning engine.

The insight that launched the current wave of AI agents was this: take an LLM, give it the ability to perceive (by reading data from the world), give it the ability to act (by calling tools and APIs), and let it use its language-based reasoning to decide what to do. Suddenly, you have a goal-based or even utility-based agent that works across a wide range of tasks, without anyone hand-coding the decision logic for each one.

## The anatomy of an LLM-powered agent

A modern LLM agent typically has four components.

**A language model** at its core, serving as the reasoning engine. This is where the "decide" happens. The model receives a description of the current situation, the goal, and the available actions, and it generates a plan or a next step.

**Tools** that let the agent act on the world. These might be API calls (send an email, query a database, place an order), code execution environments, web browsers, or connections to other software systems. Without tools, an LLM can only generate text. With tools, it can do things.

**Memory** that persists across steps. Short-term memory (the conversation context) lets the agent track what it has already done. Long-term memory (stored in a database or file system) lets it recall information from previous sessions or reference large bodies of knowledge that don't fit in a single prompt.

**A control loop** that ties everything together. The agent perceives (reads new information), decides (calls the LLM to reason about what to do next), acts (invokes a tool), and then perceives again (reads the result). This loop continues until the task is complete, the agent gets stuck, or a human intervenes.

If this sounds like a software program with an LLM in the middle, that's exactly what it is. The magic isn't in any single component. It's in the fact that the LLM is flexible enough to handle the decision-making for a huge variety of tasks without being explicitly programmed for each one.

## From one agent to many

Once you have agents that can reason and act, a natural question follows: what happens if you have several of them working together?

Multi-agent systems are not new. Computer scientists have studied them since the 1980s. The idea is straightforward: instead of one agent trying to do everything, you have multiple agents, each with a specific role or expertise, collaborating on a task.

In the LLM era, this looks like a team of specialized agents coordinated by an orchestrator. One agent might be responsible for research -- searching the web and summarizing findings. Another might handle data analysis -- writing and running code. A third might draft a report. The orchestrator decides which agent to invoke, passes context between them, and assembles the final output.

Frameworks like Microsoft's AutoGen and open-source projects like CrewAI make it relatively straightforward to build these systems. The orchestrator is itself often an LLM, using its reasoning ability to route tasks to the right specialist.

But multi-agent systems come with real costs. Research from 2025 found that poorly structured multi-agent networks can amplify errors by up to 17 times compared to a single agent. More agents means more coordination overhead, more potential for miscommunication, and more places where things can quietly go wrong. The coordination tax applies to AI teams just as it does to human ones.

The practical lesson: multi-agent systems are powerful when the task genuinely requires different capabilities or perspectives. They are wasteful when a single well-configured agent would do. The decision of when to split one agent into many is an engineering judgment, not a default.

## What agents can and cannot do today

As of early 2026, LLM-powered agents are in production across a range of applications. Customer service agents handle multi-step support requests. Coding agents write, test, and debug software. Research agents gather and synthesize information from dozens of sources. Operations agents monitor systems and take corrective action.

These agents are genuinely useful. They are also genuinely limited.

They hallucinate -- generating confident but incorrect information. They lose track of long-running tasks when the context grows too large. They struggle with tasks that require precise numerical reasoning or strict logical deduction. They can take actions in the real world, which means their mistakes have real consequences. A chatbot that writes a bad paragraph wastes your time. An agent that sends a wrong email to a client creates a real problem.

The U.S. Government Accountability Office published a technology assessment of AI agents in 2025 specifically because these systems are entering domains -- healthcare, finance, government operations -- where errors have serious consequences. The report noted that agents introduce new categories of risk precisely because they act autonomously.

None of this means agents are not worth using. It means they need to be deployed with appropriate guardrails: human review at critical decision points, limited scope of autonomous action, logging and monitoring of what the agent does and why, and clear escalation paths when the agent encounters something outside its competence.

## The mental model worth keeping

Here is the simplest way to think about AI agents, and it's the one that will stay accurate as the technology evolves.

An agent is a program that perceives, decides, and acts. What makes modern AI agents different from the ones in textbooks is what sits in the decision layer: a large language model that can reason in natural language, use tools, and adapt to new situations without being explicitly reprogrammed.

That's a significant capability. It's not magic. It doesn't mean agents can do anything. It means they can do a wider range of things, more flexibly, than any previous software architecture.

The hype cycle will pass. The perceive-decide-act loop will remain. Every time someone introduces a new agent framework or announces a breakthrough in agent capabilities, you can ask three questions: What can it perceive? How does it decide? What can it do? The answers will tell you everything you need to know.
