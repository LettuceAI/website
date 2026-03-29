import { motion } from "framer-motion";
import { Brain, Sparkles, Tag, Clock } from "lucide-react";
import { images } from "@/config/images";

const HIGHLIGHTS = [
    {
        icon: Brain,
        title: "Dynamic Memory",
        description:
            "Automatically extracts and stores key details from every conversation turn.",
    },
    {
        icon: Tag,
        title: "Tagged & Organized",
        description:
            "Memories are categorized — plot events, relationships, world details, character traits.",
    },
    {
        icon: Sparkles,
        title: "Smart Retrieval",
        description:
            "The right memories surface at the right time, keeping responses contextually aware.",
    },
    {
        icon: Clock,
        title: "Heat Lifecycle",
        description:
            "Memories decay naturally over time. Relevant ones stay warm, stale ones fade out.",
    },
] as const;

export function MemoryShowcase() {
    return (
        <section className="relative bg-[#050505] py-20 sm:py-28 overflow-hidden">
            <div className="max-w-[1440px] mx-auto px-6 sm:px-10">
                {/* Top: Headline left, description right */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
                    className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 lg:gap-20 mb-12 sm:mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-bold text-white tracking-tight leading-[1.1] max-w-xl">
                        Characters that{" "}
                        <span className="font-display italic text-primary">
                            remember everything
                        </span>
                    </h2>

                    <p className="text-[15px] text-white/40 leading-[1.7] max-w-md lg:pb-1">
                        Not just last-message context. LettuceAI tracks plot
                        events, relationships, character traits, and world
                        details across your entire conversation history.
                    </p>
                </motion.div>

                {/* Screenshot with bottom fade + overlaid highlights */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{
                        duration: 0.7,
                        delay: 0.15,
                        ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="relative"
                >
                    <div className="max-w-6xl mx-auto relative">
                        <img
                            src={images.memoryDesktop}
                            alt="LettuceAI Memory Manager — context summaries and tagged memories"
                            className="w-full block rounded-xl"
                            loading="lazy"
                            style={{
                                maskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
                                WebkitMaskImage: "linear-gradient(to bottom, black 50%, transparent 100%)",
                            }}
                        />
                    </div>

                    {/* 4 highlights below the image, full container width */}
                    <div className="relative -mt-16 sm:-mt-20">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
                                {HIGHLIGHTS.map(({ icon: Icon, title, description }) => (
                                    <div key={title}>
                                        <div className="flex items-center gap-2.5 mb-2.5">
                                            <Icon
                                                size={16}
                                                strokeWidth={2}
                                                className="text-primary/70"
                                            />
                                            <span className="text-[14px] font-semibold text-white">
                                                {title}
                                            </span>
                                        </div>
                                        <p className="text-[13px] text-white/35 leading-[1.65]">
                                            {description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                </motion.div>

            </div>
        </section>
    );
}
