import { motion } from "framer-motion";
import { DocHeading } from "@/components/docs/DocHeading";
import { Callout } from "@/components/docs/Callout";

export function PersonasDoc() {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="prose prose-invert max-w-none"
        >
            <DocHeading level={1}>Personas</DocHeading>

            <p className="lead">
                Personas define how <em>you</em> show up in conversations.
                They control your role, tone, and perspective when talking to characters.
            </p>

            <DocHeading level={2}>What is a persona?</DocHeading>
            <p>
                A persona represents <strong>who you are in a conversation</strong>.
                While characters define the AI's behavior, personas define yours.
            </p>
            <p>
                This is especially useful for roleplay, storytelling, or scenarios where
                you don't want to speak as yourself.
            </p>

            <DocHeading level={2}>Why use personas?</DocHeading>
            <p>
                Personas let you separate <em>you as a user</em> from <em>you as a role</em>.
                Instead of rewriting context every time, you select a persona and stay consistent.
            </p>
            <ul>
                <li>Play different roles with the same character</li>
                <li>Keep tone and behavior consistent</li>
                <li>Avoid repeating background information</li>
                <li>Switch perspectives without resetting memory</li>
            </ul>

            <DocHeading level={2}>Personas vs characters</DocHeading>
            <ul>
                <li>
                    <strong>Characters</strong> define who the AI is
                </li>
                <li>
                    <strong>Personas</strong> define who you are
                </li>
            </ul>
            <p>
                Both exist at the same time. A single character can interact with
                multiple personas, each creating a different dynamic.
            </p>

            <DocHeading level={2}>Creating a persona</DocHeading>
            <p>
                Creating a persona is similar to creating a character,
                but focused on your role instead of the AI's.
            </p>
            <ul>
                <li><strong>Name</strong>: How the persona is identified</li>
                <li><strong>Description</strong>: Background, personality, and role</li>
                <li><strong>Speaking style</strong>: How you talk or act in conversation</li>
            </ul>

            <DocHeading level={2}>Using personas in chats</DocHeading>
            <p>
                When starting a new conversation, you can choose which persona to use.
                The persona remains active for the entire chat unless you change it.
            </p>
            <p>
                Switching personas changes your role, not the character's memory or personality.
            </p>

            <Callout type="info" title="Roleplay tip">
                Personas work best when they are specific.
                “A tired detective with trust issues” is more effective
                than “a normal person”.
            </Callout>

            <Callout type="info" title="Multiple personas">
                You can create multiple personas for the same character
                to explore different relationships, timelines, or viewpoints.
            </Callout>
        </motion.article>
    );
}
