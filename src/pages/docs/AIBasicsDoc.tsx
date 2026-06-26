import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Callout } from "@/components/docs/Callout";
import { DocHeading } from "@/components/docs/DocHeading";
import { DocImage } from "@/components/docs/DocImage";
import { images } from "@/config/images";
import { SEO } from "@/components/common/SEO";
import { buildBreadcrumbSchema } from "@/config/schemas";

export function AIBasicsDoc() {
  return (
    <>
    <SEO
      title="AI Basics"
      description="Learn the basics of AI chat and roleplay in plain English: characters, personas, providers, API keys, tokens, context, and memory, written for total beginners."
      path="/docs/ai-basics"
      jsonLd={buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Docs", path: "/docs" },
        { name: "AI Basics", path: "/docs/ai-basics" },
      ])}
    />
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
            <td className="py-2 px-4">OpenRouter, Anthropic, Gemini, Ollama</td>
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

      <DocHeading level={2}>What AI roleplaying is</DocHeading>

      <p>
        Most people first meet AI as an assistant: you ask a question, it gives
        an answer. AI roleplaying is different. Instead of asking for facts, you
        have a conversation with a <strong>character</strong> and play a part in
        a story yourself. The AI stays in character, you reply as yourself or as
        a role you have chosen, and the two of you make up the story as you go.
      </p>

      <p>
        There is no script, no score, and no single correct path. It is closer
        to improv acting or collaborative writing than to a search engine. You
        steer where things go, and the character reacts.
      </p>

      <Callout title="The mindset that helps most" type="info">
        Think of yourself as a co-author, not a customer. The story is something
        you build together, and you are allowed to steer it, rewrite it, and try
        again.
      </Callout>

      <DocHeading level={2}>
        Characters, personas, and the opening scene
      </DocHeading>

      <p>Three pieces shape almost every roleplay chat:</p>

      <ul>
        <li>
          <strong>Character:</strong> who the AI plays. A character is defined by
          a profile (sometimes called a character card) that holds its name,
          personality, background, and speaking style.
        </li>
        <li>
          <strong>Persona:</strong> who <em>you</em> are in the story. Your
          persona tells the character your name and a little about you, so it can
          react to you specifically.
        </li>
        <li>
          <strong>Opening message:</strong> the first message that sets the
          scene, also called a greeting or starting scene. It establishes where
          you are and how the story begins.
        </li>
      </ul>

      <p>
        You can learn more in <Link to="/docs/characters">Characters</Link>,{" "}
        <Link to="/docs/personas">Personas</Link>, and{" "}
        <Link to="/docs/chat-templates">Chat Templates</Link>.
      </p>

      <DocHeading level={2}>How roleplay messages usually look</DocHeading>

      <p>
        Roleplay writing has a few common habits. None of them are required, but
        recognizing them helps you read and write replies:
      </p>

      <ul>
        <li>
          <strong>Speech and actions:</strong> spoken words are usually written
          plainly or in quotes, while actions and descriptions are often wrapped
          in asterisks, like <code>*she glances up from her book*</code>.
        </li>
        <li>
          <strong>First or third person:</strong> some people write as{" "}
          <code>I walk closer</code> and others as <code>He walks closer</code>.
          Pick whichever feels natural, and the character will usually mirror
          your style.
        </li>
        <li>
          <strong>Out of character (OOC):</strong> when you want to talk to the
          AI <em>about</em> the story rather than inside it, people often label
          it OOC or put it in parentheses, like{" "}
          <code>(OOC: can we slow this scene down?)</code>.
        </li>
      </ul>

      <Callout title="You set the tone" type="info">
        The length and style you write in teaches the character what to match.
        Short replies tend to get short replies, and rich, descriptive writing
        tends to get more of the same back.
      </Callout>

      <DocHeading level={2}>Steering the story: swipe, edit, continue</DocHeading>

      <p>
        Because you are a co-author, you are never stuck with a reply you did not
        like. The main tools are:
      </p>

      <ul>
        <li>
          <strong>Regenerate (swipe):</strong> ask for a fresh version of the
          last reply when it misses the mark. Each try can go a different way.
        </li>
        <li>
          <strong>Edit:</strong> change the wording of a message, including the
          character's, to fix a detail or nudge the direction before you
          continue.
        </li>
        <li>
          <strong>Continue:</strong> let the character keep writing from where it
          stopped, instead of sending a new message.
        </li>
        <li>
          <strong>Branch:</strong> split off an alternate version of the chat to
          try a different path without losing the original. See{" "}
          <Link to="/docs/branching">Chat Branching</Link>.
        </li>
      </ul>

      <Callout title="A small habit that pays off" type="success">
        If a character drifts off course, edit or regenerate early. Fixing one
        reply is much easier than arguing with the character for ten turns.
      </Callout>

      <DocHeading level={2}>Who can see my roleplay chats?</DocHeading>

      <p>
        This matters a lot in roleplay, so it is worth saying plainly. LettuceAI
        does not run its own AI and does not store your chats on a LettuceAI
        server. Where your messages go depends only on the model you pick:
      </p>

      <ul>
        <li>
          <strong>Cloud models:</strong> your messages are sent to the provider
          you connected, and are handled under that provider's privacy and
          content rules.
        </li>
        <li>
          <strong>Local models:</strong> everything stays on your own device, and
          nothing is sent over the internet.
        </li>
      </ul>

      <p>
        If privacy is a priority, a local model keeps the whole conversation on
        your machine. See <Link to="/docs/security">Security</Link> for the full
        picture.
      </p>

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

      <DocImage
        src={images.aiBasics.contextWindow}
        alt="What fills the context window and what happens when it is full"
        caption="The context window is one fixed space shared by the system prompt, character and persona, lorebook entries, memories, recent history, and the room saved for the reply. When it fills up, the oldest messages drop out first, which is why saved memories matter."
        containerClassName="max-w-5xl mx-auto"
      />

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
        models. Examples include OpenAI, Anthropic, Gemini, OpenRouter, Ollama,
        and many others.
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
          <strong>Local models:</strong> the model runs on your own machine.
          LettuceAI can run local models directly, including ones you download
          from inside the app, or connect to a local server like Ollama
        </li>
      </ul>

      <p>
        Cloud models (the bring-your-own-key option) are usually easier to start
        with and often stronger. Local models give you more privacy and can work
        offline, but they depend on your hardware. You can mix both and switch
        between them whenever you like.
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
        <li>what a character and a persona are</li>
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
        <li>
          <strong>Roleplay:</strong> chatting in character to build a story
          together, rather than asking an assistant for answers
        </li>
        <li>
          <strong>Character:</strong> the personality the AI plays, defined by a
          character card
        </li>
        <li>
          <strong>Persona:</strong> who you are in the story, so the character
          can react to you
        </li>
        <li>
          <strong>Greeting:</strong> the opening message that sets the scene
        </li>
        <li>
          <strong>Regenerate (swipe):</strong> asking for a fresh version of the
          last reply
        </li>
        <li>
          <strong>OOC:</strong> out of character, talking to the AI about the
          story instead of inside it
        </li>
      </ul>

      <Callout title="Recommended next reads" type="success">
        Continue with <Link to="/docs/quickstart">Quick Start</Link>,{" "}
        <Link to="/docs/providers">Providers</Link>, and{" "}
        <Link to="/docs/models">Models</Link>.
      </Callout>
    </motion.article>
    </>
  );
}
