import { motion } from "framer-motion";
import { Scale, ArrowRight } from "lucide-react";
import { Navbar, Footer } from "@/components/landing";
import { links } from "@/config/links";

export function LicensePage() {
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
                        className="mb-12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                            <Scale className="w-4 h-4 text-primary" />
                            <span className="text-sm text-primary font-medium">License</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            Open Source License
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            LettuceAI is open source under AGPL-3.0
                        </p>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <div className="space-y-8">
                            <section className="p-6 rounded-xl bg-zinc-900/30 border border-border/30">
                                <h2 className="text-xl font-semibold text-white mb-4">About the License</h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    LettuceAI is licensed under the <strong className="text-white">GNU Affero General Public License v3.0 (AGPL-3.0)</strong>.
                                </p>
                            </section>

                            <section className="p-6 rounded-xl bg-zinc-900/30 border border-border/30">
                                <h2 className="text-xl font-semibold text-white mb-4">Full License Text</h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    You can view the full AGPL-3.0 license text on the official GNU website or in our GitHub repository.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <a
                                        href={links.githubRepo + "/blob/main/LICENSE"}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20 text-primary hover:bg-primary/20 transition-colors"
                                    >
                                        View on GitHub
                                        <ArrowRight className="w-4 h-4" />
                                    </a>
                                    <a
                                        href="https://www.gnu.org/licenses/agpl-3.0.en.html"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-zinc-800/50 border border-border/30 text-muted-foreground hover:text-foreground hover:bg-zinc-800 transition-colors"
                                    >
                                        Read on GNU.org
                                        <ArrowRight className="w-4 h-4" />
                                    </a>
                                </div>
                            </section>

                            <section className="p-6 rounded-xl bg-zinc-900/30 border border-border/30">
                                <h2 className="text-xl font-semibold text-white mb-4">Questions?</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    If you have questions about the license or how it applies to your use case, please reach out through our
                                    <a href="https://github.com/LettuceAI" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline mx-1">GitHub</a>
                                    or
                                    <a href="https://discord.gg/745bEttw2r" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline mx-1">Discord</a>.
                                </p>
                            </section>
                        </div>
                    </motion.div>
                </div>
            </main>
            <Footer />
        </>
    );
}
