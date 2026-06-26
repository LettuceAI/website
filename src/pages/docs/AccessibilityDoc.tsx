import { motion } from "framer-motion";
import { DocHeading } from "@/components/docs/DocHeading";
import { Callout } from "@/components/docs/Callout";
import { SEO } from "@/components/common/SEO";
import { buildBreadcrumbSchema } from "@/config/schemas";

export function AccessibilityDoc() {
  return (
    <>
    <SEO
      title="Accessibility"
      description="Customize sound effects, haptic feedback, voice input, and screen reader support in LettuceAI for a comfortable experience."
      path="/docs/accessibility"
      jsonLd={buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Docs", path: "/docs" },
        { name: "Accessibility", path: "/docs/accessibility" },
      ])}
    />
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="prose prose-invert max-w-none"
    >
      <DocHeading level={1}>Accessibility</DocHeading>

      <p>
        These settings let you adjust how the app feels and looks, so it is
        clearer, easier to use, and more comfortable for your needs. Everything
        here is optional. You can enable only the features you find helpful.
      </p>

      <Callout type="info" title="Now called Customization in the app">
        This page used to be called <strong>Accessibility</strong> in the app and
        is now named <strong>Customization</strong>. You will find it under{" "}
        <strong>Settings &gt; Customization</strong>. Along with the original
        accessibility options it now also bundles appearance and look-and-feel
        controls, including desktop window styling and theme colors.
      </Callout>

      <DocHeading level={2}>Language</DocHeading>
      <p>
        At the top of the Customization page you can choose the{" "}
        <strong>app language</strong> used across navigation and settings. This
        is available on every platform.
      </p>

      <DocHeading level={2}>Window Controls (Desktop)</DocHeading>
      <p>
        On desktop, LettuceAI uses its own custom title bar instead of the
        standard operating-system one, which gives the window a clean, rounded
        look. The <strong>Window Controls</strong> section lets you choose how the
        minimize, maximize, and close buttons look and where they sit. These
        options only appear on the desktop app.
      </p>

      <p>You can pick from several title bar designs:</p>
      <ul>
        <li>
          <strong>Classic</strong>: flat minimize, maximize, and close buttons.
        </li>
        <li>
          <strong>Traffic Lights</strong>: round colored dots that show their
          symbols on hover.
        </li>
        <li>
          <strong>Traffic Lights (Dimmed)</strong>: muted dots that take on color
          when you hover them.
        </li>
        <li>
          <strong>Minimal</strong>: quiet monochrome icons with no backgrounds.
        </li>
        <li>
          <strong>Native</strong>: use the operating system title bar instead of
          the custom one.
        </li>
      </ul>

      <p>When a custom design is selected, you can also adjust:</p>
      <ul>
        <li>
          <strong>Position</strong>: whether the window buttons sit on the left
          or the right.
        </li>
        <li>
          <strong>Size</strong>: scale the window buttons small, medium, or large.
        </li>
        <li>
          <strong>Rounded corners</strong> (Linux only): round the window edges,
          off, small, medium, or large. The window squares off when maximized.
        </li>
      </ul>

      <Callout>
        Window Controls are desktop-only and do not appear in the mobile app.
      </Callout>

      <DocHeading level={2}>Sound Feedback</DocHeading>

      <p>
        Sound feedback plays short audio cues for common actions in the app.
        Each sound can be enabled or disabled individually, and you can control
        its volume. By default, all sounds start switched off.
      </p>

      <ul>
        <li>
          <strong>Send:</strong> plays when you send a message
          <br />
          Default: disabled, 50% volume
        </li>
        <li>
          <strong>Success:</strong> plays when the assistant finishes replying
          <br />
          Default: disabled, 60% volume
        </li>
        <li>
          <strong>Failure:</strong> plays when an error occurs or a reply is
          aborted
          <br />
          Default: disabled, 60% volume
        </li>
      </ul>

      <p>
        You can preview each sound using the <strong>Test</strong> button beside
        it.
      </p>

      <Callout>
        Sounds only play if they are enabled, and they always use the volume
        level you set for that specific event.
      </Callout>

      <DocHeading level={2}>Haptic Feedback</DocHeading>

      <p>
        On supported devices, you can enable haptic feedback to receive a small
        vibration during chat activity. This can make it easier to feel when a
        message is being generated or completed.
      </p>

      <ul>
        <li>
          <strong>Haptics:</strong> global on/off toggle
          <br />
          Default: disabled
        </li>
      </ul>

      <p>
        When haptics are enabled, you can choose the intensity that feels most
        comfortable:
      </p>

      <ul>
        <li>
          <strong>Light:</strong> gentle vibration (default)
        </li>
        <li>
          <strong>Medium:</strong> slightly stronger feedback
        </li>
        <li>
          <strong>Heavy:</strong> strong, clearly noticeable vibration
        </li>
        <li>
          <strong>Soft:</strong> subtle, rounded vibration effect
        </li>
        <li>
          <strong>Rigid:</strong> sharp, crisp vibration effect
        </li>
      </ul>

      <Callout>
        Haptics never play continuously. They are brief, intentional signals
        designed to assist awareness without being distracting.
      </Callout>
      
      <DocHeading level={2}>ARIA Labels</DocHeading>
      <p>
        LettuceAI includes ARIA (Accessible Rich Internet Applications) labels
        throughout the app to improve compatibility with screen readers and other
        assistive technologies. This helps users with visual impairments
        navigate and interact with the interface more easily.
      </p>
      <p>
        ARIA labels provide descriptive information about buttons, inputs, and
        other interactive elements, ensuring that their purpose is clear even
        without visual cues. ARIA labels are not visible to users but visible to Screen Readers.
      </p>

      <Callout>
        If a UI element is missing an ARIA label or has an incorrect one, please
        report it from our Discord server or from Github so we can improve accessibility for everyone.
      </Callout>

      <DocHeading level={2}>Voice Input (Speech Recognition)</DocHeading>
      <p>
        LettuceAI includes an on-device speech-to-text system powered by
        Whisper. You can dictate messages instead of typing, which can help if
        typing is difficult or if you prefer hands-free input.
      </p>
      <ul>
        <li>
          Whisper models are downloaded and run locally. Audio never leaves
          your device for recognition.
        </li>
        <li>
          A custom vocabulary and correction library lets you teach the system
          names, terms, and recurring mistakes so transcripts stay accurate.
        </li>
        <li>
          Voice examples can be saved to fine-tune corrections for your voice
          and accent.
        </li>
      </ul>
      <p>
        Voice input is configured under <strong>Settings → Speech Recognition</strong>.
      </p>

      <DocHeading level={2}>Chat Appearance</DocHeading>
      <p>
        The Chat Appearance page controls how messages look in the chat view.
        Most options have both a global default and a per-character override so
        you can tune one character without affecting the others.
      </p>

      <ul>
        <li>
          <strong>Font size</strong>: small, medium, large, or extra large.
        </li>
        <li>
          <strong>Bubble style</strong>: filled, bordered, or minimal.
        </li>
        <li>
          <strong>Bubble radius</strong>: sharp, default, or pill.
        </li>
        <li>
          <strong>Bubble max width</strong>: compact, default, or wide.
        </li>
        <li>
          <strong>Bubble padding</strong>: compact, default, or spacious.
        </li>
        <li>
          <strong>Bubble opacity</strong>: 0 to 100 percent for the message
          background.
        </li>
        <li>
          <strong>Bubble blur</strong>: off, light, medium, or heavy backdrop
          blur for translucent bubbles.
        </li>
        <li>
          <strong>User and assistant colors</strong>: pick an accent token
          (accent, info, etc.) or a custom color per side. The app computes
          accessible text contrast automatically based on the chosen color and
          opacity.
        </li>
        <li>
          <strong>Chat input color</strong>: set a custom color for the message
          input box at the bottom of the chat. As with the bubbles, the app picks
          readable text automatically so your typing stays legible against the
          color you choose.
        </li>
        <li>
          <strong>Text colors</strong>: separate colors for plain text, italics,
          block quotes, inline quotes, and inline code, so formatted roleplay is
          easy to scan.
        </li>
        <li>
          <strong>Background blur</strong>: applied over the chat background
          image.
        </li>
        <li>
          <strong>Live preview</strong>: a sample exchange updates as you edit
          so you can see the result before saving.
        </li>
      </ul>

      <Callout>
        Per-character overrides show a reset button next to each field, so you
        can drop back to the global value without losing your other tweaks.
      </Callout>

      <DocHeading level={2}>Color Customization</DocHeading>
      <p>
        The Color Customization page controls the global theme tokens used
        across the whole app: background, surface, foreground text, muted text,
        subtle text, accent, and more.
      </p>

      <ul>
        <li>
          <strong>Built-in presets</strong>: a curated set of themes (such as
          Forest, Ocean, Sand, Rose Pine, Tokyo Night, Catppuccin, Gruvbox,
          Nord, Dracula, Solarized, One Dark, Ayu) you can apply in one tap.
        </li>
        <li>
          <strong>Per-token color pickers</strong>: override any individual
          token with a color picker or a hex value. Muted and subtle text
          colors derive sensible defaults from the colors you set, so you do
          not have to tune every token by hand.
        </li>
        <li>
          <strong>Settings card opacity</strong>: tunes how translucent the
          settings surface looks against the background.
        </li>
        <li>
          <strong>Save as preset</strong>: store your current set of colors as
          a named custom preset you can re-apply later.
        </li>
        <li>
          <strong>Import and export</strong>: presets export as a small JSON
          payload you can share with other users or back up.
        </li>
      </ul>

      <Callout>
        Theme changes apply instantly. If a custom color makes parts of the UI
        hard to read, use the per-token reset to revert just that color.
      </Callout>

      <DocHeading level={2}>Easter Eggs</DocHeading>
      <p>
        Just for fun, the Customization page has a small Easter Eggs section. For
        example, <strong>Beetroot Rain</strong> drops a few beetroots down the
        screen when a chat mentions them. It is purely cosmetic and off by
        default.
      </p>
    </motion.article>
    </>
  );
}
