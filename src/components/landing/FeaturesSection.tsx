import { motion } from "framer-motion";
import { ArrowRight, ImageIcon, Key } from "lucide-react";
import { images } from "@/config/images";

export function FeaturesSection() {
    return (
        <section id="features" className="py-16 sm:py-20 bg-[#050505]">
            <div className="max-w-6xl mx-auto px-6">
                {/* Section header */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white text-center mb-10"
                >
                    Everything for{" "}
                    <span className="font-display italic bg-linear-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
                        immersive storytelling
                    </span>
                </motion.h2>

                <div className="space-y-5">
                    {/* ───── Feature Hero: Memory System ───── */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.6 }}
                        className="group relative rounded-3xl overflow-hidden border border-white/[0.06] hover:border-primary/15 transition-colors duration-500"
                    >
                        <div className="relative aspect-[21/9] sm:aspect-[2.4/1] overflow-hidden">
                            <img
                                src="/images/landing/memory-manager.png"
                                alt="LettuceAI memory manager showing context summary and categorized memories"
                                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
                        </div>

                        <div className="absolute bottom-0 left-0 p-6 sm:p-8 lg:p-10 max-w-2xl">
                            <span className="inline-block text-primary text-xs font-semibold uppercase tracking-widest mb-2">
                                Dynamic Memory
                            </span>
                            <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2 tracking-tight">
                                Characters that remember everything
                            </h3>
                            <p className="text-sm sm:text-base text-white/60 leading-relaxed mb-4">
                                Context summaries, tagged memories, and
                                intelligent retrieval across thousands of
                                messages. Your stories never lose continuity.
                            </p>
                            <a
                                href="/docs/memory"
                                className="inline-flex items-center gap-1.5 text-sm text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                            >
                                How Memory works
                                <ArrowRight className="w-3.5 h-3.5" />
                            </a>
                        </div>
                    </motion.div>

                    {/* ───── Feature Row: Group Chats + Discovery ───── */}
                    <motion.div
                        initial={{ opacity: 0, y: 25 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.5 }}
                        className="grid md:grid-cols-2 gap-5"
                    >
                        {/* Group Chats */}
                        <a
                            href="/docs/group-chats"
                            className="group block rounded-3xl overflow-hidden border border-white/[0.06] bg-white/[0.02] hover:border-primary/15 transition-all duration-500"
                        >
                            <div className="aspect-[16/10] overflow-hidden">
                                <img
                                    src="/images/landing/group-chat-desktop.png"
                                    alt="Desktop group conversation with multiple AI characters"
                                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                                />
                            </div>
                            <div className="p-5 sm:p-6">
                                <span className="text-primary text-xs font-semibold uppercase tracking-widest">
                                    Group Chats
                                </span>
                                <h3 className="text-lg sm:text-xl font-bold text-white mt-1 mb-1.5 tracking-tight">
                                    Multiple characters, one conversation
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Each character maintains their own
                                    personality, voice, and memory within the
                                    same conversation.
                                </p>
                            </div>
                        </a>

                        {/* Character Discovery */}
                        <a
                            href="/docs/discovery"
                            className="group block rounded-3xl overflow-hidden border border-white/[0.06] bg-white/[0.02] hover:border-primary/15 transition-all duration-500"
                        >
                            <div className="aspect-[16/10] overflow-hidden">
                                <img
                                    src="/images/landing/discovery-trending.png"
                                    alt="Browse thousands of community-created characters"
                                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                                />
                            </div>
                            <div className="p-5 sm:p-6">
                                <span className="text-primary text-xs font-semibold uppercase tracking-widest">
                                    Discovery
                                </span>
                                <h3 className="text-lg sm:text-xl font-bold text-white mt-1 mb-1.5 tracking-tight">
                                    Thousands of characters, ready to go
                                </h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    Browse community-created characters, import
                                    instantly, and customize them to make them
                                    your own.
                                </p>
                            </div>
                        </a>
                    </motion.div>

                    {/* ───── Feature Row: Avatar Gen + Scene Gen + BYOK ───── */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.15 }}
                        transition={{ duration: 0.5 }}
                        className="grid sm:grid-cols-3 gap-5"
                    >
                        {/* Avatar Generation — with image */}
                        <a
                            href="/docs/image-generation"
                            className="group block rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02] hover:border-primary/15 transition-all duration-500"
                        >
                            <div className="aspect-[3/4] overflow-hidden">
                                <img
                                    src={images.imageGeneration.avatarGenerationResult}
                                    alt="AI-generated character portrait"
                                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="text-sm font-bold text-white mb-1">
                                    Avatar Generation
                                </h3>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Generate unique character portraits with AI
                                </p>
                            </div>
                        </a>

                        {/* Scene Generation — icon card */}
                        <a
                            href="/docs/image-generation"
                            className="group flex flex-col justify-between rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-primary/15 p-5 transition-all duration-500"
                        >
                            <div>
                                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                                    <ImageIcon className="w-5 h-5 text-primary" />
                                </div>
                                <h3 className="text-sm font-bold text-white mb-1.5">
                                    Scene Generation
                                </h3>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Generate illustrations and scene art directly
                                    inside your conversations.
                                </p>
                            </div>
                            <span className="inline-flex items-center gap-1 text-xs text-primary font-medium mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                Learn more <ArrowRight className="w-3 h-3" />
                            </span>
                        </a>

                        {/* BYOK — icon card */}
                        <a
                            href="/docs/api-keys"
                            className="group flex flex-col justify-between rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:border-primary/15 p-5 transition-all duration-500"
                        >
                            <div>
                                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                                    <Key className="w-5 h-5 text-primary" />
                                </div>
                                <h3 className="text-sm font-bold text-white mb-1.5">
                                    Bring Your Own Keys
                                </h3>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    Use API keys from any provider directly. No
                                    middleman, no subscriptions, no markup.
                                </p>
                            </div>
                            <span className="inline-flex items-center gap-1 text-xs text-primary font-medium mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                Learn more <ArrowRight className="w-3 h-3" />
                            </span>
                        </a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
