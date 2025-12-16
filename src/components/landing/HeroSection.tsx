import { motion } from "framer-motion";
import { Github, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { images } from "@/config/images";

// Animated particles for depth
function Particles() {
    const [particles] = useState(() =>
        Array.from({ length: 40 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 1,
            duration: Math.random() * 20 + 10,
            delay: Math.random() * 5,
        }))
    );

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute rounded-full bg-primary/20"
                    style={{
                        width: particle.size,
                        height: particle.size,
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                    }}
                    animate={{
                        y: [0, -20, 0],
                        opacity: [0.1, 0.4, 0.1],
                    }}
                    transition={{
                        duration: particle.duration,
                        delay: particle.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}

// Single large gradient orb from top center
function GradientMesh() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {/* Single large green circle at top center with pulsing */}
            <motion.div
                className="absolute left-1/2 -translate-x-1/2"
                style={{
                    top: '-400px',
                    width: '1000px',
                    height: '1000px',
                    background: 'radial-gradient(circle, rgba(136, 192, 87, 0.4) 0%, rgba(136, 192, 87, 0.2) 30%, rgba(136, 192, 87, 0.05) 60%, transparent 80%)',
                    borderRadius: '50%',
                }}
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [1, 0.8, 1],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
        </div>
    );
}

export function HeroSection() {
    return (
        <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#050505] pt-20">
            {/* Background effects */}
            <GradientMesh />
            <Particles />

            {/* Subtle grid overlay */}
            <div
                className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(136, 192, 87, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(136, 192, 87, 0.5) 1px, transparent 1px)
          `,
                    backgroundSize: '80px 80px',
                }}
            />

            {/* Vignette */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at center top, transparent 0%, rgba(5, 5, 5, 0.3) 50%, rgba(5, 5, 5, 0.8) 100%)',
                }}
            />

            {/* Content Container */}
            <div className="relative z-10 flex-1 flex flex-col">
                {/* Text Content - Top */}
                <div className="max-w-5xl mx-auto px-6 text-center pt-12 sm:pt-16 lg:pt-20">
                    {/* Main Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6"
                    >
                        <span className="text-white">Your stories. Your AI. </span>
                        <span className="bg-linear-to-r from-primary via-emerald-400 to-teal-400 bg-clip-text text-transparent">
                            Your rules.
                        </span>
                    </motion.h1>

                    {/* Value Proposition */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.15 }}
                        className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"
                    >
                        The open-source AI roleplay companion that respects your privacy.
                    </motion.p>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
                    >
                        <Button
                            size="lg"
                            className="h-12 px-8 text-base font-medium bg-primary hover:bg-primary/90 shadow-[0_0_30px_rgba(136,192,87,0.25)] hover:shadow-[0_0_40px_rgba(136,192,87,0.4)] transition-all duration-300"
                            asChild
                        >
                            <a href="#download">
                                Download Free
                            </a>
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="h-12 px-8 text-base font-medium border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 gap-2"
                            asChild
                        >
                            <a href="https://github.com/lettuce-ai" target="_blank" rel="noopener noreferrer">
                                <Github className="w-5 h-5" />
                                View Source
                            </a>
                        </Button>
                    </motion.div>
                </div>

                {/* App Screenshot - Bottom, floating up */}
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                    className="relative flex-1 flex items-end justify-center px-4 sm:px-8 lg:px-16"
                >
                    {/* Glow behind the image */}
                    <div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[90%] max-w-5xl h-100"
                        style={{
                            background: 'radial-gradient(ellipse at center bottom, rgba(136, 192, 87, 0.15) 0%, transparent 70%)',
                        }}
                    />

                    {/* The screenshot with perspective and border glow */}
                    <div className="relative w-full max-w-5xl">
                        {/* Border glow effect */}
                        <div className="absolute -inset-px rounded-t-xl bg-linear-to-b from-primary/30 via-primary/10 to-transparent blur-sm" />

                        {/* Image container */}
                        <div className="relative rounded-t-xl overflow-hidden border border-border/30 border-b-0 bg-card/20 backdrop-blur-sm shadow-2xl shadow-black/50">
                            <img
                                src={images.desktopView}
                                alt="LettuceAI Desktop Application"
                                className="w-full h-auto"
                                style={{
                                    maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                                    WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                                }}
                            />
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Indicator - positioned at bottom */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20"
            >
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="text-muted-foreground/30"
                >
                    <ArrowDown className="w-5 h-5" />
                </motion.div>
            </motion.div>
        </section>
    );
}
