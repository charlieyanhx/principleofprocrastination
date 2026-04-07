---
slug: react-paper
locale: en
category: essay
title: "ReAct: The Paper That Gave Agents a Inner Monologue"
subtitle: >-
  Yao et al. formalized the reason-then-act loop in 2022. Three years later,
  every agent framework still runs on this pattern. Here's why it works, when
  it breaks, and what's replacing it.
date: '2026-04-03'
readMinutes: 10
tags:
  - react
  - agents
  - reasoning
  - tool-use
  - foundational-papers
sources:
  - "https://arxiv.org/abs/2210.03629"
  - "https://openreview.net/forum?id=WE_vluYUL-X"
  - "https://research.google/blog/react-synergizing-reasoning-and-acting-in-language-models/"
  - "https://github.com/ysymyth/ReAct"
status: published
series: papers
seriesOrder: 3
---

In October 2022, Shunyu Yao and colleagues at Princeton and Google Brain posted a paper with a deceptively simple idea: what if language models could think out loud *between* actions? Not just generate a plan up front, or execute a chain of tool calls blindly, but interleave explicit reasoning steps with actions in the real world -- thought, act, observe, thought, act, observe, in a loop. They called the approach ReAct, short for Reasoning + Acting.

The paper was accepted as an oral presentation at ICLR 2023. Within a year, every major agent framework -- LangChain, AutoGPT, CrewAI, Microsoft's Semantic Kernel -- had adopted some version of the ReAct loop as its default execution pattern. If you've built anything with LLM agents, you've used ReAct, whether you called it that or not.

## The Core Claim

Before ReAct, there were two parallel research threads. One was chain-of-thought (CoT) prompting: get the model to reason step-by-step before answering, which dramatically improves performance on math, logic, and multi-hop reasoning tasks. The other was action generation: have the model produce sequences of actions to interact with external environments -- APIs, search engines, databases.

The problem was that these two capabilities were studied in isolation. Chain-of-thought reasoning was purely internal: the model reasoned, then answered, with no ability to gather new information mid-thought. Action generation was purely external: the model acted, but without articulating *why* it was taking each step, making it brittle and hard to debug.

Yao et al.'s claim was that combining these two -- interleaving reasoning traces with actions in a shared sequence -- would produce agents that are both more capable and more interpretable. Reasoning helps the model plan actions, handle exceptions, and update its approach. Actions ground the reasoning in real observations, preventing the hallucination spirals that plague pure chain-of-thought.

## What They Did

The experimental design was clean. The authors evaluated ReAct on four diverse benchmarks spanning two categories:

**Knowledge-intensive reasoning tasks:**
- HotPotQA -- multi-hop question answering requiring information from multiple Wikipedia articles
- FEVER -- fact verification, classifying claims as supported, refuted, or unverifiable

**Interactive decision-making tasks:**
- ALFWorld -- text-based household tasks (find a pen, heat an egg) requiring multi-step planning
- WebShop -- online shopping with natural language, requiring navigation and product selection

For the knowledge tasks, the model had access to a Wikipedia search API. At each step, it could think (produce a reasoning trace), then act (search, lookup a passage), then observe the result, and repeat. For the decision-making tasks, it interacted with simulated environments.

They compared ReAct against several baselines: standard prompting (no reasoning), chain-of-thought only (reasoning without actions), and action-only (actions without reasoning). All experiments used PaLM-540B with few-shot prompting -- no fine-tuning.

## What They Found

The results split cleanly along the two task categories, and this split is the most interesting part of the paper.

On **interactive decision-making**, ReAct dominated. On ALFWorld, ReAct achieved a 71% success rate compared to 45% for the best imitation learning baseline -- a 34-percentage-point improvement with just one or two in-context examples. On WebShop, ReAct outperformed the action-only baseline by 10 percentage points. The reasoning traces helped the model form coherent plans ("I need to go to the counter first, then pick up the mug, then go to the microwave") rather than stumbling through actions randomly.

On **knowledge-intensive reasoning**, the picture was more nuanced. ReAct outperformed action-only approaches and was competitive with chain-of-thought. But it didn't consistently beat CoT on its own. The authors' key finding here was that the best performance came from combining ReAct with CoT-Self-Consistency (CoT-SC) -- using internal reasoning when the model was confident, and falling back to ReAct's grounded search when it wasn't. On HotPotQA, this combined approach outperformed either method alone.

This asymmetry is important. It tells us that ReAct's primary contribution isn't replacing internal reasoning -- it's providing a mechanism to *ground* reasoning in external reality when the model's internal knowledge isn't sufficient.

## Why It Matters for Agent Practitioners

The paper's lasting influence isn't really the benchmark numbers. It's the *architecture* it introduced. The thought-action-observation loop became the standard execution pattern for LLM agents because it solves three practical problems:

