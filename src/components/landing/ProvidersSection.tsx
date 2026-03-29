import { motion } from "framer-motion";
import { images } from "@/config/images";

const providers = [
    { name: "OpenAI", logo: images.providers.openai },
    { name: "Anthropic", logo: images.providers.anthropic },
    { name: "Google Gemini", logo: images.providers.gemini },
    { name: "DeepSeek", logo: images.providers.deepseek },
    { name: "Mistral AI", logo: images.providers.mistral },
    { name: "Groq", logo: images.providers.groq },
    { name: "xAI", logo: images.providers.xai },
    { name: "OpenRouter", logo: images.providers.openrouter },
    { name: "Moonshot", logo: images.providers.moonshot },
    { name: "Qwen", logo: images.providers.qwen },
    { name: "Ananas AI", logo: images.providers.ananas },
    { name: "Zai", logo: images.providers.zai },
    { name: "Featherless", logo: images.providers.featherless },
    { name: "NanoGPT", logo: images.providers.nanogpt },
];

function MarqueeRow({
    direction = "left",
    speed = 30,
}: {
    direction?: "left" | "right";
    speed?: number;
}) {
    const duplicated = [...providers, ...providers];
    return (
        <div className="flex overflow-hidden mask-[linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <motion.div
                className="flex gap-4 py-2"
                animate={{
                    x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
                }}
                transition={{
                    duration: speed,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                {duplicated.map((p, i) => (
                    <div
                        key={`${p.name}-${i}`}
                        className="shrink-0 flex items-center justify-center w-32 h-14 px-4 rounded-lg border border-white/[0.04] bg-white/[0.015] hover:border-white/[0.1] transition-all duration-300 group"
                    >
                        <img
                            src={p.logo}
                            alt={p.name}
                            className="max-h-7 max-w-full object-contain opacity-35 group-hover:opacity-75 transition-opacity duration-300 brightness-0 invert group-hover:brightness-100 group-hover:invert-0"
                        />
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

export function ProvidersSection() {
    return (
        <section className="relative py-16 sm:py-20 overflow-hidden bg-[#050505]">
            <div className="relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-6xl mx-auto px-6 sm:px-10 mb-8"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-px bg-primary/40" />
                        <span className="text-primary text-[11px] font-semibold uppercase tracking-[0.2em]">
                            Providers
                        </span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                        Every major AI provider
                    </h2>
                    <p className="text-sm text-white/30 mt-2 max-w-md">
                        Connect your own API keys. No middleman, no markup,
                        switch between models instantly.
                    </p>
                </motion.div>

                <div className="space-y-2">
                    <MarqueeRow direction="left" speed={45} />
                    <MarqueeRow direction="right" speed={38} />
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="text-center mt-6 text-[11px] text-white/20"
                >
                    + any OpenAI-compatible endpoint
                </motion.p>
            </div>
        </section>
    );
}
