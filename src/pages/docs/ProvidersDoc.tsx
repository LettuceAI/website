import { motion } from "framer-motion";
import { DocHeading } from "@/components/docs/DocHeading";
import { Callout } from "@/components/docs/Callout";
import { SEO } from "@/components/common/SEO";
import { buildBreadcrumbSchema } from "@/config/schemas";

export function ProvidersDoc() {
    return (
        <>
        <SEO
          title="Providers"
          description="Understand what AI providers are and why using multiple providers gives you flexibility, better uptime, and more model choices."
          path="/docs/providers"
          jsonLd={buildBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Docs", path: "/docs" },
            { name: "Providers", path: "/docs/providers" },
          ])}
        />
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="prose prose-invert max-w-none"
        >
            <DocHeading level={1}>Providers</DocHeading>

            <p className="lead">
                Providers are the services that actually run the AI models.
                LettuceAI connects to them. It does not lock you into one.
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

            <DocHeading level={2}>Supported providers</DocHeading>
            <p>
                LettuceAI ships with built-in support for these providers. You can also add
                a custom OpenAI-format or Anthropic-format endpoint if your provider is not
                in this list.
            </p>

            <DocHeading level={3}>Cloud providers</DocHeading>
            <ul>
                <li>OpenAI</li>
                <li>Anthropic (Claude)</li>
                <li>Google (Gemini)</li>
                <li>DeepSeek</li>
                <li>Mistral AI</li>
                <li>Groq</li>
                <li>xAI (Grok)</li>
                <li>OpenRouter</li>
                <li>Moonshot AI (Kimi)</li>
                <li>Qwen (Alibaba DashScope)</li>
                <li>zAI (GLM)</li>
                <li>NVIDIA NIM</li>
                <li>Anannas AI</li>
                <li>Featherless AI</li>
                <li>NanoGPT</li>
                <li>Chutes</li>
                <li>Stability AI (image generation)</li>
            </ul>

            <DocHeading level={3}>Local providers</DocHeading>
            <ul>
                <li>Local (llama.cpp), the built-in engine. See the Model Browser doc.</li>
                <li>Ollama (Local)</li>
                <li>LM Studio (Local)</li>
                <li>AUTOMATIC1111 (Local, image generation)</li>
                <li>IntenseRP Next (Local)</li>
            </ul>

            <DocHeading level={3}>Custom endpoints</DocHeading>
            <ul>
                <li>Custom (OpenAI-format) for any OpenAI-compatible server</li>
                <li>Custom (Anthropic-format) for any Anthropic-compatible server</li>
            </ul>

            <Callout type="info" title="Verifying a provider">
                When you save a provider, LettuceAI can verify the API key against the
                provider's models endpoint. If verification fails, double-check the key,
                base URL, and any required headers.
            </Callout>
        </motion.article>
        </>
    );
}
