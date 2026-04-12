export const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "LettuceAI",
    url: "https://lettuceai.app",
    logo: "https://lettuceai.app/logo.png",
    sameAs: [
        "https://github.com/LettuceAI",
        "https://discord.gg/745bEttw2r",
    ],
};

export const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "LettuceAI",
    alternateName: ["Lettuce AI", "Lettuce"],
    url: "https://lettuceai.app",
    applicationCategory: "EntertainmentApplication",
    applicationSubCategory: "AI Roleplay & Storytelling",
    operatingSystem: "Android, Windows, macOS, Linux",
    offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
    },
    description:
        "Free, open-source AI roleplay and storytelling app with text-to-speech, scene-aware image generation, long-term memory, group chats, lorebooks, custom characters, and 20+ AI providers. Runs locally on Android, Windows, macOS, and Linux. No filters, no accounts, no data collection — BYOK and bring your own models.",
    featureList: [
        "Text-to-speech (TTS) voice output for characters",
        "Advanced AI image generation with scene-aware illustrations",
        "Automatic character avatar generation",
        "Long-term memory across conversations",
        "Group chats with multiple characters in a single scene",
        "Lorebooks and world-building entries",
        "Custom character creation with smart creator",
        "Personas for roleplaying as yourself",
        "Visual system prompt builder with conditional logic",
        "Chat templates and reusable prompt presets",
        "Character card import/export (Chara v2/v3 PNG, JSON, UEC)",
        "20+ AI provider support (OpenAI, Anthropic, Google, DeepSeek, Mistral, Groq, xAI, OpenRouter, Moonshot, Qwen, Ollama, LM Studio)",
        "Local inference via Ollama",
        "BYOK — bring your own API keys",
        "100% local data storage, on-device and private",
        "Cross-platform: Android, Windows, macOS, Linux",
        "Open source (AGPL-3.0)",
        "No accounts, no filters, no telemetry",
        "Reply helper for writing assistance",
        "Character discovery",
        "Full accessibility support",
    ],
    license: "https://www.gnu.org/licenses/agpl-3.0.en.html",
    softwareVersion: "latest",
    author: {
        "@type": "Organization",
        name: "LettuceAI",
        url: "https://lettuceai.app",
    },
};

export const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "LettuceAI",
    url: "https://lettuceai.app",
};

export function buildFaqSchema(
    faqs: { question: string; answer: string }[]
): Record<string, unknown> {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };
}

export function buildBreadcrumbSchema(
    items: { name: string; path: string }[]
): Record<string, unknown> {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.name,
            item: `https://lettuceai.app${item.path}`,
        })),
    };
}

export const providerListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "LettuceAI Supported AI Providers",
    description:
        "AI providers supported by LettuceAI including OpenAI, Anthropic, Google Gemini, and more.",
    numberOfItems: 20,
    itemListElement: [
        "OpenAI", "Anthropic", "Google Gemini", "DeepSeek", "Mistral AI",
        "Groq", "xAI", "OpenRouter", "Moonshot", "Qwen",
    ].map((name, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name,
    })),
};

export const converterSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "LettuceAI Character Card Converter",
    url: "https://lettuceai.app/convert",
    applicationCategory: "UtilityApplication",
    operatingSystem: "Any",
    offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
    },
    description:
        "Convert between PNG character cards (Chara v2/v3) and UEC format. Free, runs entirely in your browser.",
};
