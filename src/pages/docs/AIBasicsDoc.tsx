import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Callout } from "@/components/docs/Callout";
import { DocHeading } from "@/components/docs/DocHeading";

export function AIBasicsDoc() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="prose prose-invert max-w-none"
    >
      <DocHeading level={1}>AI Basics</DocHeading>

      <p className="lead">
        If you are new to chat AI, start here. This page is written for people
        who have never used API-based AI apps before and need the basics in
        plain English.
      </p>

      <DocHeading level={2}>What LettuceAI actually is</DocHeading>

      <p>
        LettuceAI is not the AI model itself. It is the app you use to connect
        to models, manage chats, store memory, build characters, and organize
        everything around the conversation.
      </p>

      <table className="min-w-full text-sm my-6">
        <thead>
          <tr className="border-b border-border/50">
            <th className="text-left py-2 px-4">Thing</th>
            <th className="text-left py-2 px-4">What it means</th>
            <th className="text-left py-2 px-4">Example</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-border/10">
            <td className="py-2 px-4 font-medium">LettuceAI</td>
            <td className="py-2 px-4">
              The app that manages your chats and settings
            </td>
            <td className="py-2 px-4">The thing you install and open</td>
          </tr>
          <tr className="border-b border-border/10">
            <td className="py-2 px-4 font-medium">Provider</td>
            <td className="py-2 px-4">
              The service that gives you access to models
            </td>
            <td className="py-2 px-4">OpenRouter, Anthropic, Chutes, Ollama</td>
          </tr>
          <tr className="border-b border-border/10">
            <td className="py-2 px-4 font-medium">Model</td>
            <td className="py-2 px-4">The actual AI that writes the reply</td>
            <td className="py-2 px-4">Claude, Gemini, Qwen, Mistral</td>
          </tr>
          <tr>
            <td className="py-2 px-4 font-medium">API key</td>
            <td className="py-2 px-4">
              Your private access key for a provider account
            </td>
            <td className="py-2 px-4">
              A key you generate on the provider site
            </td>
          </tr>
        </tbody>
      </table>

      <Callout title="Very short version" type="info">
        LettuceAI is the app, the provider is the service, and the model is the
        AI doing the writing.
      </Callout>

      <DocHeading level={2}>How chat AI works</DocHeading>

      <p>
        When you send a message, LettuceAI builds a request and sends it to the
        provider and model you selected. That request usually includes:
      </p>

      <ul>
        <li>your latest message</li>
        <li>recent chat history</li>
        <li>system instructions</li>
        <li>character or persona data</li>
        <li>any memory or lorebook entries that were retrieved</li>
      </ul>

      <p>
        The model reads that request, predicts what text should come next, and
        sends back a reply. It does not "think" like a human or secretly know
        your entire chat history unless that information is included in the
        request.
      </p>

      <p>
        This process is usually called <strong>inference</strong>. In simple
        terms, inference just means the model is generating an answer.
      </p>

      <Callout title="Important" type="info">
        A model only knows what is inside the current request window. If
        something is missing from that window, it can forget it, contradict it,
        or make up details.
      </Callout>

      <DocHeading level={2}>What is a token?</DocHeading>

      <p>
        A token is a small chunk of text that the model processes. Tokens are
        not exactly the same as words.
      </p>

      <ul>
        <li>a short word may be one token</li>
        <li>a longer word may be split into multiple tokens</li>
        <li>punctuation and spaces can affect token count too</li>
      </ul>

      <p>
        A rough rule of thumb for English is that{" "}
        <strong>1 token is about 3-4 characters</strong>, or{" "}
        <strong>roughly 0.75 words</strong>. This is only an estimate. The real
        count depends on the exact text and the model's tokenizer.
      </p>

      <p>
        Example: the sentence <code>I love this character.</code> is a handful
        of tokens, not four exact "word units". The model sees tokenized text,
        not ordinary word counts.
      </p>

      <Callout title="Why this matters" type="warning">
        Providers usually bill by tokens, and most model limits are also
        measured in tokens.
      </Callout>

      <DocHeading level={2}>Input tokens vs output tokens</DocHeading>

      <p>There are usually two token buckets involved in a chat request:</p>

      <ul>
        <li>
          <strong>Input tokens:</strong> everything sent to the model
        </li>
        <li>
          <strong>Output tokens:</strong> the reply the model generates
        </li>
      </ul>

      <p>
        Long system prompts, big lorebooks, too much chat history, and memory
        retrieval all increase input token usage. Longer replies increase output
        token usage.
      </p>

      <DocHeading level={2}>What is context length?</DocHeading>

      <p>
        Context length, also called the context window, is the maximum number of
        tokens the model can handle in one request.
      </p>

      <p>
        That limit usually covers <strong>everything together</strong>: system
        prompt, chat history, memory, lorebook entries, your latest message, and
        the model's reply.
      </p>

      <p>
        Example: if a model has a <code>32k</code> context window, that space is
        shared by both the text you send and the text the model returns.
      </p>

      <p>
        If the request gets too large, something has to give. Older messages may
        be removed, memory may be trimmed, or the output may need a lower max
        token limit.
      </p>

      <Callout title="Simple way to think about it" type="info">
        Context length is the size of the model's short-term working memory for
        a single request, not its permanent memory.
      </Callout>

      <DocHeading level={2}>Why AI forgets things</DocHeading>

      <p>
        Models do not continuously remember everything forever. They only see
        the tokens that fit inside the current request. If older information no
        longer fits, it may be dropped, summarized, or replaced by newer text.
      </p>

      <p>
        This is why very long chats can drift over time, especially if you are
        not using a memory system.
      </p>

      <p>
        LettuceAI helps with this through <Link to="/docs/memory">Memory</Link>,
        which tries to bring back the most relevant information instead of
        resending the entire chat every time.
      </p>

      <DocHeading level={2}>
        Context length is not the same as memory
      </DocHeading>

      <p>These two terms are easy to confuse:</p>

      <ul>
        <li>
          <strong>Context length:</strong> what fits into one request right now
        </li>
        <li>
          <strong>Memory:</strong> a separate system for storing useful details
          and re-inserting them later
        </li>
      </ul>

      <p>
        A bigger context window can help, but it does not automatically solve
        long-term consistency. Memory systems still matter for long chats and
        roleplay.
      </p>

      <DocHeading level={2}>What is a provider?</DocHeading>

      <p>
        A <strong>provider</strong> is the service that gives you access to AI
        models. Examples include OpenAI-compatible endpoints, Anthropic, Gemini,
        Chutes, Ollama, and many others.
      </p>

      <p>
        A <strong>model</strong> is the actual AI you pick inside that provider.
        One provider can offer many models.
      </p>

      <p>
        If this part is still confusing, read{" "}
        <Link to="/docs/providers">Providers</Link> and{" "}
        <Link to="/docs/models">Models</Link> after this page.
      </p>

      <DocHeading level={2}>Why do I need an API key?</DocHeading>

      <p>
        An API key is how a provider knows which account is making requests. It
        is similar to a password, but it is meant for apps and software rather
        than normal website logins.
      </p>

      <p>
        LettuceAI uses <strong>bring your own key</strong>. That means you do
        not pay LettuceAI for messages. You connect your own provider account,
        and the provider bills that account for usage.
      </p>

      <Callout title="Why this exists" type="info">
        This gives you more control over price, privacy, and model choice, but
        it also means you need to understand the basic provider-model-key setup.
      </Callout>

      <DocHeading level={2}>Are there free providers?</DocHeading>

      <p>
        Sometimes, yes. Some providers offer free tiers, free trial credits, or
        a small amount of free daily usage. Others are paid from the start.
      </p>

      <p>
        The important part is that{" "}
        <strong>free availability changes often</strong>. A provider that is
        free today may add limits, remove the free tier, or require billing
        setup later.
      </p>

      <ul>
        <li>free tiers are usually slower or rate-limited</li>
        <li>free models are often smaller or less capable</li>
        <li>daily caps and queueing are common</li>
        <li>some "free" offers are really just temporary trial credits</li>
      </ul>

      <Callout title="Best expectation" type="warning">
        Treat free provider access as a bonus, not something guaranteed forever.
        Always check the provider's pricing or usage page before assuming a
        model is free.
      </Callout>

      <DocHeading level={2}>Cloud models vs local models</DocHeading>

      <p>There are two common ways to use models in LettuceAI:</p>

      <ul>
        <li>
          <strong>Cloud models:</strong> the model runs on someone else's
          servers over the internet
        </li>
        <li>
          <strong>Local models:</strong> the model runs on your own machine,
          usually through something like Ollama
        </li>
      </ul>

      <p>
        Cloud models are usually easier to start with and often stronger. Local
        models give you more privacy and can work offline, but they depend on
        your hardware.
      </p>

      <DocHeading level={2}>Why some replies are slow</DocHeading>

      <p>
        Slow responses do not always mean something is broken. Speed depends on
        the provider, model size, current server load, your network, and how
        much text is being sent in the request.
      </p>

      <ul>
        <li>bigger models are often slower</li>
        <li>longer prompts are often slower</li>
        <li>longer replies are often slower</li>
        <li>busy providers can add queue time</li>
      </ul>

      <DocHeading level={2}>
        Why the same prompt can get different answers
      </DocHeading>

      <p>
        Chat models are not perfectly fixed machines. Even with the same prompt,
        the answer can vary because of randomness settings, model updates,
        provider-side changes, or small differences in the surrounding context.
      </p>

      <p>
        This is normal. AI chat is probabilistic, not deterministic. If you want
        more stable behavior, use clearer prompts and lower randomness settings
        such as temperature.
      </p>

      <DocHeading level={2}>What is a hallucination?</DocHeading>

      <p>
        A hallucination is when the model states something incorrect, invented,
        or unsupported as if it were true.
      </p>

      <ul>
        <li>it can invent facts</li>
        <li>it can misremember earlier parts of the chat</li>
        <li>it can sound confident while being wrong</li>
      </ul>

      <p>
        This does not always mean the model is "bad". It means language models
        are prediction systems, not truth machines.
      </p>

      <Callout title="Practical rule" type="warning">
        Do not treat confident wording as proof. For factual, legal, medical, or
        financial claims, verify important information separately.
      </Callout>

      <DocHeading level={2}>Why roleplay bots can feel inconsistent</DocHeading>

      <p>
        In roleplay, consistency depends on more than just the model. Character
        cards, system prompts, memory retrieval, lorebooks, context space, and
        model quality all affect the result.
      </p>

      <p>
        If a character suddenly acts out of character, common causes are missing
        context, weak instructions, overloaded prompts, or the model simply
        making a bad prediction.
      </p>

      <DocHeading level={2}>What costs money?</DocHeading>

      <p>
        In most cases, you are paying the provider for token usage. More text in
        and more text out usually means higher cost.
      </p>

      <ul>
        <li>long prompts cost more than short prompts</li>
        <li>long replies cost more than short replies</li>
        <li>resending huge chat histories costs more than targeted memory</li>
        <li>some models are simply more expensive per token than others</li>
      </ul>

      <p>
        This is why "free app" does not mean "free AI usage". LettuceAI is free
        software, but many cloud models are paid services.
      </p>

      <DocHeading level={2}>
        Settings most beginners should care about
      </DocHeading>

      <ul>
        <li>
          <strong>Model:</strong> changes quality, style, speed, and price
        </li>
        <li>
          <strong>Max output tokens:</strong> limits how long the reply can be
        </li>
        <li>
          <strong>Temperature:</strong> changes how predictable or creative the
          output feels
        </li>
      </ul>

      <p>
        Most other settings can stay at their defaults until you know exactly
        what behavior you want to change.
      </p>

      <DocHeading level={2}>The three beginner mistakes to avoid</DocHeading>

      <ul>
        <li>
          expecting the model to remember everything forever without memory
        </li>
        <li>
          changing five settings at once and then not knowing what caused the
          result
        </li>
        <li>assuming a confident answer must be a correct answer</li>
      </ul>

      <DocHeading level={2}>What to learn next</DocHeading>

      <p>
        If you only want the minimum needed to use the app well, learn these in
        this order:
      </p>

      <ol>
        <li>what a provider is</li>
        <li>what a model is</li>
        <li>what an API key is</li>
        <li>what tokens and context length mean</li>
        <li>how memory changes long chats</li>
      </ol>

      <DocHeading level={2}>Beginner glossary</DocHeading>

      <ul>
        <li>
          <strong>Prompt:</strong> the text you send to the model
        </li>
        <li>
          <strong>System prompt:</strong> hidden instructions that guide the
          model's behavior
        </li>
        <li>
          <strong>Model:</strong> the AI that generates the reply
        </li>
        <li>
          <strong>Provider:</strong> the service that hosts or serves the model
        </li>
        <li>
          <strong>Token:</strong> a chunk of text used for limits and billing
        </li>
        <li>
          <strong>Context window:</strong> the maximum tokens visible in one
          request
        </li>
        <li>
          <strong>Inference:</strong> the act of the model generating a reply
        </li>
      </ul>

      <Callout title="Recommended next reads" type="success">
        Continue with <Link to="/docs/quickstart">Quick Start</Link>,{" "}
        <Link to="/docs/providers">Providers</Link>, and{" "}
        <Link to="/docs/models">Models</Link>.
      </Callout>
    </motion.article>
  );
}
