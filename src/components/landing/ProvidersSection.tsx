import { motion } from "framer-motion";
import { images } from "@/config/images";

// Provider logos with their display names
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

function MarqueeRow({ direction = "left", speed = 30 }: { direction?: "left" | "right"; speed?: number }) {
    const duplicatedProviders = [...providers, ...providers];

    return (
        <div className="flex overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <motion.div
                className="flex gap-8 py-4"
                animate={{
                    x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
                }}
                transition={{
                    duration: speed,
                    repeat: Infinity,
                    ease: "linear",
                }}
            >
                {duplicatedProviders.map((provider, index) => (
                    <div
                        key={`${provider.name}-${index}`}
                        className="shrink-0 flex items-center justify-center w-40 h-20 px-6 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 hover:bg-card transition-all duration-300 group"
                    >
                        <img
                            src={provider.logo}
                            alt={provider.name}
                            className="max-h-10 max-w-full object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300 brightness-0 invert group-hover:brightness-100 group-hover:invert-0"
                        />
                    </div>
                ))}
            </motion.div>
        </div>
    );
}

export function ProvidersSection() {
    return (
        <section id="providers" className="relative py-24 sm:py-32 overflow-hidden bg-[#050505]">
            {/* Subtle gradient orb */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-100 rounded-full opacity-10 blur-[100px]"
                    style={{
                        background: 'radial-gradient(circle, rgba(136, 192, 87, 0.5) 0%, transparent 70%)',
                    }}
                />
            </div>

            <div className="relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-3xl mx-auto px-4 mb-12"
                >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                        Every Provider,{" "}
                        <span className="bg-linear-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
                            One App
                        </span>
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Connect to 20+ AI providers. Use your existing API keys and switch between models instantly.
                    </p>
                </motion.div>

                {/* Marquee */}
                <div className="space-y-4">
                    <MarqueeRow direction="left" speed={40} />
                    <MarqueeRow direction="right" speed={35} />
                </div>

                {/* Additional Info */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="text-center mt-12 px-4"
                >
                    <p className="text-sm text-muted-foreground">
                        ...and many more. Add any OpenAI-compatible endpoint.
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
