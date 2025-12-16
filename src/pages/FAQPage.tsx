import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Navbar, Footer } from "@/components/landing";

// Extended FAQ data with categories
const faqCategories = [
    {
        category: "General",
        faqs: [
            {
                question: "Is LettuceAI free?",
                answer: "Yes! LettuceAI is completely free and open source. You only pay for the AI provider you choose to use (like OpenAI or Anthropic). We don't charge anything.",
            },
            {
                question: "What makes LettuceAI different?",
                answer: "Unlike other apps, we're BYOK (Bring Your Own Key), open source, and privacy-first. Our smart memory system lets you have infinite context without paying for huge token windows.",
            },
            {
                question: "Is LettuceAI open source?",
                answer: "Yes! LettuceAI is fully open source under the MIT license. You can view, modify, and contribute to the code on GitHub.",
            },
        ],
    },
    {
        category: "Technical",
        faqs: [
            {
                question: "Do I need a powerful GPU?",
                answer: "No. LettuceAI uses cloud APIs, so all the heavy lifting happens on the provider's servers. Any modern computer or phone can run it smoothly.",
            },
            {
                question: "Can I use local models like Ollama?",
                answer: "Absolutely! LettuceAI supports Ollama and any OpenAI-compatible API endpoint. Run completely offline with your own local models.",
            },
            {
                question: "What platforms are supported?",
                answer: "Android is available now. Windows and Linux desktop apps are coming soon. iOS support is planned for a future release.",
            },
            {
                question: "How does the smart memory system work?",
                answer: "Our memory system automatically summarizes and stores important context from your conversations. When relevant, it injects this context back into your prompts, allowing you to have coherent conversations spanning thousands of messages.",
            },
        ],
    },
    {
        category: "Privacy & Data",
        faqs: [
            {
                question: "Where is my data stored?",
                answer: "Everything is stored locally on your device. Your conversations, characters, and settings never leave your computer unless you explicitly export them.",
            },
            {
                question: "Do you collect any telemetry?",
                answer: "No. We don't collect any usage data, analytics, or telemetry. Your privacy is paramount.",
            },
            {
                question: "Can you see my API keys?",
                answer: "No. Your API keys are stored locally on your device and sent directly to the AI providers. We never see or store your keys.",
            },
        ],
    },
    {
        category: "Providers & API",
        faqs: [
            {
                question: "Which AI providers are supported?",
                answer: "We support OpenAI, Anthropic, Google Gemini, DeepSeek, Mistral, Groq, xAI, OpenRouter, and many more. Any OpenAI-compatible endpoint works.",
            },
            {
                question: "Can I use multiple providers?",
                answer: "Yes! You can add multiple providers and switch between them mid-conversation. Mix and match models based on your needs.",
            },
            {
                question: "How do I get an API key?",
                answer: "Visit your chosen provider's website (e.g., platform.openai.com for OpenAI) and create an account. API keys are usually found in your account settings or developer console.",
            },
        ],
    },
];

function FAQItem({ question, answer, isOpen, onToggle }: {
    question: string;
    answer: string;
    isOpen: boolean;
    onToggle: () => void;
}) {
    return (
        <div className="border-b border-border/30 last:border-b-0">
            <button
                onClick={onToggle}
                className="w-full py-5 flex items-center justify-between text-left group"
            >
                <span className="text-base font-medium text-white group-hover:text-primary transition-colors">
                    {question}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 ml-4"
                >
                    <ChevronDown className="w-5 h-5 text-muted-foreground" />
                </motion.div>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                        className="overflow-hidden"
                    >
                        <p className="pb-5 text-muted-foreground leading-relaxed">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export function FAQPage() {
    const [openItems, setOpenItems] = useState<Record<string, number | null>>({});

    const toggleItem = (category: string, index: number) => {
        setOpenItems((prev) => ({
            ...prev,
            [category]: prev[category] === index ? null : index,
        }));
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-24 pb-16">
                <div className="max-w-4xl mx-auto px-6">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            Frequently Asked Questions
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Everything you need to know about LettuceAI. Can't find an answer? Join our Discord.
                        </p>
                    </motion.div>

                    {/* FAQ Categories */}
                    <div className="space-y-8">
                        {faqCategories.map((cat, catIndex) => (
                            <motion.div
                                key={cat.category}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: catIndex * 0.1 }}
                            >
                                <h2 className="text-xl font-semibold text-white mb-4">
                                    {cat.category}
                                </h2>
                                <div className="rounded-xl bg-zinc-900/30 border border-border/30 p-5">
                                    {cat.faqs.map((faq, index) => (
                                        <FAQItem
                                            key={index}
                                            question={faq.question}
                                            answer={faq.answer}
                                            isOpen={openItems[cat.category] === index}
                                            onToggle={() => toggleItem(cat.category, index)}
                                        />
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Contact CTA */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="mt-12 p-6 rounded-xl bg-zinc-900/30 border border-border/30 text-center"
                    >
                        <h3 className="font-semibold text-white mb-2">Still have questions?</h3>
                        <p className="text-muted-foreground mb-4">
                            Join our Discord community or open an issue on GitHub.
                        </p>
                        <div className="flex justify-center gap-3">
                            <a
                                href="https://discord.gg/745bEttw2r"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 rounded-lg bg-primary text-black font-medium hover:bg-primary/90 transition-colors"
                            >
                                Join Discord
                            </a>
                            <a
                                href="https://github.com/LettuceAI"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 rounded-lg bg-zinc-800 text-white font-medium hover:bg-zinc-700 transition-colors"
                            >
                                GitHub
                            </a>
                        </div>
                    </motion.div>
                </div>
            </main>
            <Footer />
        </>
    );
}
