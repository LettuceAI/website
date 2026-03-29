import { motion } from "framer-motion";

/**
 * Big featured testimonial pull quote.
 * One powerful quote at 40px+ italic hits harder than 20 small cards.
 * Inspired by Figma's inline quotes.
 */
export function PullQuote() {
    return (
        <section className="bg-[#050505] border-y border-white/[0.04] py-10 sm:py-14">
            <div className="max-w-4xl mx-auto px-6 sm:px-10">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10"
                >
                    <div className="text-primary/30 text-5xl font-display leading-none select-none shrink-0">
                        "
                    </div>
                    <div>
                        <blockquote className="text-lg sm:text-xl lg:text-2xl font-display italic text-white/60 leading-[1.4] tracking-tight mb-3">
                            I stopped noticing the app and just talk. Which is a good sign.
                        </blockquote>
                        <cite className="not-italic text-xs text-white/20">
                            — SleepyBadger, Reddit
                        </cite>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
