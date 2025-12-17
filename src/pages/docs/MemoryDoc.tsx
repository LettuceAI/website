import { motion } from "framer-motion";

export function MemoryDoc() {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="prose prose-invert max-w-none"
        >
            <h1>Memory System</h1>

            <p className="lead">
                LettuceAI’s dynamic memory system is designed for long conversations.
                It keeps important context alive without replaying your entire chat history
                or requiring massive token windows.
            </p>

            <h2>Why Memory Matters</h2>
            <p>
                Most AI chat apps send the entire conversation history with every message.
                As chats grow longer, this becomes slow, expensive, and eventually impossible
                due to token limits.
            </p>
            <p>
                LettuceAI takes a different approach. Instead of remembering everything
                verbatim, it remembers what <em>matters</em>.
            </p>

            <h2>How Dynamic Memory Works</h2>
            <p>
                Dynamic memory continuously compresses long conversations into structured,
                searchable summaries and recalls them only when they are relevant.
            </p>

            <ol>
                <li>
                    <strong>Sliding Context Window</strong> — A limited number of recent
                    messages are kept in full detail to preserve conversational flow.
                </li>
                <li>
                    <strong>Automatic Summarization</strong> — Older messages are periodically
                    summarized into concise memories that capture key events, facts, and
                    character developments.
                </li>
                <li>
                    <strong>Semantic Retrieval</strong> — When you send a new message, the system
                    searches stored memories and selects only the most relevant ones.
                </li>
                <li>
                    <strong>Selective Injection</strong> — Retrieved memories are injected into
                    the prompt alongside recent messages, keeping responses coherent without
                    unnecessary token usage.
                </li>
            </ol>

            <h2>What the System Remembers</h2>
            <ul>
                <li>Important story events and decisions</li>
                <li>Character traits, relationships, and emotional states</li>
                <li>World rules, lore, and persistent facts</li>
                <li>Information that continues to matter across sessions</li>
            </ul>

            <p>
                Minor dialogue details and momentary exchanges are intentionally discarded.
                This keeps memory useful instead of noisy.
            </p>

            <h2>Enabling Dynamic Memory</h2>
            <ol>
                <li>Open <strong>Settings → Advanced</strong></li>
                <li>Enable <strong>Dynamic Memory</strong></li>
                <li>Download the local embedding model (one-time download)</li>
                <li>Adjust memory settings if desired</li>
            </ol>

            <h2>Memory Settings Explained</h2>
            <ul>
                <li>
                    <strong>Context Window Size</strong> — The number of recent messages kept
                    verbatim before summarization begins.
                </li>
                <li>
                    <strong>Summarization Model</strong> — The model used to create memory
                    summaries. Faster models work best for this task.
                </li>
                <li>
                    <strong>Memory Retrieval Count</strong> — How many past memories are injected
                    into each prompt when relevant.
                </li>
            </ul>

            <h2>Manual Memory Control</h2>
            <p>
                Dynamic memory is automatic, but you are always in control.
            </p>
            <ul>
                <li>Edit memories to correct mistakes or refine details</li>
                <li>Pin important memories so they are never removed</li>
                <li>Delete memories you no longer want the AI to recall</li>
            </ul>

            <h2>Best Practices</h2>
            <ul>
                <li>Start with a context window of 10–20 messages</li>
                <li>Use a fast, inexpensive model for summarization</li>
                <li>Review and pin critical memories in long-running stories</li>
                <li>Let the system forget small talk — it improves overall quality</li>
            </ul>

            <div className="not-prose my-6 p-4 rounded-lg bg-primary/10 border border-primary/30">
                <p className="text-sm text-primary">
                    <strong>Note:</strong> The embedding model runs entirely on your device.
                    Memory generation and retrieval are performed locally.
                </p>
            </div>

            <h2>Viewing and Managing Memories</h2>
            <ol>
                <li>Open a conversation</li>
                <li>Select the memory icon in the chat toolbar</li>
                <li>Browse, search, edit, pin, or delete stored memories</li>
            </ol>

            <p>
                Think of memory as a living summary of your story — constantly updated,
                selectively recalled, and always under your control.
            </p>
        </motion.article>
    );
}
