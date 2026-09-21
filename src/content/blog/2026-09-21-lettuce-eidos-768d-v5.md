---
title: Lettuce Eidos, multilingual memory for LettuceAI
date: 2026-09-21
excerpt: The new embedding model behind LettuceAI's memory. 15 languages, 72.5% first-result accuracy on a 144k-passage history, and half the per-token compute of v4.
author: MegalithOfficial
avatarUrl: https://avatars.githubusercontent.com/u/74655120?v=4
categories: Announcements, Notes
cover: https://lhdgeo5fms.ufs.sh/f/m0TBUtMLsaiE2uTCOV0CPqXAWsoHbY7GZ0FzOUpuygEvIwme
featured: true
titleFont: grotesk
heroStyle: full
---

`lettuce-eidos-768d-v5` is the new embedding model behind LettuceAI's memory. It converts each message into a 768-dimensional vector so the app can retrieve the parts of a conversation that matter to the next reply. It supports 15 languages, runs entirely on device, and is released at [`Zeolit/lettuce-eidos-768d-v5`](https://huggingface.co/Zeolit/lettuce-eidos-768d-v5) under Apache 2.0.

It succeeds `lettuce-emb-768d-v4`. v4 made roleplay memory reliable in English. v5 extends that to 14 more languages and holds its accuracy as a conversation history grows into the hundreds of thousands of passages.

*Eidos* (εἶδος) is the Greek word for form: the shape of a thing that remains recognisable however it is described.

## At a glance

| Metric | Eidos v5 | v4 | bekko-a25m |
| ------ | -------- | -- | ---------- |
| First-result accuracy, 144k-passage history | **0.725** | 0.513 | 0.535 |
| Top-five accuracy, 144k-passage history | **0.903** | 0.769 | 0.763 |
| First-result accuracy, 500-passage history | **0.926** | 0.902 | 0.916 |
| Multilingual chat memory, 15 languages | **0.232** | 0.025 | 0.095 |
| 144k history with 64-dimensional vectors | **0.661** | 0.425 | 0.407 |
| Active parameters per token | 60M | 113M | 25M |
| Languages | **15** | 1 | |

All scores are recall: the share of queries for which the correct memory is returned first (or within the top five, where stated). `hotchpotch/bekko-embedding-v1-a25m` is included as the strongest compact multilingual embedder we evaluated.

