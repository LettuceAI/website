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

        <DocHeading level={2}>The three pieces of companion state</DocHeading>
        <p>
          It helps to think of a companion character as having three distinct
          layers of state. They are easy to confuse, but they serve different
          purposes.
        </p>

        <ul>
          <li>
            <strong>The soul</strong> is the authored baseline: who the
            companion is, how they tend to feel, how they regulate emotion, and
            where the relationship starts. This is character design data, set
            once and edited intentionally.
          </li>
          <li>
            <strong>The live session state</strong> is the runtime layer: the
            current felt and expressed emotions, what is being suppressed,
            recent emotional momentum, and the current relationship metrics.
            This changes with every user turn.
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
            <strong>Blocked</strong>: what is felt but not shown — the gap
            between felt and expressed.
          </li>
          <li>
            <strong>Momentum</strong>: the direction emotions have been moving
            in recently.
          </li>
          <li>
            <strong>Active drivers</strong>: the signal labels behind the
            current state.
          </li>
        </ul>

        <DocHeading level={3}>Relationship state</DocHeading>
        <ul>
          <li>
            <strong>Closeness</strong>, <strong>trust</strong>,{" "}
            <strong>affection</strong>, and <strong>tension</strong> — the
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
            The runtime decays the previous emotional and relationship state
            slightly toward the soul baseline.
          </li>
          <li>
            A local emotion classifier reads your message and produces signals
            (affection, distress, conflict, desire, and so on).
          </li>
          <li>
            Those signals nudge the felt emotions, then the regulation profile
            shapes them into what the companion will actually express.
          </li>
          <li>
            Relationship axes update: closeness and affection may grow, trust
            shifts, tension may rise or recover.
          </li>
          <li>
            The updated state is rendered into a companion-state block and
            injected into the prompt.
          </li>
          <li>
            The assistant generates the reply with that live relational
            context in scope.
          </li>
          <li>
            After the reply is saved, dynamic memory processing runs in the
            background.
          </li>
        </ol>

        <Callout type="info" title="Felt vs expressed">
          One of the central design ideas in companion mode is that what the
          companion <em>feels</em> and what they <em>show</em> are tracked
          separately. Regulation traits like suppression and emotional
          transparency control how much of the felt state actually surfaces.
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
            <strong>Relationship</strong> — how you and the companion relate.
          </li>
          <li>
            <strong>Milestone</strong> — meaningful moments in the bond.
          </li>
          <li>
            <strong>Boundary</strong> — limits or rules either side has set.
          </li>
          <li>
            <strong>Preference</strong> — likes, dislikes, comforts.
          </li>
          <li>
            <strong>Profile</strong> — stable factual details.
          </li>
          <li>
            <strong>Routine</strong> — recurring patterns.
          </li>
          <li>
            <strong>Episodic</strong> — specific events worth remembering.
          </li>
          <li>
            <strong>Emotional snapshot</strong> — captured emotional moments.
          </li>
        </ul>

        <p>
          From the memory page you can browse, filter, pin, cool, edit, or
          delete memories the same way you would in regular Dynamic Memory —
          just with a companion-friendly category layout.
        </p>

        <Callout type="info" title="Important nuance">
          Because companion memory is layered on the shared engine, presentation
          differences (a category not appearing as expected, for example) are
          usually a normalization issue rather than a problem with how memory
          is stored.
        </Callout>

        <DocHeading level={2}>Companion pages</DocHeading>
        <p>
          Companion mode exposes three dedicated chat-side pages so the system
          stays inspectable instead of being a black box.
        </p>

        <ul>
          <li>
            <strong>Relationship page</strong>: live closeness, trust,
            affection, tension, top felt and expressed emotions, and a
            relationship-oriented memory timeline.
          </li>
          <li>
            <strong>Memory page</strong>: the full companion memory browser
            with category filters, pinning, cooling, and editing.
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
            It uses a tool-calling flow when supported, with a JSON or XML
            structured-output fallback for providers and local models that
            don't expose tool calling.
          </li>
        </ul>

        <p>
          The Soul Writer applies discrete operations — set identity, set
          baseline affect, set regulation style, set relationship defaults —
          rather than rewriting the whole soul blob in one go. That keeps the
          authoring flow controllable.
        </p>

        <DocHeading level={2}>Required local models</DocHeading>
        <p>
          Companion mode is gated by a small set of local models that the
          runtime needs in order to do its work. When you switch a character
          into companion mode, the app will check for these and prompt you to
          download whatever is missing.
        </p>

        <ul>
          <li>
            <strong>Embedding model</strong> — needed for memory retrieval and
            semantic search.
          </li>
          <li>
            <strong>Emotion classifier</strong> — reads each user turn and
            produces the signal labels that drive state updates.
          </li>
          <li>
            <strong>NER model</strong> — entity extraction for memory
            canonicalization.
          </li>
          <li>
            <strong>Router model</strong> — local routing for memory
            categorization decisions.
          </li>
        </ul>

        <Callout type="success" title="Local-first">
          All of the companion-specific runtime models run locally on your
          device. The app uses providers only for the actual chat reply
          generation, the same as in roleplay mode.
        </Callout>

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
