export interface FAQ {
    question: string;
    answer: string;
};

export interface FAQCategory {
    category: string;
    faqs: FAQ[];
};

export const faqCategories: FAQCategory[] = [
    {
        category: "General",
        faqs: [
            {
                question: "Is LettuceAI free?",
                answer:
                    "Yes. LettuceAI is completely free and open source. There are no subscriptions, ads, or hidden costs. You only pay the AI provider you choose to use (such as OpenAI or Anthropic).",
            },
            {
                question: "What is LettuceAI for?",
                answer:
                    "LettuceAI is an AI roleplay and storytelling app designed for long, immersive conversations. It focuses on character consistency, memory, and creative control rather than short, disposable chats.",
            },
            {
                question: "What makes LettuceAI different from other AI chat apps?",
                answer:
                    "LettuceAI is built around long-term memory, character persistence, and user control. Instead of relying on massive context windows, it intelligently manages memory so conversations stay coherent over time without wasting tokens.",
            },
            {
                question: "Is LettuceAI open source?",
                answer:
                    "Yes. LettuceAI is fully open source. You can inspect the code, modify it, or contribute on GitHub.",
            },
        ],
    },

    {
        category: "Technical",
        faqs: [
            {
                question: "Do I need a powerful GPU?",
                answer:
                    "No. LettuceAI primarily uses external AI providers, so model inference runs on their servers. Any modern computer or phone can run LettuceAI smoothly.",
            },
            {
                question: "Can I use local models like Ollama?",
                answer:
                    "Yes. LettuceAI supports Ollama and other OpenAI-compatible local endpoints. This allows you to run models locally, including fully offline setups.",
            },
            {
                question: "What platforms are supported?",
                answer:
                    "Android is available now. Windows and Linux desktop versions are in development. iOS support is planned for a future release.",
            },
            {
                question: "Does LettuceAI work offline?",
                answer:
                    "Yes, if you use local models such as Ollama. When using cloud providers, an internet connection is required for model responses.",
            },
            {
                question: "Is LettuceAI beginner-friendly?",
                answer:
                    "Yes. You can start with simple defaults, but advanced users can deeply customize models, memory behavior, and system prompts.",
            },
        ],
    },

    {
        category: "Memory & Roleplay",
        faqs: [
            {
                question: "How does the memory system work?",
                answer:
                    "LettuceAI automatically summarizes important parts of conversations and stores them as long-term memory. When relevant, this information is injected back into prompts so the AI remembers key events, relationships, and facts.",
            },
            {
                question: "Does memory increase token usage?",
                answer:
                    "No. The memory system is designed to reduce token usage by summarizing and selectively injecting only what is relevant, instead of replaying entire chat histories.",
            },
            {
                question: "Can I control or edit memories?",
                answer:
                    "Yes. You can view, edit, delete, or pin memories manually, giving you full control over what the AI remembers.",
            },
            {
                question: "Is LettuceAI suitable for long-running stories?",
                answer:
                    "Absolutely. LettuceAI is specifically designed for long-term roleplay and storytelling, where character consistency and continuity matter.",
            },
        ],
    },

    {
        category: "Providers & Models",
        faqs: [
            {
                question: "Which AI providers are supported?",
                answer:
                    "LettuceAI supports OpenAI, Anthropic, Google Gemini, DeepSeek, Mistral, Groq, xAI, OpenRouter, and more. Any OpenAI-compatible API endpoint should work.",
            },
            {
                question: "Can I use multiple providers?",
                answer:
                    "Yes. You can add multiple providers and switch between models at any time, even mid-conversation.",
            },
            {
                question: "Can I use different models for different characters?",
                answer:
                    "Yes. LettuceAI allows you to assign different models or providers per character or conversation.",
            },
            {
                question: "How do I get an API key?",
                answer:
                    "Create an account on your chosen provider’s website and generate an API key from their developer dashboard or account settings.",
            },
        ],
    },
] as const;


export const homepageFAQs: FAQ[] = [
    {
        question: "Is LettuceAI free?",
        answer:
            "Yes. LettuceAI is free and open source. You only pay for the AI provider you choose to use.",
    },
    {
        question: "What is LettuceAI best at?",
        answer:
            "Long-term roleplay, storytelling, and character-driven conversations with memory that actually lasts.",
    },
    {
        question: "Do I need a powerful GPU?",
        answer:
            "No. LettuceAI runs on cloud providers or local models, so it works on almost any device.",
    },
    {
        question: "Can I use local models like Ollama?",
        answer:
            "Yes. LettuceAI supports Ollama and other OpenAI-compatible local endpoints, including offline setups.",
    },
    {
        question: "What makes LettuceAI different?",
        answer:
            "Smart memory, character consistency, open source design, and full control over models and providers.",
    },
];