![Eidos v5 and v4 compared on small and large histories, across languages, and across vector sizes](https://lhdgeo5fms.ufs.sh/f/m0TBUtMLsaiETOkRdt1vLgnoyBUP4fh5Ym03jIwd2HkAqcaZ)

On a small history the two models perform similarly. The difference appears where memory is hardest: large histories full of similar passages, and conversations that are not in English.

## Role in the app

On every turn, LettuceAI embeds the user's message together with the character's previous reply and searches the conversation's stored memories. The closest matches are added to the prompt before the reply is generated, and anything below a similarity threshold is discarded.

This places specific requirements on the model:

- **Separating near-duplicates.** A roleplay history consists of thousands of passages about the same characters, places and events. The model must distinguish between closely related scenes, not merely between related and unrelated text.
- **Language coverage.** v4 was trained on English. On our multilingual test it returned the correct memory first for 2.5% of queries.
- **On-device cost.** The model runs on every turn, on the user's device, before generation begins.

All embedding, storage and retrieval remain local. Only the final prompt is sent to the user's model provider.

## Retrieval at scale

The primary benchmark uses 5,000 queries against a haystack of 144,000 passages, comparable to the history a long-term user accumulates.

![First-result and top-five accuracy on the 144k-passage history](https://lhdgeo5fms.ufs.sh/f/m0TBUtMLsaiEmFyCXJMLsaiE1GPrgcTIvH6l03y9FhketVp2)

v5 returns the correct memory first for 72.5% of queries, compared with 51.3% for v4 and 53.5% for bekko. The correct memory appears in the top five for 90.3%.

Most of the improvement comes from roleplay queries, where the opening of a scene must retrieve its continuation from among many similar scenes. On that subset, accuracy rises from 0.245 with v4 to 0.866 with v5.

v5 also outperforms `granite-embedding-311m-multilingual-r2`, the model it was derived from, which scores 0.460. Granite is a strong general-purpose retriever but was not trained on roleplay.

This benchmark is built from our persona corpus, which both v4 and v5 were trained on. Test passages were excluded from v5's training pairs, but the evaluation is in-distribution: it reflects performance on the kind of text LettuceAI stores.

## Multilingual memory

A second benchmark evaluates chat-memory retrieval with queries and memories in 15 languages. It is drawn from held-out scenarios of our own roleplay dataset, described under [Training](#training). It is considerably harder than the English benchmark, and absolute scores are lower for every model.

![Multilingual chat-memory accuracy by language](https://lhdgeo5fms.ufs.sh/f/m0TBUtMLsaiEdqmUOMpPCcV0eNMqHE2pOGjTY185FLrRZvst)

v5 leads in all 15 languages, from 0.171 in Polish to 0.301 in Korean, with an average of 0.232. v4 averages 0.025 and bekko 0.095.

## Efficiency

On-device cost is determined by the computation performed per token rather than by total parameter count.

![Accuracy on the 144k history against active parameters per token](https://lhdgeo5fms.ufs.sh/f/m0TBUtMLsaiEKwxt4CjUThaiVjQ5lFnW8C6uS7RMmf4pPb9t)

Of v5's 262M parameters, 201M form the multilingual vocabulary table, which is a lookup rather than a computation. The transformer itself has 60M parameters, roughly half of v4's 113M.

v5 is also trained with Matryoshka representation learning, which concentrates the most useful information in the leading dimensions of each vector. Applications can store shorter vectors with little loss in accuracy.

![Accuracy on the 144k history across vector sizes](https://lhdgeo5fms.ufs.sh/f/m0TBUtMLsaiEI0dt0cH5ZchmM4LX9xYKk8DP0ard7TuUASve)

| Dimensions | Bytes per memory | v5 | v4 |
| ---------- | ---------------- | -- | -- |
| 64  | 256   | **0.661** | 0.425 |
| 128 | 512   | **0.709** | 0.487 |
| 256 | 1,024 | **0.717** | 0.504 |
| 384 | 1,536 | **0.724** | |
| 512 | 2,048 | **0.724** | 0.509 |
| 768 | 3,072 | **0.725** | 0.513 |

At 64 dimensions, v5 outperforms v4 at its full 768. Above 256 dimensions the gains are marginal.

## Training

### Architecture

v5 is derived from `ibm-granite/granite-embedding-311m-multilingual-r2`, a multilingual ModernBERT encoder released under Apache 2.0. We reduced it from 22 to 12 layers by removing one layer at a time, each time selecting the layer whose removal changed the model's output least, while preserving the global-attention layers required for long context.

![Similarity to the full model as layers are removed](https://lhdgeo5fms.ufs.sh/f/m0TBUtMLsaiELFIt4Qum4E1s7fKcbIrtgJlMzOkUhDv6GqQX)

Before training, the 12-layer model already produced embeddings with a cosine similarity of 0.936 to the full model's.

### Distillation

During training, the full 22-layer model serves as a teacher, and the pruned model learns to reproduce its embeddings alongside a contrastive retrieval objective. On roleplay data the distillation weight is reduced, allowing the model to learn retrieval behaviour the teacher does not have.

### General data

The general training set contains 11.06 million pairs from 18 sources, each licensed under CC-BY, CC-BY-SA, Apache 2.0 or MIT. Datasets with non-commercial or no-derivatives terms, unlicensed web scrapes, and outputs of models whose terms restrict training were excluded.

Each query is paired with hard negatives: passages the teacher ranks as similar to the correct answer. Candidates that are likely to be correct answers themselves are filtered out before training.

### Our roleplay dataset

No public dataset reflects how LettuceAI actually queries memory, so we built one. It has two parts.

**Generated chat memory, 15 languages.** Using `google/gemma-4-26B-A4B-it`, we generated 10,000 scenarios per language, 150,000 in total. Each scenario is assembled from independent axes (the relationship between two characters, what is at stake between them, the kind of memory, the voice, and a roleplay or everyday setting), so no two prompts are alike. For each scenario the model writes:

- two memories about the **same two characters** describing **different events**, so each memory serves as the other's hard negative;
- for each memory, a direct recall question;
- for each memory, a context-enriched query in the exact shape the app sends: the character's previous message followed by the user's message.

30% of non-English scenarios are cross-lingual, with the query in the user's language and the memory in English, reflecting mixed-language chats. Every output is validated automatically for structure, length and script, and rejected if it is written in the wrong language or if the question simply copies the memory's wording.

**Persona dialogues, English.** 60,000 pairs cut from the persona conversations used to train v4, without any model involvement: the opening of a passage paired with the full passage, and passages with two consecutive turns removed paired with the rest. Every passage that appears as an answer in our benchmark was excluded.

Together these produce roughly 580,000 roleplay training pairs, mixed into every stage of training at 20–30% of steps. 5% of generated scenarios were held out as complete units and form the multilingual benchmark above; none of their memories or queries were seen in training.

### Release

The released model is quantized to 8-bit integers, reducing it from 1,046 MB to 262 MB with a 1.4-point reduction in first-result accuracy.

## Score calibration

Like its base model, v5 assigns relatively high cosine similarity even to unrelated text, with a median around 0.65. Ranking is unaffected, but thresholds and match percentages tuned for v4 do not transfer directly.

We calibrated v5 on 25,364 held-out multilingual queries in the shape the app sends. LettuceAI maps each raw score linearly so that a typical unrelated memory displays at 20% and the default threshold sits at 50%. At that threshold, 2% of unrelated memories pass and 92.5% of correct memories are kept; at the fallback threshold, 99% are kept.

The per-dimension mapping is published as `calibration.json` in the model repository.

## Specifications

| | |
| --- | --- |
| Base model | `ibm-granite/granite-embedding-311m-multilingual-r2` |
| Architecture | ModernBERT, 12 layers, 768 hidden, CLS pooling |
| Parameters | 262M total, 60M active per token |
| Output | 768 dimensions, Matryoshka 512 / 384 / 256 / 128 / 64 |
| Languages | ar, de, en, es, fr, hi, it, ja, ko, nl, pl, pt, ru, tr, zh |
| Context length | 4,096 tokens |
| ONNX INT8 | 262 MB |
| License | Apache 2.0 |
| Model card | [`Zeolit/lettuce-eidos-768d-v5`](https://huggingface.co/Zeolit/lettuce-eidos-768d-v5) |
