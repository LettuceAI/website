import { SEO } from "@/components/common/SEO";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { links } from "@/config/links";

export function LicensePage() {
    return (
        <>
        <SEO
            title="License"
            description="LettuceAI is open source under AGPL-3.0. View the full license."
            path="/license"
        />
        <main className="min-h-screen bg-[#050505] pt-28 pb-20">
            <div className="max-w-3xl mx-auto px-6 sm:px-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-px bg-primary/40" />
                        <span className="text-primary text-[11px] font-semibold uppercase tracking-[0.2em]">
                            Legal
                        </span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
                        Open Source{" "}
                        <span className="font-display italic text-primary">
                            License
                        </span>
                    </h1>
                    <p className="text-[15px] text-white/35">
                        LettuceAI is open source under AGPL-3.0
                    </p>
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="space-y-8"
                >
                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">
                            About the License
                        </h2>
                        <p className="text-[15px] text-white/45 leading-[1.8]">
                            LettuceAI is licensed under the{" "}
                            <span className="text-white/60 font-medium">
                                GNU Affero General Public License v3.0
                                (AGPL-3.0)
                            </span>
                            . This means you are free to use, modify, and
                            distribute the software, provided you comply with
                            the license terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">
                            Full License Text
                        </h2>
                        <p className="text-[15px] text-white/45 leading-[1.8] mb-4">
                            You can view the full AGPL-3.0 license text on the
                            official GNU website or in our GitHub repository.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <a
                                href={links.githubRepo + "/blob/main/LICENSE"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 h-9 px-4 text-[13px] font-semibold text-white bg-primary/90 hover:bg-primary rounded-lg transition-colors"
                            >
                                View on GitHub
                                <ArrowRight className="w-3.5 h-3.5" />
                            </a>
                            <a
                                href="https://www.gnu.org/licenses/agpl-3.0.en.html"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 h-9 px-4 text-[13px] font-medium text-white/50 hover:text-white border border-white/[0.08] hover:border-white/[0.15] rounded-lg transition-colors"
                            >
                                Read on GNU.org
                                <ArrowRight className="w-3.5 h-3.5" />
                            </a>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-lg font-semibold text-white mb-3">
                            Questions?
                        </h2>
                        <p className="text-[15px] text-white/45 leading-[1.8]">
                            If you have questions about the license or how it
                            applies to your use case, contact{" "}
                            <a
                                href="mailto:lettuceai.app@gmail.com"
                                className="text-primary/70 hover:text-primary transition-colors"
                            >
                                lettuceai.app@gmail.com
                            </a>
                            .
                        </p>
                    </section>

                    {/* Footer nav */}
                    <div className="pt-8 border-t border-white/[0.06] flex flex-wrap gap-x-6 gap-y-2">
                        <Link
                            to="/privacy"
                            className="text-sm text-white/30 hover:text-white/50 transition-colors"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            to="/terms"
                            className="text-sm text-white/30 hover:text-white/50 transition-colors"
                        >
                            Terms of Service
                        </Link>
                    </div>
                </motion.div>
            </div>
        </main>
        </>
    );
}
