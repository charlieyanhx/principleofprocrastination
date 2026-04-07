---
slug: attention-retrospective
locale: zh
category: essay
title: "Attention Is All You Need 发表七年：回头再看 Transformer"
subtitle: "这篇论文说对了什么、漏掉了什么、以及为什么它今天依然重要"
date: "2026-04-03"
readMinutes: 10
tags: ["transformers", "attention", "deep-learning", "foundational-papers"]
sources:
  - "https://arxiv.org/abs/1706.03762"
  - "https://en.wikipedia.org/wiki/Attention_Is_All_You_Need"
  - "https://arxiv.org/html/2510.05364v1"
  - "https://goombalab.github.io/blog/2025/tradeoffs/"
  - "https://www.cbinsights.com/research/google-transformer-startups-openai/"
status: published
series: papers
seriesOrder: 2
---

2017 年 6 月，Google 的八位研究员发了一篇论文，标题干脆得像下战书："Attention Is All You Need"。核心主张很简单——处理序列数据不需要循环，不需要卷积，只需要注意力机制。论文谈的是机器翻译，但它引发的连锁反应远远超出了翻译领域。

七年之后，这篇论文描述的 Transformer 架构是 GPT-4、Claude、Gemini、Llama 以及几乎所有主流大语言模型的底层骨架。它也驱动着 Stable Diffusion 3、Sora 这类图像和视频生成模型，被应用于蛋白质折叠预测、药物发现、天气预报和音乐生成。截至目前，论文被引用超过 17.3 万次，是 21 世纪引用量最高的研究论文之一。

大多数机器学习论文的生命周期是两年：在某个基准上刷个点，然后被遗忘。这篇不同。它提出了一个干净的架构断裂，然后开启了一个时代。值得认真回顾它实际说了什么，之后发生了什么，以及它的局限性告诉了我们什么。

## 他们做了什么

八位作者——Ashish Vaswani、Noam Shazeer、Niki Parmar、Jakob Uszkoreit、Llion Jones、Aidan Gomez、Lukasz Kaiser、Illia Polosukhin——当时在做序列到序列的翻译模型。主流方法是循环神经网络（RNN），通常是 LSTM，再加上一个注意力机制帮助模型在生成每个输出词时关注输入中的相关部分。

关键洞察：注意力机制才是真正干活的部分。循环结构——逐个处理 token、按顺序传递状态——是瓶颈。它天然是串行的，在 GPU 这类并行硬件上训练很慢。而且它在长距离依赖上表现不佳：当 RNN 处理到第 50 个词时，第 1 个词的信息已经在几十次状态更新中被稀释了。

Transformer 用自注意力（self-attention）彻底替代了循环：每个 token 可以在一次计算中直接关注序列中的所有其他 token。整个序列并行处理。为了保留 token 的顺序信息——循环结构隐式处理的问题——他们加入了位置编码，即注入到输入嵌入中的正弦信号。

架构分两半：编码器处理输入序列，解码器生成输出序列。两者都是相同层的堆叠，每层包含一个多头自注意力子层和一个前馈网络。多头注意力并行运行多个注意力操作，每个使用不同的学习投影，让模型可以同时从不同的表示子空间中提取信息。

## 他们发现了什么

结果很强，训练成本很低。在 WMT 2014 英德翻译基准上，Transformer Big 模型达到 28.4 BLEU，比之前的最佳结果（包括模型集成）高出 2 个 BLEU 以上。在英法翻译上，它以 41.8 BLEU 创下新的单模型记录，训练时间是 8 块 GPU 上的 3.5 天。

3.5 天、8 块 GPU。放到今天，这个数字几乎可以忽略——GPT-4 据报道在数万块 GPU 上训练了数月。但在 2017 年，用这点资源打破翻译的最优记录，本身就证明了架构的核心优势：并行性。因为注意力同时处理所有位置，Transformer 的训练可以高效地扩展到更多硬件上，而 RNN 从根本上做不到这一点。

## 之后发生了什么

论文讲的是翻译。整个领域拿到这个架构后，朝每个方向跑了出去。

**2018：BERT 与编码器时代。** Google 的 BERT 取 Transformer 的编码器部分，用掩码语言建模在大规模文本语料上做双向预训练，证明一个预训练模型可以微调到数十种 NLP 任务上。迁移学习成为 NLP 的默认范式，为每个任务设计专用架构的时代结束了。

**2019：GPT-2 与解码器时代。** OpenAI 的 GPT-2 取 Transformer 的解码器部分，放大规模，用网页文本做自回归训练。模型能生成连贯的多段落文本、写代码、回答问题，不需要针对特定任务做微调。OpenAI 最初以滥用风险为由拒绝公开完整模型——现在回头看，这个决定相当有先见之明。

**2020：GPT-3 与缩放假说。** GPT-3 把纯解码器 Transformer 扩展到 1750 亿参数，证明许多能力——翻译、摘要、基本推理、代码生成——仅从规模中涌现，不需要特定任务的训练。这一结果加上 Kaplan 等人的缩放定律研究，让整个行业走上了激进的参数扩展之路。

