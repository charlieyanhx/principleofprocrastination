---
slug: attention-retrospective
locale: en
category: essay
title: "Attention Is All You Need, 7 Years Later"
subtitle: "What the original transformer paper got right, what it missed, and why it still matters"
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

In June 2017, eight researchers at Google published a paper with a title so clean it read like a dare. "Attention Is All You Need" proposed that you could throw away the two dominant mechanisms for processing sequences — recurrence and convolution — and replace them with a single operation: attention. The paper was about machine translation. Its consequences have touched nearly every corner of machine learning, and a growing number of fields beyond it.

Seven years later, the transformer architecture described in that paper is the backbone of GPT-4, Claude, Gemini, Llama, and virtually every large language model in production. It powers image generators like Stable Diffusion 3 and video generators like Sora. It has been applied to protein folding, drug discovery, weather forecasting, and music generation. The paper has been cited over 173,000 times, placing it among the most-cited research papers of the 21st century.

This is unusual. Most machine learning papers propose an incremental improvement on a benchmark and are forgotten within two years. This one proposed a clean architectural break and launched an era. It is worth understanding what the paper actually said, what happened next, and what its limitations tell us about where the field is heading.

## What They Did

The authors — Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan Gomez, Lukasz Kaiser, and Illia Polosukhin — were working on sequence-to-sequence models for translation. The dominant approach at the time used recurrent neural networks (RNNs), specifically LSTMs, often augmented with an attention mechanism that helped the model focus on relevant parts of the input when generating each output token.

The key insight was that the attention mechanism was doing the heavy lifting. The recurrence — which processes tokens one at a time, in order — was a bottleneck. It was sequential by nature, which made it slow to train on modern parallel hardware like GPUs. And it struggled with long-range dependencies: by the time an RNN processed the 50th word in a sentence, information about the 1st word had been diluted through dozens of state updates.

The transformer replaced recurrence entirely with self-attention: a mechanism where every token in a sequence can attend to every other token directly, in a single computation step. The model processes the entire sequence in parallel. To preserve information about token order — which recurrence handled implicitly — they added positional encodings, fixed sinusoidal signals injected into the input embeddings.

The architecture had two halves: an encoder that processes the input sequence and a decoder that generates the output. Both were stacks of identical layers, each containing a multi-head self-attention sublayer and a feed-forward network. Multi-head attention runs several attention operations in parallel, each with different learned projections, allowing the model to attend to information from different representational subspaces simultaneously.

## What They Found

The results were strong and the training costs were low. On the WMT 2014 English-to-German translation benchmark, the Transformer Big model achieved 28.4 BLEU, improving over the previous best results — including ensembles of models — by over 2 BLEU points. On English-to-French, it set a new single-model record of 41.8 BLEU after training for 3.5 days on eight GPUs.

That training cost is worth pausing on. The big model trained in 3.5 days on 8 GPUs. By 2024 standards, this is a rounding error. GPT-4 reportedly trained on tens of thousands of GPUs over months. But in 2017, 3.5 days on 8 P100s to beat the state of the art in translation was remarkable, and it demonstrated the core advantage of the architecture: parallelism. Because attention processes all positions simultaneously, transformer training scales efficiently across hardware in a way that RNNs fundamentally cannot.

## What Happened Next

The paper was about translation. The field took the architecture and ran in every direction.

**2018: BERT and the encoder era.** Google's BERT took the transformer encoder, trained it bidirectionally on massive text corpora using masked language modeling, and showed that a single pre-trained model could be fine-tuned for dozens of NLP tasks. BERT made transfer learning the default paradigm in NLP. The era of task-specific architectures was over.

**2019: GPT-2 and the decoder era.** OpenAI's GPT-2 took the transformer decoder, scaled it up, and trained it autoregressively on web text. The result was a model that could generate coherent multi-paragraph text, write code, and answer questions without explicit fine-tuning. OpenAI initially withheld the full model citing misuse concerns — a decision that now reads as prescient.

**2020: GPT-3 and the scaling hypothesis.** GPT-3 scaled the decoder-only transformer to 175 billion parameters. It demonstrated that many capabilities — translation, summarization, basic reasoning, code generation — emerge from scale alone, without task-specific training. This result, combined with the "scaling laws" research from Kaplan et al., set the industry on a path of aggressive parameter scaling that continues today.

