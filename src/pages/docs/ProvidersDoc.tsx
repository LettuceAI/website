import { motion } from "framer-motion";
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
                Providers are the services that actually run the AI models.
                LettuceAI connects to them — it doesn’t lock you into one.
            </p>

            <DocHeading level={2}>What is a provider?</DocHeading>
            <p>
                A provider is a company or service that hosts AI models and responds
                to your messages. When you send a message in LettuceAI, it is forwarded
                to the selected provider using your API key.
            </p>
            <p>
                LettuceAI acts as the interface, memory system, and character layer.
                The provider handles the heavy AI computation.
            </p>

            <DocHeading level={2}>Why use multiple providers?</DocHeading>
            <p>
                Each provider is a separate service with its own pricing, limits, models,
                and availability. Using more than one gives you flexibility instead of
                depending on a single company.
            </p>
            <ul>
                <li>
                    Providers have different prices and rate limits
                </li>
                <li>
                    One provider might be down or throttled while another works fine
                </li>
                <li>
                    Some providers offer models that others don’t
                </li>
                <li>
                    You can avoid being locked into one ecosystem
                </li>
            </ul>
            <p>
                LettuceAI lets you add multiple providers at the same time and switch between
                them instantly without losing chats or memory.
            </p>
            <p>
                Using more than one means you always have a backup and more choice.
            </p>
        </motion.article>
    );
}
