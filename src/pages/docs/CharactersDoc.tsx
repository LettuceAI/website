import { motion } from "framer-motion";
import { DocSplit } from "@/components/docs/DocSplit";
import { DocHeading } from "@/components/docs/DocHeading";
import { Callout } from "@/components/docs/Callout";
import { images } from "@/config/images";
import { SEO } from "@/components/common/SEO";
import { buildBreadcrumbSchema } from "@/config/schemas";

export function CharactersDoc() {
  return (
    <>
    <SEO
      title="Characters"
      description="Create AI characters with personality, memory behavior, starting scenes, and support for Chara Card and UEC formats."
      path="/docs/characters"
      jsonLd={buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Docs", path: "/docs" },
        { name: "Characters", path: "/docs/characters" },
      ])}
    />
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="prose prose-invert max-w-none"
    >
      <DocHeading level={1}>Characters</DocHeading>

      <p className="lead">
        Characters define who you are talking to. Each one has its own
        personality, memory behavior, and default setup.
      </p>

      <p>
        Creating a character happens across a few simple screens. You can edit
        everything later, so don't worry about getting it perfect the first
        time.
      </p>

      <DocHeading level={2}>Step 1: Identity</DocHeading>
      <DocSplit
        imageSrc={images.charactersDocs.step1}
        imageAlt="Character identity screen"
      >
        <p>
          The first screen is where you define the character's basic identity.
          This is what you'll see when selecting or chatting with them.
        </p>
        <ul>
          <li>
            <strong>Name</strong>: The character's display name
          </li>
          <li>
            <strong>Nickname (optional)</strong>: Short form used in chat
          </li>
          <li>
            <strong>Avatar (optional)</strong>: Portrait image shown in chat,
            with an in-app crop tool
          </li>
          <li>
            <strong>Chat background (optional)</strong>: Background image for
            this character's conversations
          </li>
          <li>
            <strong>Interaction mode</strong>: choose <strong>Roleplay</strong>
            {" "}for scene-driven storytelling or{" "}
            <strong>Companion</strong> for relationship-oriented chats with a
            live emotional and relational state. See the Companion Mode page
            for details.
          </li>
        </ul>
        <p>All of these can be changed later.</p>
      </DocSplit>

      <DocHeading level={2}>Step 2: Description and behavior</DocHeading>
      <DocSplit
        imageSrc={images.charactersDocs.step3}
        imageAlt="Character description and behavior screen"
        reverse
      >
        <p>
          This screen controls who the character is and how they behave in
          conversations.
        </p>
        <ul>
          <li>
            <strong>Description</strong>: who this character is
          </li>
          <li>
            <strong>Definition</strong>: extended character sheet, examples,
            and lore that should always be in scope
          </li>
          <li>
            <strong>System prompt or prompt template</strong>: instructions
            that guide responses, with optional per-character template override
          </li>
          <li>
            <strong>Memory mode</strong>
            <ul className="mt-2">
              <li>
                <strong>Manual</strong>: only memories you save are kept
              </li>
              <li>
                <strong>Dynamic</strong>: important details are extracted and
                remembered automatically
              </li>
            </ul>
          </li>
          <li>
            <strong>Default model</strong> and <strong>fallback model</strong>:
            used when starting new chats
          </li>
          <li>
            <strong>Voice config</strong> with optional auto-play for TTS
          </li>
        </ul>
      </DocSplit>

      <DocHeading level={2}>Step 3: Companion soul (companion mode only)</DocHeading>
      <p>
        If you picked Companion in Step 1, an extra step lets you author or
        AI-generate the companion's soul: identity, baseline affect, regulation
        style, and relationship defaults. You can skip this step and edit the
        soul later from inside the chat. Roleplay characters bypass this step
        entirely.
      </p>

      <DocHeading level={2}>Step 4: Starting scenes</DocHeading>
      <DocSplit
        imageSrc={images.charactersDocs.step2}
        imageAlt="Starting scenes screen"
      >
        <p>
          Starting scenes define how a conversation begins. They set the
          situation, mood, or relationship at the start of a chat.
        </p>
        <ul>
          <li>You can create multiple starting scenes</li>
          <li>One scene can be selected as the default</li>
          <li>
            Scenes only affect the beginning, not the character's personality
          </li>
        </ul>
      </DocSplit>

      <DocHeading level={2}>Step 5: Extras</DocHeading>
      <p>
        The final step is for everything that does not need to be set up front:
        lorebook assignments, default chat template, chat appearance overrides
        (bubble style, gradient, text color), creator notes, tags, and source
        info. Lorebooks attached here activate automatically in this
        character's chats.
      </p>

      <DocHeading level={2}>Import and export</DocHeading>
      <p>
        LettuceAI supports multiple character card formats so you can move your
        characters between apps and share them easily.
      </p>
      <ul>
        <li>
          <strong>UEC (Unified Entity Card)</strong>: the recommended export
          format
        </li>
        <li>
          <strong>Chara Card v1 / v2 / v3</strong>: fully supported for import
        </li>
        <li>
          <strong>Export</strong>: characters can be exported as UEC or Chara
          Card v2
        </li>
      </ul>
      <p>
        You can also import characters directly from the Discovery page when
        browsing Character Tavern cards.
      </p>

      <DocHeading level={2}>Convert formats</DocHeading>
      <p>
        Settings includes a Convert page for migrating between character file
        formats. Drop in an existing file and LettuceAI detects what it is, then
        offers compatible output formats:
      </p>
      <ul>
        <li>
          <strong>Legacy JSON</strong>: older character or persona exports.
          Recommended target is UEC.
        </li>
        <li>
          <strong>Chara Card V1, V2, V3</strong>: imported and convertible to
          UEC or Chara Card V2.
        </li>
        <li>
          <strong>UEC (Unified Entity Card)</strong>: the current recommended
          portable format. UEC files are already canonical and only need
          conversion if you want to export to an older format.
        </li>
      </ul>
      <p>
        The detected format and file size are shown after you pick a file, and
        the converted result is saved as a new file you can share or import
        back into another LettuceAI install.
      </p>

      <Callout type="info" title="Roleplay tips">
        <ul className="mt-2 list-disc pl-5 space-y-1">
          <li>
            Treat the starting scene like the opening of a book. It sets
            expectations for tone, pacing, and how the character sees you.
          </li>
          <li>
            You don’t need long prompts. Clear personality rules beat walls of
            text for keeping a character consistent.
          </li>
          <li>
            If a character starts drifting, rewrite how they speak, not what
            they know. Tone matters more than lore.
          </li>
          <li>
            Use multiple starting scenes for the same character to explore
            different timelines or moods without creating duplicates.
          </li>
          <li>
            Let conversations build the character. Over-defining everything
            upfront can make interactions feel stiff.
          </li>
        </ul>
      </Callout>
    </motion.article>
    </>
  );
}
