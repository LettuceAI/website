---
title: LettuceAI vs SillyTavern
date: 2026-07-27
excerpt: Both are free, open source, and bring-your-own-key. One is a frontend you assemble a stack around; the other ships the stack. Here is what each actually gives you, including where SillyTavern still wins.
author: MegalithOfficial
avatarUrl: https://avatars.githubusercontent.com/u/74655120?v=4
categories: Comparisons, Guides
cover: https://lhdgeo5fms.ufs.sh/f/m0TBUtMLsaiEw5lyLGtDT1fNYAwp7IFKOU5ybPd69szSVikR
featured: false
---

SillyTavern is the reason a lot of us are here. It has been the backbone of local roleplay for years and it earned that position.

This post is for people choosing between the two, and for SillyTavern users who want the same thing on a phone without carrying a Node server around. Both projects are free, open source, and bring-your-own-key. Neither locks features behind a paywall.

## The actual difference

SillyTavern is an interface you point at a stack you assemble. LettuceAI ships the stack.

That's not editorial, it's their design. SillyTavern's docs say so directly:

> Since SillyTavern is only an interface, you will need access to an LLM backend to provide inference.

That architecture is a real strength. It's why SillyTavern works with practically every inference engine ever written and survived every shift in the local model landscape without rewriting itself.

The cost is that everything else is also something you assemble. Local inference is a separate backend. Embeddings for memory need a provider. Speech recognition is an extension pointed at a browser API or a second server. Character creation is you, typing into fields.

LettuceAI ships all of that working.

Here's the part we'd push back on, because it's the assumption this whole comparison usually gets buried under: **easier to run does not mean less capable.** The two get treated as the same axis and they aren't.

Go down the tables below and count. On local models we go further than SillyTavern can, because it doesn't manage models at all. On memory we ship a purpose-trained embedder where they ship a socket for a general one. On character creation we have the same manual editor they do, plus an agent when you'd rather not start from a blank sheet. Voice, images, lorebooks, branching, personas, group chats, provider coverage: matched or ahead.

SillyTavern's real advantages are ecosystem and maturity, not capability. Extensions, a decade of community knowledge, and the ability to restyle it with raw CSS. Those are worth a lot and they get [their own section](#where-sillytavern-is-genuinely-better).

But the trade isn't power for simplicity. It's assembly for no assembly.

## Side by side

Both do most of this. The interesting column is usually *how much you assemble to get it*.

### Getting started

| | LettuceAI | SillyTavern |
| --- | --- | --- |
| Install | Installer or APK | Node 20+, clone, run a server |
| Android | APK, one sideload toggle | Termux, roughly 12 to 15 commands |
| Platforms | Native apps on Android, Windows, macOS and Linux | Runs where Node runs, reached from a browser |
| Needs a machine left running | No | Yes, the host serves every other device |
| Works with no network | Yes, with a local model | Only if the host is on the same network |
| Updating | Download and install | Pull and reinstall dependencies |
| Price | Free, bring your own key | Free, bring your own key |

### Running models locally

| | LettuceAI | SillyTavern |
| --- | --- | --- |
| Inference | llama.cpp built in | A separate backend you choose and run |
| Will this model run? | Scored against your hardware before you download | You work it out yourself |
| Offload planning | Automatic, four strategies, MoE aware | Backend flags, set by hand |
| Tuning | Flash Attention, KV cache type, threads, MTP, sampler profiles | Whatever your backend exposes |
| Multi-GPU | Tensor split, per-device override, KV placement | Your backend's own flags |
| Remote machine | Sprout probes its real GPU and memory | Not applicable |
| Backend reach | 20+ providers, plus custom OpenAI-format and Anthropic-format endpoints with configurable path and auth | Practically any inference server, including bespoke APIs like AI Horde and NovelAI |

### Characters and world

| | LettuceAI | SillyTavern |
| --- | --- | --- |
| Creating a character | Manual editor, plus an optional agent that drafts from a description | Manual field editing |
| Avatar images | Generated and edited inside the creation flow | `/sd you` and `/sd face`, into the gallery, needs a connected image source |
| World data | Lorebooks and Unified Setting Cards | WorldInfo and Data Bank |
| Openers | Chat templates with their own scene, prompt and lorebook overrides | Greetings and alternate greetings |
| Branching | Conversation tree view | Swipes, branches and checkpoints |
| Group chats | Weighted speaker selection, per-character memory | Four reply strategies, talkativeness, muting, shared history |
| Companion mode | Persistent persona with relationship state that shifts over time | Not built in |

