import { motion } from "framer-motion";
import { DocSplit } from "@/components/docs/DocSplit";
import { DocHeading } from "@/components/docs/DocHeading";
import { Callout } from "@/components/docs/Callout";

export function CharactersDoc() {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="prose prose-invert max-w-none"
        >
            <DocHeading level={1}>Characters</DocHeading>

            <p className="lead">
                Characters define who you are talking to. Each one has its own personality,
                memory behavior, and default setup.
            </p>

            <p>
                Creating a character happens across a few simple screens. You can edit
                everything later, so don't worry about getting it perfect the first time.
            </p>

            <DocHeading level={2}>Step 1: Basic identity</DocHeading>
            <DocSplit
                imageSrc="/images/character_step_1.webp"
                imageAlt="Character identity screen"
            >
                <p>
                    The first screen is where you define the character's basic identity.
                    This is what you'll see when selecting or chatting with them.
                </p>
                <ul>
                    <li><strong>Name</strong>: The character's display name</li>
                    <li><strong>Avatar (optional)</strong>: Portrait image shown in chat</li>
                    <li><strong>Chat background (optional)</strong>: Background image for this character's conversations</li>
                </ul>
                <p>
                    All of these can be changed later.
                </p>
            </DocSplit>

            <DocHeading level={2}>Step 2: Starting scenes</DocHeading>
            <DocSplit
                imageSrc="/images/character_step_2.webp"
                imageAlt="Starting scenes screen"
                reverse
            >
                <p>
                    Starting scenes define how a conversation begins.
                    They set the situation, mood, or relationship at the start of a chat.
                </p>
                <ul>
                    <li>You can create multiple starting scenes</li>
                    <li>One scene can be selected as the default</li>
                    <li>Scenes only affect the beginning, not the character's personality</li>
                </ul>
            </DocSplit>

            <DocHeading level={2}>Step 3: Behavior and defaults</DocHeading>
            <DocSplit
                imageSrc="/images/character_step_3.webp"
                imageAlt="Character behavior and settings screen"
            >
                <p>
                    The final screen controls how the character behaves and remembers things.
                </p>
                <ul>
                    <li><strong>Description</strong>: Who this character is</li>
                    <li><strong>System prompt</strong>: Instructions that guide responses</li>
                    <li>
                        <strong>Memory mode</strong>
                        <ul className="mt-2">
                            <li><strong>Manual</strong>: Only saved memories are kept</li>
                            <li><strong>Dynamic</strong>: Important details are remembered automatically</li>
                        </ul>
                    </li>
                    <li><strong>Default model</strong>: Used when starting new chats</li>
                </ul>
            </DocSplit>

            <Callout type="info" title="Roleplay tips">
                <ul className="mt-2 list-disc pl-5 space-y-1">
                    <li>
                        Treat the starting scene like the opening of a book. It sets expectations for tone, pacing, and how the character sees you.
                    </li>
                    <li>
                        You don’t need long prompts. Clear personality rules beat walls of text for keeping a character consistent.
                    </li>
                    <li>
                        If a character starts drifting, rewrite how they speak, not what they know. Tone matters more than lore.
                    </li>
                    <li>
                        Use multiple starting scenes for the same character to explore different timelines or moods without creating duplicates.
                    </li>
                    <li>
                        Let conversations build the character. Over-defining everything upfront can make interactions feel stiff.
                    </li>
                </ul>
            </Callout>
        </motion.article>
    );
}
