import { motion } from "framer-motion";
import { DocSplit } from "@/components/docs/DocSplit";
import { Callout } from "@/components/docs/Callout";
import { CodeBlock } from "@/components/ui/CodeBlock";

export function CharactersDoc() {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="prose prose-invert max-w-none"
        >
            <h1>Characters</h1>
            <p className="lead">
                Create custom AI personas with unique personalities, backstories, and behaviors.
            </p>

            <h2>What are Characters?</h2>
            <p>
                Characters are custom AI personas you create. Each character has its own system prompt, personality traits, and conversation style. Use them for creative writing, roleplay, or specialized assistants.
            </p>

            <DocSplit
                imageSrc="https://images.unsplash.com/photo-1618331835717-801e976710b2?auto=format&fit=crop&q=80&w=800"
                imageAlt="Character Design"
            >
                <h3>Creating a Character</h3>
                <p>
                    Designing a character is the heart of the LettuceAI experience. You can define every detail from their appearance to their deepest secrets.
                </p>
                <ol>
                    <li>Go to the <strong>Characters</strong> tab</li>
                    <li>Tap <strong>Create Character</strong></li>
                    <li>Fill in the character details:
                        <ul className="mt-2">
                            <li><strong>Name</strong> — Their display name</li>
                            <li><strong>Avatar</strong> — Portrait image</li>
                            <li><strong>System Prompt</strong> — Behavioral logic</li>
                        </ul>
                    </li>
                </ol>
            </DocSplit>

            <Callout type="info" title="Character Avatars">
                We recommend using portrait images with a 3:4 aspect ratio for the best display quality across all devices.
            </Callout>

            <h2>Writing Good System Prompts</h2>
            <p>
                The system prompt is the most important part of a character. It acts as the "operating system" for their personality.
            </p>
            <div className="not-prose my-6">
                <CodeBlock>{`You are Luna, a wise and patient mentor who specializes in teaching programming. You explain complex concepts using simple analogies. You're encouraging but also challenge students to think critically. You always ask follow-up questions to ensure understanding.`}</CodeBlock>
            </div>

            <DocSplit
                imageSrc="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800"
                imageAlt="Personality Traits"
                reverse
            >
                <h3>Personality & Traits</h3>
                <p>
                    Don't just state facts; define *how* they speak. Are they sarcastic? Overly formal? Do they have a specific accent?
                </p>
                <ul>
                    <li>Be specific about personality traits</li>
                    <li>Define how the character should respond</li>
                    <li>Include relevant knowledge or expertise</li>
                    <li>Set boundaries for what they *won't* do</li>
                </ul>
            </DocSplit>

            <Callout type="warning" title="Privacy Tip">
                All character data, including system prompts and avatars, are stored locally on your device. Use the export feature if you want to back them up or share them with others!
            </Callout>
        </motion.article>
    );
}
