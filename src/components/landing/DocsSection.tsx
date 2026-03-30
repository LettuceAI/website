import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { BGPattern } from "@/components/ui/bg-pattern";
import {
    Rocket,
    Brain,
    Users,
    Mic,
    ArrowRight,
    Puzzle,
    Lightbulb,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface DocLink {
    icon: LucideIcon;
    title: string;
    desc: string;
    href: string;
}

const DOC_LINKS: DocLink[] = [
    {
        icon: Lightbulb,
        title: "AI Basics",
        desc: "New to AI chat? Learn what tokens, context, and providers mean in plain language.",
        href: "/docs/ai-basics",
    },
    {
        icon: Rocket,
        title: "Quick Start",
        desc: "Set up your first character and start chatting in under 5 minutes.",
        href: "/docs/quickstart",
    },
    {
        icon: Users,
        title: "Characters",
        desc: "Create characters with personalities, scenes, and lore that stick.",
        href: "/docs/characters",
    },
    {
        icon: Brain,
        title: "Memory",
        desc: "How LettuceAI remembers details across long conversations.",
        href: "/docs/memory",
    },
    {
        icon: Puzzle,
        title: "System Prompts",
        desc: "Fine-tune AI behavior with conditional logic and templates.",
        href: "/docs/system-prompts",
    },
    {
        icon: Mic,
        title: "Text to Speech",
        desc: "Give your characters a voice with built-in TTS support.",
        href: "/docs/tts",
    },
];

export function DocsSection() {
    return (
        <section className="relative py-16 sm:py-24 bg-[#050505] overflow-hidden">
            <BGPattern variant="grid" mask="fade-edges" size={32} fill="rgba(255,255,255,0.04)" className="!z-0 pointer-events-none" />

            <div className="relative z-10 max-w-[1280px] mx-auto px-6 sm:px-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-xl mb-10 sm:mb-14"
                >
                    <span className="text-primary text-[11px] font-semibold uppercase tracking-[0.2em] mb-3 block">
                        Guides
                    </span>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-4">
                        There's a lot here.{" "}
                        <span className="text-white/40">
                            That's the point.
                        </span>
                    </h2>
                    <p className="text-[15px] text-white/40 leading-relaxed">
                        LettuceAI gives you real control, and that can feel like a lot at first. These guides walk you through it step by step, no guesswork needed.
                    </p>
                </motion.div>

                {/* Doc cards grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {DOC_LINKS.map(({ icon: Icon, title, desc, href }, i) => (
                        <motion.div
                            key={title}
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{
                                duration: 0.35,
                                delay: i * 0.05,
                            }}
                        >
                            <Link
                                to={href}
                                className="group flex gap-4 p-5 rounded-xl border border-white/[0.06] bg-white/[0.015] hover:border-white/[0.12] hover:bg-white/[0.03] transition-all duration-200"
                            >
                                <div className="shrink-0 mt-0.5">
                                    <div className="w-9 h-9 rounded-lg bg-primary/[0.08] border border-primary/[0.12] flex items-center justify-center">
                                        <Icon
                                            size={16}
                                            strokeWidth={2}
                                            className="text-primary/80"
                                        />
                                    </div>
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-[14px] font-semibold text-white/80 group-hover:text-white transition-colors mb-1">
                                        {title}
                                    </h3>
                                    <p className="text-[13px] text-white/35 leading-relaxed">
                                        {desc}
                                    </p>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Browse all */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mt-8"
                >
                    <Link
                        to="/docs"
                        className="inline-flex items-center gap-2 text-[13px] font-medium text-primary/70 hover:text-primary transition-colors group"
                    >
                        Browse all documentation
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
