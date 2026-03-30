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
      description="Customize sound effects, haptic feedback, and screen reader support in LettuceAI for a comfortable experience."
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
        The Accessibility settings let you customise feedback in the app so it
        feels clearer, easier to use, and more comfortable for your needs. These
        options are fully optional. You can enable only the features you find
        helpful.
      </p>

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
    </motion.article>
    </>
  );
}
