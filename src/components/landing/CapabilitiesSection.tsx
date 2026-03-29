import { motion } from "framer-motion";
import {
    BookOpen,
    Volume2,
    Layers,
    MessageCircle,
    RefreshCw,
    ShieldCheck,
    Wand2,
    Code,
} from "lucide-react";

const capabilities = [
    {
        icon: BookOpen,
        title: "Lorebooks",
        desc: "World-building entries that activate contextually",
    },
    {
        icon: Volume2,
        title: "Text-to-Speech",
        desc: "Hear characters speak with multiple TTS providers",
    },
    {
        icon: Layers,
        title: "System Prompts",
        desc: "Advanced prompts with conditional logic",
    },
    {
        icon: MessageCircle,
        title: "Reply Helper",
        desc: "AI-suggested responses for inspiration",
    },
    {
        icon: Wand2,
        title: "Personas",
        desc: "Define how you appear to characters",
    },
    {
        icon: RefreshCw,
        title: "Device Sync",
        desc: "Sync characters and chats across devices",
    },
    {
        icon: ShieldCheck,
        title: "Fully Private",
        desc: "No accounts, no telemetry, data stays local",
    },
    {
        icon: Code,
        title: "Open Source",
        desc: "Transparent, community-driven, AGPL-3.0",
    },
];

export function CapabilitiesSection() {
    return (
        <section className="py-12 sm:py-16 bg-[#050505]">
            <div className="max-w-6xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Compact header */}
                    <p className="text-center text-muted-foreground text-sm mb-8">
                        Plus lorebooks, text-to-speech, system prompts, personas,
                        sync, and more —
                    </p>

                    {/* Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
                        {capabilities.map((cap) => (
                            <div
                                key={cap.title}
                                className="group flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-primary/15 hover:bg-white/[0.04] transition-all duration-400"
                            >
                                <div className="shrink-0 w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center mt-0.5">
                                    <cap.icon className="w-3.5 h-3.5 text-primary/80" />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="font-medium text-white text-sm leading-tight">
                                        {cap.title}
                                    </h3>
                                    <p className="text-[11px] text-muted-foreground leading-snug mt-0.5">
                                        {cap.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
