import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
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

            <h2>Creating a Character</h2>
            <ol>
                <li>Go to the <strong>Characters</strong> tab</li>
                <li>Tap <strong>Create Character</strong></li>
                <li>Fill in the character details:
                    <ul>
                        <li><strong>Name</strong> — The character's display name</li>
                        <li><strong>Avatar</strong> — Optional profile image</li>
                        <li><strong>Description</strong> — Brief summary shown in the character list</li>
                        <li><strong>System Prompt</strong> — Instructions that define the character's behavior</li>
                    </ul>
                </li>
                <li>Save your character</li>
            </ol>

            <h2>Writing Good System Prompts</h2>
            <p>
                The system prompt is the most important part of a character. Here's an example:
            </p>
            <div className="not-prose">
                <CodeBlock>{`You are Luna, a wise and patient mentor who specializes in teaching programming. You explain complex concepts using simple analogies. You're encouraging but also challenge students to think critically. You always ask follow-up questions to ensure understanding.`}</CodeBlock>
            </div>

            <h3>Tips for System Prompts</h3>
            <ul>
                <li>Be specific about personality traits</li>
                <li>Define how the character should respond</li>
                <li>Include relevant knowledge or expertise</li>
                <li>Set boundaries if needed</li>
            </ul>

            <h2>Using Characters</h2>
            <ol>
                <li>Start a new chat</li>
                <li>Select your character from the list</li>
                <li>The character's system prompt is automatically applied</li>
            </ol>

            <div className="not-prose mt-8 flex gap-3">
                <Link
                    to="/docs/memory"
                    className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-primary text-black font-medium hover:bg-primary/90 transition-colors"
                >
                    Next: Memory System
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </motion.article>
    );
}
