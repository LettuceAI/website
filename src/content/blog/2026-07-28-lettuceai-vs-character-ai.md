---
title: LettuceAI vs Character.AI
date: 2026-07-28
excerpt: On a hosted service you are a tenant. Bring your own key and you are the owner. Here is what that trade actually costs and what it gets you, including the parts of Character.AI you will miss.
author: MegalithOfficial
avatarUrl: https://avatars.githubusercontent.com/u/74655120?v=4
categories: Comparisons, Guides
cover: https://lhdgeo5fms.ufs.sh/f/m0TBUtMLsaiE0Ygfomyk6DfZnzYUrwN8u5WjlCsBoTG7H4ei
featured: false
---

Character.AI is where most people meet this whole idea. It's free, you sign up and you're talking to someone within a minute, and there are more characters than you could work through in a lifetime. For a lot of people it's the reason they know AI roleplay is a thing at all.

So this post isn't a takedown. It's an honest account of what actually changes if you move, written by people who make one of the alternatives, which you should factor in when reading it.

## The difference everything else comes from

Character.AI is a hosted service. LettuceAI runs on your device.

That's the whole thing, and almost every practical difference falls out of it.

On a hosted service, your conversations travel to the operator's servers, run on models they chose and tuned, under terms they set. That arrangement is why it's free, why setup is instant, and why it works identically on every device you log into. Those are real benefits and they're not accidental.

LettuceAI inverts it. Your chats, characters and memories sit in storage on your own device. Replies come from a provider you connect with your own API key, or from a model running locally on your hardware. There's no account, and no server of ours in the middle.

Here's the way we'd put it, and you can weigh it knowing who's writing.

On a hosted service you're a tenant. It's a comfortable tenancy, furnished and free, and somebody else handles the maintenance. But the model you talk to, the rules it follows, the features you're allowed, the price, and whether any of it exists next year are all decisions made by someone whose interests are not required to match yours. You'll find out what changed when you open the app one morning and something is different.

On your own device you're the owner. Nobody can revise your terms, gate a feature behind a tier, retire the model you'd grown attached to, or read a word of it. The cost of that is you do the setup once, and you pay a provider directly instead of a subscription.

That's the actual choice. Not features, arrangement.

## What actually changes

**You choose the model, and you can change it.** On a hosted service you get the model the operator provides. In LettuceAI you point at whichever provider you like, over 20 of them, or run a model locally. If a model stops suiting you, swap it. Your characters and chat history stay where they are.

**You pay for what you use, and only that.** Hosted services generally run on subscriptions or free tiers with limits. LettuceAI is free and has no paid tier, but you bring your own API key, so you pay a provider directly for the tokens you use. Depending on how much you chat, that can be cheaper or more expensive than a flat subscription. Free options exist too: Google's AI Studio has a free tier that needs no card, and a local model on your own hardware costs nothing per message.

**Content rules come from wherever you point it.** Any hosted service decides what its models will and won't do, and can revise that at any time. That's an unavoidable property of the arrangement, not a criticism of any particular operator. With bring-your-own-key, the rules come from whichever provider you chose, and if you run a model locally on your own machine, from nobody.

**It works when the service doesn't.** No outages, no maintenance windows, no sunsetting. With a local model, no internet either.

**Your data stays put.** Chats, characters, memories and keys live in local storage on your device. We have no servers to hold them on, no account to attach them to, and no way to see them. Moving between your own devices happens over an encrypted direct connection between the two, not through us.

**Nothing changes underneath you.** The version you have keeps working the way it works. Open source, so if we did something you disliked, the code is there and the fork is yours.

## What bring-your-own-key actually gets you

The phrase sounds like homework. It's the opposite: it's the part that changes what you're capable of.

**You get the frontier.** Not one model picked for you and tuned to run cheaply at scale, but Claude, GPT, Gemini, DeepSeek, Qwen, Mistral, whichever is genuinely best this month. When something better ships on a Tuesday, you're using it on Tuesday. No waiting for a platform to adopt it and no tier that gates it.

**A different model for each character.** Something large and careful for the long story you actually care about. Something fast and cheap for messing around. Something local and unrestricted for everything else. Set per character, changed whenever.

