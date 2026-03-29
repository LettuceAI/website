import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Users,
    MessageSquare,
    Sparkles,
    Settings2,
    Image,
    Palette,
    Camera,
    Layers,
    Code,
    Timer,
    Puzzle,
    Eye,
} from "lucide-react";
import { images } from "@/config/images";
import type { LucideIcon } from "lucide-react";

interface Feature {
    id: string;
    label: string;
    headline: React.ReactNode;
    description: string;
    image: string;
    imageAlt: string;
    highlights: {
        icon: LucideIcon;
        title: string;
        desc: string;
    }[];
}

const FEATURES: Feature[] = [
    {
        id: "group-chats",
        label: "Group Chats",
        headline: (
            <>
                Multiple characters,{" "}
                <span className="font-display italic text-primary">
                    one story
                </span>
            </>
        ),
        description:
            "Build scenes with multiple AI characters that each maintain their own personality, voice, and memory. Set the dynamics and watch them interact.",
        image: images.groupChatsDesktop,
        imageAlt: "LettuceAI Group Chat — multiple characters in one conversation",
        highlights: [
            {
                icon: Users,
                title: "Multi-Character",
                desc: "Add as many characters as you want to a single conversation.",
            },
            {
                icon: MessageSquare,
                title: "@ Mentions",
                desc: "Direct messages to specific characters or let them all respond.",
            },
            {
                icon: Sparkles,
                title: "Independent Memory",
                desc: "Each character remembers their own interactions and relationships.",
            },
            {
                icon: Settings2,
                title: "Scene Control",
                desc: "Define starting scenarios, turn order, and character dynamics.",
            },
        ],
    },
    {
        id: "image-gen",
        label: "Image Generation",
        headline: (
            <>
                See your story{" "}
                <span className="font-display italic text-primary">
                    come alive
                </span>
            </>
        ),
        description:
            "Generate character avatars, scene illustrations, and design references directly within your conversations. Multiple providers, full control.",
        image: images.imageGenDesktop,
        imageAlt: "LettuceAI Image Generation — AI-generated portraits and scenes",
        highlights: [
            {
                icon: Image,
                title: "Scene Illustrations",
                desc: "Auto-generate images that match the current scene in your story.",
            },
            {
                icon: Camera,
                title: "Avatar Generation",
                desc: "Create character portraits from descriptions with one click.",
            },
            {
                icon: Palette,
                title: "Design References",
                desc: "Draft visual references to guide character and world design.",
            },
            {
                icon: Eye,
                title: "In-Chat Preview",
                desc: "Generated images appear inline, right where they belong.",
            },
        ],
    },
    {
        id: "system-prompts",
        label: "System Prompts",
        headline: (
            <>
                Total control over{" "}
                <span className="font-display italic text-primary">
                    every prompt
                </span>
            </>
        ),
        description:
            "A visual prompt builder with conditional logic, timing controls, and template variables. Build complex system prompts without touching raw text.",
        image: images.systemPromptsDesktop,
        imageAlt: "LettuceAI System Prompt Builder — visual conditional prompt editor",
        highlights: [
            {
                icon: Layers,
                title: "Entry Stacking",
                desc: "Layer multiple prompt entries with priority ordering.",
            },
            {
                icon: Puzzle,
                title: "Conditions",
                desc: "Activate entries based on turn count, keywords, or context.",
            },
            {
                icon: Timer,
                title: "Timing Control",
                desc: "Schedule when entries inject — first turn, every N turns, or always.",
            },
            {
                icon: Code,
                title: "Template Variables",
                desc: "Use {{character}}, {{persona}}, and custom variables.",
            },
        ],
    },
];

export function FeaturesSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const active = FEATURES[activeIndex];

    return (
        <section id="features" className="bg-[#050505] py-12 sm:py-16">
            <div className="max-w-[1440px] mx-auto px-6 sm:px-10">
                {/* Tabs at top — acts as the section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center justify-center gap-1 mb-10"
                >
                    {FEATURES.map((feature, i) => (
                        <button
                            key={feature.id}
                            onClick={() => setActiveIndex(i)}
                            className={`relative px-5 py-2 text-[13px] font-medium rounded-full transition-colors ${
                                i === activeIndex
                                    ? "text-white"
                                    : "text-white/35 hover:text-white/60"
                            }`}
                        >
                            {i === activeIndex && (
                                <motion.div
                                    layoutId="feature-tab-bg"
                                    className="absolute inset-0 rounded-full bg-white/[0.08] border border-white/[0.06]"
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 30,
                                    }}
                                />
                            )}
                            <span className="relative z-10">
                                {feature.label}
                            </span>
                        </button>
                    ))}
                </motion.div>

                {/* Centered headline + description */}
                <div className="text-center mb-8 sm:mb-10 min-h-[120px] sm:min-h-[100px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={active.id + "-header"}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                        >
                            <h2 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-bold text-white tracking-tight leading-[1.1] mb-5 max-w-2xl mx-auto">
                                {active.headline}
                            </h2>

                            <p className="text-[15px] text-white/40 leading-[1.7] max-w-lg mx-auto">
                                {active.description}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Screenshot — crossfade on tab change */}
                <div className="relative mb-8 sm:mb-10">
                    <div className="max-w-6xl mx-auto">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={active.id + "-img"}
                                src={active.image}
                                alt={active.imageAlt}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.35 }}
                                className="w-full block rounded-xl"
                                loading="lazy"
                                style={{
                                    maskImage:
                                        "linear-gradient(to bottom, black 60%, transparent 100%)",
                                    WebkitMaskImage:
                                        "linear-gradient(to bottom, black 60%, transparent 100%)",
                                }}
                            />
                        </AnimatePresence>
                    </div>
                </div>

                {/* Highlights — animate on tab change */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={active.id + "-highlights"}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6"
                    >
                        {active.highlights.map(
                            ({ icon: Icon, title, desc }) => (
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
                                        {desc}
                                    </p>
                                </div>
                            )
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
