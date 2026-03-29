import { motion } from "framer-motion";
import {
    BookOpen,
    MessageCircle,
    Wand2,
    RefreshCw,
    ShieldCheck,
    Code,
    Mic,
    Search,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const capabilities: { icon: LucideIcon; name: string; desc: string }[] = [
    {
        icon: Search,
        name: "Discovery",
        desc: "Browse thousands of community-created characters. Import, remix, and make them yours.",
    },
    {
        icon: Mic,
        name: "Text-to-Speech",
        desc: "4+ TTS providers. Custom voices, auto-play, and per-character voice settings.",
    },
    {
        icon: BookOpen,
        name: "Lorebooks",
        desc: "World-building entries that activate contextually based on keywords and conditions.",
    },
    {
        icon: MessageCircle,
        name: "Reply Helper",
        desc: "AI-suggested responses when you're stuck — pick from multiple options or regenerate.",
    },
    {
        icon: Wand2,
        name: "Personas",
        desc: "Define how you appear to your characters — name, backstory, writing style.",
    },
    {
        icon: RefreshCw,
        name: "Device Sync",
        desc: "Sync characters and chats across all your devices over local network.",
    },
    {
        icon: ShieldCheck,
        name: "Fully Private",
        desc: "No accounts, no telemetry, no data collection. Everything stays on device.",
    },
    {
        icon: Code,
        name: "Open Source",
        desc: "Transparent, community-driven, AGPL-3.0. Audit every line of code.",
    },
];


export function CapabilitiesSection() {
    return (
        <section className="bg-[#050505] py-16 sm:py-20 border-t border-white/[0.04]">
            <div className="max-w-[1440px] mx-auto px-6 sm:px-10">
                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="text-white/25 text-xs font-medium uppercase tracking-[0.15em] mb-8 text-center"
                >
                    Everything else you need
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.5 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3"
                >
                    {capabilities.map((cap) => (
                        <div
                            key={cap.name}
                            className="group relative rounded-xl border border-white/[0.06] bg-white/[0.015] p-5 hover:border-white/[0.12] hover:bg-white/[0.03] transition-all duration-300 overflow-hidden"
                        >
                            <div className="absolute top-0 left-5 right-5 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            <cap.icon
                                size={18}
                                strokeWidth={2}
                                className="text-primary/50 mb-3 group-hover:text-primary/80 transition-colors"
                            />
                            <h3 className="text-[14px] font-semibold text-white mb-1.5">
                                {cap.name}
                            </h3>
                            <p className="text-[12px] text-white/30 leading-[1.65] group-hover:text-white/40 transition-colors">
                                {cap.desc}
                            </p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
