import { motion } from "framer-motion";
import { Shield, ArrowRight } from "lucide-react";
import { Navbar, Footer } from "@/components/landing";

export function PrivacyPage() {
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
                            <Shield className="w-4 h-4 text-primary" />
                            <span className="text-sm text-primary font-medium">Privacy Policy</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            Your Privacy Matters
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
                        className="prose prose-invert prose-green max-w-none"
                    >
                        <div className="space-y-8">

                            {/* Overview */}
                            <section className="p-6 rounded-xl bg-zinc-900/30 border border-border/30">
                                <h2 className="text-xl font-semibold text-white mb-4">Overview</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    LettuceAI is designed with privacy in mind. We believe your data belongs to you,
                                    and we build our application around local-first storage and user-controlled data.
                                </p>
                            </section>

                            {/* User Accounts */}
                            <section className="p-6 rounded-xl bg-zinc-900/30 border border-border/30">
                                <h2 className="text-xl font-semibold text-white mb-4">User Accounts</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    LettuceAI does not require user accounts. We do not collect names, email addresses,
                                    usernames, or other identifiers to track or identify users.
                                </p>
                            </section>

                            {/* Data Storage */}
                            <section className="p-6 rounded-xl bg-zinc-900/30 border border-border/30">
                                <h2 className="text-xl font-semibold text-white mb-4">Data Storage</h2>
                                <ul className="space-y-3 text-muted-foreground">
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1">•</span>
                                        <span>
                                            <strong className="text-white">Local-Only Storage:</strong> Conversations,
                                            characters, settings, and memories are stored on your device.
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1">•</span>
                                        <span>
                                            <strong className="text-white">No Cloud Sync:</strong> LettuceAI does not upload,
                                            sync, or back up your data to external servers.
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1">•</span>
                                        <span>
                                            <strong className="text-white">Full Control:</strong> You can export or delete
                                            your data at any time directly from the app.
                                        </span>
                                    </li>
                                </ul>
                            </section>

                            {/* Analytics & Telemetry */}
                            <section className="p-6 rounded-xl bg-zinc-900/30 border border-border/30">
                                <h2 className="text-xl font-semibold text-white mb-4">
                                    Analytics & Telemetry
                                </h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    LettuceAI does not collect, transmit, or share analytics, telemetry,
                                    usage statistics, or crash reports.
                                </p>
                                <p className="text-muted-foreground leading-relaxed mt-4">
                                    For debugging and reliability purposes, the application may generate diagnostic
                                    log files that are stored <strong className="text-white">locally on your device</strong>.
                                    These logs never leave your device and can be deleted by you at any time.
                                </p>
                            </section>

                            {/* Network Usage */}
                            <section className="p-6 rounded-xl bg-zinc-900/30 border border-border/30">
                                <h2 className="text-xl font-semibold text-white mb-4">Network Usage</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    LettuceAI connects to the internet only when you explicitly use a third-party AI
                                    provider. Requests are sent directly from your device to the selected provider.
                                    LettuceAI does not proxy, relay, or inspect network traffic.
                                </p>
                            </section>

                            {/* API Keys */}
                            <section className="p-6 rounded-xl bg-zinc-900/30 border border-border/30">
                                <h2 className="text-xl font-semibold text-white mb-4">API Keys</h2>
                                <ul className="space-y-3 text-muted-foreground">
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1">•</span>
                                        <span>
                                            <strong className="text-white">Stored Locally:</strong> API keys are stored on
                                            your device using encryption and operating-system-provided secure storage
                                            mechanisms where available.
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1">•</span>
                                        <span>
                                            <strong className="text-white">Direct Communication:</strong> Requests go
                                            directly from your device to the AI provider.
                                        </span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-primary mt-1">•</span>
                                        <span>
                                            <strong className="text-white">No Access:</strong> LettuceAI does not access
                                            your API keys or the content of your conversations.
                                        </span>
                                    </li>
                                </ul>
                            </section>

                            {/* Third-Party AI Providers */}
                            <section className="p-6 rounded-xl bg-zinc-900/30 border border-border/30">
                                <h2 className="text-xl font-semibold text-white mb-4">
                                    Third-Party AI Providers
                                </h2>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    When using third-party AI providers, your data is handled according to the
                                    provider’s own privacy policies and terms.
                                </p>
                                <p className="text-muted-foreground leading-relaxed">
                                    LettuceAI has no control over how third-party providers process or retain data.
                                </p>
                            </section>

                            {/* Operating System Backups */}
                            <section className="p-6 rounded-xl bg-zinc-900/30 border border-border/30">
                                <h2 className="text-xl font-semibold text-white mb-4">
                                    Operating System Backups
                                </h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    Depending on your operating system and personal settings, application data may be
                                    included in system-level backups or cloud sync features. These backups are managed
                                    entirely by your operating system and are outside of LettuceAI’s control.
                                </p>
                            </section>

                            {/* Device Security */}
                            <section className="p-6 rounded-xl bg-zinc-900/30 border border-border/30">
                                <h2 className="text-xl font-semibold text-white mb-4">Device Security</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    Because all data is stored locally, the security of your data also depends on your
                                    device and operating system. LettuceAI cannot protect against threats such as
                                    malware, unauthorized physical access, or compromised user accounts.
                                </p>
                            </section>

                            {/* Content Responsibility */}
                            <section className="p-6 rounded-xl bg-zinc-900/30 border border-border/30">
                                <h2 className="text-xl font-semibold text-white mb-4">
                                    Content Responsibility
                                </h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    LettuceAI does not review, moderate, or store user-generated prompts or AI-generated
                                    content on our servers. Users are responsible for the content they create and for
                                    complying with the policies of any AI provider they use.
                                </p>
                            </section>

                            {/* Open Source Transparency */}
                            <section className="p-6 rounded-xl bg-zinc-900/30 border border-border/30">
                                <h2 className="text-xl font-semibold text-white mb-4">
                                    Open Source Transparency
                                </h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    LettuceAI is fully open source. You can audit the code at any time to verify how
                                    data is handled.
                                </p>
                                <a
                                    href="https://github.com/LettuceAI"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 mt-4 text-primary hover:underline"
                                >
                                    View our source code on GitHub
                                    <ArrowRight className="w-4 h-4" />
                                </a>
                            </section>

                            {/* Changes to This Policy */}
                            <section className="p-6 rounded-xl bg-zinc-900/30 border border-border/30">
                                <h2 className="text-xl font-semibold text-white mb-4">
                                    Changes to This Policy
                                </h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    We may update this Privacy Policy from time to time. When changes are made, the
                                    “Last updated” date at the top of this page will be updated accordingly.
                                </p>
                            </section>

                            {/* Contact */}
                            <section className="p-6 rounded-xl bg-zinc-900/30 border border-border/30">
                                <h2 className="text-xl font-semibold text-white mb-4">Contact</h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    If you have questions about this Privacy Policy, you can reach us via
                                    <a href="https://github.com/LettuceAI" target="_blank" rel="noopener noreferrer"
                                        className="text-primary hover:underline mx-1">GitHub</a>
                                    or
                                    <a href="https://discord.gg/745bEttw2r" target="_blank" rel="noopener noreferrer"
                                        className="text-primary hover:underline mx-1">Discord</a>.
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
