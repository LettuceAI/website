import { motion } from "framer-motion";
import { DocHeading } from "@/components/docs/DocHeading";
import { DocSplit } from "@/components/docs/DocSplit";
import { DocImage } from "@/components/docs/DocImage";
import { Callout } from "@/components/docs/Callout";
import { images } from "@/config/images";
import { SEO } from "@/components/common/SEO";
import { buildBreadcrumbSchema } from "@/config/schemas";

export function GroupChatsDoc() {
  return (
    <>
    <SEO
      title="Group Chats"
      description="Chat with multiple AI characters at once with automatic or manual speaker selection and structured roleplay."
      path="/docs/group-chats"
      jsonLd={buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Docs", path: "/docs" },
        { name: "Group Chats", path: "/docs/group-chats" },
      ])}
    />
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="prose prose-invert max-w-none"
    >
      <DocHeading level={1}>Group Chats</DocHeading>

      <p className="lead">
        Group Chats let you talk to multiple characters in a single
        conversation. Choose at least two characters and run the group as a
        casual conversation or a structured roleplay.
      </p>

      <DocSplit
        imageSrc={images.groupChats.list}
        imageAlt="Group chats list screen"
      >
        <DocHeading level={2}>Create a group</DocHeading>
        <p>
          Open the <strong>+</strong> menu and pick <strong>Group Chat</strong>.
          Select at least two characters, then give the group a name and
          optional background.
        </p>
        <ul>
          <li>
            <strong>Conversation</strong>: freeform multi-character chat
          </li>
          <li>
            <strong>Roleplay</strong>: structured scenes with a starting setup
          </li>
        </ul>
        <p>
          Group chats are stored as their own sessions and appear in the Group
          Chats list alongside a history view for older sessions.
        </p>
      </DocSplit>

      <DocSplit
        imageSrc={images.groupChats.scene}
        imageAlt="Group chat starting scene setup"
        reverse
      >
        <DocHeading level={2}>Starting scenes (roleplay)</DocHeading>
        <p>
          If you choose roleplay, you can start with a custom scene or re-use a
          scene from one of the selected characters. This sets the tone before
          the chat begins.
        </p>
      </DocSplit>

      <DocSplit
        imageSrc={images.groupChats.chat}
        imageAlt="Group chat message view"
      >
        <DocHeading level={2}>During the chat</DocHeading>
        <p>
          Each message is labeled by character so you can track who is speaking.
          You can also cancel a response at any time using the abort controls.
        </p>
        <p>
          Group chat message cards are optimized for readability and longer
          sessions.
        </p>
      </DocSplit>

      <DocHeading level={2}>Group settings</DocHeading>
      <p>
        The Group Settings page lets you edit the group name, manage members,
        update the background image, and choose a persona for the conversation.
      </p>

      <DocImage
        src={images.groupChats.settings}
        alt="Group chat settings screen"
        containerClassName="max-w-xl mx-auto"
      />

      <DocHeading level={2}>Personas in group chats</DocHeading>
      <p>
        Personas still represent <em>you</em> in the conversation. Selecting a
        persona in Group Settings changes your role across the entire group
        session without changing the characters themselves.
      </p>

      <DocHeading level={2}>How speaker selection works</DocHeading>
      <p>
        When you send a message, the app decides which character should reply
        next using a clear priority order:
      </p>
      <ol>
        <li>
          <strong>@mentions</strong> always win and force a specific character.
        </li>
        <li>
          The configured <strong>speaker selection method</strong> for the
          group runs next.
        </li>
        <li>
          A <strong>heuristic fallback</strong> kicks in if the chosen method
          fails or returns a muted character.
        </li>
      </ol>

      <p>
        Each group session stores its own speaker selection method. You can
        switch between three options at any time from group settings:
      </p>

      <ul>
        <li>
          <strong>LLM</strong> (default): an LLM tool call picks the next
          speaker based on the recent messages and participant descriptions.
        </li>
        <li>
          <strong>Heuristic</strong>: a local scoring pass picks a speaker
          without calling any model. Fast and offline-friendly.
        </li>
        <li>
          <strong>Round robin</strong>: the next speaker is chosen by rotating
          through the participants, so everyone gets a turn.
        </li>
      </ul>
      <div className="relative -mx-6 w-[calc(100%+3rem)] px-6">
        <DocImage
          src="https://lhdgeo5fms.ufs.sh/f/m0TBUtMLsaiEDvEcN4Lk6KQEIaUv3RMC80pwfLYbPBhuTci9"
          alt="Group chat speaker selection flow"
          containerClassName="max-w-7xl mx-auto"
          className="w-full"
          caption="Speaker selection flow: mention, automatic selection, fallback, then response."
        />
      </div>

      <DocHeading level={3}>@mentions</DocHeading>
      <p>You can target a character directly by mentioning them:</p>
      <ul>
        <li>
          <code>@Name</code> for single-word names
        </li>
        <li>
          <code>@&quot;Character Name&quot;</code> for names with spaces
        </li>
      </ul>
      <p>Mentions are case-insensitive and the first valid mention wins.</p>

      <DocHeading level={3}>LLM selection model</DocHeading>
      <p>
        The selection step uses the first configured model in your settings (not
        the character’s own model). It reviews recent messages, participant
        descriptions, and participation balance, then picks the next speaker
        with a tool call.
      </p>

      <DocHeading level={3}>Heuristic fallback</DocHeading>
      <p>
        If LLM selection fails, a local fallback scores characters based on:
      </p>
      <ul>
        <li>Participation balance (who has spoken less)</li>
        <li>Recency (soft penalty for very recent speakers)</li>
        <li>Name mentions inside the user message</li>
      </ul>

      <DocHeading level={2}>Muting participants</DocHeading>
      <p>
        You can mute individual characters in a group. Muted characters are
        excluded from automatic speaker selection and are skipped by the LLM,
        heuristic, and round robin paths. If auto-selection ever lands on a
        muted character, the app falls back to the heuristic to pick someone
        else.
      </p>
      <p>
        Muting does not remove a character from the group. You can still target
        a muted character directly with an @mention to force them to reply.
      </p>

      <DocHeading level={2}>Lorebooks in groups</DocHeading>
      <p>
        Group sessions can attach their own lorebooks separately from each
        participant. There is also a toggle to disable the per-character
        lorebooks entirely, so only the group-level lorebooks are active. This
        is useful when characters come from different worlds and you want one
        shared canon for the group only.
      </p>

      <DocHeading level={2}>Memory in group chats</DocHeading>
      <p>
        Each group session has its own memory mode (Manual or Dynamic), chosen
        independently of any single character's memory setting. The dynamic
        memory pipeline (summary window, retrieval, decay, hot/cold split, and
        background maintenance cycle) is implemented in parallel with the
        direct-chat pipeline and uses the same settings. See the{" "}
        <a href="/docs/memory">Memory System</a> doc for details.
      </p>

      <Callout type="info" title="Tips">
        Group chats work best when characters have distinct voices and clear
        roles. Keep prompts short and let their personalities do the work.
      </Callout>
    </motion.article>
    </>
  );
}
