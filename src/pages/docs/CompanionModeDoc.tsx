import { Callout } from "@/components/docs/Callout";
import { DocHeading } from "@/components/docs/DocHeading";
import { DocImage } from "@/components/docs/DocImage";
import { images } from "@/config/images";
import { motion } from "framer-motion";
import { SEO } from "@/components/common/SEO";
import { buildBreadcrumbSchema } from "@/config/schemas";

export function CompanionModeDoc() {
  return (
    <>
      <SEO
        title="Companion Mode"
        description="Companion Mode gives a character a living soul that grows from your shared memories, a real-time emotional and relationship state, and dedicated pages for setting it up and watching the bond evolve."
        path="/docs/companion-mode"
        jsonLd={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Docs", path: "/docs" },
          { name: "Companion Mode", path: "/docs/companion-mode" },
        ])}
      />
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="prose prose-invert max-w-none"
      >
        <DocHeading level={1}>Companion Mode</DocHeading>

        <p className="lead">
          Companion Mode is the relationship-oriented chat mode in LettuceAI. It
          gives a character a written "soul" that quietly grows over time, a
          live emotional and relationship state that shifts with every message,
          and shared memory that can follow you across every chat with that
          companion. It is built for bonds that last, not one-off scenes.
        </p>

        <Callout type="success" title="Opt-in and additive">
          Companion Mode is fully opt-in. It only activates for characters whose
          interaction mode is set to Companion. Roleplay characters and regular
          chats are completely unaffected: nothing about Companion Mode changes
          how non-companion chats prompt, remember, or store data. If you never
          turn it on, it is simply not there.
        </Callout>

        <Callout type="info" title="Runs on your device">
          The pieces that make a companion feel alive (reading emotion,
          recognizing who and what gets mentioned, recalling past moments) run
          locally on your device using a few small models. The app only reaches
          out to your chosen provider for the actual reply, exactly like
          roleplay mode does.
        </Callout>

        <DocHeading level={2}>Companion vs Roleplay</DocHeading>
        <p>
          Every character is created in one of two interaction modes. You pick
          the mode during character creation (and can change it later from the
          character editor) using the <strong>Interaction Mode</strong>{" "}
          selector.
        </p>

        <table className="min-w-full text-sm my-6">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left py-2 px-4">Mode</th>
              <th className="text-left py-2 px-4">What drives it</th>
              <th className="text-left py-2 px-4">Best for</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">Roleplay</td>
              <td className="py-2 px-4">
                Scenes, situational framing, the standard prompt path.
              </td>
              <td className="py-2 px-4">
                Scene-first storytelling, one-shot scenarios, narrative play.
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium">Companion</td>
              <td className="py-2 px-4">
                A living soul plus real-time emotional and relationship state.
              </td>
              <td className="py-2 px-4">
                Persistent relationships, slow-build dynamics, ongoing bonds.
              </td>
            </tr>
          </tbody>
        </table>

        <p>
          Companion Mode does not remove scenes. They are still supported as
          opening context (and you can skip them entirely for a companion). The
          emphasis simply shifts from framing a scene to keeping a relationship
          alive between sessions. There is no global switch: roleplay characters
          keep their original behavior even with all the companion pieces
          installed.
        </p>

        <DocHeading level={2}>The companion soul</DocHeading>
        <p>
          The soul is the heart of a companion. It is who they are underneath
          the basic character card: their nature, their history, the things they
          love, the things that frighten them, and how they handle their
          feelings. You write it in the <strong>Companion Soul</strong> step
          during creation, or in the <strong>Soul</strong> tab of the character
          editor afterward. You can author every word yourself, or let the Soul
          Generator draft it for you and then edit freely.
        </p>

        <DocHeading level={3}>The twelve identity blocks</DocHeading>
        <p>
          The soul is built from twelve short written blocks. Each one is plain
          text, and each comes with worked examples you can insert and adapt.
          You only have to fill in what matters to you: empty blocks are fine.
        </p>

        <ul>
          <li>
            <strong>Essence</strong>: who they are underneath the card
            definition.
          </li>
          <li>
            <strong>Traits</strong>: their defining personality traits, a few
            words each.
          </li>
          <li>
            <strong>Backstory</strong>: how they came to be. Origin, formative
            events, what they do.
          </li>
          <li>
            <strong>Appearance</strong>: how they look and dress, including a
            signature outfit or style.
          </li>
          <li>
            <strong>Goals</strong>: what they are working toward. Ambitions,
            quests, unfinished business.
          </li>
          <li>
            <strong>Likes and Favorites</strong>: favorites and small joys.
            Food, color, music, little gestures.
          </li>
          <li>
            <strong>Inner Voice</strong>: how they sound in close conversation.
          </li>
          <li>
            <strong>Relational Style</strong>: how they attach, trust, retreat,
            and reconnect.
          </li>
          <li>
            <strong>Vulnerabilities</strong>: soft spots, insecurities, things
            they rarely say out loud.
          </li>
          <li>
            <strong>Fears</strong>: what they can be pressured on. Literal fears
            and the things that unsettle them.
          </li>
          <li>
            <strong>Habits</strong>: recurring tells, rituals, and
            conversational patterns.
          </li>
          <li>
            <strong>Boundaries</strong>: lines they will not cross, the pace they
            keep, and their comfort limits.
          </li>
        </ul>

        <Callout type="info" title="Why fears get their own block">
          Fears are kept separate on purpose. They describe what genuinely
          unsettles a companion, so the character can react believably when a
          scene touches one of those nerves, instead of staying unflappable
          about everything. The Soul Generator is aware of this block and will
          draft fears alongside the rest.
        </Callout>

        <DocHeading level={3}>Fine-tuning the feelings</DocHeading>
        <p>
          Below the written blocks, a <strong>Fine-tune feelings</strong>{" "}
          section lets you shape the companion's emotional makeup with sliders.
          Most people can leave these at their sensible defaults, but they are
          there if you want precise control.
        </p>
        <ul>
          <li>
            <strong>Baseline Affect</strong> (ten sliders): the companion's
            default emotional tone, for example warmth running from cold to
            affectionate. These set the mood the companion rests at and gently
            returns to between turns.
          </li>
          <li>
            <strong>Regulation Style</strong> (nine sliders): how they handle
            feelings before showing them, including suppression, volatility, and
            pride. This is what creates the gap between what a companion feels
            and what they actually let you see.
          </li>
          <li>
            <strong>Relationship Defaults</strong> (four sliders): where the
            relationship starts on closeness, trust, affection, and tension when
            you begin chatting.
          </li>
        </ul>

        <p>
          The soul editor also carries two switches that apply to this companion
          everywhere: <strong>Time Awareness</strong> and{" "}
          <strong>Shared Memory Across Sessions</strong>. Both default to off and
          are explained in their own sections below.
        </p>

        <DocHeading level={2}>The Soul Generator</DocHeading>
        <p>
          You never have to write a soul from a blank page. The Soul Generator
          drafts one for you from the character's name, definition, and any
          scenes you have set. Find it in the{" "}
          <strong>Generate from character</strong> card inside the soul editor
          and tap <strong>Generate soul</strong>. It stays disabled until the
          character has at least a name and a definition (it will tell you which
          one is missing).
        </p>

        <ul>
          <li>
            <strong>Watch it think</strong>: while it works, a status pill shows
            live steps such as authoring identity, setting the baseline mood,
            tuning emotional regulation, and finishing up. You can expand it to
            watch the text stream in as it is written.
          </li>
          <li>
            <strong>Stop anytime</strong>: a <strong>Stop</strong> button next to
            the status cancels the run immediately. A canceled run leaves your
            existing soul untouched.
          </li>
          <li>
            <strong>Review before applying</strong>: when it finishes, a{" "}
            <strong>Review generated soul</strong> panel opens showing all twelve
            blocks as editable fields (changed fields are marked) along with the
            before-and-after slider changes. From there you can{" "}
            <strong>Apply</strong>, <strong>Regenerate</strong>,{" "}
            <strong>Discard</strong>, or open <strong>Direction</strong> to steer
            the next draft.
          </li>
          <li>
            <strong>Optional steering</strong>: the <strong>Direction</strong>{" "}
            box lets you nudge how the soul is drafted (a tone, a theme, a detail
            you want included). Leave it empty to let the model decide from the
            character alone.
          </li>
        </ul>

        <p>
          You control which model writes souls and how, from{" "}
          <strong>Settings &gt; Companion Soul Writer</strong>: pick the
          generation model (or use the app default), choose a structured fallback
          format (JSON or XML) for local models that cannot use tool calling, and
          optionally supply your own Soul Writer prompt template.
        </p>

        <DocHeading level={2}>How the soul grows over time</DocHeading>
        <p>
          This is what makes a companion feel like it is truly getting to know
          you. The soul you write is the starting point, not a cage. As you talk
          and the companion forms memories, parts of its personality can quietly
          evolve. We call this <strong>soul growth</strong>.
        </p>

        <DocImage
          src={images.companion.soulGrowth}
          alt="How companion memories turn into soul growth without overwriting the authored soul"
          caption="As you chat, new memories feed a growth cycle. Only the parts allowed to change are updated, conflicts supersede older growth, and everything is added as an overlay so the soul you wrote is never overwritten."
          containerClassName="max-w-2xl mx-auto"
        />

        <DocHeading level={3}>What growth does</DocHeading>
        <p>
          After the companion replies, the app notes any new memories from the
          exchange. In the background, a growth pass looks at those fresh
          memories alongside the companion's changeable traits and decides
          whether anything about them has genuinely shifted. Maybe they have
          picked up a new favorite, warmed up to a topic they used to avoid, or
          revealed a goal. When it finds a real change, it records a small{" "}
          <strong>growth entry</strong> layered on top of your authored soul.
        </p>

        <Callout type="info" title="Your writing is never overwritten">
          Growth never edits the words you wrote. It stacks gentle adjustments on
          top of the authored soul. A trait's current value is your original plus
          any active growth, so you can always clear growth and get your original
          companion back exactly as written.
        </Callout>

        <p>
          When a new realization conflicts with an older one, the new entry{" "}
          <strong>supersedes</strong> the old one rather than piling up beside
          it, so the companion does not hold two contradictory beliefs at once.
          Retired entries are kept as a short history. Much less often, once
          enough small changes have built up, a <strong>consolidation</strong>{" "}
          pass folds them into the companion's deeper core so the personality
          stays coherent instead of drifting.
        </p>

        <DocHeading level={3}>Seeing and managing growth</DocHeading>
        <p>
          You stay in control of everything growth does. The{" "}
          <strong>Relationship</strong> page for a companion chat has a{" "}
          <strong>Soul growth</strong> section that lists how the changeable
          traits have evolved, with badges showing whether each entry was added
          or adjusted and how many memories it came from. From there you can:
        </p>
        <ul>
          <li>
            <strong>Remove a single entry</strong>, with a confirmation first.
            This drops just that evolving trait and never touches your authored
            soul.
          </li>
          <li>
            <strong>Clear all growth</strong>, also confirmed first. This wipes
            every accumulated change (including retired history) and returns the
            companion to exactly the soul you wrote.
          </li>
        </ul>
        <p>
          If a companion has not formed any growth yet, the section simply says
          so. Growth is companion-only and entirely optional in spirit: clearing
          it is always safe.
        </p>

        <DocHeading level={2}>Which parts change, and how fast</DocHeading>
        <p>
          Not everything about a companion should shift at the same speed. A
          person's favorite snack can change in a week, but who they are at their
          core should not. LettuceAI sorts the soul into a few mutability levels
          so growth feels natural rather than chaotic.
        </p>

        <table className="min-w-full text-sm my-6">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left py-2 px-4">Level</th>
              <th className="text-left py-2 px-4">How it changes</th>
              <th className="text-left py-2 px-4">Covers</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">Fixed</td>
              <td className="py-2 px-4">Never changes on its own.</td>
              <td className="py-2 px-4">Backstory.</td>
            </tr>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">Core (very slow)</td>
              <td className="py-2 px-4">
                Only the rare consolidation pass can ever touch it.
              </td>
              <td className="py-2 px-4">Essence and traits.</td>
            </tr>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">Slowly evolving</td>
              <td className="py-2 px-4">
                Shifts gradually through ordinary growth.
              </td>
              <td className="py-2 px-4">
                Appearance, goals, inner voice, relational style,
                vulnerabilities, fears, habits, boundaries.
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium">Quickly evolving</td>
              <td className="py-2 px-4">
                The most responsive to new memories.
              </td>
              <td className="py-2 px-4">Likes and favorites.</td>
            </tr>
          </tbody>
        </table>

        <p>
          The core identity is special: it is authored once and stored as-is, and
          any evolution is layered over it rather than rewriting it. In the
          companion pages, the original core values appear as read-only cards,
          while anything growth has changed shows up under the Soul growth
          section, so you can always tell what you wrote apart from what evolved.
          On the relationship meters, values that have risen above their starting
          point fill in a warm color, while values that have dropped below it are
          shown in a danger color so a cooling bond is easy to spot at a glance.
        </p>

        <DocHeading level={2}>Live session state</DocHeading>
        <p>
          Separate from the soul, every companion chat keeps a live state that
          updates from your messages. The soul is who they are; the live state is
          how they feel and where the relationship stands right now. Unlike
          memory, this state stays per chat: different conversations with the
          same companion can be in different emotional places.
        </p>

        <DocHeading level={3}>Emotional state</DocHeading>
        <ul>
          <li>
            <strong>Felt</strong>: what the companion is actually experiencing
            inside.
          </li>
          <li>
            <strong>Expressed</strong>: the version that surfaces in replies
            after their regulation style is applied.
          </li>
          <li>
            <strong>Blocked</strong>: what is felt but held back. The gap between
            felt and expressed.
          </li>
          <li>
            <strong>Momentum</strong>: which way the feelings have been trending
            over recent turns.
          </li>
          <li>
            <strong>Active drivers</strong>: short labels for what is behind the
            current mood, drawn from the last message.
          </li>
          <li>
            <strong>Confidence</strong>: how sure the emotion reading was on the
            last turn. Lower confidence produces a softer, more cautious update.
          </li>
        </ul>

        <Callout type="info" title="Felt vs expressed">
          A central idea in companion mode is that what a companion{" "}
          <em>feels</em> and what they <em>show</em> are tracked separately.
          Regulation traits like suppression and emotional transparency decide
          how much of the felt state actually reaches you, which is why a guarded
          companion can be hurting without ever saying so.
        </Callout>

        <DocHeading level={3}>Relationship state</DocHeading>
        <p>
          The bond itself is tracked on a handful of meters, each with plain low
          and high anchors so the numbers mean something.
        </p>

        <table className="min-w-full text-sm my-6">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left py-2 px-4">Meter</th>
              <th className="text-left py-2 px-4">Low</th>
              <th className="text-left py-2 px-4">High</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">Closeness</td>
              <td className="py-2 px-4">Withdrawn</td>
              <td className="py-2 px-4">Intimate</td>
            </tr>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">Trust</td>
              <td className="py-2 px-4">Distrustful</td>
              <td className="py-2 px-4">Trusting</td>
            </tr>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">Affection</td>
              <td className="py-2 px-4">Hostile</td>
              <td className="py-2 px-4">Affectionate</td>
            </tr>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">Tension</td>
              <td className="py-2 px-4">Easy</td>
              <td className="py-2 px-4">Charged</td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium">Stability</td>
              <td className="py-2 px-4">Volatile</td>
              <td className="py-2 px-4">Stable</td>
            </tr>
          </tbody>
        </table>

        <p>
          The page also shows the number of interactions and when you last spoke.
          Meters start low and build over time, and each meter's trend is
          compared against the character's defaults so you can see whether things
          are warming up or cooling down.
        </p>

        <Callout type="info" title="State settles in as you talk">
          A brand-new companion chat does not need to write out its full state
          right away. The runtime can fall back to sensible values from the soul
          and the relationship defaults, and your first real message is usually
          what locks in the live state for that chat.
        </Callout>

        <DocHeading level={2}>What happens on a companion turn</DocHeading>
        <p>
          Companion mode adds a few quiet steps around a normal reply. The order
          matters, because it lets the same reply reflect how the companion just
          reacted to you.
        </p>

        <ol>
          <li>You send a message.</li>
          <li>
            The previous emotional state relaxes back toward the companion's
            baseline based on how long it has been since you last spoke, so a
            long absence cools a heated moment.
          </li>
          <li>
            The on-device emotion reader looks at your message and produces a few
            confident labels (such as love, gratitude, sadness, or anger), each
            of which nudges the emotional and relationship meters.
          </li>
          <li>
            Those nudges are scaled by the companion's volatility and applied,
            then their regulation style derives what they actually express from
            what they feel.
          </li>
          <li>
            The relationship meters update: closeness and affection drift gently
            upward on any turn, while trust, tension, and stability move only in
            response to specific signals.
          </li>
          <li>
            A compact summary of the companion's current state is woven into the
            prompt, and the reply is generated with that live context in view.
          </li>
          <li>
            After the reply is saved, memory processing and the soul growth pass
            run in the background.
          </li>
        </ol>

        <Callout type="info" title="It fails gracefully">
          If the on-device emotion reader is unavailable on a given turn, the
          companion keeps chatting. It simply applies a near-neutral update and
          pauses emotional changes until the model is back, rather than blocking
          the conversation.
        </Callout>

        <DocHeading level={2}>Companion memory</DocHeading>
        <p>
          Companion memory uses the same dynamic memory engine as the rest of the
          app, presented through a relationship-oriented lens. From a companion
          chat's <strong>Memory</strong> page you can browse, search, filter,
          pin, warm up or cool down, re-date, edit, or delete memories, and even
          hand-edit the running context summary.
        </p>

        <DocHeading level={3}>Shared memory across sessions</DocHeading>
        <p>
          The soul editor's <strong>Shared Memory Across Sessions</strong> switch
          (off by default) decides how memory is scoped for a companion. When it
          is on, every chat with that companion draws from a single shared memory
          pool, so something they learn in one conversation carries into the
          others, and an edit in one chat affects them all. Even with sharing on,
          the emotional state and the relationship meters stay separate per chat.
        </p>

        <DocHeading level={3}>When memories go stale</DocHeading>
        <p>
          People change their minds, and so should a companion's memory of you.
          When a new memory contradicts an older one (you moved cities, you
          changed jobs), the new memory <strong>supersedes</strong> the old one:
          the outdated fact stops influencing replies, but a trail is kept so
          nothing is silently lost. On the Memory page you can filter between
          active and superseded entries, and superseded items are dimmed and
          clearly tagged.
        </p>

        <DocHeading level={3}>Scheduled notes</DocHeading>
        <p>
          Scheduled notes let you hand the companion dated background context that
          it only picks up when the day arrives. Think birthdays, anniversaries,
          or a seasonal beat you want acknowledged. For each note you set the
          exact text the companion will read, an optional label, whether it
          repeats (once, daily, weekly, monthly, or yearly), and the date and
          time window it is active. You can disable a note to keep it saved
          without it entering prompts, and preview which notes would be active on
          any chosen date.
        </p>

        <DocHeading level={3}>Custom memory prompts</DocHeading>
        <p>
          Companion chats share the app's dynamic memory backend, so the same
          customization applies. Under{" "}
          <strong>Settings &gt; Dynamic Memory</strong> you can swap in your own{" "}
          <strong>Summary Prompt</strong> (how recent turns get summarized into
          durable context) and <strong>Memory Manager Prompt</strong> (how
          memories get added, updated, and removed), or leave both on the
          built-in defaults.
        </p>

        <DocHeading level={2}>Time awareness</DocHeading>
        <p>
          Time awareness lets a companion know what day and time it is and
          remember when things happened. It is off by default. The soul editor's{" "}
          <strong>Time Awareness</strong> switch sets the default for new chats
          with that companion, and any individual chat can override it from its
          own settings.
        </p>
        <p>When it is on:</p>
        <ul>
          <li>
            <strong>Live time in the conversation</strong>: the companion is told
            the current local date and time, so it can react to the hour, the
            weekday, or the season naturally.
          </li>
          <li>
            <strong>Time-stamped memories</strong>: new memories record when they
            happened, which is what makes questions like "what did we do last
            weekend" pull back the right moments.
          </li>
          <li>
            <strong>Time-aware recall</strong>: when you mention a period like
            "yesterday" or "a few weeks ago", memory retrieval can focus on that
            window instead of guessing.
          </li>
        </ul>
        <p>
          A per-chat <strong>Time Override</strong> gives you finer control over
          the clock the companion sees. <strong>Live</strong> uses the real
          clock, <strong>Frozen</strong> holds a fixed moment in place, and{" "}
          <strong>Ticking</strong> keeps advancing from a time you set. This
          shifts both the time the companion perceives and how the recency of
          memories is judged, which is handy for stories set in a different
          moment.
        </p>

        <DocHeading level={2}>Setting up a companion</DocHeading>
        <p>
          Setting up a companion is a guided flow, and the app handles the
          technical parts for you.
        </p>
        <ol>
          <li>
            <strong>Choose the mode</strong>: in the character's Description
            step, pick <strong>Companion</strong> in the Interaction Mode
            selector.
          </li>
          <li>
            <strong>Install the on-device pieces</strong>: the first time you do
            this, a setup guide appears explaining that a companion runs on your
            device and needs a few small models, a one-time download. Tap to
            start it.
          </li>
          <li>
            <strong>Keep your place during the download</strong>: starting the
            download takes you to a queue page that installs the models one after
            another and shows progress. When it finishes, it counts down and
            returns you to exactly where you were, with everything you had
            already typed still intact.
          </li>
          <li>
            <strong>Learn how it works</strong>: once the models are ready, the
            guide returns with a short explainer covering emotional state, the
            relationship, and memory, plus an optional prompt to shape the soul.
          </li>
          <li>
            <strong>Shape the soul</strong>: in the Companion Soul step, write
            the twelve blocks yourself or use the Soul Generator, fine-tune the
            feelings if you want, and set the optional Direction for generation.
          </li>
        </ol>

        <Callout type="info" title="Sensible defaults, then generate">
          There are no personality presets to wade through. A new companion
          starts from sensible defaults, and the Soul Generator gives you a full
          first draft to react to. From there you only change what you care
          about.
        </Callout>

        <DocHeading level={2}>The on-device models</DocHeading>
        <p>
          Companion mode relies on a small set of local models. When you switch a
          character into companion mode, the app checks which ones are present and
          offers to download anything missing before you continue. Chatting is
          forgiving if one is missing (it degrades rather than blocks), but the
          experience is fullest with all four installed.
        </p>
        <ul>
          <li>
            <strong>Embedding model</strong> (about 90 MB): powers memory recall
            and semantic search.
          </li>
          <li>
            <strong>Emotion classifier</strong> (about 120 MB): reads each
            message and produces the signals that move the emotional state.
          </li>
          <li>
            <strong>Entity extractor</strong> (about 140 MB): recognizes people,
            places, and things so memories can be linked together.
          </li>
          <li>
            <strong>Memory router</strong> (about 70 MB): decides how a new
            memory should be categorized.
          </li>
        </ul>

        <Callout type="success" title="Local-first">
          All of these analysis models run on your device. Providers are used
          only for the actual chat reply, the same as in roleplay mode.
        </Callout>

        <p>
          You can manage these downloads from{" "}
          <strong>Settings &gt; Companions</strong>, which shows each model's
          status with install and uninstall controls, an overall readiness
          banner, and a pointer into Dynamic Memory settings (companion chats
          share that backend). The companion-specific generation settings live
          under <strong>Settings &gt; Companion Soul Writer</strong>.
        </p>

        <DocHeading level={2}>Companion pages in a chat</DocHeading>
        <p>
          So the system never feels like a black box, a companion chat exposes
          dedicated pages from its header.
        </p>
        <ul>
          <li>
            <strong>Relationship page</strong>: the live meters (closeness,
            trust, affection, tension, stability), interaction count, top felt
            and expressed emotions, recent momentum and drivers, and the Soul
            growth section where you review and manage how the personality has
            evolved.
          </li>
          <li>
            <strong>Memory page</strong>: the full companion memory browser with
            category filters, search, the active-or-superseded filter, pinning,
            warming and cooling, re-dating, editing, and deletion.
          </li>
          <li>
            <strong>Soul page</strong>: edit the soul and run the Soul Generator
            without leaving the conversation.
          </li>
        </ul>

        <DocHeading level={2}>When to use companion mode</DocHeading>
        <ul>
          <li>
            <strong>Use Companion Mode</strong> for ongoing relationships where
            continuity, emotional tone, and a bond that grows matter more than
            scene framing.
          </li>
          <li>
            <strong>Use Roleplay Mode</strong> for scene-driven stories, one-shot
            scenarios, or characters where a live emotional state would feel out
            of place.
          </li>
        </ul>

        <Callout type="info" title="It is still your chat">
          Companion mode never takes the wheel. You can always edit the soul,
          clear growth, adjust memory, regenerate replies, or switch providers.
          The relationship is something the app tends for you, not something it
          locks you out of.
        </Callout>
      </motion.article>
    </>
  );
}
