import { motion } from "framer-motion";
import { DocHeading } from "@/components/docs/DocHeading";
import { Callout } from "@/components/docs/Callout";
import { SEO } from "@/components/common/SEO";
import { buildBreadcrumbSchema } from "@/config/schemas";

export function ModelsDoc() {
  return (
    <>
    <SEO
      title="Models"
      description="Learn how AI models work and how to configure temperature, top-p, top-k, and other generation parameters in LettuceAI."
      path="/docs/models"
      jsonLd={buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Docs", path: "/docs" },
        { name: "Models", path: "/docs/models" },
      ])}
    />
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="prose prose-invert max-w-none"
    >
      <DocHeading level={1}>Models</DocHeading>

      <p>
        Models are the AI systems that generate the responses you see when you
        chat. When you type a message, a model reads the request, looks at the
        context it was given, and writes the reply.
      </p>

      <p>
        These are sometimes called <strong>LLMs</strong>. In LettuceAI we just
        call them <strong>models</strong>.
      </p>

      <DocHeading level={2}>What is a model?</DocHeading>

      <p>
        A model is the part that actually produces text. When you send a
        message, your provider runs the model, and the model sends the answer
        back to LettuceAI.
      </p>

      <p>
        Different models behave differently. Some are better at creative
        writing, some at reasoning, some are faster, and some are cheaper.
      </p>

      <Callout>
        You do not need to understand the full math. In practice, choosing a
        model mostly means choosing the quality, tone, speed, and price you
        want.
      </Callout>

      <DocHeading level={2}>What is an LLM?</DocHeading>

      <p>
        LLM stands for <strong>Large Language Model</strong>. That is just the
        technical name for this kind of text-generating AI.
      </p>

      <DocHeading level={2}>Why choose different models?</DocHeading>

      <p>Different models can be better for different tasks. For example:</p>

      <ul>
        <li>some are faster</li>
        <li>some are more detailed</li>
        <li>some are cheaper to use</li>
        <li>some have a unique tone or style</li>
      </ul>

      <p>
        There is no single best model for everyone. You can switch depending on
        what kind of conversation you want.
      </p>

      <DocHeading level={2}>Do I need to configure anything?</DocHeading>

      <p>
        Not necessarily. If you are unsure which model to use, the default
        options work fine for most conversations. You can change models later
        without losing chats or memory.
      </p>

      <DocHeading level={2}>Adding a model</DocHeading>

      <p>
        Models live under a provider. Once you have added a provider in{" "}
        <strong>Settings → Providers</strong>, open that provider and add the
        models you want to use. You give each model the model name your provider
        expects (for example a name from their model list) and an optional
        display name to make it easier to recognize.
      </p>

      <p>
        You can mark one model as the <strong>default</strong>. The default is
        used for new chats unless a character specifies its own model. Each
        character can have its own preferred model, which is set on the character
        instead of per chat.
      </p>

      <Callout type="info" title="Switching models anytime">
        You can change the model for a conversation at any time without losing the
        chat or its memory. Adding many models is fine. They only cost anything
        when you actually send a message.
      </Callout>

      <DocHeading level={2}>The model editor</DocHeading>

      <p>
        Each model has its own settings page, organized into tabs. You do not have
        to touch any of these. The defaults work for most people.
      </p>

      <ul>
        <li>
          <strong>Generation:</strong> the core settings shared by most models,
          like temperature, Top-P, Top-K, max output tokens, and the penalties.
          These are explained below.
        </li>
        <li>
          <strong>Runtime:</strong> extra settings for local models (the built-in
          engine, Ollama, and similar), such as how much work goes to your GPU,
          thread and batch sizes, and advanced samplers. Cloud providers do not
          show this tab.
        </li>
        <li>
          <strong>Reasoning:</strong> controls for models that can think before
          answering. See the Reasoning Mode section below.
        </li>
        <li>
          <strong>Caching:</strong> prompt caching for providers that support it,
          which can lower cost on long conversations.
        </li>
        <li>
          <strong>Capabilities:</strong> a read-only summary of what the model
          supports.
        </li>
      </ul>

      <DocHeading level={2}>Model Parameters</DocHeading>

      <p>
        Some models expose extra settings that change how they generate replies.
        Most users do not need to touch them, but it helps to know what they
        mean.
      </p>

      <DocHeading level={3}>How generation works, simplified</DocHeading>

      <p>
        The model does not write the whole answer in one go. It generates text
        one step at a time.
      </p>

      <p>
        At each step, it looks at many possible next words or tokens and asks
        "which one is most likely here?"
      </p>

      <p>
        Example: if the text so far is <code>The cat sat on the</code>, the
        model will usually think words like <code>mat</code>, <code>floor</code>
        , or <code>chair</code> make more sense than something random like{" "}
        <code>galaxy</code>.
      </p>

      <p>
        Then it has to pick one. Temperature, Top-K, and Top-P change how safe
        or adventurous that pick can be.
      </p>

      <Callout title="Important" type="info">
        These settings do not make the model smarter. They only change how it
        chooses between possible next words.
      </Callout>

      <DocHeading level={3}>Temperature</DocHeading>

      <p>
        Temperature is the main setting for how{" "}
        <strong>predictable vs random</strong> the output feels.
      </p>

      <ul>
        <li>
          <strong>Lower temperature:</strong> safer, more stable, more
          repetitive
        </li>
        <li>
          <strong>Higher temperature:</strong> more creative, looser, more
          chaotic
        </li>
      </ul>

      <p>
        Example prompt: <code>The wizard opened the ancient</code>
      </p>

      <p>
        With <strong>lower temperature</strong>, the model is more likely to
        continue with something obvious like <code>door</code>,{" "}
        <code>book</code>, or <code>chest</code>.
      </p>

      <p>
        With <strong>higher temperature</strong>, it is more willing to choose
        something less expected like <code>gateway</code>, <code>tomb</code>, or{" "}
        <code>void</code>.
      </p>

      <p>
        Lower temperature usually feels more consistent. Higher temperature can
        feel more vivid, but also more weird or off-track.
      </p>

      <Callout title="Beginner advice" type="success">
        If you only want one creativity setting, use Temperature and leave Top-K
        and Top-P alone.
      </Callout>

      <DocHeading level={3}>Top-K (if supported)</DocHeading>

      <p>
        Top-K is a <strong>hard limit</strong> on how many next-word options the
        model is allowed to consider.
      </p>

      <p>
        Example: if <code>Top-K = 5</code>, the model keeps only the 5 most
        likely next options and ignores everything else.
      </p>

      <table className="min-w-full text-sm my-6">
        <thead>
          <tr className="border-b border-border/50">
            <th className="text-left py-2 px-4">Rank</th>
            <th className="text-left py-2 px-4">Possible next word</th>
            <th className="text-left py-2 px-4">Kept?</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-border/10">
            <td className="py-2 px-4">1</td>
            <td className="py-2 px-4 font-medium">door</td>
            <td className="py-2 px-4">Yes</td>
          </tr>
          <tr className="border-b border-border/10">
            <td className="py-2 px-4">2</td>
            <td className="py-2 px-4 font-medium">book</td>
            <td className="py-2 px-4">Yes</td>
          </tr>
          <tr className="border-b border-border/10">
            <td className="py-2 px-4">3</td>
            <td className="py-2 px-4 font-medium">chest</td>
            <td className="py-2 px-4">Yes</td>
          </tr>
          <tr className="border-b border-border/10">
            <td className="py-2 px-4">4</td>
            <td className="py-2 px-4 font-medium">hall</td>
            <td className="py-2 px-4">Yes</td>
          </tr>
          <tr className="border-b border-border/10">
            <td className="py-2 px-4">5</td>
            <td className="py-2 px-4 font-medium">room</td>
            <td className="py-2 px-4">Yes</td>
          </tr>
          <tr>
            <td className="py-2 px-4">6+</td>
            <td className="py-2 px-4 font-medium">void / galaxy / thunder</td>
            <td className="py-2 px-4">No</td>
          </tr>
        </tbody>
      </table>

      <p>
        So if the best options are <code>door</code>, <code>book</code>,{" "}
        <code>chest</code>, <code>hall</code>, and <code>room</code>, the model
        must choose from those. A weirder option that ranked much lower is not
        even allowed into the final choice pool.
      </p>

      <p>
        Top-K is useful when you want a <strong>strict cap</strong> on how wide
        the model's choice pool can be.
      </p>

      <p>Not all providers support this setting.</p>

      <DocHeading level={3}>Top-P</DocHeading>

      <p>
        Top-P, also called <strong>nucleus sampling</strong>, is similar to
        Top-K but more flexible.
      </p>

      <p>
        Instead of saying "keep exactly 5 options", Top-P says "keep enough of
        the likely options to cover most of the probability."
      </p>

      <p>
        Example: if <code>Top-P = 0.90</code>, the model keeps adding likely
        next words until the combined likelihood reaches about 90%. Some moments
        might only need a few obvious options. Other moments might need many
        more.
      </p>

      <table className="min-w-full text-sm my-6">
        <thead>
          <tr className="border-b border-border/50">
            <th className="text-left py-2 px-4">Word</th>
            <th className="text-left py-2 px-4">Chance</th>
            <th className="text-left py-2 px-4">Running total</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-border/10">
            <td className="py-2 px-4 font-medium">door</td>
            <td className="py-2 px-4">30%</td>
            <td className="py-2 px-4">30%</td>
          </tr>
          <tr className="border-b border-border/10">
            <td className="py-2 px-4 font-medium">book</td>
            <td className="py-2 px-4">20%</td>
            <td className="py-2 px-4">50%</td>
          </tr>
          <tr className="border-b border-border/10">
            <td className="py-2 px-4 font-medium">chest</td>
            <td className="py-2 px-4">15%</td>
            <td className="py-2 px-4">65%</td>
          </tr>
          <tr className="border-b border-border/10">
            <td className="py-2 px-4 font-medium">hall</td>
            <td className="py-2 px-4">10%</td>
            <td className="py-2 px-4">75%</td>
          </tr>
          <tr className="border-b border-border/10">
            <td className="py-2 px-4 font-medium">room</td>
            <td className="py-2 px-4">8%</td>
            <td className="py-2 px-4">83%</td>
          </tr>
          <tr className="border-b border-border/10">
            <td className="py-2 px-4 font-medium">gate</td>
            <td className="py-2 px-4">4%</td>
            <td className="py-2 px-4">87%</td>
          </tr>
          <tr>
            <td className="py-2 px-4 font-medium">tomb</td>
            <td className="py-2 px-4">3%</td>
            <td className="py-2 px-4">90%</td>
          </tr>
        </tbody>
      </table>

      <p>
        In that example, the model stops at <code>tomb</code> because the total
        has reached 90%. Lower-ranked words after that are ignored.
      </p>

      <ul>
        <li>
          <strong>Lower Top-P:</strong> fewer options survive, so replies feel
          safer
        </li>
        <li>
          <strong>Higher Top-P:</strong> more options survive, so replies feel
          looser
        </li>
      </ul>

      <p>The short version is:</p>

      <ul>
        <li>
          <strong>Top-K:</strong> how many options can survive?
        </li>
        <li>
          <strong>Top-P:</strong> how much of the likely option space should
          survive?
        </li>
      </ul>

      <p>
        In practice, Top-P and Temperature both affect randomness. Most users
        should only adjust one of them, not both at the same time.
      </p>

      <Callout>
        If you are unsure, leave Top-P at its default value. The model will
        behave normally without any tuning.
      </Callout>

      <DocHeading level={3}>Max Output Tokens</DocHeading>

      <p>This setting controls the maximum length of the model's reply.</p>

      <ul>
        <li>
          <strong>Lower values:</strong> shorter answers
        </li>
        <li>
          <strong>Higher values:</strong> longer answers
        </li>
      </ul>

      <p>
        Example: if you keep getting giant walls of text, lower this. If the AI
        keeps cutting itself off too early, raise it.
      </p>

      <DocHeading level={3}>Presence Penalty</DocHeading>

      <p>
        Presence penalty pushes the model to bring in new ideas instead of
        staying on the same topic.
      </p>

      <p>
        Example: if the AI keeps circling around the same scene or thought,
        raising presence penalty can make it introduce something new.
      </p>

      <DocHeading level={3}>Frequency Penalty</DocHeading>

      <p>Frequency penalty tries to reduce repeated wording.</p>

      <p>
        Example: if the model keeps repeating the same phrases, sentence shapes,
        or favorite words, a higher frequency penalty can help break that habit.
      </p>

      <DocHeading level={2}>Reasoning Mode</DocHeading>

      <p>
        Some models support a special reasoning mode. This lets the AI spend
        more effort on difficult tasks before replying.
      </p>

      <p>
        It is mostly useful for coding, planning, analysis, and logic-heavy
        tasks. For normal conversation or roleplay, you usually do not need it.
      </p>

      <p>
        Different providers expose reasoning in different ways. LettuceAI groups
        them into four types:
      </p>

      <ul>
        <li>
          <strong>Effort:</strong> you choose how hard the model should think
        </li>
        <li>
          <strong>Budget-only:</strong> you set a token limit for reasoning
        </li>
        <li>
          <strong>Dynamic:</strong> the provider supports both effort and
          budget, but only one can be active at a time
        </li>
        <li>
          <strong>None:</strong> reasoning controls are not available
        </li>
      </ul>

      <Callout>
        If you enable effort or budget, the other one will be ignored for that
        request.
      </Callout>

      <Callout title="Models with Built-In Reasoning" type="warning">
        Some AI models have built-in reasoning behavior. In those cases, your
        settings may be ignored if the provider does not expose control over it.
      </Callout>
    </motion.article>
    </>
  );
}
