import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function ApiKeysDoc() {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="prose prose-invert max-w-none"
        >
            <h1>API Keys</h1>
            <p className="lead">
                Learn how to get and configure API keys for various providers.
            </p>

            <h2>What is an API Key?</h2>
            <p>
                An API key is a unique identifier that allows LettuceAI to communicate with AI providers on your behalf. You pay the provider directly for usage—we never see your keys or charge any fees.
            </p>

            <h2>Getting API Keys</h2>

            <h3>OpenAI</h3>
            <ol>
                <li>Go to <a href="https://platform.openai.com" target="_blank" rel="noopener noreferrer" className="text-primary">platform.openai.com</a></li>
                <li>Sign up or log in</li>
                <li>Navigate to <strong>API Keys</strong> in the sidebar</li>
                <li>Click <strong>Create new secret key</strong></li>
                <li>Copy and save your key (you won't see it again)</li>
            </ol>

            <h3>Anthropic (Claude)</h3>
            <ol>
                <li>Go to <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer" className="text-primary">console.anthropic.com</a></li>
                <li>Sign up or log in</li>
                <li>Go to <strong>API Keys</strong></li>
                <li>Create a new key</li>
            </ol>

            <h3>Google Gemini</h3>
            <ol>
                <li>Go to <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-primary">Google AI Studio</a></li>
                <li>Sign in with your Google account</li>
                <li>Click <strong>Create API Key</strong></li>
            </ol>

            <h2>Adding Keys to LettuceAI</h2>
            <ol>
                <li>Open LettuceAI</li>
                <li>Go to <strong>Settings → Providers</strong></li>
                <li>Tap <strong>Add Provider</strong></li>
                <li>Select your provider</li>
                <li>Paste your API key</li>
                <li>Save</li>
            </ol>

            <div className="not-prose my-6 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
                <p className="text-sm text-amber-200">
                    <strong>Security:</strong> Your API keys are stored locally on your device and sent directly to providers. We never see or store your keys.
                </p>
            </div>

            <div className="not-prose mt-8 flex gap-3">
                <Link
                    to="/docs/providers"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-black font-medium hover:bg-primary/90 transition-colors"
                >
                    Next: Providers
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </motion.article>
    );
}
