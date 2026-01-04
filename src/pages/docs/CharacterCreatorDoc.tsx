import { motion } from "framer-motion";
import { DocHeading } from "@/components/docs/DocHeading";
import { Callout } from "@/components/docs/Callout";
import { DocImage } from "@/components/docs/DocImage";
import { images } from "@/config/images";

export function CharacterCreatorDoc() {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="prose prose-invert max-w-none"
    >
      <DocHeading level={1}>AI Character Creator</DocHeading>

      <p>
        The AI Character Creator is an interactive tool that helps you build
        fully-fleshed characters step-by-step. Instead of filling out long
        forms, you simply talk with the creator and describe the kind of
        character you want, the AI guides you through the process.
      </p>

      <Callout>
        You can stop at any time. your character is always editable later.
      </Callout>

      <DocHeading level={2}>How it Works</DocHeading>

      <p>
        You begin by describing the character you want to create. The AI will
        then ask follow-up questions to better understand things like name,
        appearance, backstory, relationships, and tone.
      </p>

      <DocImage
        src={images.creation.helperStart}
        alt="Starting the AI Character Creator conversation"
        containerClassName="max-w-xl mx-auto"
      />

      <p>
        You can answer naturally, revise things later, or skip steps entirely.
        Nothing is locked-in until you finish.
      </p>

      <DocHeading level={2}>Guided Conversation</DocHeading>

      <p>
        The Creator asks structured questions to help shape your character.
        These may include:
      </p>

      <ul>
        <li>Name & basic details</li>
        <li>Personality & traits</li>
        <li>Appearance</li>
        <li>Backstory</li>
        <li>Relationships</li>
        <li>Setting or world</li>
      </ul>

      <DocImage
        src={images.creation.helperQuestions}
        alt="Example guidance questions from character creator"
        containerClassName="max-w-xl mx-auto"
      />

      <p>
        When you're happy with an answer, the app saves it directly into the
        character profile, no manual editing required.
      </p>

      <DocImage
        src={images.creation.helperSetFields}
        alt="Character description automatically applied"
        containerClassName="max-w-xl mx-auto"
      />

      <DocHeading level={2}>Starting Scenes</DocHeading>

      <p>
        The Creator can also help you write a starting scene: the first moment
        you meet or interact with the character. These scenes help set tone and
        mood before roleplay begins.
      </p>

      <DocImage
        src={images.creation.helperScenes}
        alt="Adding starting scenes during creation"
        containerClassName="max-w-xl mx-auto"
      />

      <p>
        You may add multiple scenes depending on your style.
      </p>

      {/* ⭐ NEW SECTION — AVATAR ⭐ */}
      <DocHeading level={2}>Character Avatar</DocHeading>

      <p>
        During creation, you can also assign an avatar to visually represent
        your character. This can be a piece of reference art, a portrait, or
        any suitable image that helps set the mood and identity of the
        character.
      </p>

      <DocImage
        src={images.creation.helperAvatar}
        alt="Assigning an avatar during character creation"
        containerClassName="max-w-xl mx-auto"
      />

      <p>
        You can upload an image at any time in the conversation, or ask the
        Creator whether a specific image would be a good fit, the AI will help
        attach it directly to the character profile.
      </p>

      <Callout>
        Avatars are optional and can be changed or removed later in the editor.
      </Callout>

      <DocHeading level={2}>Add Reference Material</DocHeading>

      <p>
        At any point, you can attach:
      </p>

      <ul>
        <li>Images (avatars or reference art)</li>
        <li>Existing characters as inspiration</li>
        <li>Your persona for context</li>
      </ul>

      <DocImage
        src={images.creation.helperAddReference}
        alt="Reference menu options in character creator"
        containerClassName="max-w-xl mx-auto"
      />

      <Callout>
        Reference material helps the AI maintain tone, style, and character
        consistency.
      </Callout>

      <DocHeading level={2}>Live Preview</DocHeading>

      <p>
        When your character is complete, you’ll see a live preview showing their
        final profile and scenes. From here you can:
      </p>

      <ul>
        <li>Start chatting immediately</li>
        <li>Continue editing</li>
        <li>Switch to the manual editor</li>
      </ul>

      <DocImage
        src={images.creation.helperPreview}
        alt="Character preview sheet UI"
        containerClassName="max-w-xl mx-auto"
      />

      <DocHeading level={2}>Error Handling</DocHeading>

      <p>
        If the AI ever fails to apply a field (for example, due to formatting),
        you can retry or manually update the text. Nothing is lost, only that
        step is retried.
      </p>

      <Callout type="warning">
        Some highly-formatted responses may need small adjustments before being
        saved.
      </Callout>

      <DocHeading level={2}>You Stay in Control</DocHeading>

      <p>
        The Creator is meant to help, not replace your creativity. You can
        override anything at any time, and the manual editor is always
        available.
      </p>

      <Callout>
        Think of it like a friendly co-writer helping fill in the blanks.
      </Callout>
    </motion.article>
  );
}
