import { motion } from "framer-motion";

/**
 * Numbered steps with a connecting line.
 * Clean, editorial feel — not cards, not icons.
 */

const steps = [
    {
        num: "01",
        title: "Install",
        detail: "Free on Android, Windows, and Linux. No account needed — download and open.",
    },
    {
        num: "02",
        title: "Add your key",
        detail: "Paste an API key from OpenAI, Anthropic, Google, or any of 20+ providers.",
    },
    {
        num: "03",
        title: "Start your story",
        detail: "Pick a character from Discovery, create your own, or let AI build one for you.",
    },
];

export function HowItWorksSection() {
    return (
        <section className="bg-[#050505] py-16 sm:py-20">
            <div className="max-w-4xl mx-auto px-6 sm:px-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-8 h-px bg-primary/40" />
                        <span className="text-primary text-[11px] font-semibold uppercase tracking-[0.2em]">
                            Getting Started
                        </span>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-0">
                        {steps.map((step, i) => (
                            <div
                                key={step.num}
                                className="relative pl-8 sm:pl-0 pb-10 sm:pb-0 sm:pr-8"
                            >
                                {/* Vertical line (mobile) / horizontal line (desktop) */}
                                {i < steps.length - 1 && (
                                    <>
                                        <div className="absolute left-[7px] top-6 bottom-0 w-px bg-white/[0.06] sm:hidden" />
                                        <div className="absolute top-[7px] left-8 right-0 h-px bg-white/[0.06] hidden sm:block" />
                                    </>
                                )}

                                {/* Dot */}
                                <div className="absolute left-0 top-1 w-[15px] h-[15px] rounded-full border-2 border-primary/40 bg-[#050505] sm:relative sm:left-auto sm:top-auto sm:mb-5">
                                    <div className="absolute inset-[3px] rounded-full bg-primary/60" />
                                </div>

                                <div className="sm:mt-0">
                                    <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest block mb-1.5">
                                        Step {step.num}
                                    </span>
                                    <h3 className="text-lg font-bold text-white mb-1.5 tracking-tight">
                                        {step.title}
                                    </h3>
                                    <p className="text-sm text-white/35 leading-relaxed">
                                        {step.detail}
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
