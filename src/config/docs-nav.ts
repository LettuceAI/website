import { Home, Download, Zap, Settings, Brain, Key, HelpCircle, Book, Bot, PersonStandingIcon } from "lucide-react";

export const docsNav = [
    {
        title: "Getting Started",
        items: [
            { title: "Introduction", href: "/docs", icon: Home, keywords: ["home", "start", "welcome", "overview"] },
            { title: "Installation", href: "/docs/installation", icon: Download, keywords: ["install", "download", "setup", "android", "apk"] },
            { title: "Quick Start", href: "/docs/quickstart", icon: Zap, keywords: ["quick", "start", "begin", "first", "tutorial"] },
        ],
    },
    {
        title: "Configuration",
        items: [
            { title: "API Keys", href: "/docs/api-keys", icon: Key, keywords: ["api", "key", "openai", "anthropic", "claude", "gemini", "token"] },
            { title: "Providers", href: "/docs/providers", icon: Settings, keywords: ["provider", "model", "ollama", "local", "endpoint", "custom"] },
        ],
    },
    {
        title: "Features",
        items: [
            { title: "Characters", href: "/docs/characters", icon: Bot, keywords: ["character", "persona", "personality", "avatar", "system prompt"] },
            { title: "Personas", href: "/docs/personas", icon: PersonStandingIcon, keywords: ["persona", "personality", "role", "voice", "user"] },
            { title: "System Prompts", href: "/docs/system-prompts", icon: Settings, keywords: ["system", "prompt", "instructions", "behavior", "rules"] },
            { title: "Memory System", href: "/docs/memory", icon: Brain, keywords: ["memory", "context", "history", "remember", "infinite", "summarization"] },
            { title: "Lorebooks", href: "/docs/lorebooks", icon: Book, keywords: ["lorebook", "lore", "lorebook", "lorebook", "lorebook"] },
        ],
    },
    {
        title: "Help",
        items: [
            { title: "FAQ", href: "/faq", icon: HelpCircle, keywords: ["faq", "question", "help", "support", "common"] },
        ],
    },
];

export const allDocsItems = docsNav.flatMap(section =>
    section.items.map(item => ({ ...item, section: section.title }))
);
