import { Callout } from "@/components/docs/Callout";
import { DocHeading } from "@/components/docs/DocHeading";
import { DocImage } from "@/components/docs/DocImage";
import { images } from "@/config/images";
import { motion } from "framer-motion";
import { SEO } from "@/components/common/SEO";
import { buildBreadcrumbSchema } from "@/config/schemas";

export function LorebooksDoc() {
  return (
    <>
    <SEO
      title="Lorebooks"
      description="Define persistent world lore, character backgrounds, and rules that activate by keyword across all chats."
      path="/docs/lorebooks"
      jsonLd={buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Docs", path: "/docs" },
        { name: "Lorebooks", path: "/docs/lorebooks" },
      ])}
    />
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="prose prose-invert max-w-none"
    >
      <DocHeading level={1}>Lorebooks</DocHeading>

      <p className="lead">
        Lorebooks define persistent world canon, character background, and rules
        that apply across chats and sessions.
      </p>

      <DocHeading level={2}>In plain English</DocHeading>
      <p>
        A lorebook is a set of permanent notes that the AI can look up when
        certain words or topics appear.
      </p>

      <ul>
        <li>
          Use lorebooks for world facts, backstory, factions, locations, and
          rules
        </li>
        <li>Use memory for evolving story events and relationship changes</li>
        <li>Use lorebooks when something should stay stable across chats</li>
      </ul>

      <Callout type="info" title="Simple difference">
        <strong>Lorebook</strong> means "fixed reference information."{" "}
        <strong>Memory</strong> means "things the app learned or saved from the
        conversation."
      </Callout>

      <p>
        Lorebook content is written by you and remains attached to a character
        permanently. It is not learned, changed, or forgotten by the AI. Entries
        are injected only when relevant keywords appear, allowing large shared
        lore to persist without being sent on every message.
      </p>

      <DocHeading level={2}>What Lorebooks Are (and Arent)</DocHeading>
      <ul>
        <li>
          <strong>Are</strong>: On-demand reference material the AI can consult
          when needed.
        </li>
        <li>
          <strong>Are not</strong>: Persistent memory or learned behavior.
        </li>
      </ul>

      <p>
        Lorebooks do not evolve, decay, or learn over time. They act as
        conditional instructions that activate only in specific situations.
      </p>

      <DocHeading level={2}>Structure</DocHeading>

      <DocHeading level={3}>Lorebooks</DocHeading>
      <p>
        You can create multiple lorebooks (for example: <em>World History</em>,
        <em>Magic System</em>, or <em>Locations</em>).
      </p>

      <p>
        Each lorebook can be assigned to multiple characters, allowing reuse
        without duplicating content.
      </p>

      <DocHeading level={3}>Entries</DocHeading>
      <p>Each lorebook contains entries with the following properties:</p>

      <ul>
        <li>
          <strong>Title</strong>: short label, shown only in the editor.
        </li>
        <li>
          <strong>Content</strong>: the text injected into the prompt when the
          entry is active.
        </li>
        <li>
          <strong>Keywords</strong>: triggers that activate the entry.
        </li>
        <li>
          <strong>Case sensitive</strong>: per-entry toggle for whether
          keyword matching is case sensitive.
        </li>
        <li>
          <strong>Always active</strong>: skip keyword scanning and inject this
          entry on every turn.
        </li>
        <li>
          <strong>Enabled</strong>: disable an entry without deleting it.
        </li>
        <li>
          <strong>Priority</strong> and <strong>display order</strong>:
          determine reading order when multiple entries activate at once.
        </li>
      </ul>

      <DocHeading level={3}>Keyword detection mode</DocHeading>
      <p>
        Each lorebook has a keyword detection mode that controls how much
        conversation history is scanned for triggers:
      </p>
      <ul>
        <li>
          <strong>Recent message window</strong> (default): scans the most
          recent messages so keywords mentioned a few turns ago can still
          activate entries.
        </li>
        <li>
          <strong>Latest user message</strong>: only the user's most recent
          message is scanned. Best for narrowly scoped, on-topic activation.
        </li>
      </ul>

      <hr />

      <DocHeading level={2}>Activation</DocHeading>
      <p>
        When you send a message, the system scans according to the lorebook's
        detection mode for matching keywords.
      </p>

      <DocImage
        src={images.lorebook.activation}
        alt="How a lorebook entry is decided on, assembled, and injected into the prompt"
        caption="Each entry is checked against the scanned conversation. Always-active entries skip the keyword check, disabled entries never fire, and keyword entries activate only when a keyword appears. Everything that activates is sorted by its position, combined into one World Information block, and added to the prompt before the AI replies."
        containerClassName="max-w-xl mx-auto"
      />

      <ul>
        <li>
          <strong>Keyword match</strong>: if a keyword appears, the entry
          activates.
        </li>
        <li>
          <strong>Always active</strong>: entries marked as always active
          bypass keyword checks entirely.
        </li>
        <li>
          <strong>Disabled entries</strong>: never activate, even if their
          keywords appear.
        </li>
      </ul>

      <p>If no keywords match, the entry is not injected at all.</p>

      <hr />

      <DocHeading level={2}>Injection & Priority</DocHeading>
      <p>
        When one or more entries are activated, they are processed in this
        order:
      </p>

      <ol>
        <li>
          <strong>Ordering</strong>: Entries are sorted by their position in the
          lorebook.
        </li>
        <li>
          <strong>Assembly</strong>: All active entries are combined into a
          single
          <em>World Information</em> block.
        </li>
        <li>
          <strong>Insertion</strong>: The block is injected into the AI's prompt
          before response generation.
        </li>
      </ol>

      <p>
        Entries near the top of a lorebook take precedence when instructions
        conflict.
      </p>

      <hr />

      <DocHeading level={2}>Cost & Token Usage</DocHeading>
      <p>Lorebooks only consume tokens when entries are activated.</p>

      <ul>
        <li>Inactive entries cost nothing.</li>
        <li>Activated entries are included verbatim in the prompt.</li>
        <li>
          Broad or common keywords can cause frequent, unnecessary injection.
        </li>
      </ul>

      <p>
        For cost efficiency, prefer small, focused entries with precise
        triggers.
      </p>

      <hr />

      <DocHeading level={2}>Setup</DocHeading>

      <DocHeading level={3}>Creating a Lorebook</DocHeading>
      <ol>
        <li>
          Navigate to the <strong>Lorebook</strong> tab.
        </li>
        <li>
          Click <strong>New Lorebook</strong>.
        </li>
        <li>Enter a descriptive name.</li>
      </ol>

      <DocHeading level={3}>Assigning to a Character or Persona</DocHeading>
      <p>
        Lorebooks only apply when assigned. There are two ways to attach one:
      </p>
      <ul>
        <li>
          <strong>Per character</strong>: open the character editor and pick
          the lorebooks you want active in their chats. Multiple characters
          can share the same lorebook.
        </li>
        <li>
          <strong>Per persona</strong>: assign lorebooks to a persona to bring
          along user-side context (your faction, your gear, your home town)
          whenever you use that persona, regardless of which character you
          chat with.
        </li>
      </ul>
      <p>
        Active lorebooks from the character and the active persona are merged
        for each turn.
      </p>

      <DocHeading level={3}>Adding Entries</DocHeading>
      <ol>
        <li>
          Open the lorebook and click <strong>+</strong>.
        </li>
        <li>
          Add keywords that should activate the entry.
          <ul>
            <li>
              <strong>Recommended</strong>: Specific names and unique terms (
              <em>Neo-Tokyo</em>, <em>Excalibur</em>).
            </li>
            <li>
              <strong>Avoid</strong>: Generic words (<em>city</em>,{" "}
              <em>place</em>, <em>man</em>).
            </li>
          </ul>
        </li>
        <li>Enter the content.</li>
        <li>Reorder entries to control priority.</li>
      </ol>
      <p>On mobile, you can long-press an entry and drag it to reorder.</p>

      <hr />

      <DocHeading level={2}>AI Lorebook Generator</DocHeading>
      <p>
        The Lorebook Generator builds a complete lorebook for you from a brief
        and optional source materials. It runs as a multi-stage pipeline so
        each entry is planned, drafted, and reviewed before you accept it.
      </p>

      <p>The pipeline has four stages:</p>
      <ul>
        <li>
          <strong>Planner</strong>: outlines the entries (titles, keywords,
          rough scope) from your brief and sources.
        </li>
        <li>
          <strong>Writer</strong>: drafts the content for each entry from the
          approved outline.
        </li>
        <li>
          <strong>Refine</strong>: revises any single entry from a feedback
          message you provide.
        </li>
        <li>
          <strong>Coherence</strong>: proposes surgical edits across the full
          set so entries stay consistent with each other.
        </li>
      </ul>

      <p>From Settings, you can configure:</p>
      <ul>
        <li>
          <strong>Generation model</strong>: pick a text model for all four
          stages, or leave it unset to use the app default.
        </li>
        <li>
          <strong>Default entry count</strong>: between 5 and 50. Pre-fills
          the slider when you start a generation.
        </li>
        <li>
          <strong>Max output tokens</strong>: per-stage completion cap (256 to
          32768). Raise it for longer entries or large outlines.
        </li>
        <li>
          <strong>Structured fallback</strong>: JSON or XML. Used when the
          selected model does not reliably emit tool calls.
        </li>
        <li>
          <strong>Stage prompts</strong>: each of the four stages can use the
          built-in default prompt or a custom prompt template you define.
        </li>
      </ul>

      <p>
        To start a flow, open the Library, click <strong>New Lorebook</strong>,
        and choose <strong>Generate with AI</strong>. You can accept, edit,
        or discard each proposed entry before it is saved.
      </p>

      <DocHeading level={2}>AI entry generator</DocHeading>
      <p>
        From a lorebook editor you can ask the app to draft new entries for
        you. You describe what the world or setting is about (or point it at
        an existing character), and the generator proposes titles, keywords,
        and content that you can accept, edit, or discard one by one.
      </p>

      <DocHeading level={2}>Trigger preview</DocHeading>
      <p>
        The trigger preview tool lets you paste in sample text or load
        existing chat messages, then see exactly which entries would activate
        and why. It is the fastest way to debug keywords that fire too
        eagerly or never fire at all.
      </p>

      <DocHeading level={2}>Import and export</DocHeading>
      <p>
        Lorebooks can be moved between LettuceAI installs and shared with other
        apps:
      </p>
      <ul>
        <li>
          <strong>Native JSON</strong>: full LettuceAI lorebook with all
          fields preserved.
        </li>
        <li>
          <strong>SillyTavern World Info</strong>: import and export the
          common world info format, so you can reuse community-made lorebooks.
        </li>
        <li>
          <strong>USC (Unified Setting Card)</strong>: portable shared format.
        </li>
      </ul>
      <p>
        When you import a character that ships with a lorebook (from a Chara
        Card v3, UEC, or Discovery card), the lorebook is created and attached
        for you automatically.
      </p>

      <DocHeading level={2}>Best Practices</DocHeading>
      <ul>
        <li>
          <strong>Use Lorebooks</strong> for static, backstory, and
          reference-style information.
        </li>
        <li>
          <strong>Use Memory</strong> for evolving facts, relationships, and
          story events.
        </li>
        <li>
          Keep entries concise. long entries increase token usage when
          triggered.
        </li>
        <li>
          Split large topics into multiple entries with targeted keywords.
        </li>
      </ul>
    </motion.article>
    </>
  );
}
