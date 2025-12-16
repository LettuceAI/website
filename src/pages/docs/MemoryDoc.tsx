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
                Our smart memory system gives you infinite context without paying for huge token windows.
            </p>

            <h2>How It Works</h2>
            <p>
                Traditional AI chat apps send your entire conversation history with each message. As conversations grow, this becomes expensive and eventually hits token limits.
            </p>
            <p>
                LettuceAI's memory system works differently:
            </p>
            <ol>
                <li><strong>Automatic Summarization</strong> — Old messages are summarized and stored</li>
                <li><strong>Semantic Search</strong> — Relevant memories are retrieved when needed</li>
                <li><strong>Context Injection</strong> — Memories are injected into your prompts</li>
            </ol>

            <h2>Enabling Memory</h2>
            <ol>
                <li>Go to <strong>Settings → Advanced</strong></li>
                <li>Enable <strong>Dynamic Memory</strong></li>
                <li>Download the embedding model (one-time, ~100MB)</li>
                <li>Configure memory settings</li>
            </ol>

            <h2>Memory Settings</h2>
            <ul>
                <li><strong>Context Window Size</strong> — How many recent messages to keep in full</li>
                <li><strong>Summarization Model</strong> — Which model to use for creating summaries</li>
                <li><strong>Memory Retrieval Count</strong> — How many memories to inject per message</li>
            </ul>

            <h2>Best Practices</h2>
            <ul>
                <li>Start with a context window of 10-20 messages</li>
                <li>Use a fast model for summarization (e.g., GPT-4o-mini)</li>
                <li>The memory system works best for long-form conversations and storytelling</li>
            </ul>

            <div className="not-prose my-6 p-4 rounded-lg bg-primary/10 border border-primary/30">
                <p className="text-sm text-primary">
                    <strong>Note:</strong> The embedding model runs locally on your device, so your memories never leave your device.
                </p>
            </div>

            <h2>Viewing Memories</h2>
            <p>
                You can view and manage stored memories:
            </p>
            <ol>
                <li>Open a chat</li>
                <li>Tap the memory icon in the toolbar</li>
                <li>Browse, search, or delete memories</li>
            </ol>
        </motion.article>
    );
}