**You can see the meter.** Every request logged with its token count and what it cost, filterable, exportable as CSV. Not a plan you hope you're using enough of. A number. Most people are surprised how small it is.

**Nothing is behind a tier.** There's no paid version of LettuceAI, because there's no us in the middle taking a cut. Every feature is on the moment you install it, including the expensive-sounding ones.

**Free is genuinely an option.** Google's AI Studio has a free tier that doesn't ask for a card. A model running locally on your own hardware costs nothing per message, forever, with the wifi off.

**And if a provider lets you down, you leave.** One setting. Your characters, chats and memories don't move, because they were never theirs to hold.

That's the wonder of the thing. Not that it's cheaper, though it often is. That the ceiling is set by what exists in the world rather than by what somebody decided to include in your plan.

## Where Character.AI is genuinely better

Any comparison that skips this part is selling you something.

**It's free and instant.** No API key, no provider account, no per-message cost, no decisions. Sign up and talk. LettuceAI asks you to connect a provider first, and even with our guided setup that's still more steps than none. If you just want to chat right now, they win outright.

**The character library.** Millions of characters, searchable, with the popular ones refined by a lot of use. We have Discovery, which browses community cards, but nothing on that scale exists here.

**It's on the app stores.** You install it the normal way and it updates itself. LettuceAI isn't on Google Play, so Android means downloading an APK and allowing installs from outside the store. That's a real friction we've chosen to accept, and for some people it's a dealbreaker.

**It just works everywhere.** Log in on any device and your chats are there. Ours sync device to device on purpose, which is more private and less convenient.

## What LettuceAI does that a hosted service structurally can't

**Run with no network.** Download a model, turn off wifi, keep going.

**Let you own the whole stack.** Your keys, your models, your files. Export characters as Unified Entity Cards, take chat history with you, back everything up and restore it elsewhere.

**Give you the knobs.** Sampler chains you can reorder, per-model settings, system prompt templates with conditional injection, per-session overrides. Hosted products can't expose this much without becoming a different product.

**Memory built for the job.** Long-term memory using an embedding model we trained specifically for roleplay retrieval, [`lettuce-emb-768d-v4`](https://huggingface.co/Zeolit/lettuce-emb-768d-v4), running on your device. General-purpose embedders scored 0.02 recall@1 on roleplay retrieval in our testing; ours scores 0.924. The [writeup](/blog/lettuce-emb-v4) has the numbers.

**Everything else in one place.** Group chats, lorebooks, personas, branching conversation trees, text to speech, on-device speech recognition, image generation, and an optional agent that drafts characters for you when you'd rather not start from a blank page.

## Being realistic about moving

Characters on a hosted platform generally aren't portable. There's no universal export format between these products, so assume you're recreating rather than importing. Our character editor covers the same ground, and the creation agent can draft from a description if you'd rather describe your character than rebuild them field by field.

The setup is genuinely more work than signing up. It's roughly: install, pick a provider, follow the guided steps to get a key, choose a model. We've put real effort into making that short, including a free path that needs no card, but it isn't zero and we won't pretend otherwise.

## Picking

**Stay with Character.AI if** you want zero setup, you like having a giant character library to browse, you'd rather install from an app store, or the idea of managing an API key sounds like a chore rather than a feature.

**Try LettuceAI if** you'd rather pick the best model in the world than the one you were handed, you want the whole thing on hardware you own, you want it working with the wifi off, you want memory that survives a long story, or you're tired of features you use being subject to somebody else's roadmap.

**Try both if** you're not sure. Both are free to start, and nothing stops you keeping an account somewhere while running something of your own alongside it.

One last thing worth saying plainly. Setup takes a few minutes and we're not going to pretend it doesn't. But it's a few minutes once, and what you get for it is a setup nobody can change on you. That trade has looked better every year we've been doing this.

---

*Written by the LettuceAI team in July 2026, so read it with that in mind. We describe Character.AI only in terms of what is inherent to a hosted service; for its features, pricing and policies, check [character.ai](https://character.ai) directly, since those change and their own pages are authoritative. Subscription pricing was widely reported as $9.99/month as of mid-2026, but we haven't verified it and it may be out of date by the time you read this. If anything here is wrong, [open an issue](https://github.com/LettuceAI/app/issues) and we'll correct it.*
