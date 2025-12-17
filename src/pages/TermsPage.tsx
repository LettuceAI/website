import { motion } from "framer-motion";
import { FileText, ArrowRight } from "lucide-react";
import { Navbar, Footer } from "@/components/landing";

export function TermsPage() {
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
                            <FileText className="w-4 h-4 text-primary" />
                            <span className="text-sm text-primary font-medium">Terms of Service</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            Terms of Service
                        </h1>
                        <p className="text-lg text-muted-foreground">
                            Last updated: December 2025
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
                                <h2 className="text-xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    By downloading, installing, or using LettuceAI, you agree to be bound by these Terms of Service.
                                    If you do not agree to these terms, please do not use the application.
                                </p>
                            </section>

                            <section className="p-6 rounded-xl bg-zinc-900/30 border border-border/30">
                                <h2 className="text-xl font-semibold text-white mb-4">2. Open Source License</h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    LettuceAI is open source software released under the GNU Affero General Public License v3.0 (AGPL-3.0).
                                    You are free to use, modify, and distribute the software in accordance with the license terms.
                                </p>
                                <a
                                    href="/license"
                                    className="inline-flex items-center gap-2 text-primary hover:underline"
                                >
                                    View the full license
                                    <ArrowRight className="w-4 h-4" />
                                </a>
                            </section>

                            <section className="p-6 rounded-xl bg-zinc-900/30 border border-border/30">
                                <h2 className="text-xl font-semibold text-white mb-4">3. Use of Third-Party Services</h2>
                                <ul className="space-y-3 text-muted-foreground">
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1">•</span>
                                        <span>LettuceAI connects to third-party AI providers (OpenAI, Anthropic, Google, etc.) using your own API keys.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1">•</span>
                                        <span>You are responsible for complying with the terms of service of any AI provider you use.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1">•</span>
                                        <span>API usage costs are your responsibility and are billed directly by the respective provider.</span>
                                    </li>
                                </ul>
                            </section>

                            <section className="p-6 rounded-xl bg-zinc-900/30 border border-border/30">
                                <h2 className="text-xl font-semibold text-white mb-4">4. Content Responsibility</h2>
                                <ul className="space-y-3 text-muted-foreground">
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1">•</span>
                                        <span>You are solely responsible for the content you create, including characters, prompts, and conversations.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1">•</span>
                                        <span>AI-generated content may be inaccurate, biased, or inappropriate. Use your judgment when interacting with AI.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1">•</span>
                                        <span>Do not use LettuceAI for illegal activities or to generate content that violates applicable laws.</span>
                                    </li>
                                </ul>
                            </section>

                            <section className="p-6 rounded-xl bg-zinc-900/30 border border-border/30">
                                <h2 className="text-xl font-semibold text-white mb-4">5. No Warranty</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    LettuceAI is provided "as is" without warranty of any kind, express or implied.
                                    We do not guarantee that the application will be error-free, secure, or continuously available.
                                    Use at your own risk.
                                </p>
                            </section>

                            <section className="p-6 rounded-xl bg-zinc-900/30 border border-border/30">
                                <h2 className="text-xl font-semibold text-white mb-4">6. Limitation of Liability</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    To the maximum extent permitted by law, the LettuceAI developers shall not be liable for any
                                    indirect, incidental, special, consequential, or punitive damages arising from your use of the application.
                                </p>
                            </section>

                            <section className="p-6 rounded-xl bg-zinc-900/30 border border-border/30">
                                <h2 className="text-xl font-semibold text-white mb-4">7. Changes to Terms</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    We may update these terms from time to time. Continued use of LettuceAI after changes
                                    constitutes acceptance of the new terms.
                                </p>
                            </section>

                            <section className="p-6 rounded-xl bg-zinc-900/30 border border-border/30">
                                <h2 className="text-xl font-semibold text-white mb-4">8. Contact</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    For questions about these terms, please reach out through our
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
