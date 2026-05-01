---
title: building lettuce-emb-v4, the messy version
date: 2026-05-01
excerpt: The v4 release post showed the numbers. This is the run that produced them: dataset throttling, an STS regression, a scheduler bug, and a checkpoint that almost shipped broken.
author: MegalithOfficial
avatarUrl: https://avatars.githubusercontent.com/u/74655120?v=4
categories: Engineering
cover: https://lhdgeo5fms.ufs.sh/f/m0TBUtMLsaiER1Rvh24Jx2P34yDg6iKGIpAlcoTf9etwqHkz
---

The [v4 release post](/blog/lettuce-emb-v4) is the clean story. This is the actual one.

v3 had decent generic semantics (`STS = 0.809`) and was useless at the job it was built for: roleplay memory retrieval, `recall@1 = 0.020`. v4 had to fix that without throwing the rest of the embedding space out the window. It almost did, twice.

## The plan

Same Nomic BERT 1.5 backbone as v3. Everything else different:

- Native 768d, no Dense projection
- Matryoshka dims `[64, 128, 256, 512, 768]`
- Larger batches, in-batch negatives, BGE-M3 mined hard negatives, per-epoch refresh
- Custom PyTorch loop, three-stage curriculum
- ONNX FP32 + INT8 export

The thesis: v3 did not need a bigger backbone. It needed a stronger contrastive signal.

## Dataset prep was its own boss fight

Before training, the pipeline had to produce ~285k roleplay query/passage rows with hard negatives and teacher cosine scores. Every step found a new way to break.

**License audit.** PIPPA, Augmental, MS MARCO, and wikiHow all came out for non-commercial or unclear-commercial reasons. Replacements: `google/Synthetic-Persona-Chat`, `nazlicanto/persona-based-chat`, `kmfoda/booksum`, `deepmind/narrativeqa`, and the `sentence-transformers` mirrors of HotpotQA, GooAQ, NQ, and AllNLI. All commercial-clean.

**Schema landmines.** `Synthetic-Persona-Chat`'s field is `Best Generated Conversation`, not `Conversation`. BookSum's `summary` field is a JSON blob; the clean text lives in `summary_text`. Both cost a run before the cards got read carefully enough.

**Gemma 4 26B-A4B for synthetic queries.** vLLM refused to start until we passed `limit_mm_per_prompt={'image': 0, 'video': 0}`, dropped `gpu_memory_utilization` to `0.85`, and forced `enforce_eager=True`. After that, the MoE was fast: ~3.8B active parameters, generation throughput well above what a dense model in the same memory class would do.

**The CE filter incident.** The cross-encoder filter writes a JSONL row per anchor (~285k rows). The first run wrote *3,835* rows. The script was correct. The cloud filesystem was the problem: tight-loop fsync calls were getting throttled, then the runtime disconnected before the rest landed. Fix: accumulate every row in RAM, write once at the end, force a remount. Same fix for teacher scoring. After that, all 285,563 rows persisted in a single shot.

**torchcodec.** A fresh `sentence-transformers` install pulls a torchcodec/FFmpeg combo that is broken in the standard cloud Python image. Permanent fix: `pip uninstall -y torchcodec` baked into cell 4 of the prep notebook. Nothing in our pipeline needs it.

By the time the dataset was ready, half the work was already done. The training loop was almost an anticlimax. Almost.

## Training started great

Initial eval, before stage 1 even finished:

```text
recall@1   0.562
recall@5   0.769
STS        0.842
```

Stage 1 pushed `recall@1` past `0.90`. Stage 2, with hard negatives, peaked around:

```text
recall@1   0.934
recall@5   ~0.98
```

That alone was already a 46x improvement over v3 on the headline metric. The thesis held: stronger contrastive signal, same backbone, completely different model.

Then STS collapsed.

## The STS regression

After the first hard-negative refresh in stage 2, STSBenchmark fell from `0.842` to roughly `0.75 to 0.77`. The model was learning to separate near-identical roleplay passages so aggressively that general semantic similarity was getting bulldozed in the process.

Diagnoses, in order of how stupid they were:

- **The scheduler had been wrong from the start.** Total steps were estimated from stage 1's loader length, but stages 2 and 3 had far more batches. LR decayed close to zero too early, then started rising again. Training kept learning, but the run was noisy and harder to interpret.
- **RP hard negatives were dominating the loss.** MNR was forcing apart passages that, semantically, really were similar. The objective worked, just too well, in too narrow a sense.
- **No semantic anchor.** Nothing in stage 2 was telling the model "general sentence similarity still matters."
- **Isotropy logging was lying.** Real value was around `1e-7`, but the formatter showed `0.000`. Easy to dismiss as fine when it was telling us the embedding space was collapsing.

