import { SEO } from "@/components/common/SEO";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, MessageCircle } from "lucide-react";
import { FaDiscord, FaGithub } from "react-icons/fa";
import { faqCategories } from "@/config/faq";
import { links } from "@/config/links";

function FAQItem({
    question,
    answer,
    isOpen,
    onToggle,
}: {
    question: string;
    answer: string;
    isOpen: boolean;
    onToggle: () => void;
}) {
    return (
        <div className="border-b border-white/[0.06] last:border-b-0">
            <button
                onClick={onToggle}
                className="w-full py-4 flex items-center justify-between text-left group"
            >
                <span className="text-[15px] font-medium text-white/80 group-hover:text-white transition-colors">
                    {question}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 ml-4"
                >
                    <ChevronDown className="w-4 h-4 text-white/20" />
                </motion.div>
            </button>

            <AnimatePresence initial={false}>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                            duration: 0.3,
                            ease: [0.25, 0.1, 0.25, 1],
                        }}
                        className="overflow-hidden"
                    >
                        <p className="pb-4 text-sm text-white/35 leading-relaxed">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export function FAQPage() {
    const [activeCategory, setActiveCategory] = useState(0);
    const [openItems, setOpenItems] = useState<Record<string, number | null>>(
        {}
    );

    const toggleItem = (category: string, index: number) => {
        setOpenItems((prev) => ({
            ...prev,
            [category]: prev[category] === index ? null : index,
        }));
    };

    return (
        <>
        <SEO
            title="FAQ"
            description="Frequently asked questions about LettuceAI — setup, providers, memory, privacy, and more."
            path="/faq"
        />
        <main className="min-h-screen bg-[#050505] pt-28 pb-16">
            <div className="max-w-3xl mx-auto px-6 sm:px-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-10"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-px bg-primary/40" />
                        <span className="text-primary text-[11px] font-semibold uppercase tracking-[0.2em]">
                            FAQ
                        </span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
                        Frequently{" "}
                        <span className="font-display italic text-primary">
                            asked
                        </span>
                    </h1>
                    <p className="text-[15px] text-white/35 leading-[1.7] max-w-xl">
                        Everything you need to know about LettuceAI. Can't find
                        an answer? Reach out on Discord.
                    </p>
                </motion.div>

                {/* Category tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="flex flex-wrap gap-2 mb-8"
                >
                    {faqCategories.map((cat, i) => (
                        <button
                            key={cat.category}
                            onClick={() => setActiveCategory(i)}
                            className={`px-3.5 py-1.5 text-[13px] font-medium rounded-full border transition-colors ${
                                activeCategory === i
                                    ? "text-white bg-white/[0.08] border-white/[0.12]"
                                    : "text-white/40 border-white/[0.06] hover:text-white/60 hover:border-white/[0.1]"
                            }`}
                        >
                            {cat.category}
                        </button>
                    ))}
                </motion.div>

                {/* FAQ items */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2 }}
                        className="border border-white/[0.06] rounded-xl bg-white/[0.01] p-5 sm:p-6"
                    >
                        {faqCategories[activeCategory].faqs.map(
                            (faq, index) => (
                                <FAQItem
                                    key={index}
                                    question={faq.question}
                                    answer={faq.answer}
                                    isOpen={
                                        openItems[
                                            faqCategories[activeCategory]
                                                .category
                                        ] === index
                                    }
                                    onToggle={() =>
                                        toggleItem(
                                            faqCategories[activeCategory]
                                                .category,
                                            index
                                        )
                                    }
                                />
                            )
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Contact CTA */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mt-10 p-6 rounded-xl border border-white/[0.06] bg-white/[0.01] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5"
                >
                    <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-primary/10 border border-primary/15 shrink-0 mt-0.5">
                            <MessageCircle className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-[15px] font-semibold text-white mb-1">
                                Still have questions?
                            </h3>
                            <p className="text-sm text-white/35">
                                Join our community or open an issue on GitHub.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2.5 shrink-0">
                        <a
                            href={links.discord}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 h-9 px-4 text-[13px] font-semibold text-white bg-primary/90 hover:bg-primary rounded-lg transition-colors"
                        >
                            <FaDiscord size={14} />
                            Discord
                        </a>
                        <a
                            href={links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 h-9 px-4 text-[13px] font-medium text-white/50 hover:text-white border border-white/[0.08] hover:border-white/[0.15] rounded-lg transition-colors"
                        >
                            <FaGithub size={14} />
                            GitHub
                        </a>
                    </div>
                </motion.div>
            </div>
        </main>
        </>
    );
}
