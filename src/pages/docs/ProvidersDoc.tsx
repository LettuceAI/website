import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { DocHeading } from "@/components/docs/DocHeading";

export function ProvidersDoc() {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="prose prose-invert max-w-none"
        >
            <DocHeading level={1}>Providers</DocHeading>
            <p className="lead">
                LettuceAI supports a wide range of AI providers. Use one or many.
            </p>

            <DocHeading level={2}>Supported Providers</DocHeading>
            <p>
                See the full list of <Link to="/providers" className="text-primary hover:underline">supported providers</Link>.
            </p>

            <DocHeading level={2}>Adding a Provider</DocHeading>
            <ol>
                <li>Go to <strong>Settings → Providers</strong></li>
                <li>Tap <strong>Add Provider</strong></li>
                <li>Select your provider type</li>
                <li>Enter your API key</li>
                <li>Optionally customize the endpoint URL</li>
                <li>Save</li>
            </ol>

            <DocHeading level={2}>Custom Endpoints</DocHeading>
            <p>
                Any OpenAI-compatible API works with LettuceAI. This includes:
            </p>
            <ul>
                <li><strong>Ollama</strong> — Local models at <code>http://localhost:11434/v1</code></li>
                <li><strong>LM Studio</strong> — Local inference server</li>
                <li><strong>vLLM</strong> — High-throughput serving</li>
                <li>Any other OpenAI-compatible endpoint</li>
            </ul>

            <DocHeading level={2}>Switching Providers</DocHeading>
            <p>
                You can switch providers at any time during a conversation:
            </p>
            <ol>
                <li>Open a chat</li>
                <li>Tap the model selector at the top</li>
                <li>Choose a different model or provider</li>
                <li>Continue chatting seamlessly</li>
            </ol>

            <div className="not-prose my-6 p-4 rounded-lg bg-primary/10 border border-primary/30">
                <p className="text-sm text-primary">
                    <strong>Tip:</strong> Use different providers for different tasks. Claude for creative writing, GPT-4 for coding, local models for privacy-sensitive conversations.
                </p>
            </div>

            <div className="not-prose mt-8 flex gap-3">
                <Link
                    to="/docs/characters"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-black font-medium hover:bg-primary/90 transition-colors"
                >
                    Next: Characters
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </motion.article>
    );
}
