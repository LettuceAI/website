import { motion } from "framer-motion";
import { Github, ChevronRight } from "lucide-react";
import { FaAndroid, FaWindows, FaLinux, FaApple } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { useNavigate } from "react-router-dom";
import { links } from "@/config/links";
import { images } from "@/config/images";
import { useRef } from "react";
import { ProductDemo } from "@/components/demo/ProductDemo";

export function HeroSection() {
    const navigate = useNavigate();
    const sectionRef = useRef<HTMLElement>(null);

   /* const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            sectionRef.current.style.setProperty(
                "--mouse-x",
                `${e.clientX - rect.left}px`
            );
            sectionRef.current.style.setProperty(
                "--mouse-y",
                `${e.clientY - rect.top}px`
            );
        },
        []
    );*/

    return (
        <section
            ref={sectionRef}
            className="relative min-h-[100svh] bg-[#050505] overflow-hidden"
        >
            {/* Gradient background image */}
            <img
                src={images.heroGradient}
                alt=""
                className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0 opacity-[0.10] hue-rotate-[-40deg]"
            />

            {/* Vertical lines with radial fade */}
            <div className="hero-grid absolute inset-0 pointer-events-none z-0" />


            <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 pt-28 sm:pt-32 lg:pt-0 lg:min-h-[100svh] flex flex-col lg:flex-row items-center lg:items-center gap-10 lg:gap-16">
                {/* ─── Left: Copy ─── */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                        duration: 0.7,
                        ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="w-full lg:w-[42%] shrink-0 lg:pr-4 py-8 lg:py-0"
                >
                    <a
                        href={links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[11px] text-white/50 hover:text-white/70 transition-colors border border-white/[0.08] rounded-full px-3.5 py-1 bg-white/[0.02] hover:bg-white/[0.04] mb-8"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                        Open Source &amp; Free
                        <ChevronRight className="w-3 h-3 text-white/20" />
                    </a>

                    <h1 className="text-[2.75rem] sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-bold tracking-tight leading-[1.05] text-white mb-5">
                        AI roleplay
                        <br />
                        with{" "}
                        <span className="font-display italic text-primary">
                            total freedom
                        </span>
                    </h1>

                    <p className="text-[15px] text-white/40 leading-[1.7] max-w-md mb-8">
                        No filters, no restrictions, no accounts. Bring your
                        own API keys from 20+ providers — your characters,
                        your rules, your device. Fully open source.
                    </p>

                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <ShimmerButton
                            className="h-11 px-7"
                            onClick={() => navigate("/download")}
                        >
                            Download — It's Free
                        </ShimmerButton>
                        <Button
                            size="lg"
                            variant="outline"
                            className="h-11 px-7 text-sm font-semibold border-white/10 text-white/60 hover:text-white hover:border-white/20 hover:bg-white/[0.03] gap-2"
                            asChild
                        >
                            <a
                                href={links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Github className="w-4 h-4" />
                                Source
                            </a>
                        </Button>
                    </div>

                    <div className="flex items-center gap-5 text-xs text-white/30">
                        <span className="inline-flex items-center gap-1.5">
                            <FaAndroid className="w-3.5 h-3.5" /> Android
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <FaApple className="w-3.5 h-3.5" /> macOS
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <FaWindows className="w-3.5 h-3.5" /> Windows
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                            <FaLinux className="w-3.5 h-3.5" /> Linux
                        </span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.9,
                        delay: 0.3,
                        ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="w-full lg:w-[58%] lg:max-w-[760px]"
                >
                    <ProductDemo />
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
            >
                <span className="text-[11px] text-white/25 tracking-widest uppercase">Scroll</span>
                <motion.div
                    animate={{ y: [0, 6, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                    className="w-5 h-8 rounded-full border border-white/15 flex items-start justify-center pt-1.5"
                >
                    <div className="w-1 h-1.5 rounded-full bg-white/30" />
                </motion.div>
            </motion.div>
        </section>
    );
}
