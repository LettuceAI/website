import { motion } from "framer-motion";
import { DocHeading } from "@/components/docs/DocHeading";
import { Callout } from "@/components/docs/Callout";
import { SEO } from "@/components/common/SEO";
import { buildBreadcrumbSchema } from "@/config/schemas";

export function SecurityDoc() {
  return (
    <>
      <SEO
        title="Security"
        description="Pure Mode content filtering, trusted certificates, and analytics controls in LettuceAI."
        path="/docs/security"
        jsonLd={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Docs", path: "/docs" },
          { name: "Security", path: "/docs/security" },
        ])}
      />
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="prose prose-invert max-w-none"
      >
        <DocHeading level={1}>Security</DocHeading>
        <p>
          LettuceAI runs locally on your device. The Security settings page is
          where you tune content filtering, manage TLS trust for self-hosted
          endpoints, and decide whether anonymous analytics events leave the
          app.
        </p>
        <Callout>
          Every setting on this page is opt-in or locally enforced. Nothing is
          synced to a remote account.
        </Callout>

        <DocHeading level={2}>Pure Mode</DocHeading>
        <p>
          Pure Mode is an on-device adversarial content filter that scores AI
          responses (and your own inputs) against a built-in dictionary of
          explicit terms, slurs, and graphic violence. It runs locally with no
          network calls. The filter checks both completed text and streaming
          deltas as tokens arrive.
        </p>
        <p>
          Pure Mode has four levels you can switch between in{" "}
          <strong>Settings, Security, Pure Mode</strong>:
        </p>
        <ul>
          <li>
            <strong>Off.</strong> The filter is fully disabled. No scoring runs
            and nothing is logged.
          </li>
          <li>
            <strong>Low.</strong> Only high-weight explicit sexual terms and
            slurs are scored. Graphic violence is ignored. Threshold is lenient,
            so casual profanity passes through.
          </li>
          <li>
            <strong>Standard.</strong> The default. Explicit sexual content,
            graphic violence, and slurs are all scored against a balanced
            threshold.
          </li>
          <li>
            <strong>Strict.</strong> Same dictionaries as Standard, with a
            tighter threshold. Single explicit terms can trigger a block.
          </li>
        </ul>

        <DocHeading level={3}>How the filter handles evasion</DocHeading>
        <p>
          The scoring pipeline normalizes text before matching so common
          obfuscation tricks do not slip past:
        </p>
        <ul>
          <li>Markdown emphasis characters (asterisks, underscores, tildes) are stripped.</li>
          <li>Zero-width and invisible Unicode characters are removed.</li>
          <li>Cyrillic and Greek homoglyphs map to their Latin equivalents.</li>
          <li>Diacritics are reduced to base ASCII letters.</li>
          <li>Leet-speak digits and symbols (0, 1, 3, 4, 5, 7, 8, 9, @, $, !, +) are decoded back to letters.</li>
          <li>Runs of three or more identical characters collapse to one (so "fuuuck" still matches "fuck").</li>
        </ul>
        <p>
          Matching also uses word-boundary and N-gram rules, so words like
          "cocktail", "dictionary", or "analysis of sex education" do not
          trigger false positives.
        </p>
        <Callout>
          A context allowlist (medical, educational language) halves the weight
          of dictionary hits when present, so legitimate clinical writing is
          less likely to be blocked.
        </Callout>

        <DocHeading level={3}>Filter log</DocHeading>
        <p>
          When you run a development build, the Security page exposes a Filter
          Log panel that lists recent hits and blocks with a redacted snippet,
          the score, and which dictionary terms matched. The log is capped at
          the most recent entries and is held only in memory. Production builds
          do not expose this panel.
        </p>

        <DocHeading level={2}>Remote avatar download</DocHeading>
        <p>
          When you import a character card that references an avatar URL,
          LettuceAI can fetch the image automatically. Toggle{" "}
          <strong>Remote Avatar Download</strong> off if you want to block
          network requests during card import. Avatars then stay empty until you
          attach one manually.
        </p>

        <DocHeading level={2}>Analytics</DocHeading>
        <p>
          Analytics in LettuceAI uses Aptabase. The events are anonymous and
          contain only the event name plus non-identifying properties defined
          by the app. Message content, prompts, and personal identifiers are
          never sent.
        </p>
        <ul>
          <li>
            The toggle is only available when the app was built with an
            analytics API key. If no key is present the toggle shows as
            "Unavailable" and analytics is hard-disabled.
          </li>
          <li>
            Changing the toggle requires an app restart to take effect. The app
            offers a "Restart now" action after you flip the switch.
          </li>
        </ul>

        <DocHeading level={2}>Trusted certificates</DocHeading>
        <p>
          If you point LettuceAI at a self-hosted endpoint (for example, Ollama
          behind a reverse proxy with a private CA), the default trust store
          will reject the connection. The Trusted Certificates panel lets you
          import PEM certificates that are added to the app trust store for
          outbound HTTPS calls.
        </p>
        <ul>
          <li>Supported file extensions: <code>.pem</code>, <code>.crt</code>, <code>.cer</code>.</li>
          <li>The file must contain a <code>BEGIN CERTIFICATE</code> / <code>END CERTIFICATE</code> block.</li>
          <li>Duplicates are detected on import.</li>
          <li>You can remove any imported certificate from the same panel.</li>
        </ul>
        <Callout type="warning" title="TLS verification stays on">
          Importing a certificate adds it to the app trust store. It does not
          disable certificate validation or allow self-signed certificates that
          were not explicitly imported.
        </Callout>

        <DocHeading level={2}>What is not on this page</DocHeading>
        <p>
          The Security page does not include an app lock, biometric prompt, or
          local password. If you need device-level protection, rely on your
          operating system lock screen. API keys and conversation data live in
          the local app database on your device.
        </p>
      </motion.article>
    </>
  );
}
