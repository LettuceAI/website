import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function QuickStartDoc() {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="prose prose-invert max-w-none"
        >
            <h1>Quick Start</h1>
            <p className="lead">
                Get chatting with AI in under 5 minutes.
            </p>

            <h2>Step 1: Add a Provider</h2>
            <p>
                After launching LettuceAI, you'll need to add at least one AI provider.
            </p>
            <ol>
                <li>Open the app and go to <strong>Settings → Providers</strong></li>
                <li>Tap <strong>Add Provider</strong></li>
                <li>Select your provider (e.g., OpenAI, Anthropic)</li>
                <li>Enter your API key</li>
                <li>Save the configuration</li>
            </ol>

            <div className="not-prose my-6 p-4 rounded-lg bg-primary/10 border border-primary/30">
                <p className="text-sm text-primary">
                    <strong>Tip:</strong> Don't have an API key? Visit the <Link to="/docs/api-keys" className="underline">API Keys guide</Link> to learn how to get one.
                </p>
            </div>

            <h2>Step 2: Start a Conversation</h2>
            <ol>
                <li>Go to the <strong>Chats</strong> tab</li>
                <li>Tap <strong>New Chat</strong></li>
                <li>Select a model from your configured providers</li>
                <li>Start typing your message</li>
            </ol>

            <h2>Step 3: Explore Features</h2>
            <p>
                Once you're comfortable with basic chatting, explore these features:
            </p>
            <ul>
                <li><Link to="/docs/characters" className="text-primary hover:underline">Create custom characters</Link> with unique personalities</li>
                <li><Link to="/docs/memory" className="text-primary hover:underline">Enable smart memory</Link> for infinite context</li>
                <li>Add multiple providers and switch between them</li>
            </ul>

            <div className="not-prose mt-8 flex gap-3">
                <Link
                    to="/docs/api-keys"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-black font-medium hover:bg-primary/90 transition-colors"
                >
                    Next: API Keys
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </motion.article>
    );
}
