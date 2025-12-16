import { motion } from "framer-motion";
import { Star, GitCommit } from "lucide-react";
import { useGitHubStats } from "@/hooks/useGitHubStats";

export function TrustSection() {
    const { stars, commits, loading } = useGitHubStats("LettuceAI", "mobile-app");

    return (
        <section className="bg-[#050505]">
            <div className="py-20 sm:py-24">
                <div className="mx-auto max-w-5xl px-6">
                    <h2 className="sr-only">LettuceAI in stats</h2>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="grid grid-cols-2 gap-6 md:grid-cols-4 items-center"
                    >
                        {/* Stars */}
                        <div className="space-y-1 md:text-center group">
                            <div className="flex items-center gap-2 md:justify-center">
                                <Star className="w-5 h-5 text-amber-400 group-hover:fill-amber-400 transition-all" />
                                <span className="text-primary text-3xl sm:text-4xl font-bold">
                                    {loading ? "..." : `${stars.toLocaleString()}+`}
                                </span>
                            </div>
                            <p className="text-muted-foreground text-sm sm:text-base">GitHub Stars</p>
                        </div>

                        {/* Commits */}
                        <div className="space-y-1 md:text-center group">
                            <div className="flex items-center gap-2 md:justify-center">
                                <GitCommit className="w-5 h-5 text-primary" />
                                <span className="text-primary text-3xl sm:text-4xl font-bold">
                                    {loading ? "..." : `${commits.toLocaleString()}+`}
                                </span>
                            </div>
                            <p className="text-muted-foreground text-sm sm:text-base">Commits</p>
                        </div>

                        {/* Description */}
                        <div className="col-span-2 border-t border-border/30 pt-6 md:border-l md:border-t-0 md:pl-10 md:pt-0">
                            <p className="text-muted-foreground text-balance text-base sm:text-lg leading-relaxed">
                                <span className="text-white font-medium">Open source.</span>{" "}
                                <span className="text-white font-medium">Privacy-first.</span>{" "}
                                Built by the community, for the community.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
