import { motion } from "framer-motion";
import { BookOpen, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FallingPattern } from "@/components/ui/falling-pattern";

export function CTASection() {
    return (
        <section id="download" className="relative py-16 sm:py-20 overflow-hidden">
            <div className="absolute inset-0">
                <FallingPattern
                    className="h-full w-full mask-[radial-gradient(ellipse_at_center,transparent,var(--background))]"
                    color="rgba(136, 192, 87, 0.6)"
                    backgroundColor="#050505"
                    duration={120}
                />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
                    {/* Tagline */}
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-2xl sm:text-3xl lg:text-4xl font-medium text-white"
                    >
                        Your story awaits. Start creating.
                    </motion.h2>

                    {/* Buttons */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="flex items-center gap-3"
                    >
                        <Button
                            variant="outline"
                            className="h-11 px-6 gap-2 border-border/50 hover:border-primary/50 hover:bg-primary/5"
                            asChild
                        >
                            <a href="/docs">
                                <BookOpen className="w-4 h-4" />
                                Docs
                            </a>
                        </Button>
                        <Button
                            className="h-11 px-6 gap-2 bg-white text-black hover:bg-white/90"
                            asChild
                        >
                            <a href="/download">
                                <Download className="w-4 h-4" />
                                Download
                            </a>
                        </Button>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
