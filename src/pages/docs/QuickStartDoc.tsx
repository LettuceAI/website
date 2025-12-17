import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { DocImage } from "@/components/docs/DocImage";
import { Callout } from "@/components/docs/Callout";

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

            <DocImage
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2000"
                alt="AI Provider Setup"
                caption="The provider configuration screen where you manage your API keys."
            />

            <ol>
                <li>Open the app and go to <strong>Settings → Providers</strong></li>
                <li>Tap <strong>Add Provider</strong></li>
                <li>Select your provider (e.g., OpenAI, Anthropic)</li>
                <li>Enter your API key</li>
                <li>Save the configuration</li>
            </ol>

            <Callout type="info" title="Pro Tip">
                Don't have an API key? Visit the <Link to="/docs/api-keys">API Keys guide</Link> to learn how to get one.
            </Callout>

            <h2>Step 2: Start a Conversation</h2>
            <ol>
                <li>Go to the <strong>Chats</strong> tab</li>
                <li>Tap <strong>New Chat</strong></li>
                <li>Select a model from your configured providers</li>
                <li>Start typing your message</li>
            </ol>

            <Callout type="success" title="Success!">
                Your first message will trigger the AI to respond using your chosen model. You're now ready to roll!
            </Callout>

            <h2>Step 3: Explore Features</h2>
            <p>
                Once you're comfortable with basic chatting, explore these features:
            </p>
            <ul>
                <li><Link to="/docs/characters">Create custom characters</Link> with unique personalities.</li>
                <li><Link to="/docs/memory">Enable smart memory</Link> for context that lasts across sessions.</li>
                <li>Add multiple providers and switch between them instantly.</li>
            </ul>

            <Callout type="warning" title="Privacy Note">
                Your API keys are stored locally on your device. LettuceAI never sees or stores your keys on its own servers.
            </Callout>
        </motion.article>
    );
}
