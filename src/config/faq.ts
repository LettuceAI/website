export interface FAQ {
  question: string;
  answer: string;
}

export interface FAQCategory {
  category: string;
  faqs: FAQ[];
}

export const faqCategories: FAQCategory[] = [
  {
    category: "AI Basics",
    faqs: [
      {
        question: "Is LettuceAI the AI model?",
        answer:
          "No. LettuceAI is the app. The actual AI response comes from the model you connect through a provider. In simple terms: LettuceAI is the frontend, the provider is the service, and the model is the AI doing the writing.",
      },
      {
        question: "Why do I need my own API key?",
        answer:
          "LettuceAI uses a bring-your-own-key setup. Your API key tells the provider which account is making requests, and the provider bills that account directly. This gives you control over pricing, privacy, and model choice, but it also means you must create a provider account first.",
      },
      {
        question: "What is a token?",
        answer:
          "A token is a small chunk of text used by AI models for limits and billing. Tokens are not the same thing as words. Short words might be one token, while longer words or punctuation patterns may use multiple tokens.",
      },
      {
        question: "What does context length mean?",
        answer:
          "Context length is the maximum amount of text a model can see in a single request. That includes your latest message, recent chat history, system prompt, memory, lorebook entries, and usually the model's reply too. If too much text is included, older information may be dropped or summarized.",
      },
      {
        question: "Why does the AI forget things?",
        answer:
          "Because models only see what fits inside the current request. They do not automatically remember every previous message forever. LettuceAI's memory system helps by storing important details and bringing back the most relevant ones later.",
      },
      {
        question: "Why am I paying for messages if the app is free?",
        answer:
          "LettuceAI is free software, but many AI providers charge for usage. In most cases you are paying the provider for tokens sent in and tokens generated out, not paying LettuceAI itself.",
      },
      {
        question: "Are there any free providers?",
        answer:
          "Sometimes. Some providers offer free tiers, free trial credits, or limited daily usage, but those offers change often and usually come with caps, slower speeds, or smaller models. Do not assume a provider will stay free forever.",
      },
      {
        question: "Why does the same prompt give different answers?",
        answer:
          "AI chat is probabilistic, not perfectly deterministic. Replies can change because of randomness settings, small context changes, provider-side updates, or model behavior. This is normal.",
      },
      {
        question: "What is a hallucination?",
        answer:
          "A hallucination is when the model confidently says something false, invented, or unsupported. It can happen even with strong models, which is why important factual claims should be verified separately.",
      },
    ],
  },
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
          "LettuceAI stores long-term memory locally, retrieves only the most relevant entries during a chat turn, and periodically summarizes new conversation windows in the background. This helps it remember key events, relationships, and facts without replaying the whole chat every time.",
      },
      {
        question: "Does memory increase token usage?",
        answer:
          "Sometimes, yes. Retrieved memories and background summarization still use tokens. Dynamic Memory is usually cheaper than replaying an entire long chat because it injects a small relevant subset instead of everything.",
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
    question: "Why do I need my own API key?",
    answer:
      "Because LettuceAI does not run its own paid AI service. You connect your own provider account, and that provider handles the model requests and billing.",
  },
  {
    question: "Do I have to pay to use LettuceAI?",
    answer:
      "LettuceAI itself is free and open source. You only pay for the AI provider you connect, using your own API key.",
  },
  {
    question: "Are there any free providers?",
    answer:
      "Sometimes, yes. Some providers offer free tiers or trial credits, but they usually have limits and can change at any time.",
  },
  {
    question: "What do people actually use LettuceAI for?",
    answer:
      "Mostly long-term roleplay, storytelling, and character chats where memory and personality consistency matter.",
  },
  {
    question: "Do I need a good PC or GPU for this?",
    answer:
      "No. LettuceAI works on almost any device since the heavy AI processing is handled by the provider you choose.",
  },
  {
    question: "How is this different from other AI chat apps?",
    answer:
      "LettuceAI focuses on long conversations, real memory, and giving you control instead of locking you into one model or service.",
  },
  {
    question: "Can characters remember things from old conversations?",
    answer:
      "Yes. LettuceAI uses memory and lore systems designed to carry important details forward instead of resetting every chat.",
  },
  {
    question: "Is my data shared or tracked?",
    answer:
      "No telemetry is collected by LettuceAI. Your chats and data stay under your control.",
  },
  {
    question: "Can I run models locally without an internet connection?",
    answer:
      "Yes. LettuceAI has llama.cpp built in, so you can load GGUF models and run them directly on your device with no server, no API key, and no internet required.",
  },
  {
    question: "Does local inference work on phones too?",
    answer:
      "Not yet. The built-in llama.cpp engine currently runs on Windows, macOS, and Linux. Android support for local models is planned for a future release. On Android you can still use Ollama or any other local server running on your network.",
  },
];
