import { motion } from "framer-motion";
import { ExternalLink, Key, Zap, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar, Footer } from "@/components/landing";
import { images } from "@/config/images";

// Provider data with descriptions
const providers = [
    {
        name: "OpenAI",
        logo: images.providers.openai,
        description: "GPT-4o, o1, and more cutting-edge models",
        docUrl: "https://platform.openai.com/docs",
    },
    {
        name: "Anthropic",
        logo: images.providers.anthropic,
        description: "Claude 3.5 Sonnet, Opus, and Haiku",
        docUrl: "https://docs.anthropic.com",
    },
    {
        name: "Google Gemini",
        logo: images.providers.gemini,
        description: "Gemini Pro, Flash, and Ultra models",
        docUrl: "https://ai.google.dev/docs",
    },
    {
        name: "DeepSeek",
        logo: images.providers.deepseek,
        description: "DeepSeek V3 and reasoning models",
        docUrl: "https://platform.deepseek.com/docs",
    },
    {
        name: "Mistral AI",
        logo: images.providers.mistral,
        description: "Mistral Large, Medium, and open models",
        docUrl: "https://docs.mistral.ai",
    },
    {
        name: "Groq",
        logo: images.providers.groq,
        description: "Ultra-fast LPU inference for Llama and Mixtral",
        docUrl: "https://console.groq.com/docs",
    },
    {
        name: "xAI",
        logo: images.providers.xai,
        description: "Grok-2 and Grok-2 Mini",
        docUrl: "https://docs.x.ai",
    },
    {
        name: "OpenRouter",
        logo: images.providers.openrouter,
        description: "Access 100+ models through one API",
        docUrl: "https://openrouter.ai/docs",
    },
    {
        name: "Moonshot",
        logo: images.providers.moonshot,
        description: "Kimi and long-context models",
        docUrl: "https://platform.moonshot.cn/docs",
    },
    {
        name: "Qwen",
        logo: images.providers.qwen,
        description: "Alibaba's Qwen series models",
        docUrl: "https://help.aliyun.com/zh/dashscope",
    },
    {
        name: "Anannas AI",
        logo: images.providers.ananas,
        description: "Affordable AI model access",
        docUrl: "https://anannas.ai",
    },
    {
        name: "Zai",
        logo: images.providers.zai,
        description: "Fast inference API",
        docUrl: "#",
    },
    {
        name: "Featherless",
        logo: images.providers.featherless,
        description: "Lightweight model hosting",
        docUrl: "https://featherless.ai",
    },
    {
        name: "NanoGPT",
        logo: images.providers.nanogpt,
        description: "Pay-per-token API access",
        docUrl: "https://nano-gpt.com",
    },
];

const benefits = [
    {
        icon: Key,
        title: "Bring Your Own Keys",
        description: "Use your existing API keys. No middleman, no markup.",
    },
    {
        icon: Zap,
        title: "Instant Switching",
        description: "Switch between providers mid-conversation seamlessly.",
    },
    {
        icon: Shield,
        title: "Direct Connection",
        description: "Your requests go directly to providers. We never see your data.",
    },
];

export function ProvidersPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-24 pb-16">
                <div className="max-w-6xl mx-auto px-6">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            Supported Providers
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Connect to any of these providers using your own API keys.
                            Switch models anytime without losing context.
                        </p>
                    </motion.div>

                    {/* Benefits */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="grid sm:grid-cols-3 gap-4 mb-16"
                    >
                        {benefits.map((benefit) => (
                            <div
                                key={benefit.title}
                                className="p-5 rounded-xl bg-zinc-900/50 border border-border/30"
                            >
                                <benefit.icon className="w-6 h-6 text-primary mb-3" />
                                <h3 className="font-semibold text-white mb-1">{benefit.title}</h3>
                                <p className="text-sm text-muted-foreground">{benefit.description}</p>
                            </div>
                        ))}
                    </motion.div>

                    {/* Providers Grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {providers.map((provider, index) => (
                            <motion.div
                                key={provider.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
                                className="group p-5 rounded-xl bg-zinc-900/30 border border-border/30 hover:border-primary/30 transition-colors"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center shrink-0">
                                        <img
                                            src={provider.logo}
                                            alt={provider.name}
                                            className="w-8 h-8 object-contain brightness-0 invert opacity-70 group-hover:opacity-100 transition-opacity"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-semibold text-white mb-1">{provider.name}</h3>
                                        <p className="text-sm text-muted-foreground mb-3">{provider.description}</p>
                                        <Button asChild variant="ghost" size="sm" className="h-8 px-3 gap-1.5 text-xs">
                                            <a href={provider.docUrl} target="_blank" rel="noopener noreferrer">
                                                View Docs
                                                <ExternalLink className="w-3 h-3" />
                                            </a>
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Custom Provider Note */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="mt-12 p-6 rounded-xl bg-zinc-900/30 border border-border/30 text-center"
                    >
                        <h3 className="font-semibold text-white mb-2">Custom Providers</h3>
                        <p className="text-muted-foreground">
                            Any OpenAI-compatible endpoint works with LettuceAI.
                            Add your own local models, self-hosted instances, or other API providers.
                        </p>
                    </motion.div>
                </div>
            </main>
            <Footer />
        </>
    );
}
