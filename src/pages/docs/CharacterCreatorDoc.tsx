import { motion } from "framer-motion";
import { DocHeading } from "@/components/docs/DocHeading";
import { Callout } from "@/components/docs/Callout";
import { DocImage } from "@/components/docs/DocImage";
import { images } from "@/config/images";
import { SEO } from "@/components/common/SEO";
import { buildBreadcrumbSchema } from "@/config/schemas";

export function CharacterCreatorDoc() {
  return (
    <>
    <SEO
      title="Smart Creator"
      description="AI-guided tool that helps you build characters, personas, and lorebooks step-by-step through natural conversation."
      path="/docs/smart-creator"
      jsonLd={buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Docs", path: "/docs" },
        { name: "Smart Creator", path: "/docs/smart-creator" },
      ])}
    />
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="prose prose-invert max-w-none"
    >
      <DocHeading level={1}>Smart Creator</DocHeading>

      <p>
        Smart Creator (formerly known as the Character Creator) is an
        interactive tool that helps you build fully-fleshed characters
        step-by-step. Instead of filling out long forms, you simply talk with
        the creator and describe the kind of character you want, the AI guides
        you through the process.
      </p>

      <p>
        It also supports <strong>Personas</strong> and{" "}
        <strong>Lorebooks</strong>
        using the same conversational flow. You just choose what you want to
        create before starting.
      </p>

      <Callout>
        You can stop at any time. your character is always editable later.
      </Callout>

      <DocHeading level={2}>Choose what you’re creating</DocHeading>
      <p>At the top of the Creator, you can switch between creation goals:</p>
      <ul>
        <li>
          <strong>Character</strong> — build a new character profile
        </li>
        <li>
          <strong>Persona</strong> — build a user persona for roleplay
        </li>
        <li>
          <strong>Lorebook</strong> — build world or setting entries
        </li>
      </ul>
      <p>
        The title and mode badge update so you always know what you’re creating.
      </p>
      
      <DocImage src={images.creation.helperChoose} alt="Choose creation mode" containerClassName="max-w-xl mx-auto"/>

      <DocHeading level={2}>Tool selection (Smart Mode)</DocHeading>
      <p>
        Smart Creator uses a tool system behind the scenes to apply changes like
        setting names, writing scenes, generating images, or saving personas and
        lorebooks.
      </p>
      <p>
        In <strong>Advanced Settings → Creation Helper</strong>, you can control
        how tools are used:
      </p>
      <ul>
        <li>
          <strong>Smart Tool Selection</strong> (default): the Creator asks what
          you want to make and only loads the relevant tool set.
        </li>
        <li>
          <strong>Manual tool selection</strong>: disable Smart Tool Selection
          to pick a preset or enable specific tools yourself.
        </li>
      </ul>
      <p>
        Presets include <strong>All Tools</strong>, <strong>Essential</strong>,
        and
        <strong>Minimal</strong>. Manual mode also lets you toggle tools for
        Characters, Personas, Lorebooks, Settings, and Image Generation.
      </p>
      <Callout type="warning" title="Manual Tool Selection">
        Turning off Smart Tool Selection gives you full control, but it can also
        limit what the Creator is allowed to do. If the right tools are
        disabled, the Creator may fail to complete steps or skip parts of your
        request.
      </Callout>

      <DocHeading level={2}>Image generation</DocHeading>
      <p>
        Smart Creator can generate images during creation (for avatars or visual
        references) when the <strong>Generate Image</strong> tool is enabled.
      </p>
      <p>
        You can choose the image model in{" "}
        <strong>Advanced Settings → Creation Helper</strong>. If no image model
        is selected, the Creator won’t generate images.
      </p>
      <p>
        Generated images appear inline in the conversation, and you can set one
        as the character or persona avatar.
      </p>

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

      <p>You may add multiple scenes depending on your style.</p>

      {/* ⭐ NEW SECTION — AVATAR ⭐ */}
      <DocHeading level={2}>Character Avatar</DocHeading>

      <p>
        During creation, you can also assign an avatar to visually represent
        your character. This can be a piece of reference art, a portrait, or any
        suitable image that helps set the mood and identity of the character.
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
        Use the <strong>+</strong> menu to add context to your message. You can
        attach:
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

      <DocHeading level={2}>Streaming responses</DocHeading>
      <p>
        The Creator streams its replies in real time. If you need to stop
        generation, you can tap the stop button in the input bar and edit your
        prompt.
      </p>

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
    </>
  );
}
