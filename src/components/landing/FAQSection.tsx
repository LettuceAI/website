import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { homepageFAQs } from "@/config/faq";

function FAQItem({
    question,
    answer,
    index,
    isOpen,
    onToggle,
}: {
    question: string;
    answer: string;
    index: number;
    isOpen: boolean;
    onToggle: () => void;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.35, delay: index * 0.04 }}
        >
            <button
                onClick={onToggle}
                className={`w-full py-4 px-5 flex items-center justify-between text-left rounded-lg transition-colors ${
                    isOpen
                        ? "bg-white/[0.04]"
                        : "hover:bg-white/[0.02]"
                }`}
            >
                <span
                    className={`text-[14px] sm:text-[15px] font-medium transition-colors ${
                        isOpen ? "text-white" : "text-white/70 group-hover:text-white"
                    }`}
                >
                    {question}
                </span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 ml-4"
                >
                    <ChevronDown
                        className={`w-4 h-4 transition-colors ${
                            isOpen ? "text-primary" : "text-white/20"
                        }`}
                    />
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
                        <p className="px-5 pb-4 text-[13px] sm:text-sm text-white/40 leading-relaxed">
                            {answer}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export function FAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    // Split FAQs into two columns
    const mid = Math.ceil(homepageFAQs.length / 2);
    const leftFaqs = homepageFAQs.slice(0, mid);
    const rightFaqs = homepageFAQs.slice(mid);

    return (
        <section className="relative py-16 sm:py-24 bg-[#050505]">
            <div className="max-w-[1280px] mx-auto px-6 sm:px-10">
                {/* Header row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 sm:mb-12"
                >
                    <div>
                        <span className="text-primary text-[11px] font-semibold uppercase tracking-[0.2em] mb-3 block">
                            FAQ
                        </span>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
                            Common questions
                        </h2>
                    </div>
                    <Link
                        to="/faq"
                        className="inline-flex items-center gap-2 text-[13px] font-medium text-primary/70 hover:text-primary transition-colors group shrink-0"
                    >
                        View all FAQs
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                </motion.div>

                {/* Two-column FAQ grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-0">
                    {/* Left column */}
                    <div className="divide-y divide-white/[0.05]">
                        {leftFaqs.map((faq, index) => (
                            <FAQItem
                                key={index}
                                question={faq.question}
                                answer={faq.answer}
                                index={index}
                                isOpen={openIndex === index}
                                onToggle={() =>
                                    setOpenIndex(
                                        openIndex === index ? null : index
                                    )
                                }
                            />
                        ))}
                    </div>

                    {/* Right column */}
                    <div className="divide-y divide-white/[0.05]">
                        {rightFaqs.map((faq, index) => {
                            const globalIndex = mid + index;
                            return (
                                <FAQItem
                                    key={globalIndex}
                                    question={faq.question}
                                    answer={faq.answer}
                                    index={index}
                                    isOpen={openIndex === globalIndex}
                                    onToggle={() =>
                                        setOpenIndex(
                                            openIndex === globalIndex
                                                ? null
                                                : globalIndex
                                        )
                                    }
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
