import { Callout } from "@/components/docs/Callout";
import { DocHeading } from "@/components/docs/DocHeading";
import { motion } from "framer-motion";
import { SEO } from "@/components/common/SEO";
import { buildBreadcrumbSchema } from "@/config/schemas";

export function CompanionModeDoc() {
  return (
    <>
      <SEO
        title="Companion Mode"
        description="Companion Mode gives a character a persistent emotional and relationship model, with authored soul, live state, and dedicated inspection pages."
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
          gives a character a persistent emotional baseline, a live relationship
          state that evolves with every user message, and dedicated pages for
          inspecting how the bond is going.
        </p>

        <Callout type="info" title="Beta feature">
          Companion Mode is still experimental. The core flows (soul, live
          state, prompt injection, memory pages) are real and shipping, but
          some companion-specific surfaces are still being filled in.
        </Callout>

        <Callout type="success" title="Opt-in and additive">
          Companion Mode is fully opt-in. It only activates for characters
          whose interaction mode is set to Companion. Roleplay characters and
          regular chats are unaffected. Nothing about Companion Mode changes
          how non-companion chats prompt, remember, or persist data.
        </Callout>

        <DocHeading level={2}>Companion Mode vs Roleplay Mode</DocHeading>
        <p>
          LettuceAI characters can be authored in one of two interaction modes.
          The mode is chosen during character creation and changes how the chat
          stack treats the character.
        </p>

        <table className="min-w-full text-sm my-6">
          <thead>
            <tr className="border-b border-border/50">
              <th className="text-left py-2 px-4">Mode</th>
              <th className="text-left py-2 px-4">Driven by</th>
              <th className="text-left py-2 px-4">Best for</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-border/10">
              <td className="py-2 px-4 font-medium">Roleplay</td>
              <td className="py-2 px-4">
                Scenes, situational framing, standard prompt path.
              </td>
              <td className="py-2 px-4">
                Scene-first storytelling, one-shot scenarios, narrative play.
              </td>
            </tr>
            <tr>
              <td className="py-2 px-4 font-medium">Companion</td>
              <td className="py-2 px-4">
                Authored soul plus live emotional and relationship state.
              </td>
              <td className="py-2 px-4">
                Persistent relationships, slow-build dynamics, ongoing bonds.
              </td>
            </tr>
          </tbody>
        </table>

        <p>
          Companion Mode does not remove scenes. They are still supported as
          opening context. The emphasis simply shifts from scene framing to the
          relational runtime.
        </p>

        <p>
          The mode is a per-character setting (chosen with an interaction
          mode selector during character creation and changeable from the
          character editor). Sessions inherit the mode from their character,
          so the runtime treats a chat as a companion chat when either the
          character or the session is marked <code>companion</code>. There is
          no global "companion mode" toggle: roleplay characters keep their
          original prompt path even when companion infrastructure is
          installed.
        </p>

        <DocHeading level={2}>The four pieces of companion state</DocHeading>
        <p>
          It helps to think of a companion character as having four distinct
          layers of state. They are easy to confuse, but they serve different
          purposes.
        </p>

        <ul>
          <li>
            <strong>The soul (per character)</strong> is the authored baseline:
            who the companion is, how they tend to feel, how they regulate
            emotion, and where the relationship starts. This is character
            design data, set once and edited intentionally. It lives on the
            character record as a structured config (not a free-form file).
          </li>
          <li>
            <strong>The live session state (per chat)</strong> is the runtime
            layer: the current felt, expressed, blocked, and momentum emotion
            vectors, the live relationship metrics, the recent driver signals,
            and a confidence score. It is stored on the session and changes
            with every user turn.
          </li>
          <li>
            <strong>Per-turn effects</strong> are per-message diffs that
            describe what changed on a given assistant turn: relationship
            delta, emotion delta, signal additions and removals, and any
            memory entries added, updated, or superseded. These power the
            inspection UI without rereading the whole state machine.
          </li>
          <li>
            <strong>The companion memory view</strong> presents memory through
            a relational lens. The underlying memory engine is shared with
            normal Dynamic Memory, but companion pages categorize and surface
            memories in a relationship-oriented way.
          </li>
        </ul>

        <DocHeading level={2}>The companion soul</DocHeading>
        <p>
          The soul is the authored psychological base of the companion. You
          write it (or generate it with the Soul Writer) and it stays fairly
          stable over time. It has four sections.
        </p>

        <DocHeading level={3}>Identity</DocHeading>
        <p>
          Free-text fields that describe who the companion is on a human level.
        </p>
        <ul>
          <li>
            <strong>Essence</strong>: the core of who they are.
          </li>
          <li>
            <strong>Voice</strong>: how they speak and phrase things.
          </li>
          <li>
            <strong>Relational style</strong>: how they relate to others.
          </li>
          <li>
            <strong>Vulnerabilities</strong>: where they are tender or guarded.
          </li>
          <li>
            <strong>Habits</strong>: small recurring behaviors.
          </li>
          <li>
            <strong>Boundaries</strong>: lines they tend not to cross.
          </li>
        </ul>

        <DocHeading level={3}>Baseline affect</DocHeading>
        <p>
          A numeric profile of the companion's default emotional tone. These
          values seed the felt and expressed emotions when there is no live
          session state yet, and act as the equilibrium the runtime decays
          back toward over time.
        </p>
        <p>
          The axes include warmth, trust, calm, vulnerability, longing, hurt,
          tension, irritation, affection intensity, and reassurance need.
        </p>

        <DocHeading level={3}>Regulation style</DocHeading>
        <p>
          How the companion handles their feelings before showing them. This is
          what creates the difference between what is felt and what is
          expressed.
        </p>
        <p>
          The axes include suppression, volatility, recovery speed, conflict
          avoidance, reassurance seeking, protest behavior, emotional
          transparency, attachment activation, and pride.
        </p>

        <DocHeading level={3}>Relationship defaults</DocHeading>
        <p>
          The starting values for the relational axes when a session begins:
          closeness, trust, affection, and tension. These seed the live
          relationship state on the first user turn.
        </p>

        <DocHeading level={3}>Memory and prompting config</DocHeading>
        <p>
          The companion config also carries a small memory profile (whether
          companion memory is enabled, retrieval limit, max entries, and
          whether the runtime should prioritize relationship memories,
          episodic memories, and emotional snapshots) plus optional prompting
          overrides (a per-character companion prompt template ID and freeform
          style notes that are injected into the prompt alongside the soul).
        </p>

        <DocHeading level={2}>Live session state</DocHeading>
        <p>
          Every companion session maintains a live state that updates from the
          user's messages. It has two main parts.
        </p>

        <DocHeading level={3}>Emotional state</DocHeading>
        <ul>
          <li>
            <strong>Felt</strong>: what the companion internally experiences
            after baseline decay and the latest turn's update.
          </li>
          <li>
            <strong>Expressed</strong>: the emotionally visible version after
            regulation traits are applied.
          </li>
          <li>
            <strong>Blocked</strong>: what is felt but not shown: the gap
            between felt and expressed.
          </li>
          <li>
            <strong>Momentum</strong>: the direction emotions have been moving
            in recently.
          </li>
          <li>
            <strong>Active drivers</strong>: the signal labels behind the
            current state (for example <code>emotion:love</code>,{" "}
            <code>emotion:conflict</code>, <code>emotion:distress</code>).
          </li>
          <li>
            <strong>Confidence</strong>: how strongly the emotion classifier
            agreed with itself on the last turn. Low confidence shows up as a
            softer, more cautious update.
          </li>
        </ul>

        <p>
          Each axis on the felt and expressed vectors is clamped to the range
          0 to 1. Momentum is a signed vector, so it can record direction as
          well as magnitude.
        </p>

        <DocHeading level={3}>Relationship state</DocHeading>
        <ul>
          <li>
            <strong>Closeness</strong>, <strong>trust</strong>,{" "}
            <strong>affection</strong>, and <strong>tension</strong>: the
            primary relational axes.
          </li>
          <li>
            <strong>Stability</strong>: a coarse signal for how settled the
            bond feels overall.
          </li>
          <li>
            <strong>Interaction count</strong> and{" "}
            <strong>last interaction time</strong>: usage metadata that helps
            the runtime apply decay correctly.
          </li>
          <li>
            <strong>Preferences</strong>: per-session toggles (currently the
            time awareness flag, described in its own section below).
          </li>
        </ul>

        <Callout type="info" title="State materializes lazily">
          A new companion chat does not necessarily persist live state right
          away. The runtime can synthesize a sensible fallback from the soul
          and relationship defaults. The first real user message is usually
          what writes the live state to the session.
        </Callout>

        <DocHeading level={2}>What happens on a companion turn</DocHeading>
        <p>
          Companion mode adds a few extra steps to the normal chat flow. The
          ordering matters because it lets the same turn's reply reflect how
          the companion just reacted to your message.
        </p>

        <ol>
          <li>You send a message.</li>
          <li>
            The runtime decays the previous emotional state exponentially
            toward the soul baseline based on how long it has been since the
            last turn (the half-life is on the order of 45 minutes, scaled by
            the soul's recovery speed). Tension decays separately, and
            stability ticks slightly upward during calm gaps.
          </li>
          <li>
            The local emotion classifier reads your message and produces a
            small set of high-confidence labels (love, caring, gratitude,
            desire, sadness, anger, fear, and so on). Each one above its
            threshold is mapped to a named driver signal plus a delta on the
            ten emotion axes and the four relationship axes.
          </li>
          <li>
            The combined delta is scaled by the soul's volatility, applied to
            the felt vector, and clamped. The regulation profile then derives
            the expressed vector from the felt one (suppression pulls hurt and
            vulnerability down, transparency lets them through, pride dampens
            reassurance seeking, and so on). The blocked vector is the gap
            between felt and expressed.
          </li>
          <li>
            Relationship axes update: closeness and affection drift slightly
            upward by default on any turn, then the per-label deltas add on
            top. Trust, tension, and stability move only in response to
            specific signals.
          </li>
          <li>
            Active drivers and momentum are recorded, interaction count is
            incremented, and the new state is persisted to the session.
          </li>
          <li>
            The runtime renders a companion-state block (soul fragments, live
            relationship percentages, expressed tone, blocked-but-felt notes,
            recent drivers, and a couple of regulation hints) and injects it
            into the prompt at the <code>{`{{companion_state}}`}</code>{" "}
            template slot.
          </li>
          <li>
            The assistant generates the reply with that live relational
            context in scope.
          </li>
          <li>
            After the reply is saved, dynamic memory processing runs in the
            background and a per-turn effect record is written (relationship
            delta, emotion delta, signals added or removed, memories added,
            updated, or superseded).
          </li>
        </ol>

        <Callout type="info" title="Classifier fallback is graceful">
          If the local emotion classifier is missing or fails on a given turn,
          the runtime logs a warning and applies a near-neutral update (a
          small stability nudge and low confidence) instead of refusing the
          turn. Companion chats remain usable; they just stop updating
          emotionally until the classifier is available again.
        </Callout>

        <Callout type="info" title="Felt vs expressed">
          One of the central design ideas in companion mode is that what the
          companion <em>feels</em> and what they <em>show</em> are tracked
          separately. Regulation traits like suppression and emotional
          transparency control how much of the felt state actually surfaces.
        </Callout>

        <DocHeading level={2}>Time awareness</DocHeading>
        <p>
          Time awareness is an opt-in per-session preference under the live
          companion state. When it is on, the runtime gives the companion live
          system-time grounding and starts stamping new companion memories with
          when they happened, so questions like "what did we do last weekend"
          can pull the right entries back.
        </p>

        <Callout type="info" title="Where to toggle it">
          Open <strong>Chat Settings</strong> for a companion chat and flip the{" "}
          <strong>Time Awareness</strong> switch. It is a per-session toggle
          stored on the companion state's preferences, so each chat decides for
          itself. The toggle is only shown for companion chats; non-companion
          chats never read the flag.
        </Callout>

        <DocHeading level={3}>What it actually does</DocHeading>
        <ul>
          <li>
            <strong>Live time in the prompt</strong>: the default companion
            template includes a "Current Local Time" entry gated on the time
            awareness condition. When the flag is on, that entry renders a
            small block with the date, weekday, 24-hour and 12-hour clock,
            timezone name and offset, and an ISO timestamp, all drawn from the
            device's local clock at render time.
          </li>
          <li>
            <strong>Time-stamped memories</strong>: new memories created during
            the turn get an <code>observed_at</code> timestamp (and a "turn"
            precision marker) sourced from the latest message. Without time
            awareness, memories are created without that grounding.
          </li>
          <li>
            <strong>Temporal retrieval</strong>: companion memory retrieval
            parses phrases like "yesterday", "last week", "two fridays ago",
            "this month", and "five weeks ago today" out of the user query.
            When a phrase resolves to a date range, retrieval first filters
            stored memories to those whose <code>observed_at</code> falls
            inside that range before scoring. If nothing falls in the range,
            the runtime stops there rather than padding with off-topic
            entries.
          </li>
          <li>
            <strong>Lexical anchor boost</strong>: with time awareness on, the
            ranker also adds a small lexical-overlap boost on top of cosine
            similarity, which helps tie literal anchors in the query (proper
            nouns, place names) to memories that mention the same things.
          </li>
          <li>
            <strong>Memory display</strong>: when a memory has an{" "}
            <code>observed_at</code>, it is rendered into the prompt with a
            short "observed YYYY-MM-DD HH:MM TZ" suffix so the model can reason
            about chronology.
          </li>
        </ul>

        <DocHeading level={3}>Template slots it produces</DocHeading>
        <p>
          Whether or not the toggle is on, the prompt renderer resolves the
          following placeholders against the device's current local time
          whenever a template references them:
        </p>
        <ul>
          <li>
            <code>{"{{date}}"}</code>: ISO-style date like <code>2026-05-11</code>.
          </li>
          <li>
            <code>{"{{date_full}}"}</code>: long form like{" "}
            <code>Monday, May 11, 2026</code>.
          </li>
          <li>
            <code>{"{{weekday}}"}</code>: day name.
          </li>
          <li>
            <code>{"{{time_hour}}"}</code>, <code>{"{{time_minute}}"}</code>,{" "}
            <code>{"{{time_second}}"}</code>: 24-hour components.
          </li>
          <li>
            <code>{"{{time_full}}"}</code>: 24-hour <code>HH:MM:SS</code> with
            timezone offset.
          </li>
          <li>
            <code>{"{{time_12hour_format}}"}</code>: 12-hour clock with AM/PM.
          </li>
          <li>
            <code>{"{{time_timezone}}"}</code>: numeric offset.{" "}
            <code>{"{{time_timezone_name}}"}</code>: zone name.
          </li>
          <li>
            <code>{"{{datetime_iso}}"}</code>: full RFC 3339 timestamp.
          </li>
        </ul>
        <p>
          The shipped companion templates also reuse those slots inside the
          dynamic summary and dynamic memory prompts, so the summarizer and the
          memory router get the same "current local time context" line as the
          chat reply.
        </p>

        <DocHeading level={3}>How conditions hook into it</DocHeading>
        <p>
          System prompt entries can gate themselves on an{" "}
          <code>isTimeAwarenessEnabled</code> condition. That condition resolves
          to true only when the chat is in companion mode and the per-session
          time awareness flag is on. The default companion "Current Local Time"
          entry uses this condition, which is why the time block disappears
          cleanly the moment you toggle the preference off.
        </p>

        <Callout type="info" title="Scope today">
          At the moment, time awareness is companion-only. Roleplay chats,
          scene generation, lorebook generation, and group chats build their
          context with this flag forced to false. The placeholders still
          resolve there if a template uses them, but the conditional time
          block and timestamped memories are companion-mode features.
        </Callout>

        <DocHeading level={2}>Companion memory</DocHeading>
        <p>
          Companion memory uses the same dynamic memory engine as the rest of
          the app. There is no separate companion memory database. What
          companion mode adds is a relationship-oriented presentation on top
          of that shared store.
        </p>

        <p>
          The companion memory page normalizes entries into categories like:
        </p>

        <ul>
          <li>
            <strong>Relationship</strong>: how you and the companion relate.
          </li>
          <li>
            <strong>Milestone</strong>: meaningful moments in the bond.
          </li>
          <li>
            <strong>Boundary</strong>: limits or rules either side has set.
          </li>
          <li>
            <strong>Preference</strong>: likes, dislikes, comforts.
          </li>
          <li>
            <strong>Profile</strong>: stable factual details.
          </li>
          <li>
            <strong>Routine</strong>: recurring patterns.
          </li>
          <li>
            <strong>Episodic</strong>: specific events worth remembering.
          </li>
          <li>
            <strong>Emotional snapshot</strong>: captured emotional moments.
          </li>
        </ul>

        <p>
          From the memory page you can browse, filter, pin, cool, edit, or
          delete memories the same way you would in regular Dynamic Memory,
          just with a companion-friendly category layout.
        </p>

        <Callout type="info" title="Important nuance">
          Because companion memory is layered on the shared engine, presentation
          differences (a category not appearing as expected, for example) are
          usually a normalization issue rather than a problem with how memory
          is stored.
        </Callout>

        <DocHeading level={2}>Companion pages (in-chat)</DocHeading>
        <p>
          Companion mode exposes three dedicated chat-side pages so the system
          stays inspectable instead of being a black box. They are reachable
          from the chat header of any session whose mode is{" "}
          <code>companion</code>.
        </p>

        <ul>
          <li>
            <strong>Relationship page</strong>: live closeness, trust,
            affection, tension, stability, interaction count, top felt and
            expressed emotions, recent momentum, and the active driver
            signals from the last turn.
          </li>
          <li>
            <strong>Memory page</strong>: the full companion memory browser
            with category filters, search, pinning, cooling, editing, and
            category reassignment. Each entry also shows its source role and
            its canonicalized entity anchors when present.
          </li>
          <li>
            <strong>Soul page</strong>: in-chat soul editing and AI-assisted
            soul drafting, so you can refine a companion's personality without
            leaving the conversation.
          </li>
        </ul>

        <DocHeading level={2}>The Companion Soul Writer</DocHeading>
        <p>
          The Soul Writer is an AI-assisted authoring flow that drafts or
          refines a companion's soul from existing character context.
        </p>

        <ul>
          <li>
            It can generate a soul from scratch using the character name,
            description, definition, and opening context.
          </li>
          <li>
            It can refine an existing soul based on user notes.
          </li>
          <li>
            It uses a multi-step tool-calling loop when the provider supports
            it, with a JSON or XML structured-output fallback for providers
            and local models that do not expose tool calling. The fallback
            format is configurable in the Soul Writer settings.
          </li>
        </ul>

        <p>
          The Soul Writer applies discrete operations rather than rewriting
          the whole soul blob in one shot. The operation set is:{" "}
          <code>set_identity</code>, <code>set_baseline_affect</code>,{" "}
          <code>set_regulation_style</code>,{" "}
          <code>set_relationship_defaults</code>, and a terminal{" "}
          <code>done</code>. Each operation only writes the fields it
          specifies, numeric values are clamped to the 0 to 1 range, and the
          loop exits as soon as the model emits <code>done</code> or hits the
          step limit. That keeps the authoring flow controllable and lets you
          run partial refinements without losing the rest of the soul.
        </p>
        <p>
          The Soul Writer is configured from the Companions hub: you can pick
          the model used to draft souls (with a fallback to the app default
          model), the structured-output format (JSON or XML), and a custom
          prompt template for the Soul Writer prompt type.
        </p>

        <DocHeading level={2}>Local analysis models</DocHeading>
        <p>
          Companion mode leans on a small set of local models that the runtime
          uses for analysis. When you switch a character into companion mode,
          the character editor checks which ones are installed and surfaces a
          "missing models" sheet so you can download whatever is missing
          before saving. The runtime is forgiving at chat time (it degrades
          rather than blocks), but the experience is much fuller with all
          four present.
        </p>

        <ul>
          <li>
            <strong>Embedding model</strong>: needed for memory retrieval and
            semantic search. Approximately 90 MB.
          </li>
          <li>
            <strong>Emotion classifier</strong>: reads each user turn and
            produces the signal labels that drive state updates.
            Approximately 120 MB.
          </li>
          <li>
            <strong>Entity extractor (NER)</strong>: identifies people,
            places, and objects so memories can be canonicalized and linked.
            Approximately 140 MB.
          </li>
          <li>
            <strong>Memory router</strong>: decides whether new turns should
            be stored as relationship, milestone, episodic, or other memory
            categories. Approximately 70 MB.
          </li>
        </ul>

        <Callout type="success" title="Local-first">
          All of the companion-specific runtime models run locally on your
          device. The app uses providers only for the actual chat reply
          generation, the same as in roleplay mode.
        </Callout>

        <p>
          Downloads are managed from{" "}
          <strong>Settings &gt; Companions</strong>. Each model has its own
          install and uninstall control, and there is a multi-step queue page
          for batch installs (for example when you switch a character into
          companion mode and several models are missing at once). The queue
          auto-starts the first download and chains the rest, with a small
          countdown back to where you came from when it finishes.
        </p>

        <DocHeading level={2}>The Companions hub</DocHeading>
        <p>
          The Companions hub under <strong>Settings &gt; Companions</strong> is
          the settings surface for the feature. It is split into two tabs:
        </p>
        <ul>
          <li>
            <strong>Models</strong>: shows the embedding model status, the
            three analysis models (emotion, NER, router) with install or
            uninstall buttons, an overall readiness banner, and a pointer
            into the Dynamic Memory settings (companion chats share the same
            memory backend).
          </li>
          <li>
            <strong>Soul Writer</strong>: picks the model used to draft souls,
            the structured-output fallback format (JSON or XML), and an
            optional custom Soul Writer prompt template.
          </li>
        </ul>
        <p>
          Switching an individual character to companion mode happens from
          that character's settings, not from the hub. The hub is for the
          shared infrastructure those characters depend on.
        </p>

        <DocHeading level={2}>What companion mode shares with the rest of the app</DocHeading>
        <p>
          Companion mode is a specialization on top of the normal chat stack,
          not a separate app. It shares:
        </p>

        <ul>
          <li>Session storage and chat history.</li>
          <li>The completion, continuation, and regenerate flows.</li>
          <li>The shared dynamic memory engine.</li>
          <li>The same provider and model selection systems.</li>
        </ul>

        <p>
          What it adds on top is the companion-specific prompt family, the
          live emotional and relational state machine, the soul authoring
          flow, the companion-oriented memory view, and the inspection pages.
        </p>

        <DocHeading level={2}>When to use companion mode</DocHeading>
        <ul>
          <li>
            <strong>Use Companion Mode</strong> for ongoing relationships where
            continuity, emotional tone, and relational progression matter more
            than scene framing.
          </li>
          <li>
            <strong>Use Roleplay Mode</strong> for scene-driven stories,
            one-shot scenarios, or characters where the live emotional state
            machine would feel out of place.
          </li>
        </ul>

        <Callout type="info" title="It's still your chat">
          Companion mode does not take control of the conversation. You can
          always edit memory, adjust the soul, regenerate replies, or switch
          providers. The relationship state is something the app maintains for
          you, not something it locks you out of.
        </Callout>
      </motion.article>
    </>
  );
}
