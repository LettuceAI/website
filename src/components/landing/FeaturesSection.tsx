import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { images } from "@/config/images";

interface Feature {
    title: string;
    description: string;
    image: string;
    imageSize: string;
    ctaText: string;
    ctaLink: string;
};

const features: Feature[] = [
    {
        title: "Bring Your Own Keys",
        description: "Stop paying monthly subscriptions. Use your own API keys from OpenAI, Anthropic, or any provider. Pay only for what you use.",
        image: images.models,
        imageSize: "w-[90%]", 
        ctaText: "Learn about BYOK",
        ctaLink: "/docs",
    },
    {
        title: "Endless Customisation",
        description: "Create unique characters, craft custom prompts, and tailor every aspect of your AI experience to match your creative vision.",
        image: images.characters,
        imageSize: "w-[100%]",
        ctaText: "Explore Customisation",
        ctaLink: "/docs",
    },
    {
        title: "Dynamic Memory",
        description: "Our Dynamic Memory system remembers context from thousands of messages ago. Your stories never lose continuity.",
        image: images.memoryManager,
        imageSize: "w-full",
        ctaText: "How Memory Works",
        ctaLink: "/docs",
    },
];

export function FeaturesSection() {
    return (
        <section id="features" className="py-24 sm:py-32 bg-[#050505]">
            <div className="max-w-6xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                        A complete AI companion,{" "}
                        <span className="block">built for <span className="text-primary">power users</span></span>
                    </h2>
                </motion.div>

                {/* Feature Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group"
                        >
                            {/* Image Container */}
                            <div className="relative rounded-2xl bg-zinc-900/50 border border-border/30 p-6 mb-6 aspect-4/3 overflow-hidden flex items-center justify-center">
                                <img
                                    src={feature.image}
                                    alt={feature.title}
                                    className={`${feature.imageSize} h-auto object-contain`}
                                />
                            </div>

                            {/* Text Content */}
                            <h3 className="text-xl font-semibold text-white mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed mb-4">
                                {feature.description}
                            </p>

                            {/* CTA Link */}
                            <a
                                href={feature.ctaLink}
                                className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all group/link"
                            >
                                {feature.ctaText}
                                <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                            </a>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}