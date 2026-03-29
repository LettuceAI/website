import { motion } from "framer-motion";
import { Github, ArrowDown, Brain, Users, Sparkles, Shield } from "lucide-react";
import { FaAndroid, FaWindows, FaLinux } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { links } from "@/config/links";

const featurePills = [
    { icon: Brain, label: "Long-term Memory" },
    { icon: Users, label: "Group Chats" },
    { icon: Sparkles, label: "20+ Providers" },
    { icon: Shield, label: "Privacy First" },
];

function GradientMesh() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Primary organic orb — large, soft, centered */}
            <motion.div
                className="absolute left-1/2 -translate-x-1/2"
                style={{
                    top: "-350px",
                    width: "1100px",
                    height: "1100px",
                    background:
                        "radial-gradient(circle, rgba(136,192,87,0.28) 0%, rgba(136,192,87,0.12) 30%, rgba(16,185,129,0.06) 55%, transparent 75%)",
                    borderRadius: "50%",
                    filter: "blur(30px)",
                }}
                animate={{ scale: [1, 1.06, 1], opacity: [0.85, 1, 0.85] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Secondary warm orb — drifts gently */}
            <motion.div
                className="absolute"
                style={{
                    right: "-150px",
                    top: "250px",
                    width: "500px",
                    height: "500px",
                    background:
                        "radial-gradient(circle, rgba(136,192,87,0.08) 0%, transparent 70%)",
                    borderRadius: "50%",
                    filter: "blur(50px)",
                }}
                animate={{ x: [0, -15, 0], y: [0, 10, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            />
        </div>
    );
}

export function HeroSection() {
    return (
        <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#050505] pt-20">
            <GradientMesh />

            {/* Subtle grid */}
            <div
                className="absolute inset-0 opacity-[0.015] pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(rgba(136,192,87,0.5) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(136,192,87,0.5) 1px, transparent 1px)
                    `,
                    backgroundSize: "80px 80px",
                }}
            />

            {/* Vignette */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "radial-gradient(ellipse at center top, transparent 0%, rgba(5,5,5,0.3) 50%, rgba(5,5,5,0.8) 100%)",
                }}
            />

            {/* Content */}
            <div className="relative z-10 flex-1 flex flex-col">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center pt-10 sm:pt-14 mb-6"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium backdrop-blur-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        Open Source & Free Forever
                    </span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.08] text-center px-6 mb-6"
                >
                    <span className="text-white">AI characters that </span>
                    <br className="hidden sm:block" />
                    <span className="font-display bg-linear-to-r from-primary via-emerald-400 to-teal-400 bg-clip-text text-transparent italic">
                        remember your story
                    </span>
                </motion.h1>

                {/* Subtitle — concrete & informative */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-center px-6 mb-8 leading-relaxed"
                >
                    Create persistent AI characters with long-term memory, deep
                    customization, and your choice of 20+ AI providers. No accounts,
                    no tracking — your data stays on your device.
                </motion.p>

                {/* Feature pills */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-2 px-6 mb-8"
                >
                    {featurePills.map((pill) => (
                        <span
                            key={pill.label}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-sm text-white/70 backdrop-blur-sm"
                        >
                            <pill.icon className="w-3.5 h-3.5 text-primary/70" />
                            {pill.label}
                        </span>
                    ))}
                </motion.div>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4 px-6 mb-4"
                >
                    <Button
                        size="lg"
                        className="h-12 px-8 text-base font-medium bg-primary hover:bg-primary/90 shadow-[0_0_30px_rgba(136,192,87,0.2)] hover:shadow-[0_0_40px_rgba(136,192,87,0.35)] transition-all duration-300"
                        asChild
                    >
                        <a href="/download">Download Free</a>
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="h-12 px-8 text-base font-medium border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 gap-2"
                        asChild
                    >
                        <a
                            href={links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Github className="w-5 h-5" />
                            View Source
                        </a>
                    </Button>
                </motion.div>

                {/* Platform badges */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex items-center justify-center gap-4 text-xs sm:text-sm text-muted-foreground/50 mb-10"
                >
                    <span className="inline-flex items-center gap-1.5">
                        <FaAndroid className="w-3.5 h-3.5" /> Android
                    </span>
                    <span className="text-white/10">|</span>
                    <span className="inline-flex items-center gap-1.5">
                        <FaWindows className="w-3.5 h-3.5" /> Windows
                    </span>
                    <span className="text-white/10">|</span>
                    <span className="inline-flex items-center gap-1.5">
                        <FaLinux className="w-3.5 h-3.5" /> Linux
                    </span>
                </motion.div>

                {/* App screenshot */}
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 1,
                        delay: 0.5,
                        ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="relative flex-1 flex items-end justify-center px-4 sm:px-8 lg:px-16"
                >
                    {/* Glow under screenshot */}
                    <div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl h-80"
                        style={{
                            background:
                                "radial-gradient(ellipse at center bottom, rgba(136,192,87,0.12) 0%, transparent 70%)",
                        }}
                    />

                    <div className="relative w-full max-w-5xl">
                        <div className="absolute -inset-px rounded-t-2xl bg-linear-to-b from-primary/20 via-primary/5 to-transparent blur-sm" />
                        <div className="relative rounded-t-2xl overflow-hidden border border-white/10 border-b-0 bg-card/20 backdrop-blur-sm shadow-2xl shadow-black/50">
                            <img
                                src="/images/landing/chat-desktop.png"
                                alt="LettuceAI Desktop — immersive AI roleplay conversation"
                                className="w-full h-auto"
                                style={{
                                    maskImage:
                                        "linear-gradient(to bottom, black 85%, transparent 100%)",
                                    WebkitMaskImage:
                                        "linear-gradient(to bottom, black 85%, transparent 100%)",
                                }}
                            />
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20"
            >
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="text-muted-foreground/30"
                >
                    <ArrowDown className="w-5 h-5" />
                </motion.div>
            </motion.div>
        </section>
    );
}