Fixing this without restarting the run took two changes.

## Two-track checkpointing

The original gate only saved when `recall` improved *and* STS stayed near baseline. That protected release quality but threw away every interesting RP-specialized intermediate state. We split the checkpoint stream:

- `best_recall`: best RP retrieval, no STS gate. Useful for analysis.
- `best_release`: best RP retrieval *that still passes the STS release floor*. This is what ships.

This was the right design from the start. We just had not built it.

## Semantic replay

To pull STS back without restarting, we added STSBenchmark train + val as a live replay loss inside stages 2 and 3. Each step now mixed a small STS batch in alongside the contrastive loss. Stage 3 was reweighted to lean harder on it:

```python
'loss_weights': {
    'mnr': 0.25,
    'cosine': 0.35,
    'margin_mse': 0.10,
    'semantic_replay': 0.75,
}
```

The recovery was fast:

```text
step 34400  recall@1=0.924  recall@5=0.982  STS=0.819
step 34600  recall@1=0.915  recall@5=0.980  STS=0.825
step 34800  recall@1=0.906  recall@5=0.970  STS=0.826
step 35400  recall@1=0.911  recall@5=0.976  STS=0.839
step 36600  recall@1=0.892  recall@5=0.971  STS=0.845
```

STS climbed from the mid-`0.7`s back above `0.81` in a few hundred steps. The run was salvageable.

## Knowing when to stop

We let stage 3 keep going. STS kept climbing or holding. RP recall started bleeding:

```text
step 38000  recall@1=0.902  STS=0.837
step 38200  recall@1=0.891  STS=0.829
step 38400  recall@1=0.862  STS=0.817
step 38600  recall@1=0.837  STS=0.831
```

The model was not dead, it had just moved past the useful balance point. Semantic replay had done its job, then continued training started pulling too hard the other way.

The release checkpoint is `step 34400`, not the final one:

```text
recall@1_768d   0.924
recall@5_768d   0.982
STS_768d        0.819
isotropy_768d   1.614e-07
```

The best `best_release` was earlier than the last `best_release`. That is why we track both streams.

## The export trap

Loading the chosen checkpoint with `AutoModel.from_pretrained(best_release)` looked like it worked. The eval said otherwise:

```text
recall@1 = 0.367
STS      = 0.503
```

That is "the model is half-loaded" numbers. The warning had been right there:

```text
missing_keys     = encoder.layers...
unexpected_keys  = encoder.encoder.layers...
```

A double-prefix mismatch from how the custom `LettuceEmbedder` wraps the Nomic backbone. Fix: load the base architecture from the original model name, then load `best_release/model.safetensors` manually with `encoder.encoder.` -> `encoder.` remapping, then *assert* `missing=0` and `unexpected=0`, then re-eval, then export.

Correct final log:

```text
Loaded remapped weights: missing=0, unexpected=0
recall@1_768d=0.924  recall@5_768d=0.982  STS=0.819  isotropy=1.614e-07
FP32 -> final/onnx/model.fp32.onnx  (547.7 MB)
INT8 -> final/onnx/model.int8.onnx  (138.0 MB)
```

If the export script had trusted the folder load, we would have shipped a model with `recall@1 = 0.367` and never noticed until users complained. The lesson is short: always eval again *after* loading the artifact you are about to publish.

## Lessons

1. Hard negatives fixed v3. `recall@1` went from `0.020` to `0.924` because the contrastive signal got teeth. Backbone size was never the issue.
2. Hard negatives over-specialize without an anchor. Semantic replay is the cheapest anchor that works.
3. Release checkpoint is not final checkpoint. The best release tradeoff usually happens before the run ends, not at it.
4. Track both streams. `best_recall` answers research questions, `best_release` is what users get.
5. Filesystems lie under load. If a tight loop writes a row at a time and the host is a network mount, accumulate in RAM and flush once.
6. Eval after every load. Key-prefix mismatches are silent until the numbers look insane.
7. Logging precision matters. `0.000` and `1e-7` are not the same problem.

## Closing

The release post says v4 hits `0.924 recall@1` at `0.819 STS`. That is true. It does not mention that the run produced an over-specialized model, nearly hit the wrong scheduler curve, almost shipped a broken export, and was rescued by a loss term we added partway through.

That is also true. Both stories matter. The release post is for the people who will use the model. This one is for the people who will train the next one.

v4-pro is up next. We already know the first thing it has to do differently.
