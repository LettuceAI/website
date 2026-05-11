import { motion } from "framer-motion";
import { DocHeading } from "@/components/docs/DocHeading";
import { Callout } from "@/components/docs/Callout";
import { SEO } from "@/components/common/SEO";
import { buildBreadcrumbSchema } from "@/config/schemas";

export function PersonasDoc() {
  return (
    <>
    <SEO
      title="Personas"
      description="Define how you appear in conversations by creating user personas with distinct roles, tones, and perspectives."
      path="/docs/personas"
      jsonLd={buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Docs", path: "/docs" },
        { name: "Personas", path: "/docs/personas" },
      ])}
    />
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="prose prose-invert max-w-none"
    >
      <DocHeading level={1}>Personas</DocHeading>

      <p className="lead">
        Personas define how <em>you</em> show up in conversations. They control
        your role, tone, and perspective when talking to characters.
      </p>

      <DocHeading level={2}>What is a persona?</DocHeading>
      <p>
        A persona represents <strong>who you are in a conversation</strong>.
        While characters define the AI's behavior, personas define yours.
      </p>
      <p>
        This is especially useful for roleplay, storytelling, or scenarios where
        you don't want to speak as yourself.
      </p>

      <DocHeading level={2}>Why use personas?</DocHeading>
      <p>
        Personas let you separate <em>you as a user</em> from{" "}
        <em>you as a role</em>. Instead of rewriting context every time, you
        select a persona and stay consistent.
      </p>
      <ul>
        <li>Play different roles with the same character</li>
        <li>Keep tone and behavior consistent</li>
        <li>Avoid repeating background information</li>
        <li>Switch perspectives without resetting memory</li>
      </ul>

      <DocHeading level={2}>Personas vs characters</DocHeading>
      <ul>
        <li>
          <strong>Characters</strong> define who the AI is
        </li>
        <li>
          <strong>Personas</strong> define who you are
        </li>
      </ul>
      <p>
        Both exist at the same time. A single character can interact with
        multiple personas, each creating a different dynamic.
      </p>

      <DocHeading level={2}>Creating a persona</DocHeading>
      <p>
        Creating a persona is similar to creating a character, but focused on
        your role instead of the AI's.
      </p>
      <ul>
        <li>
          <strong>Name</strong>: how the persona is identified
        </li>
        <li>
          <strong>Nickname (optional)</strong>: short form the AI can use for
          you in chat
        </li>
        <li>
          <strong>Description</strong>: background, personality, and role
        </li>
        <li>
          <strong>Avatar (optional)</strong>: portrait with an in-app crop tool
        </li>
        <li>
          <strong>Active lorebooks (optional)</strong>: lorebooks that should
          activate whenever this persona is in use, in addition to whatever the
          character has assigned
        </li>
      </ul>

      <DocHeading level={2}>Default persona</DocHeading>
      <p>
        You can mark one persona as the default. The default is automatically
        applied to new chats unless you pick something else. Existing chats are
        not changed when you switch which persona is default.
      </p>

      <DocHeading level={2}>Using personas in chats</DocHeading>
      <p>
        When starting a new conversation, you can choose which persona to use.
        The persona remains active for the entire chat unless you change it
        from chat settings.
      </p>
      <p>
        Switching personas changes your role, not the character's memory or
        personality.
      </p>

      <DocHeading level={2}>Exporting personas</DocHeading>
      <p>
        Personas can be exported from the Library so you can reuse them across
        devices or share them with others.
      </p>
      <ul>
        <li>
          <strong>UEC (Unified Entity Card)</strong> export for compatibility
        </li>
        <li>Use UEC to move personas between LettuceAI installs</li>
      </ul>

      <Callout type="info" title="Roleplay tip">
        Personas work best when they are specific. “A tired detective with trust
        issues” is more effective than “a normal person”.
      </Callout>

      <Callout type="info" title="Multiple personas">
        You can create multiple personas for the same character to explore
        different relationships, timelines, or viewpoints.
      </Callout>
    </motion.article>
    </>
  );
}