**2020: Vision Transformer (ViT).** Dosovitskiy et al. at Google showed that transformers work for images, too. By splitting an image into 16x16 patches and treating each patch as a token, ViT achieved competitive results with convolutional neural networks on image classification. This was heresy — convolutions had dominated computer vision since AlexNet in 2012. Subsequent work (DeiT, Swin Transformer) refined the approach, and by 2022 transformers were the default architecture in vision as well.

**2021-2023: The everything era.** Transformers spread to protein structure prediction (AlphaFold2), image generation (DALL-E, Stable Diffusion), audio synthesis, robotics control, weather forecasting, and code generation (Codex, later GitHub Copilot). The architecture became the universal substrate of deep learning.

## The Quadratic Problem

The transformer's central elegance — every token attends to every other token — is also its central cost. Self-attention has O(n^2) complexity in sequence length. For a sequence of 1,000 tokens, the model computes 1 million attention scores. For 100,000 tokens, it is 10 billion.

This quadratic scaling is the reason early transformer models were limited to 512 or 1,024 tokens. It is why context window extensions — from 4K to 8K to 32K to 128K to 1M — have been hard-won engineering achievements, not trivial parameter changes. And it is the primary motivation behind a large body of research on efficient alternatives.

**Linear attention variants** (Linformer, Performer, Longformer) approximate the attention matrix to achieve O(n) complexity. They trade exact attention for speed, and have found use in specific applications, though they have not displaced standard attention in frontier models.

**State space models** (S4, Mamba) take a different approach entirely, processing sequences through continuous state equations rather than pairwise token comparisons. Mamba, introduced by Gu and Dao in late 2023, demonstrated that selective state space models can match transformer quality on language modeling while running in linear time at inference. Mamba-2 went further, showing that SSMs and attention can be unified mathematically — they are, in a precise sense, different parameterizations of the same underlying operation.

**Hybrid architectures** are emerging as a pragmatic middle ground. Models like Jamba (AI21 Labs) combine transformer layers with Mamba layers, using attention where it helps most (complex reasoning, long-range retrieval) and SSMs where efficiency matters (processing long contexts). This may be where the field settles: not "attention is all you need" but "attention is what you need some of the time."

## Where the Authors Went

One of the more striking facts about the paper is what happened to its authors. All eight left Google. Aidan Gomez co-founded Cohere in 2019. Noam Shazeer co-founded Character.ai in 2021 (later acquired back by Google in a complex licensing deal). Ashish Vaswani and Niki Parmar co-founded Adept AI Labs. Jakob Uszkoreit co-founded Inceptive, applying transformers to mRNA medicine design. Illia Polosukhin built NEAR Protocol, a blockchain platform. Llion Jones founded Sakana AI in Tokyo. Lukasz Kaiser joined OpenAI.

Collectively, these startups have raised over $1.3 billion in funding and produced at least two unicorns. The transformer paper did not just produce a technical artifact. It produced a generation of founders who understood, earlier than most, what the architecture made possible.

## What It Means for Practitioners Today

If you are building systems that use or depend on large language models, there are several things worth taking from the transformer's trajectory.

**The architecture is not sacred.** The original transformer had an encoder-decoder structure. Most models today use decoder-only. The positional encoding scheme has been replaced by RoPE (Rotary Position Embeddings). Layer normalization has moved. Activation functions have changed. The specific instantiation matters less than the core principle: parallel, direct, content-based routing of information.

**Context length is an engineering frontier, not a solved problem.** Every major model provider is racing to extend context windows, but longer context means higher compute costs, and attention quality can degrade over very long sequences. Practitioners should benchmark carefully rather than assuming that a 128K context window means the model uses all 128K tokens equally well.

**Efficiency alternatives are real but immature.** If your application involves very long sequences — full codebases, long documents, extended conversations — keep an eye on Mamba-based and hybrid architectures. They are not yet at transformer quality for general tasks, but the gap is closing, and for specific workloads (especially long-context inference), they already offer better cost-performance tradeoffs.

**The paper's real contribution was a design philosophy.** The lasting insight of "Attention Is All You Need" is not any specific equation. It is the demonstration that a simple, parallelizable mechanism — applied uniformly, at scale — can outperform complex, hand-engineered architectures. That principle has proven more durable than any particular layer design.

Seven years after publication, the transformer is showing its age in some respects. The quadratic cost is real. Alternatives are emerging. But the intellectual move the paper made — simplify the mechanism, scale the compute, let the data do the work — remains the dominant strategy in machine learning. The title was a provocation. It turned out to be, more or less, correct. At least for now.
