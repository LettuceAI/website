# LettuceAI — Posts for X/Twitter

Adapt to your voice. These are starting points, not scripts.

---

## Showing what you built

### The intro
> I've been working on an open-source AI roleplay app called LettuceAI.
>
> No accounts, no telemetry, no filters. You bring your own API key or run local models. Everything stays on your device.
>
> It's free. Code's on GitHub.
>
> lettuceai.app

### The why
> I wanted an AI roleplay app where I actually owned my data and could pick my own model.
>
> Nothing out there did both, so I built one.
>
> lettuceai.app

### Dev update template
> Just shipped [feature] in LettuceAI.
>
> [1-2 sentences about what it does and why it's cool]
>
> [screenshot or short video]
>
> lettuceai.app

### The stack
> LettuceAI stack if anyone's curious:
>
> - 20+ AI providers (OpenAI, Anthropic, Gemini, DeepSeek, local models...)
> - Long-term memory with automatic extraction and heat decay
> - Group chats where each character has independent memory
> - Visual system prompt builder
> - Lorebooks for world-building
> - Built-in llama.cpp for fully offline use
>
> All AGPL-3.0
>
> lettuceai.app

---

## Feature demos

### Memory
> Implemented a memory system in LettuceAI that actually works across sessions.
>
> It extracts memories automatically, tags them (plot, relationships, world, traits), and retrieves relevant ones based on context. They even decay over time like real memory.
>
> Way better than just stuffing history into the context window.

### Offline
> You can run LettuceAI fully offline with local models.
>
> llama.cpp is built in — download a model, no internet needed. Your stories literally never touch a server.

### Group chats
> Added group chats to LettuceAI where each AI character has their own memory.
>
> You can @ mention specific characters, set up dynamics between them. Closest thing I've gotten to running a tabletop session with AI.

---

## Conversation starters

### Ask the community
> What do you actually want from an AI roleplay app?
>
> I'm building LettuceAI (open source, free) and genuinely want to know what people care about most.

### Share a moment
> LettuceAI's memory system just pulled a character detail from 50+ messages ago and wove it in naturally.
>
> That's the moment it stopped feeling like a chatbot.

### Open source angle
> One thing I like about making LettuceAI open source is people can actually verify the privacy claims.
>
> "We don't collect data" means nothing from a closed-source app. With AGPL you can read every line.

### Local LLM crowd
> If you're running local models and want a frontend that isn't a pain to set up — LettuceAI has built-in llama.cpp and Ollama support.
>
> Download, pick a model, go. No Node.js, no Docker, no config files.
>
> lettuceai.app/download

---

## Threads

### Why I built this
1. Been building an AI roleplay app for a while now. Here's what I learned.
2. Every existing option either filters your content, charges monthly, stores your data on their servers, or all three.
3. I wanted something where I pick the model, my data stays local, and nobody's reading my conversations. So I built it.
4. LettuceAI — open source, supports 20+ providers, has actual long-term memory, runs offline with local models.
5. Code's on GitHub under AGPL-3.0. If I say it's private, you can verify that yourself.
6. lettuceai.app

### How the memory system works
1. Most AI chat apps have a memory problem — here's how I approached it in LettuceAI.
2. The standard approach is stuffing conversation history into the context window. Window fills up, old messages get dropped, AI forgets everything.
3. LettuceAI extracts memories from conversations automatically — plot events, relationships, world details, character traits.
4. These get tagged, weighted by relevance, and retrieved based on what's happening in the current conversation.
5. They also decay naturally over time. Recent stuff feels vivid, old stuff fades but doesn't disappear. Like how memory actually works.
6. Open source if you want to look at how it's implemented: lettuceai.app

---

## Where to post

- **X/Twitter** — dev updates, feature demos, reply to LLM discussions
- **Discord** — AI roleplay servers, SillyTavern community, local LLM communities
- **Hacker News** — Show HN when you ship something significant
- **Product Hunt** — free launch, good initial bump
- **YouTube/TikTok** — screen recordings of the app in action, even short ones work
- **GitHub** — keep the README tight with screenshots and a clear description
