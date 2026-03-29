import { motion } from "framer-motion";
import { Star, GitCommit } from "lucide-react";
import { useGitHubStats } from "@/hooks/useGitHubStats";

/**
 * Compact horizontal stats strip — sits between hero and content.
 * Inspired by Vercel/PlanetScale trust bars.
 */
export function TrustSection() {
    const { stars, commits, loading } = useGitHubStats(
        "LettuceAI",
        "mobile-app"
    );

    return (
        <section className="bg-[#070707] border-y border-white/[0.04]">
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5 }}
                className="max-w-6xl mx-auto px-6 py-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3"
            >
                <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-400" />
                    <span className="text-white font-semibold tabular-nums">
                        {loading ? "—" : stars.toLocaleString()}
                    </span>
                    <span className="text-white/30 text-sm">stars</span>
                </div>

                <div className="w-px h-4 bg-white/[0.06] hidden sm:block" />

                <div className="flex items-center gap-2">
                    <GitCommit className="w-4 h-4 text-primary/60" />
                    <span className="text-white font-semibold tabular-nums">
                        {loading ? "—" : commits.toLocaleString()}
                    </span>
                    <span className="text-white/30 text-sm">commits</span>
                </div>

                <div className="w-px h-4 bg-white/[0.06] hidden sm:block" />

                <span className="text-white/25 text-sm">
                    Open source · Privacy-first · No accounts
                </span>
            </motion.div>
        </section>
    );
}
