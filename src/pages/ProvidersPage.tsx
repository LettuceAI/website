import { SEO } from "@/components/common/SEO";
import { motion } from "framer-motion";
import { ExternalLink, Key, Zap, Shield } from "lucide-react";
import { images } from "@/config/images";

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
            <SEO
                title="Providers"
                description="Connect LettuceAI with 20+ AI providers — OpenAI, Anthropic, Google Gemini, DeepSeek, Mistral, Groq, and more."
                path="/providers"
            />
            <main className="min-h-screen bg-[#050505] pt-28 pb-16">
                <div className="max-w-[1440px] mx-auto px-6 sm:px-10">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-14"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-px bg-primary/40" />
                            <span className="text-primary text-[11px] font-semibold uppercase tracking-[0.2em]">
                                Providers
                            </span>
                        </div>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
                            20+ AI providers,{" "}
                            <span className="font-display italic text-primary">
                                your keys
                            </span>
                        </h1>
                        <p className="text-[15px] text-white/35 leading-[1.7] max-w-xl">
                            Connect to any provider using your own API keys.
                            Switch models anytime without losing context. No middleman, no markup.
                        </p>
                    </motion.div>

                    {/* Benefits */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="grid sm:grid-cols-3 gap-4 mb-14"
                    >
                        {benefits.map((benefit) => (
                            <div
                                key={benefit.title}
                                className="group p-5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.12] transition-colors"
                            >
                                <benefit.icon className="w-5 h-5 text-primary/70 mb-3" />
                                <h3 className="text-[14px] font-semibold text-white mb-1.5">
                                    {benefit.title}
                                </h3>
                                <p className="text-[13px] text-white/30 leading-relaxed">
                                    {benefit.description}
                                </p>
                            </div>
                        ))}
                    </motion.div>

                    {/* Providers Grid */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3"
                    >
                        {providers.map((provider) => (
                            <a
                                key={provider.name}
                                href={provider.docUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-4 p-4 rounded-xl bg-white/[0.01] border border-white/[0.06] hover:border-primary/20 hover:bg-white/[0.03] transition-all"
                            >
                                <div className="w-10 h-10 rounded-lg bg-white/[0.04] flex items-center justify-center shrink-0">
                                    <img
                                        src={provider.logo}
                                        alt={provider.name}
                                        className="w-6 h-6 object-contain brightness-0 invert opacity-50 group-hover:opacity-80 transition-opacity"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <h3 className="text-[13px] font-semibold text-white/80 group-hover:text-white transition-colors">
                                            {provider.name}
                                        </h3>
                                        <ExternalLink className="w-3 h-3 text-white/15 group-hover:text-white/30 transition-colors shrink-0" />
                                    </div>
                                    <p className="text-[12px] text-white/25 leading-relaxed mt-0.5 truncate">
                                        {provider.description}
                                    </p>
                                </div>
                            </a>
                        ))}
                    </motion.div>

                    {/* Custom Provider Note */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="mt-10 p-6 rounded-xl border border-white/[0.06] bg-white/[0.01]"
                    >
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                                <Zap className="w-5 h-5 text-primary/60" />
                            </div>
                            <div>
                                <h3 className="text-[14px] font-semibold text-white mb-1">
                                    Custom Providers
                                </h3>
                                <p className="text-[13px] text-white/30 leading-relaxed">
                                    Any OpenAI-compatible endpoint works with LettuceAI.
                                    Add your own local models, self-hosted instances, or other API providers.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>
        </>
    );
}
