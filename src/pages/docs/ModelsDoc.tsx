import { motion } from "framer-motion";
import { DocHeading } from "@/components/docs/DocHeading";
import { Callout } from "@/components/docs/Callout";

export function ModelsDoc() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="prose prose-invert max-w-none"
    >
      <DocHeading level={1}>Models</DocHeading>

      <p>
        Models are the AI systems that generate the responses you see when you
        chat. When you type a message, a model is what reads it, understands the
        context, and writes the reply.
      </p>

      <p>
        These are sometimes called <strong>LLMs (Large Language Models)</strong>
        . In LettuceAI we simply call them <strong>"Models"</strong> to keep
        things simple.
      </p>

      <DocHeading level={2}>What is a model?</DocHeading>

      <p>
        A model is the "brain" that produces text. When you send a message, your
        message is sent to the provider you selected, the provider runs the
        model, and the model generates a reply which is sent back to you.
      </p>

      <p>
        Different models can behave differently. Some may be better at creative
        writing, some at reasoning, some respond faster, and some cost less to
        use.
      </p>

      <Callout>
        You don’t need to understand the technical details — choosing a model
        just means choosing which AI style and behaviour you prefer.
      </Callout>

      <DocHeading level={2}>What is an LLM?</DocHeading>

      <p>
        LLM stands for <strong>Large Language Model</strong>. This is simply the
        technical name for the type of AI behind these models. In practice,
        "model" and "LLM" mean almost the same thing.
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
        There is no single "best" model. You can switch at any time depending on
        what you prefer.
      </p>

      <DocHeading level={2}>Do I need to configure anything?</DocHeading>

      <p>
        Not necessarily. If you’re unsure which model to use, the default
        options work well for most conversations. You can always change models
        later without losing chats or memory.
      </p>

      {/* ===== PARAMETERS ===== */}

      <DocHeading level={2}>Model Parameters</DocHeading>

      <p>
        Some models allow additional settings that control how replies are
        generated. These options are optional (most users will never need to
        change them) but they can be useful if you want more control over how
        the AI behaves.
      </p>

      <DocHeading level={3}>Temperature</DocHeading>

      <p>Temperature controls how varied the model’s responses can be.</p>

      <ul>
        <li><strong>Lower values:</strong> safer, more predictable replies</li>
        <li><strong>Higher values:</strong> more creative or experimental replies</li>
      </ul>

      <p>
        If you want consistent behaviour, keep this low. If you want more
        imaginative results, increase it slightly.
      </p>

      <DocHeading level={3}>Top-P</DocHeading>

      <p>
        Top-P controls how many possible words the model is allowed to consider
        when generating a reply.
      </p>

      <p>
        Instead of controlling “creativity” directly, it sets a probability
        cutoff. The model will only choose from the most likely next-words that
        together make up that probability.
      </p>

      <ul>
        <li>
          <strong>Lower Top-P:</strong> the model only considers a few very
          likely words, so replies are safer and more focused
        </li>
        <li>
          <strong>Higher Top-P:</strong> the model considers a wider range of
          possible words, which can make replies more varied
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

      <p>This setting controls the maximum length of the model’s reply.</p>

      <ul>
        <li><strong>Lower values:</strong> shorter answers</li>
        <li><strong>Higher values:</strong> longer answers</li>
      </ul>

      <p>
        This is useful if you want to prevent the model from writing very long
        messages.
      </p>

      <DocHeading level={3}>Presence Penalty</DocHeading>

      <p>
        Presence penalty tells the model to avoid repeating the same topics or
        ideas. Increasing this value encourages the model to introduce new
        information instead of staying on the same subject.
      </p>

      <DocHeading level={3}>Frequency Penalty</DocHeading>

      <p>
        Frequency penalty reduces repeated wording. If the model keeps repeating
        the same phrases or sentences, increasing this value helps prevent that.
      </p>

      <DocHeading level={3}>Top-K (if supported)</DocHeading>

      <p>
        Top-K limits how many possible next-words the model is allowed to choose
        from. Smaller values restrict choice more strongly.
      </p>

      <p>Not all providers support this setting.</p>

      <DocHeading level={2}>Reasoning Mode</DocHeading>

      <p>
        Some models support a special reasoning mode. This allows the AI to
        spend extra time thinking through complex problems before replying. It
        is mainly useful for coding, analysis, planning, or logic tasks.
      </p>

      <p>
        Different providers expose reasoning differently. LettuceAI groups them
        into four types:
      </p>

      <ul>
        <li>
          <strong>Effort:</strong> you choose how hard the model should think
          (for example: low / medium / high)
        </li>
        <li>
          <strong>Budget-only:</strong> you set a token limit for reasoning
        </li>
        <li>
          <strong>Dynamic:</strong> the provider supports both effort and
          budget, but only one may be active at a time
        </li>
        <li>
          <strong>None:</strong> reasoning controls are not available
        </li>
      </ul>

      <Callout>
        If you enable effort or budget, the other one will be ignored for that
        request.
      </Callout>

      <p>
        For everyday conversation, reasoning mode is not required. It is an
        optional feature for more better roleplaying experiences in some use-cases.
      </p>
      
      <Callout title="Models with Built-In Reasoning" type="warning" >
        Some AI models have built-in reasoning capabilities. 
        As a result, your settings may be ignored if the provider does not offer control over the built-in reasoning.
      </Callout>
    </motion.article>
  );
}
