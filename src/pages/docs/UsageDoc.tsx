import { motion } from "framer-motion";
import { DocHeading } from "@/components/docs/DocHeading";
import { Callout } from "@/components/docs/Callout";
import { SEO } from "@/components/common/SEO";
import { buildBreadcrumbSchema } from "@/config/schemas";

export function UsageDoc() {
  return (
    <>
      <SEO
        title="Usage"
        description="Per-request token and cost tracking, charts, CSV export, and app active time in LettuceAI."
        path="/docs/usage"
        jsonLd={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Docs", path: "/docs" },
          { name: "Usage", path: "/docs/usage" },
        ])}
      />
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="prose prose-invert max-w-none"
      >
        <DocHeading level={1}>Usage</DocHeading>
        <p>
          LettuceAI records a usage entry every time it talks to a model
          provider. The Usage page turns those entries into charts, totals, and
          a request-by-request activity log so you can see where your tokens
          and dollars go.
        </p>
        <Callout>
          Usage data is stored locally on your device. Nothing is uploaded.
        </Callout>

        <DocHeading level={2}>What gets logged</DocHeading>
        <p>
          Each provider request produces a record with the fields the app needs
          to attribute it later:
        </p>
        <ul>
          <li>Timestamp, session, character, model, and provider.</li>
          <li>
            Operation type (chat, regenerate, continue, summary, memory
            manager, image generation, AI creator, reply helper, group chat
            message, group chat regenerate, group chat continue, group chat
            decision maker).
          </li>
          <li>
            Finish reason (stop, length, content filter, tool calls, aborted,
            error, other).
          </li>
          <li>
            Token counts: prompt, completion, total, cached prompt, cache
            write, reasoning, image, and any web search requests reported by
            the provider.
          </li>
          <li>
            Token breakdown contributed by the app itself: memory embedding
            tokens and summary tokens.
          </li>
          <li>Calculated cost when the provider exposes pricing.</li>
          <li>Success flag and error message when a request fails.</li>
        </ul>

        <DocHeading level={2}>The dashboard</DocHeading>
        <p>
          Open <strong>Settings, Usage</strong> to see the dashboard. From the
          top of the page you can:
        </p>
        <ul>
          <li>
            Pick a date preset: today, this week, this month, all time, or a
            custom range.
          </li>
          <li>Filter by model, character, or operation type.</li>
          <li>Refresh to pull the latest records.</li>
          <li>Export the current filtered view to CSV.</li>
        </ul>
        <p>
          Below the controls, an area chart plots tokens (or cost) per day for
          the selected range. Summary cards show totals and per-provider,
          per-model, and per-character breakdowns.
        </p>

        <DocHeading level={2}>Activity log and request detail</DocHeading>
        <p>
          The Activity view lists individual requests with timestamp, operation
          type, model, token totals, and cost. Tap a row to open the request
          detail sheet, which shows:
        </p>
        <ul>
          <li>The full token breakdown, including cached and cache-write tokens, reasoning, and image tokens when present.</li>
          <li>The cost breakdown the app calculated for that request.</li>
          <li>The finish reason and any error message.</li>
          <li>Session, character, and model metadata.</li>
        </ul>

        <DocHeading level={2}>How cost is calculated</DocHeading>
        <p>
          LettuceAI prefers cost information that the provider returns with the
          response. When the provider does not return a number, the app
          calculates one locally by combining the recorded token counts with
          per-model pricing from the on-device pricing cache.
        </p>
        <p>
          The cost breakdown attributed to a request can include a regular
          prompt component, cached prompt read, cache write, completion,
          reasoning, and any web search requests. When the provider reports an
          authoritative total, that value is used as the request total instead
          of the computed sum.
        </p>
        <Callout>
          If a model is missing from the pricing cache, cost will show as zero
          or unavailable for that request. Token counts are still recorded.
        </Callout>

        <DocHeading level={2}>CSV export</DocHeading>
        <p>
          The Export button on the Usage page writes a CSV file containing the
          currently filtered request records. The file name uses the active
          date preset and today's date, for example{" "}
          <code>usage-week-2025-11-04.csv</code>. The app prompts you for a
          save location and reports the final path when the file is written.
        </p>

        <DocHeading level={2}>App active time</DocHeading>
        <p>
          Separate from per-request tracking, LettuceAI also records how long
          the app window has been focused. The tracker starts on launch,
          resumes when the app regains focus, and periodically flushes the
          accumulated milliseconds to local settings storage.
        </p>
        <p>
          Switch the Usage page to the <strong>App Time</strong> view to see a
          daily area chart and the total active duration for the selected
          range. This is purely a local counter, useful for personal
          accountability. It is never reported anywhere.
        </p>

        <DocHeading level={2}>Filtering and search</DocHeading>
        <p>
          The Activity view supports a text search that matches against
          character name, model name, provider, and operation type, plus
          dedicated filters for operation type. Combine the date preset, search
          box, and operation filter to drill down to a specific slice of
          history before exporting.
        </p>
      </motion.article>
    </>
  );
}
