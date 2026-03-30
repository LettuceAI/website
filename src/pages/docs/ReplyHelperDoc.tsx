import { motion } from "framer-motion";
import { DocHeading } from "@/components/docs/DocHeading";
import { Callout } from "@/components/docs/Callout";
import { DocImage } from "@/components/docs/DocImage";
import { images } from "@/config/images";
import { SEO } from "@/components/common/SEO";
import { buildBreadcrumbSchema } from "@/config/schemas";

export function ReplyHelperDoc() {
  return (
    <>
    <SEO
      title="Help Me Reply"
      description="Get AI-suggested replies when stuck in conversation, with options to refine your draft or generate fresh ideas."
      path="/docs/help-me-reply"
      jsonLd={buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Docs", path: "/docs" },
        { name: "Help Me Reply", path: "/docs/help-me-reply" },
      ])}
    />
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="prose prose-invert max-w-none"
    >
      <DocHeading level={1}>Help Me Reply</DocHeading>

      <p>
        Help Me Reply is a tool you can use when you are not sure what to say
        next in a chat. If you ever have a moment of "What do I even write
        now?", Help Me Reply can suggest a message for you, so the conversation
        keeps flowing.
      </p>

      <Callout>
        Help Me Reply doesn’t replace you. It simply gives you a starting point
        when you feel stuck.
      </Callout>

      <DocHeading level={2}>Where is the Help Me Reply?</DocHeading>
      <p>
        You can find Help Me Reply next to the message input box in any chat.
        Its inside the Plus icon.
      </p>

      <DocImage
        src={images.replyHelper.location}
        alt="Help Me Reply location"
      />

      <DocHeading level={2}>Starting a Reply</DocHeading>

      <p>
        When you open Help Me Reply, you will see two options if you already
        have text typed in the message box:
      </p>

      <DocImage
        src={images.replyHelper.choices}
        containerClassName="max-w-xl mx-auto"
        alt="Help Me Reply options UI"
      />

      <ul>
        <li>
          <strong>Use my text as base:</strong> expands or improves the draft
          you already wrote
        </li>
        <li>
          <strong>Write something new:</strong> ignores your draft and generates
          a fresh reply from scratch
        </li>
      </ul>

      <p>
        If the message box is empty, Help Me Reply simply generates a new reply.
      </p>

      <DocHeading level={2}>Modes and streaming</DocHeading>
      <p>
        Help Me Reply supports two styles: <strong>Conversation-like</strong>{" "}
        and
        <strong> Roleplay-like</strong>. Pick the mode that fits your current
        chat.
      </p>
      <ul>
        <li>
          <strong>Conversation-like</strong>: natural, casual replies
        </li>
        <li>
          <strong>Roleplay-like</strong>: in-character, narrative replies
        </li>
      </ul>
      <p>
        Replies now stream in real time, so you can stop early or regenerate
        without waiting for a full response.
      </p>
      <p>
        Streaming can be toggled in settings if you prefer full replies at once.
      </p>

      <DocHeading level={2}>Settings</DocHeading>
      <p>
        You can fine-tune Help Me Reply in settings, including options like Max
        Token Output for shorter or longer suggestions.
      </p>
      <p>
        You can also choose a specific model for Help Me Reply, or leave it set
        to your app’s default model.
      </p>

      <DocImage
        src={images.replyHelper.settings}
        containerClassName="max-w-xl mx-auto"
        alt="Help Me Reply settings panel"
      />

      <DocHeading level={2}>Using your text as a base</DocHeading>

      <p>
        If you’ve already started writing something but get stuck halfway, Reply
        Helper can treat your text as a starting point. It will try to continue,
        refine, or smooth out your message — while keeping your intent.
      </p>

      <p>This is useful when:</p>

      <ul>
        <li>You know what you want to say, but not how</li>
        <li>Your draft feels awkward or incomplete</li>
        <li>You want a clearer, more natural reply</li>
      </ul>

      <DocHeading level={2}>Writing something new</DocHeading>

      <p>
        If you don’t know what to say at all, choose{" "}
        <strong>Write something new</strong>. The assistant will suggest a reply
        based on the conversation, tone, and context.
      </p>

      <DocImage
        src={images.replyHelper.suggested}
        containerClassName="max-w-xl mx-auto"
        alt="Suggested reply UI"
      />

      <p>
        You’ll see the suggestion before sending it, so you can read it calmly
        and decide what to do next.
      </p>

      <DocHeading level={2}>Accepting or regenerating</DocHeading>

      <p>When a suggestion is generated, you have two options:</p>

      <ul>
        <li>
          <strong>Regenerate:</strong> get a different suggestion
        </li>
        <li>
          <strong>Use This:</strong> copy the reply into the message box so you
          can send or edit it
        </li>
      </ul>

      <Callout>
        You always remain in control. Nothing is ever sent automatically.
      </Callout>

      <DocHeading level={2}>Why use Help Me Reply?</DocHeading>

      <p>
        Help Me Reply exists for those small pause moments, when your brain
        slows down but the story or conversation shouldn’t.
      </p>

      <ul>
        <li>It helps reduce writer’s block</li>
        <li>It keeps role-play flowing</li>
        <li>It supports users who struggle with wording or social anxiety</li>
      </ul>

      <DocHeading level={2}>Which model does Help Me Reply use?</DocHeading>

      <p>
        Help Me Reply always uses your <strong>default app model</strong> to
        generate suggestions.
      </p>

      <p>
        Changing your default model in settings will also change which model
        Help Me Reply uses.
      </p>
    </motion.article>
    </>
  );
}
