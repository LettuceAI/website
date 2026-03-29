import { motion } from "framer-motion";
import { Download, KeyRound, MessageSquare } from "lucide-react";

const steps = [
    {
        icon: Download,
        title: "Install the app",
        description: "Free on Android, Windows, and Linux. No account needed.",
    },
    {
        icon: KeyRound,
        title: "Add your API key",
        description:
            "From OpenAI, Anthropic, Google, or any of 20+ providers.",
    },
    {
        icon: MessageSquare,
        title: "Start chatting",
        description:
            "Create a character, import from the community, or let AI build one.",
    },
];

export function HowItWorksSection() {
    return (
        <section className="py-12 sm:py-16 bg-[#050505]">
            <div className="max-w-4xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5 }}
                    className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8"
                >
                    <h3 className="text-sm font-semibold text-white/40 uppercase tracking-widest text-center mb-8">
                        How it works
                    </h3>

                    <div className="grid sm:grid-cols-3 gap-6 sm:gap-8">
                        {steps.map((step) => (
                            <div key={step.title} className="text-center">
                                <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/15 flex items-center justify-center mx-auto mb-3">
                                    <step.icon className="w-4 h-4 text-primary" />
                                </div>
                                <h4 className="text-sm font-semibold text-white mb-1">
                                    {step.title}
                                </h4>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    {step.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