### Memory

| | LettuceAI | SillyTavern |
| --- | --- | --- |
| Retrieval | Embedding search, on device | Vector Storage, via Vectra |
| Embedding model | `lettuce-emb-768d-v4`, trained for roleplay, bundled | You supply a provider, defaults to `jina-embeddings-v2-base-en` |
| Management | Hot and cold tiers, decay under budget, promotion on retrieval | Vectorised chat plus Data Bank |
| Summarising | Built in, with an editable context summary | Summarize extension |
| Control | Ask First approval before anything is remembered | Not applicable |

### Voice, images and devices

| | LettuceAI | SillyTavern |
| --- | --- | --- |
| Speech to text | Whisper on device, custom vocabulary, correction rules | Extension, using the browser API or an Extras server |
| Text to speech | ElevenLabs, Gemini, OpenAI-compatible, local Kokoro with voice blending | ElevenLabs, Silero, system, AllTalk, XTTS |
| Image generation | sd.cpp built in, plus ComfyUI, A1111, Stability, Gemini, CivitAI | Extension driving local SD and FLUX or a cloud provider |
| Multiple devices | Encrypted direct sync, no account, no cloud | One server, every device reaches the same instance |

### Running it day to day

| | LettuceAI | SillyTavern |
| --- | --- | --- |
| Usage and cost | Per-request token and cost breakdown, CSV export | Not built in |
| In-chat tools | Widget panel per character, stat trackers, dice, scratch pad | Extensions |
| Backup | Built-in backup and restore | Copy your data folder |
| Serving other apps | OpenAI-compatible Host API | Frontend only |
| Extensions | None | Large third-party ecosystem |