**Interpretability.** When a ReAct agent fails, you can read its reasoning trace and understand *why*. "I searched for X because I thought Y, but the result showed Z, so I revised my approach." This is orders of magnitude more debuggable than a black-box action sequence.

**Error recovery.** Because the model reasons explicitly about observations, it can detect when something unexpected happens and adjust. A pure action agent that gets a 404 error might repeat the same call; a ReAct agent can reason "that page doesn't exist, I should try a different search term."

**Composability.** The thought-action-observation format is generic enough to work with any tool set. Swap out Wikipedia search for a SQL database, a REST API, or a file system -- the loop structure stays the same. This is why every agent framework adopted it.

In production systems, we see the ReAct pattern everywhere. An operations agent that checks inventory levels (act), notices a shortage (observe), reasons about which supplier to contact (thought), then places an order (act) is running a ReAct loop, even if nobody on the team has read the paper.

## Where It Breaks

Three years of widespread deployment have revealed ReAct's failure modes clearly:

**Reasoning loops.** The most common failure in production ReAct agents is the infinite loop: the agent searches, gets an unhelpful result, reasons that it should search again with slightly different terms, gets another unhelpful result, and repeats until it hits a token limit or timeout. The paper acknowledged this -- on HotPotQA, ReAct sometimes got stuck in "reasoning ruts," repeatedly reformulating failed searches without changing strategy.

**Hallucinated observations.** In some implementations, the model generates fake observations instead of waiting for real tool output. It writes "Observation: the search returned X" without actually calling the search API. This is an implementation bug, not a flaw in the concept, but it's pervasive enough in practice to warrant mention. Strict system prompts and enforced tool-call protocols mitigate it, but don't eliminate it entirely.

**Verbose reasoning overhead.** Every reasoning trace consumes tokens. For tasks requiring many steps, the accumulated reasoning can fill the context window, pushing out the actual observations the model needs. This is a structural tension: more reasoning improves decision quality but competes for context space with the information needed to reason well.

**Single-trajectory brittleness.** ReAct follows a single chain of thought-action-observation. If the model makes a wrong turn early -- a bad search, a flawed assumption -- it has no mechanism to backtrack. It can try to recover in subsequent steps, but it can't explore alternative paths.

**Weak self-evaluation.** The model generates reasoning traces, but it doesn't explicitly evaluate whether its reasoning is sound. It might reason confidently toward a wrong answer without ever checking its work.

## What Came After

The limitations of ReAct spawned a productive line of follow-up work:

**Reflexion** (Shinn et al., 2023) added a self-reflection step. After completing a task (successfully or not), the agent reflects on what went wrong and stores that reflection in memory. On subsequent attempts, it uses past reflections to avoid repeating mistakes. This directly addresses ReAct's lack of self-evaluation but requires multiple task attempts to be useful.

**LATS** (Zhou et al., 2023) -- Language Agent Tree Search -- combined ReAct-style reasoning with Monte Carlo Tree Search. Instead of following a single trajectory, the agent explores multiple paths, evaluates them, and backtracks when needed. This addresses the single-trajectory brittleness but at significant computational cost.

**Toolformer** and subsequent tool-augmented models moved tool-use from prompt engineering into the model's training. Rather than prompting a model to reason about when to use tools, these approaches trained models to decide tool use natively.

**Planning-first architectures** like those in OpenAI's o1 and similar systems shifted reasoning to a planning phase before execution, rather than interleaving it with actions. The model thinks deeply first, produces a plan, then executes it -- closer to how experienced human operators work.

Most modern agent systems don't use pure ReAct. They use variations: ReAct with reflection, ReAct with planning, ReAct with constrained action spaces, ReAct with hierarchical decomposition. But the core insight -- that agents need to articulate reasoning between actions -- remains foundational.

## The Deeper Lesson

ReAct's real contribution is conceptual, not technical. The implementation is straightforward: append "Thought:" and "Action:" prefixes to a prompt and parse the output. What Yao et al. demonstrated is that *the structure of the interaction* between reasoning and acting matters more than the sophistication of either component alone.

This is why the paper has aged well despite rapid progress in model capabilities. GPT-4, Claude, Gemini -- every new model is more capable than PaLM-540B, the model used in the original experiments. But they all still benefit from the ReAct pattern because the pattern isn't about making up for model weakness. It's about structuring the relationship between thinking and doing.

For practitioners building agent systems, the lesson is clear: don't just give your agent tools. Give it space to think about when and why to use them. And don't just let it think internally -- force its reasoning through a channel you can observe, log, and debug.

The thought-action-observation loop is three years old now. It's been extended, modified, and sometimes replaced. But it hasn't been refuted. The agents we build in 2026 still reason, act, and observe. They just do it with more sophistication than a few-shot prompt and a Wikipedia API.
