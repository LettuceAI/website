import { Callout } from "@/components/docs/Callout";
import { DocHeading } from "@/components/docs/DocHeading";
import { DocImage } from "@/components/docs/DocImage";
import { images } from "@/config/images";
import { motion } from "framer-motion";
import { SEO } from "@/components/common/SEO";
import { buildBreadcrumbSchema } from "@/config/schemas";

export function MemoryDoc() {
  return (
    <>
    <SEO
      title="Memory System"
      description="Keep long conversations coherent with manual or dynamic memory using embedding-based retrieval and automatic maintenance."
      path="/docs/memory"
      jsonLd={buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Docs", path: "/docs" },
        { name: "Memory System", path: "/docs/memory" },
      ])}
    />
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="prose prose-invert max-w-none"
    >
      <DocHeading level={1}>Memory System</DocHeading>

      <p className="lead">
        LettuceAI keeps long conversations coherent by separating recent chat
        context from long-term memory. It does not replay your entire history on
        every turn.
      </p>

      <DocHeading level={2}>Memory in plain English</DocHeading>
      <p>
        Memory is how LettuceAI helps the AI remember important old details
        without resending your entire chat every time.
      </p>

      <ul>
        <li>
          <strong>Manual Memory</strong>: you write fixed notes and the AI sees
          them every turn
        </li>
        <li>
          <strong>Dynamic Memory</strong>: the app tries to pull back the most
          relevant old details automatically
        </li>
      </ul>

      <Callout type="info" title="What most users need to know">
        If you want simple control, use Manual Memory. If you want longer chats
        with less babysitting, use Dynamic Memory. The deeper retrieval and
        maintenance details below are mostly for advanced users.
      </Callout>

      <p>
        There are two operating modes. Manual Memory is explicit and
        predictable. Dynamic Memory is selective: it stores many facts
        internally, retrieves only the most useful ones per turn, and
        periodically maintains that memory set in the background.
      </p>

      <Callout type="info" title="Direct and group chats">
        Direct chats and group chats can use different Dynamic Memory settings.
        Direct chats also depend on the character using Dynamic Memory, while
        group chats use the memory mode selected for that group session.
      </Callout>

      <DocHeading level={2}>Modes at a glance</DocHeading>

      <table className="min-w-full text-sm my-6">
        <thead>
          <tr className="border-b border-border/50">
            <th className="text-left py-2 px-4">Mode</th>
            <th className="text-left py-2 px-4">How it works</th>
            <th className="text-left py-2 px-4">Best for</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-border/10">
            <td className="py-2 px-4 font-medium">Manual</td>
            <td className="py-2 px-4">
              You maintain a fixed list of memories that is injected every turn.
            </td>
            <td className="py-2 px-4">
              Short chats, strict control, small stable fact sets.
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 font-medium">Dynamic</td>
            <td className="py-2 px-4">
              LettuceAI stores embeddings, retrieves relevant items, and runs a
              maintenance cycle every few new messages.
            </td>
            <td className="py-2 px-4">
              Long-running chats, roleplay continuity, lower prompt growth.
            </td>
          </tr>
        </tbody>
      </table>

      <DocHeading level={2}>Manual Memory</DocHeading>
      <p>
        Manual Memory behaves like a fixed note sheet. The model sees the full
        manual memory list on every turn, alongside the recent conversation
        window.
      </p>

      <ul>
        <li>You write the memories yourself.</li>
        <li>The list stays stable until you edit or delete it.</li>
        <li>Prompt cost grows with the number and size of manual memories.</li>
      </ul>

      <DocHeading level={2}>Dynamic Memory</DocHeading>
      <p>
        Dynamic Memory is not one giant prompt block. It is a small local memory
        subsystem with three main pieces of state:
      </p>

      <Callout type="info" title="Quick translation">
        If terms like <strong>embeddings</strong>,{" "}
        <strong>semantic retrieval</strong>, or <strong>cosine mode</strong>{" "}
        sound too technical, the simple version is: the app compares meaning,
        tries to find relevant old memories, and injects only the useful ones.
      </Callout>

      <ul>
        <li>
          <strong>Memory entries</strong>: short factual items with embeddings,
          heat state, access counts, optional pinning, and a category tag.
        </li>
        <li>
          <strong>Context summary</strong>: a compressed summary of processed
          conversation windows.
        </li>
        <li>
          <strong>Memory events</strong>: a log of each maintenance cycle so the
          app knows what range of messages has already been processed.
        </li>
      </ul>

      <DocImage
        src={images.memory.memoryStateOverview}
        alt="Diagram showing the three main pieces of Dynamic Memory state"
        caption="Dynamic Memory keeps three kinds of state: the memory entries themselves, a rolling context summary, and a cycle log that tracks processed ranges."
        containerClassName="mx-auto max-w-5xl"
        className="mx-auto max-h-[16rem] object-contain md:max-h-[20rem]"
      />

      <DocHeading level={3}>What happens on each chat turn</DocHeading>
      <p>
        When you send a message, LettuceAI first builds the normal prompt from
        recent conversation, system prompts, persona data, and lorebook content.
        If Dynamic Memory is active, it also runs memory retrieval.
      </p>

      <ul>
        <li>
          By default, retrieval uses a <strong>smart</strong> strategy: semantic
          search over hot memories plus a small recency/frequency bias.
        </li>
        <li>
          You can switch to <strong>cosine</strong> mode for pure similarity
          ranking.
        </li>
        <li>
          Only the retrieved memories are injected into the prompt, not the full
          memory database.
        </li>
        <li>
          Retrieved memories are marked as accessed, which refreshes their heat
          and can promote cold items back to hot.
        </li>
      </ul>

      <DocImage
        src={images.memory.memoryTurnFlow}
        alt="Diagram showing the per-turn Dynamic Memory flow"
        caption="Per-turn retrieval is narrow: build the prompt, pull only relevant memories if Dynamic Memory is active, send the final prompt, then save the reply."
        containerClassName="mx-auto max-w-5xl"
        className="mx-auto max-h-[16rem] object-contain md:max-h-[20rem]"
      />

      <DocHeading level={3}>Hot vs cold memory</DocHeading>
      <p>
        Each dynamic entry has an importance score. Hot memories are eligible
        for semantic retrieval. Cold memories remain stored but are normally
        excluded from semantic search.
      </p>

      <ul>
        <li>
          <strong>Hot</strong>: active working memory for semantic retrieval.
        </li>
        <li>
          <strong>Cold</strong>: archived locally and available mainly through
          keyword fallback.
        </li>
        <li>
          <strong>Pinned</strong>: protected from decay and forced to stay hot.
        </li>
      </ul>

      <p>
        Cooling does not delete a memory by itself. It only changes whether the
        entry participates in normal semantic retrieval.
      </p>

      <DocImage
        src={images.memory.memoryHeatLifeCycle}
        alt="Diagram showing how a memory moves between hot and cold states"
        caption="Heat changes over time. Retrieved memories stay fresh, neglected ones cool down, and cold memories can become hot again when they are found later."
        containerClassName="mx-auto max-w-5xl"
        className="mx-auto max-h-[18rem] object-contain md:max-h-[22rem]"
      />

      <DocHeading level={3}>How retrieval actually works</DocHeading>
      <p>
        The retrieval path is more selective than older descriptions of the
        system.
      </p>

      <ol>
        <li>
          The app embeds the search query locally. With context enrichment
          enabled, that query can include more than just the latest message.
        </li>
        <li>
          It searches <strong>hot and pinned</strong> memories semantically.
        </li>
        <li>
          In smart mode, it may also surface a recent hot memory or a frequently
          used hot memory to stabilize recall.
        </li>
        <li>
          If nothing useful is found, it falls back to a keyword scan over{" "}
          <strong>cold</strong> memories.
        </li>
        <li>Any cold memory that is retrieved becomes hot again.</li>
      </ol>

      <DocImage
        src={images.memory.memoryRetrievalFlow}
        alt="Diagram showing the retrieval decision path"
        caption="The retrieval pass starts with semantic search over hot memories and only falls back to cold-storage keyword matching when the semantic pass comes up empty."
        containerClassName="mx-auto max-w-6xl"
        className="mx-auto max-h-[24rem] object-contain md:max-h-[28rem]"
      />

      <Callout type="info" title="Important">
        Dynamic Memory does not search every stored memory semantically on every
        turn. The hot/cold split is a core part of how it stays fast and cheap.
      </Callout>

      <DocHeading level={3}>Time-aware retrieval (companion mode)</DocHeading>
      <p>
        When a companion chat has time awareness enabled, retrieval gets an
        extra step before scoring. The runtime parses temporal phrases out of
        the search query (things like "yesterday", "last week", "this month",
        "two fridays ago", "five weeks ago today", "in the last three days")
        and resolves them to a local date range.
      </p>
      <ul>
        <li>
          If a range is detected, retrieval first narrows candidates to
          memories whose <code>observed_at</code> timestamp falls inside that
          range, then ranks them. If nothing falls in the range, retrieval
          returns empty rather than padding with off-topic entries.
        </li>
        <li>
          When time awareness is on, new memories created during a turn are
          stamped with an <code>observed_at</code> taken from the latest
          message, which is what makes temporal filtering possible later.
          Without it, memories carry no event timestamp.
        </li>
        <li>
          The ranker also adds a small lexical-overlap boost on top of cosine
          similarity, so concrete anchors in the query (names, places) reliably
          surface memories that mention the same things.
        </li>
        <li>
          Memories that have an <code>observed_at</code> are rendered into the
          prompt with a short "observed YYYY-MM-DD HH:MM TZ" suffix.
        </li>
      </ul>
      <p>
        Time-aware retrieval is companion-only today. Non-companion chats and
        roleplay flows skip the temporal phrase parser and run plain semantic
        retrieval. See <strong>Companion Mode</strong> for the per-session
        toggle and the time placeholder list.
      </p>

      <DocHeading level={3}>Background maintenance cycle</DocHeading>
      <p>
        Retrieval happens every turn. Memory maintenance does not. Instead, the
        app waits until enough new user or assistant messages have accumulated
        since the last processed window.
      </p>

      <ol>
        <li>
          After the configured message interval, LettuceAI selects the next
          unsummarized conversation window.
        </li>
        <li>
          A summarisation model generates a merged summary for that new window.
        </li>
        <li>
          A tool-driven pass can <strong>create</strong>,{" "}
          <strong>delete</strong>, <strong>pin</strong>, or{" "}
          <strong>unpin</strong> memory entries.
        </li>
        <li>
          The app stores the updated summary, the new memory set, and the event
          cursor so the next cycle continues from the right point.
        </li>
      </ol>

      <p>
        Manual retries can force another maintenance pass even if the normal
        interval has not been reached yet.
      </p>

      <Callout type="info" title="Structured fallback format">
        Some models do not reliably emit tool calls during the memory pass. When
        that happens, LettuceAI falls back to a structured text format (XML by
        default, JSON optional) so it can still extract memory create, delete,
        pin, and unpin actions from the model output.
      </Callout>

      <DocImage
        src={images.memory.memoryMaintenanceCycle}
        alt="Diagram showing the Dynamic Memory maintenance cycle"
        caption="The background cycle is separate from the live chat turn: it summarizes a new window, runs memory tools, and advances the stored cursor."
        containerClassName="mx-auto max-w-5xl"
        className="mx-auto max-h-[18rem] object-contain md:max-h-[22rem]"
      />

      <DocHeading level={3}>Decay, budgets, and deletion</DocHeading>
      <p>Dynamic Memory uses multiple controls, not just one:</p>

      <ul>
        <li>
          <strong>Decay rate</strong>: lowers the importance of hot, unpinned
          memories across maintenance cycles.
        </li>
        <li>
          <strong>Cold threshold</strong>: entries below this threshold move to
          cold storage.
        </li>
        <li>
          <strong>Hot memory token budget</strong>: if too many hot memories are
          active, older unpinned ones are demoted to cold.
        </li>
        <li>
          <strong>Max entries</strong>: if the memory set grows too large, the
          least recently used unpinned memories can be trimmed entirely.
        </li>
      </ul>

      <p>
        That last point matters: Dynamic Memory can delete or soft-delete
        entries during maintenance. Cooling alone is not deletion, but the full
        system is allowed to remove memories when it decides they are stale,
        wrong, or lower priority than newer ones.
      </p>

      <DocHeading level={2}>Embedding models</DocHeading>
      <p>
        Dynamic Memory depends on a local embedding model so the app can compare
        meaning, not just exact wording.
      </p>

      <p>
        <strong>v4</strong> is the current default. Older <strong>v1</strong>,{" "}
        <strong>v2</strong>, and <strong>v3</strong> installs may still exist
        on some devices, but they are now legacy variants.
      </p>

      <table className="min-w-full text-sm my-6">
        <thead>
          <tr className="border-b border-border/50">
            <th className="text-left py-2 px-4">Version</th>
            <th className="text-left py-2 px-4">Status</th>
            <th className="text-left py-2 px-4">Context support</th>
            <th className="text-left py-2 px-4">Notes</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-border/10">
            <td className="py-2 px-4 font-medium">v1</td>
            <td className="py-2 px-4">Legacy</td>
            <td className="py-2 px-4">512 tokens</td>
            <td className="py-2 px-4">
              Oldest model. Limited long-context support.
            </td>
          </tr>
          <tr className="border-b border-border/10">
            <td className="py-2 px-4 font-medium">v2</td>
            <td className="py-2 px-4">Legacy</td>
            <td className="py-2 px-4">Up to 4096 tokens</td>
            <td className="py-2 px-4">
              Major improvement over v1.
            </td>
          </tr>
          <tr className="border-b border-border/10">
            <td className="py-2 px-4 font-medium">v3</td>
            <td className="py-2 px-4">Legacy</td>
            <td className="py-2 px-4">Up to 4096 tokens</td>
            <td className="py-2 px-4">
              Previous default. Still works, but v4 is preferred for new
              installs.
            </td>
          </tr>
          <tr>
            <td className="py-2 px-4 font-medium">v4</td>
            <td className="py-2 px-4">Current default</td>
            <td className="py-2 px-4">Up to 4096 tokens</td>
            <td className="py-2 px-4">
              768-dimension model. Recommended for new installs and upgrades.
            </td>
          </tr>
        </tbody>
      </table>

      <p>
        On v3 and v4, you can set the local embedding capacity anywhere between
        512 and 4096 tokens depending on your memory quality and performance
        preferences.
      </p>

      <DocHeading level={3}>Downloading the embedding model</DocHeading>
      <p>
        Embedding models run on your device, so they have to be downloaded
        before Dynamic Memory can work. The embedding download page walks you
        through this in two steps:
      </p>

      <ol>
        <li>
          <strong>Pick a capacity</strong>: choose how many tokens of context
          the local model should support per memory.
          <ul className="mt-2">
            <li>
              <strong>1K tokens</strong>: smallest and fastest. Best for quick
              responses and lower-end devices.
            </li>
            <li>
              <strong>2K tokens</strong>: balanced default. Good quality
              without much extra cost.
            </li>
            <li>
              <strong>4K tokens</strong>: maximum context. Best memory quality,
              uses more memory and CPU per embed.
            </li>
          </ul>
        </li>
        <li>
          <strong>Download</strong>: the v4 model files (about 138 MB) are
          fetched in the background. Progress is shown live, and you can cancel
          or retry if the download fails.
        </li>
      </ol>

      <p>
        After the download finishes, the app runs a short self-test to confirm
        embeddings work end to end before enabling Dynamic Memory. You can
        upgrade from an older model version (v1, v2, v3) using the same flow.
      </p>

      <Callout type="info" title="Switching capacity later">
        Capacity is chosen per install. If you want to change it later, you can
        re-run the download flow and pick a different size.
      </Callout>

      <DocHeading level={3}>Context enrichment</DocHeading>
      <p>
        Context enrichment improves retrieval by embedding a short contextual
        slice instead of only the latest message. That helps when the newest
        user line contains pronouns, callbacks, or implied references.
      </p>

      <ul>
        <li>Better follow-up recall</li>
        <li>Better disambiguation of names and pronouns</li>
        <li>Better stability when the conversation jumps topics quickly</li>
      </ul>

      <Callout type="success" title="Local-first">
        Embeddings are generated and stored locally. Providers only see memory
        text if that memory is actually injected into the prompt for a turn.
      </Callout>

      <DocHeading level={2}>Token usage and cost</DocHeading>
      <p>Dynamic Memory usually reduces prompt growth, but it is not free.</p>

      <ul>
        <li>
          Retrieved memories still cost tokens when they are injected into a
          prompt.
        </li>
        <li>
          The summarisation and memory-tool passes also consume tokens on the
          summarisation model you selected.
        </li>
        <li>
          Manual Memory has the simplest behavior, but its prompt cost rises
          linearly because the whole memory list is sent every turn.
        </li>
      </ul>

      <p>
        The reason Dynamic Memory is usually cheaper is not that it costs
        nothing. It is cheaper because it sends a small relevant subset most of
        the time instead of replaying everything.
      </p>

      <DocHeading level={2}>Managing memories</DocHeading>
      <p>You still keep control, even in Dynamic Mode.</p>

      <ul>
        <li>
          In Manual Mode, you add, edit, and delete the fixed list yourself.
        </li>
        <li>
          In Dynamic Mode, you can review entries, pin important ones, delete
          incorrect ones, and manually add missing facts.
        </li>
      </ul>

      <DocHeading level={2}>Which mode should you use?</DocHeading>
      <ul>
        <li>
          <strong>Use Manual Memory</strong> if you want a short, stable, always
          visible rule list.
        </li>
        <li>
          <strong>Use Dynamic Memory</strong> if you want better continuity
          across long conversations without letting prompt size grow forever.
        </li>
      </ul>
    </motion.article>
    </>
  );
}
