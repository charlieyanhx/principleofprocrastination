# Editorial Backlog

---

## Paper Trail (`papers`)

- [ ] **Attention Is All You Need, 7 Years Later** — Revisiting Vaswani et al. (2017). What the original transformer paper got right, what it missed, and how the architecture evolved into today's LLMs. A reading guide for non-ML-engineers.

- [ ] **Toolformer and the Birth of Tool-Using LLMs** — Schick et al. (2023) taught language models to use tools autonomously. What this paper established, its limitations, and how it led to Function Calling and MCP.

- [ ] **ReAct: Synergizing Reasoning and Acting** — Yao et al. (2023). The paper that formalized the reason-then-act loop now used in every agent framework. Why it works, when it fails, and what comes next.

- [ ] **Voyager: Learning to Play Minecraft with LLMs** — Wang et al. (2023). Why a Minecraft paper matters for industrial AI: open-ended task completion, skill libraries, and the gap between game agents and production agents.

- [ ] **Chain-of-Thought Prompting Elicits Reasoning** — Wei et al. (2022). The paper that changed how we interact with LLMs. What chain-of-thought actually does (and doesn't do) inside the model.

- [ ] **Constitutional AI: Harmlessness from AI Feedback** — Bai et al. (2022). Anthropic's approach to AI alignment. What it means for enterprise deployments where agent behavior needs to be governed.

- [ ] **The Bitter Lesson (Rich Sutton, 2019)** — Not a paper, an essay. Why general methods that scale with compute always win. What this means for the "should we fine-tune or prompt-engineer?" debate.

- [ ] **Multi-Agent Debate Improves LLM Reasoning** — Du et al. (2023). Multiple agents arguing with each other produce better answers. Implications for decision-quality in enterprise agent systems.

- [ ] **Gorilla: Large Language Model Connected with Massive APIs** — Patil et al. (2023). Training LLMs to make accurate API calls. The foundation for enterprise agent-system integration.

- [ ] **LATS: Language Agent Tree Search** — Zhou et al. (2023). Combining LLM agents with Monte Carlo Tree Search. When brute-force reasoning outperforms single-pass generation.

---

## Tool Bench (`tools`)

- [ ] **Claude Code: What It Actually Does** — Anthropic's agentic coding tool. Architecture, capabilities, limitations. Honest assessment from daily use.

- [ ] **MCP: Model Context Protocol Deep Dive** — Anthropic's open protocol for tool-system integration. Spec walkthrough, server implementation patterns, and where it fits in the enterprise stack.

- [ ] **LangGraph vs. CrewAI vs. AutoGen** — The three major multi-agent frameworks compared. Architecture philosophy, ease of use, production-readiness, and when to use each.

- [ ] **Cursor, Windsurf, Claude Code: AI Coding Tools Compared** — Not which is "best" — which is best for what. Different tools for different workflows.

- [ ] **Dify, Coze, FastGPT: Low-Code Agent Platforms** — The Chinese and international low-code agent builders. What they enable, where they break down, and who they're actually for.

- [ ] **n8n + AI: Workflow Automation Gets Smarter** — n8n's AI nodes and agent capabilities. When workflow automation tools are enough and when you need custom agent systems.

- [ ] **OpenAI Assistants API vs. Claude Tool Use** — Two approaches to giving LLMs tools. Technical comparison of capabilities, reliability, and developer experience.

- [ ] **Ollama, vLLM, and Local LLM Deployment** — Running models locally. When it makes sense, what hardware you need, and the real performance vs. cloud API tradeoffs.

- [ ] **Vector Databases in 2025: Pinecone, Weaviate, Qdrant, Chroma** — When you need a vector DB, when you don't, and which one fits your use case.

- [ ] **Firecrawl, Jina Reader, and Web Data Extraction for Agents** — How agents access web content. Tools for turning the messy web into structured data.

---

## The Org Layer (`management`)

- [ ] **Herbert Simon Was Right About Everything** — Simon's "bounded rationality" (1955) predicted exactly why AI agents are valuable: humans can't process all available information. How his decision-making theory maps onto modern agent architecture.

- [ ] **The Coordination Tax: A Management Science Perspective** — Drawing from Malone & Crowston's coordination theory (1994). Why organizations have coordination costs, the taxonomy of coordination mechanisms, and where automation fits.

- [ ] **Henry Mintzberg and the Structure of AI-Augmented Organizations** — Mintzberg's organizational configurations (1979) applied to enterprises deploying agent systems. How the "operating core" and "technostructure" shift.

- [ ] **Why Most Digital Transformations Fail (And Agent Systems Might Not)** — McKinsey says 70% of digital transformations fail. Why? And why agent systems, deployed correctly, avoid the most common failure modes.

- [ ] **The Principal-Agent Problem in... AI Agents** — The economics concept meets its literal namesake. When the AI agent's objectives diverge from the principal's. Alignment in enterprise context, not philosophical terms.

- [ ] **Automation, Augmentation, or Replacement? A Framework** — Not every task should be automated. Not every human role should be augmented. A rigorous framework for deciding what agents should do vs. what humans should do.

- [ ] **The Toyota Production System and Agent-Based Operations** — TPS eliminated waste through flow. Agent systems eliminate waste through coordination. The parallels are deep and instructive.

- [ ] **Knowledge Work After Agents** — Peter Drucker coined "knowledge worker" in 1959. What happens to knowledge work when agents handle information synthesis? Not a dystopia piece — a serious analysis.

---

## Field Notes (`field`)

- [ ] **What Happens the First Week After Deployment** — Real observations from the first 7 days of an agent system going live. The surprises, the edge cases, the human reactions.

- [ ] **The WeChat Problem** — In Chinese enterprises, critical business decisions happen in WeChat groups that no system can see. How this creates coordination debt and what (if anything) agents can do about it.

- [ ] **When the Agent Gets It Wrong** — Three categories of agent failure we've observed. What triggers them, how teams respond, and how supervision protocols actually work in practice.

- [ ] **The Manager Who Didn't Trust the Agent** — A case study in trust calibration. One manager checked every agent decision for 6 weeks. What happened and what we learned.

- [ ] **Why Your ERP Data Is Worse Than You Think** — Agents need clean data. Enterprise data is not clean. The gap between what's in the database and what's actually happening on the floor.

- [ ] **The 3 PM Report Problem** — Every factory has a report that someone spends 2 hours compiling every afternoon. The anatomy of a coordination task that should have been automated years ago.

---

## From Scratch (`fundamentals`)

- [ ] **What Is an AI Agent, Actually?** — Strip away the hype. An agent is a program that perceives, decides, and acts. Start from there and build up to LLM-powered multi-agent systems.

- [ ] **How Large Language Models Work (No PhD Required)** — Tokens, attention, training, inference. The mechanical reality behind the magic. Written for smart people who haven't studied ML.

- [ ] **Prompts, Tools, and Agents: A Taxonomy** — You can talk to an LLM (prompting), give it tools (function calling), or build an agent (autonomous loop). When you need each and why the distinctions matter.

- [ ] **What "Training" Actually Means** — Pre-training, fine-tuning, RLHF, DPO. What happens at each stage and why it matters for how the model behaves in your application.

- [ ] **The Context Window: Why It Matters and Where It Breaks** — The context window is the LLM's working memory. What happens when it's too small, too large, or poorly managed. Practical implications for agent design.

- [ ] **Open Source vs. Closed Source Models in 2025** — Llama, Mistral, Qwen vs. GPT, Claude, Gemini. Not which is "better" — when each makes sense and the real tradeoffs.

---

## China Desk (`china`)

- [ ] **Why Chinese Manufacturing Needs Agent Systems Now** — The specific coordination challenges: system heterogeneity (用友/金蝶 + SAP + WeChat), approval chain complexity, multi-facility management.

- [ ] **The WeChat-ERP Gap** — How informal communication channels create coordination debt that formal systems can't see or fix.

- [ ] **China's AI Regulatory Landscape for Enterprise Deployment** — What you actually need to know. Algorithm registration, data security law, cross-border data rules. Practical, not paranoid.

- [ ] **Qwen, DeepSeek, and the Chinese LLM Landscape** — The models being used in Chinese enterprise. Capabilities, limitations, and how they compare to international alternatives.

- [ ] **钉钉, 飞书, 企业微信: The Communication Platform Wars** — Three platforms competing to be the enterprise OS in China. What each offers for AI integration and where they fall short.

---

## US Desk (`us`)

- [ ] **The NIST AI Risk Management Framework: What Enterprises Actually Need** — NIST AI RMF 1.0 came out in 2023. Most companies haven't implemented it. What the framework covers, what it gets right, what it misses, and a practical adoption guide for enterprise teams.

- [ ] **Why American Factories Are Slower to Adopt AI Than You Think** — Silicon Valley talks about AI constantly. American manufacturing adoption tells a different story. Legacy systems, workforce concerns, union dynamics, and the gap between tech press narratives and factory floor reality.

- [ ] **The VC-Funded Agent Landscape: Who's Building What** — A map of the US agent startup ecosystem. Who's raised money, what they're building, what's shipping vs. what's vaporware. Honest assessment, not deal flow marketing.

- [ ] **Biden to Trump: US AI Policy Whiplash** — Executive orders, CHIPS Act, export controls, and the regulatory uncertainty facing enterprise AI teams. What changed, what stayed, and what to plan for.

- [ ] **Anthropic, OpenAI, Google: The Enterprise AI Platform War** — Three companies competing for enterprise AI spend. Architecture philosophy, pricing, reliability, and enterprise readiness compared from a buyer's perspective, not a fanboy's.

- [ ] **The American ERP Landscape and Agent Integration** — SAP, Oracle, Microsoft Dynamics, Salesforce, NetSuite — the systems running American enterprise operations. API maturity, integration patterns, and where agent systems fit in each ecosystem.

- [ ] **US Healthcare and AI Agents: HIPAA, Compliance, and the Opportunity** — Healthcare is the biggest coordination-heavy industry in the US. HIPAA constraints, EHR integration challenges, and where agent systems can create value without creating liability.

- [ ] **The Rust Belt AI Opportunity** — Midwest and Rust Belt manufacturing is underserved by AI vendors focused on SF and NYC. The coordination problems in these operations are exactly what agent systems solve. Market analysis and entry strategy.

---

## Signal & Noise (`policy`)

- [ ] **The EU AI Act: What Enterprise Teams Need to Know** — Not the full regulation — the 5 things that actually affect how you deploy agent systems in EU-facing operations.

- [ ] **OpenAI, Anthropic, Google: The Platform War Nobody's Winning** — Market dynamics, pricing trends, and why enterprise customers shouldn't bet on one provider.

- [ ] **The Gartner Hype Cycle Is Wrong About Agents** — Why the hype cycle model doesn't apply to technology that's already in production at scale. A critique with evidence.

- [ ] **AI Spending vs. AI Value: The 2025 Gap** — Enterprises are spending billions on AI. What's generating return and what isn't. Industry data analysis.

---

## Done

- [x] coordination-tax (papers/essay)
- [x] why-enterprise-ai-fails (papers/essay)
- [x] agent-coordination-patterns (papers/technical)
- [x] operational-diagnosis-framework (management/framework)
- [x] agent-supervision-design (management/framework)
- [x] build-vs-buy-agent-systems (management/essay)
- [x] case-against-rpa (tools/essay)
- [x] llm-orchestration-industrial (tools/technical)
