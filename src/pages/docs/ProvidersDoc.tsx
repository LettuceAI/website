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
                LettuceAI ships with built-in support for the providers below. You add them
                under <strong>Settings → Providers</strong>. If your provider is not in this
                list, you can still connect it using a custom OpenAI-format or
                Anthropic-format endpoint.
            </p>

            <DocHeading level={3}>Cloud text providers</DocHeading>
            <p>
                These run AI models in the cloud. Each one needs an API key from that
                provider. See the API Keys doc for step-by-step instructions.
            </p>
            <ul>
                <li>OpenAI</li>
                <li>Anthropic (Claude)</li>
                <li>Google (Gemini)</li>
                <li>Gemini Agent Platform (Express)</li>
                <li>Cerebras</li>
                <li>DeepSeek</li>
                <li>Mistral AI</li>
                <li>Groq</li>
                <li>xAI (Grok)</li>
                <li>OpenRouter</li>
                <li>LiteRouter</li>
                <li>Pollinations AI</li>
                <li>NanoGPT</li>
                <li>Moonshot AI (Kimi)</li>
                <li>Qwen (Alibaba DashScope)</li>
                <li>Featherless AI</li>
                <li>Anannas AI</li>
                <li>zAI (GLM)</li>
                <li>NVIDIA NIM</li>
                <li>Chutes</li>
            </ul>

            <DocHeading level={3}>Image generation providers</DocHeading>
            <p>
                These create images instead of text. Stability AI runs in the cloud and
                needs an API key. The others run on your own machine or local network, so
                they do not need a key.
            </p>
            <ul>
                <li>Stability AI (cloud)</li>
                <li>AUTOMATIC1111 (self-hosted)</li>
                <li>ComfyUI (self-hosted)</li>
                <li>Diffusers (self-hosted)</li>
            </ul>

            <DocHeading level={3}>Local providers</DocHeading>
            <p>
                Local providers run models on your own device or network. They do not need
                an API key and do not send your chats to a cloud service.
            </p>
            <ul>
                <li>The built-in local engine (llama.cpp). See the Model Browser doc.</li>
                <li>Ollama (Local)</li>
                <li>LM Studio (Local)</li>
                <li>IntenseRP Next (Local)</li>
            </ul>

            <DocHeading level={3}>Custom endpoints</DocHeading>
            <ul>
                <li>Custom (OpenAI-format) for any OpenAI-compatible server</li>
                <li>Custom (Anthropic-format) for any Anthropic-compatible server</li>
            </ul>
            <p>
                For a custom endpoint you provide the base URL yourself, plus a key or any
                headers the server expects.
            </p>

            <Callout type="info" title="Verifying a provider">
                When you save a provider, LettuceAI can verify the connection against the
                provider's models endpoint. If verification fails, double-check the key,
                base URL, and any required headers. Local and self-hosted providers must be
                running and reachable on the address you entered.
            </Callout>
        </motion.article>
        </>
    );
}
