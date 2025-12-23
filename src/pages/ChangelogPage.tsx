import { motion } from "framer-motion";
import { History, Brain, Sparkles, BookOpen, Image, Zap, Monitor, Bug, Heart, Download, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Navbar, Footer } from "@/components/landing";

export function ChangelogPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-24 pb-16">
                <div className="max-w-3xl mx-auto px-6">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                            <History className="w-4 h-4 text-primary" />
                            <span className="text-sm text-primary font-medium">Changelog</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            What's New
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Track updates, improvements, and fixes across LettuceAI releases.
                        </p>
                        <div className="flex items-center justify-center gap-3 mt-6">
                            <Button asChild className="gap-2">
                                <Link to="/download">
                                    <Download className="w-4 h-4" />
                                    Download Latest Version
                                </Link>
                            </Button>
                            <Button asChild variant="outline" className="gap-2">
                                <a href="https://github.com/LettuceAI/mobile-app" target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="w-4 h-4" />
                                    GitHub Repository
                                </a>
                            </Button>
                        </div>
                    </motion.div>

                    {/* Beta 6.2 Release */}
                    <motion.article
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="prose prose-invert max-w-none mb-16"
                    >
                        {/* Release Header */}
                        <div className="not-prose mb-8 pb-6 border-b border-border/30">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
                                    v1.0-beta.6.2
                                </span>
                                <span className="text-muted-foreground text-sm">
                                    December 24, 2025
                                </span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                                Backup Fixes, Provider Expansion & Extended Timeout
                            </h2>
                            <p className="text-muted-foreground">
                                Beta 6.2 is a stability and compatibility update focused on fixing critical backup issues, expanding provider support with Ollama and LM Studio, and improving reasoning model compatibility.
                            </p>
                        </div>

                        {/* Bug Fixes */}
                        <section className="mb-10">
                            <div className="flex items-center gap-3 mb-4 not-prose">
                                <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center shrink-0">
                                    <Bug className="w-4 h-4 text-red-400" />
                                </div>
                                <span className="text-xl font-semibold text-white">Bug Fixes</span>
                            </div>
                            <ul>
                                <li><strong>Fixed backup issues</strong> where data wasn't fully saved</li>
                                <li><strong>Fixed characters losing context</strong> after restore</li>
                                <li><strong>Fixed OpenRouter & MistralAI reasoning</strong> to work correctly with reasoning-capable models</li>
                                <li><strong>Fixed backups with images</strong> not loading properly</li>
                            </ul>
                        </section>

                        {/* New Features */}
                        <section className="mb-10">
                            <div className="flex items-center gap-3 mb-4 not-prose">
                                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                                    <Sparkles className="w-4 h-4 text-primary" />
                                </div>
                                <span className="text-xl font-semibold text-white">New Features</span>
                            </div>
                            <ul>
                                <li><strong>Added Ollama & LM Studio endpoint support</strong> for locally hosted models</li>
                                <li><strong>Added custom OpenAI / Anthropic-compatible endpoints</strong> for flexible API integration</li>
                                <li><strong>Increased request timeout</strong> from 2 minutes to 15 minutes for better handling of slow models and reasoning tasks</li>
                            </ul>
                        </section>
                    </motion.article>

                    {/* Beta 6 Release */}
                    <motion.article
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="prose prose-invert max-w-none"
                    >
                        {/* Release Header */}
                        <div className="not-prose mb-8 pb-6 border-b border-border/30">
                            <div className="flex items-center gap-3 mb-2">
                                <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium">
                                    v1.0-beta.6
                                </span>
                                <span className="text-muted-foreground text-sm">
                                    December 21, 2025
                                </span>
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                                Dynamic Memory v2, Lorebooks, In-Chat Image Generation & Major Performance Improvements
                            </h2>
                            <p className="text-muted-foreground">
                                Beta 6 is a major systems and UX update focused on memory accuracy, world consistency, creative flexibility, and performance. It's designed to make long conversations faster, more coherent, and easier to control, while expanding what's possible inside a single chat.
                            </p>
                        </div>

                        {/* Dynamic Memory v2 */}
                        <section className="mb-10">
                            <div className="flex items-center gap-3 mb-4 not-prose">
                                <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                                    <Brain className="w-4 h-4 text-primary" />
                                </div>
                                <span className="text-xl font-semibold text-white">Dynamic Memory v2</span>
                            </div>
                            <p>
                                Dynamic Memory has been significantly upgraded with faster, more responsive memory handling, higher recall accuracy, improved behavior in long-running chats, and better stability across multiple memory cycles.
                            </p>
                            <p>
                                Dynamic Memory v2 is designed to scale cleanly as conversations grow.
                            </p>
                        </section>

                        {/* New Embedding Model */}
                        <section className="mb-10">
                            <div className="flex items-center gap-3 mb-4 not-prose">
                                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0">
                                    <Sparkles className="w-4 h-4 text-blue-400" />
                                </div>
                                <span className="text-xl font-semibold text-white">New Embedding Model</span>
                            </div>
                            <p>
                                A new embedding model now powers memory retrieval in Beta 6. It is approximately 50% smaller than the previous model, runs faster during inference, and supports up to 4096 tokens (previously 512).
                            </p>
                            <p>
                                Existing memories remain compatible. No migration required.
                            </p>
                        </section>

                        {/* Context Enrichment */}
                        <section className="mb-10">
                            <div className="flex items-center gap-3 mb-4 not-prose">
                                <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0">
                                    <Zap className="w-4 h-4 text-purple-400" />
                                </div>
                                <span className="text-xl font-semibold text-white">Context Enrichment <span className="text-sm font-normal text-muted-foreground">(Experimental)</span></span>
                            </div>
                            <p>
                                An experimental Context Enrichment feature has been introduced. It enhances memory queries using the new embedding model, improves recall accuracy in follow-up messages, and reduces ambiguity during semantic search.
                            </p>
                            <p className="text-muted-foreground text-sm">
                                This feature is currently experimental and may evolve in future releases.
                            </p>
                        </section>

                        {/* Lorebooks */}
                        <section className="mb-10">
                            <div className="flex items-center gap-3 mb-4 not-prose">
                                <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                                    <BookOpen className="w-4 h-4 text-amber-400" />
                                </div>
                                <span className="text-xl font-semibold text-white">Lorebooks</span>
                            </div>
                            <p>
                                Lorebooks introduce a structured way to inject world, character, and knowledge information
                                into chats. Define locations, factions, rules, history, and concepts. Lore entries are automatically injected when relevant and treated as established canon.
                            </p>
                            <p>
                                Lorebooks improve consistency across scenes and long roleplay sessions while staying
                                separate from character memory.
                            </p>
                        </section>

                        {/* In-Chat Image Generation */}
                        <section className="mb-10">
                            <div className="flex items-center gap-3 mb-4 not-prose">
                                <div className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/30 flex items-center justify-center shrink-0">
                                    <Image className="w-4 h-4 text-pink-400" />
                                </div>
                                <span className="text-xl font-semibold text-white">In-Chat Image Generation</span>
                            </div>
                            <p>
                                Images can now be generated directly inside conversations. This is supported for models
                                that expose image generation capabilities, enabling visual storytelling and richer creative workflows directly within the chat flow.
                            </p>
                        </section>

                        {/* Model & API Improvements */}
                        <section className="mb-10">
                            <div className="flex items-center gap-3 mb-4 not-prose">
                                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
                                    <Zap className="w-4 h-4 text-cyan-400" />
                                </div>
                                <span className="text-xl font-semibold text-white">Model & API Improvements</span>
                            </div>
                            <ul>
                                <li>Added support for the <strong>Chutes API endpoint</strong></li>
                                <li>Introduced an <strong>OpenAI-compatible API endpoint</strong> with extensive customization including custom user/assistant role names and flexible chat completion behavior</li>
                                <li>Added <strong>Reasoning support</strong> for models that expose reasoning tokens</li>
                            </ul>
                        </section>

                        {/* Chat & Workflow Improvements */}
                        <section className="mb-10">
                            <h3>Chat & Workflow Improvements</h3>
                            <p>
                                <strong>Rewind to Here:</strong> Resume conversations from any previous user message.
                                Explore alternate paths without losing history.
                            </p>
                            <p>
                                <strong>Redesigned Chat Settings:</strong> A new Chat Settings panel designed based on user feedback and suggestions.
                            </p>
                        </section>

                        {/* UI & Layout Improvements */}
                        <section className="mb-10">
                            <h3>UI & Layout Improvements</h3>
                            <ul>
                                <li>Redesigned Character Cards for better clarity and hierarchy</li>
                                <li>Chat Header memory button now shows memory status and usage</li>
                                <li>Improved consistency across chat, settings, and character screens</li>
                                <li>Refined spacing, typography, and interaction feedback</li>
                                <li>Reduced visual noise in frequently used views</li>
                                <li>Redesigned chat history layout for readability</li>
                            </ul>
                        </section>

                        {/* Desktop Builds */}
                        <section className="mb-10">
                            <div className="flex items-center gap-3 mb-4 not-prose">
                                <div className="w-8 h-8 rounded-lg bg-zinc-700/50 border border-zinc-600/50 flex items-center justify-center shrink-0">
                                    <Monitor className="w-4 h-4 text-zinc-300" />
                                </div>
                                <span className="text-xl font-semibold text-white">Desktop Builds</span>
                            </div>
                            <p>
                                LettuceAI continues to be available as beta desktop builds alongside the mobile app.
                            </p>
                            <ul>
                                <li><strong>Windows:</strong> .msi installer, .exe portable build</li>
                                <li><strong>Linux:</strong> .AppImage, .deb, .rpm</li>
                            </ul>
                            <p className="text-muted-foreground text-sm">
                                Desktop builds are still considered beta while platform-specific issues are being refined.
                                Functionality generally matches the mobile app unless otherwise noted.
                            </p>
                        </section>

                        {/* Performance Improvements */}
                        <section className="mb-10">
                            <h3>Performance Improvements</h3>
                            <ul>
                                <li>Long chats now load up to <strong>~8× faster</strong></li>
                                <li>Character list on the homepage loads faster and scrolls more smoothly</li>
                                <li>Improved internal state handling and caching logic</li>
                                <li>Backup system robustness significantly improved</li>
                            </ul>
                        </section>

                        {/* Bug Fixes */}
                        <section className="mb-10">
                            <div className="flex items-center gap-3 mb-4 not-prose">
                                <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center shrink-0">
                                    <Bug className="w-4 h-4 text-red-400" />
                                </div>
                                <span className="text-xl font-semibold text-white">Bug Fixes</span>
                            </div>
                            <ul>
                                <li>Fixed an issue where Dynamic Memory could get stuck after cycle 2</li>
                                <li>Fixed an app freeze caused by corrupted or invalid backup files</li>
                                <li>Fixed an incorrect Google API endpoint URL</li>
                            </ul>
                        </section>

                        {/* Thank You */}
                        <section className="not-prose mt-12 p-6 rounded-2xl bg-linear-to-br from-primary/10 to-primary/5 border border-primary/20">
                            <div className="flex items-center gap-3 mb-3">
                                <Heart className="w-5 h-5 text-primary shrink-0" />
                                <span className="text-lg font-semibold text-white">Thank You</span>
                            </div>
                            <p className="text-muted-foreground">
                                Beta 6 is a foundational release that strengthens LettuceAI's core systems while expanding both creative and technical flexibility. Your feedback continues to shape
                                LettuceAI into a deeply customizable, privacy-first AI companion built for
                                long-term conversations and roleplay.
                            </p>
                            <a
                                href="https://github.com/LettuceAI/mobile-app/compare/1.0-beta.5...1.0-beta.6"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block mt-4 text-sm text-primary hover:underline"
                            >
                                View full changelog on GitHub →
                            </a>
                        </section>

                        {/* Bottom Download CTA */}
                        <div className="not-prose mt-12 text-center">
                            <Button asChild size="lg" className="gap-2">
                                <Link to="/download">
                                    <Download className="w-4 h-4" />
                                    Download LettuceAI
                                </Link>
                            </Button>
                        </div>
                    </motion.article>
                </div>
            </main>
            <Footer />
        </>
    );
}