Maturity, community size and restyling the interface are the other axis, and SillyTavern leads all three. That has [its own section](#where-sillytavern-is-genuinely-better) rather than a table row, because the honest version needs more than a cell.

## What LettuceAI gives you that SillyTavern doesn't

### It works out whether a model will run before you download it

This is the one we'd point at first, and it's the clearest consequence of shipping the stack instead of pointing at one.

Open the model browser, look at a model, and the app tells you whether your machine can run it. If it can, you click download and start chatting. No VRAM arithmetic, no working out how many layers to offload, no discovering after a 20GB download that it won't fit.

Underneath, that badge is a weighted score across GPU acceleration, KV cache headroom and quantization quality, mapped to a fitness label. It understands mixture-of-experts models and scores them on active weight ratio rather than total parameters, which is where naive size checks get MoE badly wrong. It then picks an actual plan: full GPU, partial layer offload, mostly GPU with spill, or model in RAM with context on the GPU.

If you run Ollama on a different machine, [Sprout](/docs/sprout) is a small service you put on that box so the scoring runs against its real GPU and memory instead of the device in your hand.

Then, if you want the controls, they're all there: CPU thread count, Flash Attention, KV cache type, sampler profiles, chat template override with Jinja support, multi-token prediction for speculative decoding, reasoning tag handling, and automatic memory fallback when a load doesn't fit. Multi-GPU gets tensor split across cards, per-device overrides and KV placement.

SillyTavern doesn't have an equivalent, and that isn't a criticism. It doesn't manage models, so there's nothing for it to calculate. That work moves to you, in KoboldCpp or llama.cpp or oobabooga, with their flags and your own estimate of what fits.

Defaults that are calculated for you, with every knob still reachable. That's the design.

### Write the character yourself, or have it drafted

Both apps have a full manual editor, and if you like writing characters by hand, ours stays out of your way. Name, avatar, chat background, description and behaviour, prompt template overrides, and as many opening scenes as you want with one marked as the default. Everything stays editable afterwards, and characters import and export as Unified Entity Cards.

That's the baseline, and it matches what SillyTavern gives you. Their docs are explicit that "Character Name is the only required field" and the rest is yours to write: description, personality, scenario, first message, example dialogue.

What's different is what sits beside it, optionally.

LettuceAI also has an agent. Describe what you want and it works in a loop across up to eight turns using around 25 tools: writing the definition, drafting opening scenes, creating lorebook entries, setting the model and prompt template, attaching lorebooks, and generating or editing the avatar image. It shows a preview and asks for confirmation before it commits anything, and you can drop into the manual editor at any point and take over.

It builds personas and lorebooks the same way. If the model you've pointed it at can't do tool calling, it falls back to structured output instead of failing.

SillyTavern has community tools for this, but nothing ships in the box. And the point isn't automation instead of control. It's that a blank character sheet is the worst part of starting something new, and you can skip it on the days you want to.

### Memory built for roleplay specifically

Both apps do embedding-based long-term memory, so let's be precise about the difference.

SillyTavern's Vector Storage handles this through the Vectra library, storing embeddings as JSON in your user data folder. It doesn't produce vectors itself, so you supply an embedding provider. Run it locally and it uses your Node server and pulls an ONNX model from HuggingFace, defaulting to `jina-embeddings-v2-base-en`, a strong general-purpose English embedder.

There's a tell here, and it's worth stating carefully rather than as a cheap shot. Memory is the one part of SillyTavern that has spawned a whole replacement industry. [Qvink Memory](https://rpfiend.com/sillytavern-message-summarize-extension/), [LoreVault](https://github.com/HelpfulToolsCompany/lorevault-extension), [VectFox](https://github.com/KritBlade/VectFox), [character-memory](https://github.com/bal-spec/sillytavern-character-memory) and others all exist to do a job the app already ships. Nobody writes four competing extensions for a feature that's working.

That the ecosystem can fix it is genuinely a strength, and it's why extensions are on SillyTavern's side of this comparison. But it's worth noticing what you're signing up for. Some of those replacements are hosted services: LoreVault is memory-as-a-service with free and pro tiers, which means your roleplay history goes to somebody's server to be summarised and stored. If you picked a local-first setup on purpose, the popular fix for its memory quietly undoes that.

And the underlying reason it needs fixing is the crux: general-purpose. When we tested general embedders on roleplay retrieval, they fell over. Recall@1 of 0.02, which is barely better than picking a random line from the chat. So we trained our own.

[`lettuce-emb-768d-v4`](https://huggingface.co/Zeolit/lettuce-emb-768d-v4) is roleplay-first, 768d native, with Matryoshka dimensions from 64 up to 768 so it can scale to the device it's running on. It scores 0.924 recall@1 on the same evaluation. It's Apache 2.0 on HuggingFace, and the [full writeup](/blog/lettuce-emb-v4) has the benchmarks and the [messy version](/blog/lettuce-emb-v4-behind) has the training run that produced them.

To be fair about it: we benchmarked against our own previous general-purpose model, not against `jina-embeddings-v2-base-en` specifically, so treat this as a difference in what the models were built for rather than a head-to-head score.

On top of retrieval, LettuceAI manages memory rather than just storing it. Entries live in hot and cold tiers, cold ones return to hot when retrieved, unused memories decay under a budget, and companion mode makes retrieval time-aware. There's an Ask First mode if you'd rather approve what gets remembered, and the context summary is editable.

### Voice that runs on your device

SillyTavern's speech recognition is an installable extension that converts speech using the browser API or the Extras server.

LettuceAI runs Whisper locally, and around it there's a vocabulary system: terms tagged by language and category, wrong-to-correct rewrite rules, learning from the edits you make, and saved voice samples so you can check a tricky phrase still transcribes correctly. Nothing is uploaded.

For output, both have solid options. SillyTavern covers ElevenLabs, Silero, system TTS, AllTalk and XTTS. LettuceAI covers ElevenLabs, Gemini TTS, any OpenAI-compatible endpoint, and local Kokoro, with a blend editor for mixing voices into one.

### It installs, and it updates

On desktop the gap is modest. Node 20+, clone, start script, plus a backend, against an installer. Ten minutes versus two, and less if you were installing a backend regardless.

On Android it isn't close.

SillyTavern's official Android route is Termux: roughly 12 to 15 commands. You install Termux first, and specifically not from the Play Store, since their docs warn that build is unmaintained, so you're sideloading from F-Droid or GitHub before you start. Then git, Node LTS and nano, then clone, then run. Their docs flag 32-bit Android problems and note the community guides they link "are not maintained by the SillyTavern team."

It works and plenty of people do it. But it's a terminal workflow on a phone, and updating means going back to it.

LettuceAI on Android is an APK. You still allow installs from outside the Play Store, since we're not on it, but that's one toggle rather than a package manager. Updates are a download.

### Other things that ship in the box

Encrypted sync of chats, characters and memories directly between your devices with no account and no cloud. Image generation with sd.cpp built in alongside ComfyUI, A1111, Stability, Gemini and CivitAI. Companion mode, a persistent persona with relationship state that shifts over time. Chat widgets, a per-character side panel with stat trackers, dice and a scratch pad. Conversation branching as a tree. Chat templates with their own opening messages, scene and lorebook overrides. Group chats where each character keeps independent memory.

## Customization: two different bets

Worth separating honestly, because both do this well and they do it differently.

SillyTavern hands you a stylesheet. There's a custom CSS editor, theme files you can save and share, and the whole interface is built on CSS custom properties in `:root` that your CSS can override. MovingUI lets you drag panels around on desktop, and there's Visual Novel mode with character sprites. If you know CSS, the ceiling is basically the browser's, and the community has built themes and snippet extensions on top of it.

LettuceAI takes the other route: deep customization that doesn't need code. Per-character chat appearance, a full colour system with separate user and assistant colours, several title bar designs on desktop with adjustable position and sizing, switchable navigation styles, sound feedback and haptics, and chat widgets you compose per character. It's structured rather than open-ended, so you're picking and tuning rather than writing selectors.

The trade is real in both directions. SillyTavern's ceiling is higher and it costs you CSS. Ours is reachable by everyone and stops where the settings stop. If you've written a custom theme you love, that's a genuine reason to stay.

## Where SillyTavern is genuinely better

Most comparison posts pad this part out to look even-handed. These are the reasons we would actually tell you to stay.

**Extensions.** SillyTavern has a large third-party ecosystem. We have none, and no plugin API to port anything to. If your setup leans on a community extension, nothing here replaces it and no amount of built-in features makes up for the specific one you rely on. This is the single best reason not to switch.

**Maturity, and the people around it.** 31.2k stars, 5.9k forks, over 300 contributors, and years of iteration. LettuceAI has been out since August 2025. That difference shows up in the edge cases nobody anticipates, in how deep the documentation goes, and in whether there's someone awake who has hit your exact problem before. We can close a feature gap in a release. We can't close that one quickly.

**Group chat direction.** Genuinely more configurable than ours. Four reply-order strategies, a Natural Order weighing name mentions against a per-character talkativeness value, Force Talk to override it, per-character muting, and a choice of whether every character card enters context or only the active speaker's.

**Restyling the interface.** A custom CSS editor on top of themeable CSS variables, plus theme files you can save and share. You can rebuild how the app looks. Ours is a deep set of structured settings, and settings have edges where a stylesheet doesn't.

**Bespoke backends.** Narrower than it looks, since our custom OpenAI-format and Anthropic-format providers take any base URL, path and auth scheme, which covers most self-hosted servers. But SillyTavern natively speaks APIs that aren't OpenAI-shaped at all, including AI Horde, NovelAI and KoboldAI's own protocol. If you use one of those, it's the tool for the job.

**One install, reachable from everything.** Host it once and any browser on your network gets in, including devices we don't ship builds for. The trade is that the host machine has to be running for any of it to work, but if you already keep a desktop on, that's free.

## You can run both

LettuceAI can start an OpenAI-compatible server on your network. Settings, Advanced, Host API. It exposes `/v1/models` and `/v1/chat/completions` with streaming, behind a bearer token.

Any client speaking the OpenAI API can point at it, so you can run LettuceAI's model management and memory on a desktop and drive it from whatever frontend you like, or use the app on your phone against a machine doing the heavy lifting.

We haven't formally tested every third-party client, so treat a specific setup as something to try rather than a promise. The endpoint is standard and it's there.

## Picking

**Use LettuceAI if** you want the depth without building it yourself. Local models with the hardware maths already done, memory trained for roleplay working on first launch, an agent that drafts characters, and the lorebooks, personas, branching, group chats and provider coverage you already expect. Then the same thing in your pocket, which is the part nobody else does properly.

**Use SillyTavern if** you depend on a community extension, you run a bespoke backend like AI Horde or NovelAI, you've built a CSS theme you love, or you want one install every device on your network can reach. Their docs describe the audience as power users and savvy AI hobbyists who embrace a steep learning curve. That's an honest self-description, and worth reading as a description of the price rather than of the ceiling.

**Use both if** you want a real backend on your desktop and a real app in your pocket.

---

*Verified against SillyTavern's official documentation and repository on 27 July 2026: 31.2k stars, Node 20+, the Termux install guide, Vector Storage with Vectra and its default embedding model, the group chat reply strategies, the character design docs, and the UI customization docs covering custom CSS and theme files. Checked against LettuceAI 2.1.1. Both projects move fast. If anything here is out of date or wrong, [open an issue](https://github.com/LettuceAI/mobile-app/issues) and we'll fix the post.*