**2020：Vision Transformer（ViT）。** Google 的 Dosovitskiy 等人证明 Transformer 也能用于图像。把图像切成 16x16 的 patch，每个 patch 当作一个 token，ViT 在图像分类上达到了与卷积神经网络相当的效果。这在当时是异端——卷积从 2012 年 AlexNet 以来统治视觉领域整整八年。后续工作（DeiT、Swin Transformer）不断改进，到 2022 年 Transformer 也成了视觉领域的默认架构。

**2021-2023：全面扩张。** Transformer 扩展到蛋白质结构预测（AlphaFold2）、图像生成（DALL-E、Stable Diffusion）、音频合成、机器人控制、天气预报和代码生成（Codex，后来的 GitHub Copilot）。这个架构成了深度学习的通用底层。

## 平方复杂度问题

Transformer 最优雅的地方——每个 token 关注所有其他 token——也是成本最高的地方。自注意力的计算复杂度是序列长度的 O(n^2)。1,000 个 token 意味着 100 万个注意力分数；100,000 个 token 意味着 100 亿个。

这就是早期 Transformer 模型上下文窗口被限制在 512 或 1,024 个 token 的原因。也是为什么上下文长度的扩展——从 4K 到 8K 到 32K 到 128K 到 1M——每一步都是艰难的工程成就，而不是简单的参数调整。这个问题催生了大量关于高效替代方案的研究。

**线性注意力变体**（Linformer、Performer、Longformer）通过近似注意力矩阵将复杂度降至 O(n)，用精度换速度。在某些特定应用中有价值，但尚未在前沿模型中取代标准注意力。

**状态空间模型（SSM）** 走了完全不同的路线，通过连续状态方程处理序列，而非逐对 token 比较。Gu 和 Dao 在 2023 年底提出的 Mamba 证明，选择性状态空间模型在语言建模质量上可以匹配 Transformer，同时推理时间是线性的。Mamba-2 更进一步，从数学上统一了 SSM 和注意力——严格来说，它们是同一个底层运算的不同参数化形式。

**混合架构**正在成为务实的折中方案。AI21 Labs 的 Jamba 等模型将 Transformer 层与 Mamba 层结合，在需要复杂推理和长距离检索时使用注意力，在追求效率时使用 SSM。这可能是领域最终的走向：不是"注意力就是一切"，而是"注意力是你有时需要的东西"。

## 八位作者去了哪里

关于这篇论文，有一个值得注意的事实：八位作者全部离开了 Google。Aidan Gomez 于 2019 年联合创立了 Cohere。Noam Shazeer 于 2021 年联合创立了 Character.ai（后来通过复杂的许可交易被 Google 重新收购）。Ashish Vaswani 和 Niki Parmar 联合创立了 Adept AI Labs。Jakob Uszkoreit 联合创立了 Inceptive，将 Transformer 应用于 mRNA 药物设计。Illia Polosukhin 创建了 NEAR Protocol 区块链平台。Llion Jones 在东京创立了 Sakana AI。Lukasz Kaiser 加入了 OpenAI。

这些创业公司合计融资超过 13 亿美元，至少产生了两家独角兽。Transformer 论文不只是一个技术产出，它培养了一代创始人——他们比大多数人更早理解这个架构意味着什么。

## 对从业者的启示

如果你在构建使用或依赖大语言模型的系统，Transformer 的发展轨迹有几点值得记住。

**架构不是神圣的。** 原始 Transformer 是编码器-解码器结构，今天大多数模型用的是纯解码器。位置编码方案已被 RoPE（旋转位置嵌入）取代。层归一化的位置变了，激活函数也变了。具体实现不如核心原则重要：并行的、直接的、基于内容的信息路由。

**上下文长度是工程前沿，不是已解决的问题。** 每家主要模型厂商都在竞相扩展上下文窗口，但更长的上下文意味着更高的计算成本，注意力质量在超长序列上可能下降。从业者应该做实际基准测试，不要假设 128K 上下文窗口意味着模型对所有 128K 个 token 同等关注。

**效率替代方案真实存在但尚未成熟。** 如果你的应用涉及超长序列——完整代码库、长文档、持续对话——值得关注 Mamba 和混合架构。它们在通用任务上还没达到 Transformer 的质量，但差距在缩小，对于特定负载（尤其是长上下文推理），它们已经有更好的成本效益比。

**这篇论文真正的贡献是一种设计哲学。** "Attention Is All You Need" 的持久洞察不是某个具体公式，而是一个证明：简单的、可并行的机制——统一应用、大规模部署——可以超越复杂的、手工设计的架构。这个原则比任何特定的层设计都持久。

发表七年后，Transformer 在某些方面开始显出年龄。平方复杂度是真实的限制，替代方案正在涌现。但论文做出的那个智识上的动作——简化机制、扩大算力、让数据做工——仍然是机器学习领域的主导策略。标题是一句挑衅，但它基本上是对的。至少目前如此。
