import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function GradientDots() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;
        let time = 0;

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio, 2);
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            ctx.scale(dpr, dpr);
        };

        resize();
        window.addEventListener("resize", resize);

        const SPACING = 10;
        const DOT_RADIUS = 1;

        const colors = [
            [60, 60, 60],    // dark gray
            [80, 80, 80],    // mid gray
            [136, 192, 87],  // green (primary)
            [52, 211, 153],  // emerald
            [100, 100, 100], // light gray
            [136, 192, 87],  // green again (weighted)
        ];

        // Pre-build color LUT (256 entries)
        const LUT_SIZE = 256;
        const colorLUT = new Uint8Array(LUT_SIZE * 3);
        for (let i = 0; i < LUT_SIZE; i++) {
            const t = i / (LUT_SIZE - 1);
            const pos = t * (colors.length - 1);
            const idx = Math.min(Math.floor(pos), colors.length - 2);
            const f = pos - idx;
            const c0 = colors[idx], c1 = colors[idx + 1];
            colorLUT[i * 3]     = (c0[0] + (c1[0] - c0[0]) * f) | 0;
            colorLUT[i * 3 + 1] = (c0[1] + (c1[1] - c0[1]) * f) | 0;
            colorLUT[i * 3 + 2] = (c0[2] + (c1[2] - c0[2]) * f) | 0;
        }

        // Cache vignette alpha map
        let cachedW = 0, cachedH = 0, cachedCols = 0;
        let alphaMap: Float32Array | null = null;

        function rebuildAlpha(w: number, h: number, cols: number, rows: number) {
            alphaMap = new Float32Array(cols * rows);
            for (let r = 0; r < rows; r++) {
                const dy = (r * SPACING) / h - 0.5;
                const dySq = dy * dy;
                for (let c = 0; c < cols; c++) {
                    const dx = (c * SPACING) / w - 0.5;
                    alphaMap[r * cols + c] = Math.max(0, 0.6 - Math.sqrt(dx * dx + dySq) * 0.8);
                }
            }
            cachedW = w; cachedH = h; cachedCols = cols;
        }

        const TWO_PI = Math.PI * 2;
        const lutMax = LUT_SIZE - 1;

        function draw() {
            const rect = canvas!.getBoundingClientRect();
            const w = rect.width;
            const h = rect.height;

            ctx!.clearRect(0, 0, w, h);

            const cols = Math.ceil(w / SPACING) + 1;
            const rows = Math.ceil(h / SPACING) + 1;

            if (w !== cachedW || h !== cachedH) rebuildAlpha(w, h, cols, rows);

            const angle = time * 1.2;
            const invW = 1 / w, invH = 1 / h;

            for (let row = 0; row < rows; row++) {
                const y = row * SPACING;
                const ny3 = y * invH * 3;
                const cosRow = Math.cos(ny3 + angle * 0.7);
                const rowOff = row * cachedCols;

                for (let col = 0; col < cols; col++) {
                    const a = alphaMap![rowOff + col];
                    if (a <= 0) continue;

                    const x = col * SPACING;
                    const nx3 = x * invW * 3;

                    const grad = (Math.sin(nx3 + angle) + cosRow + Math.sin((x * invW + y * invH) * 2 + angle * 0.5)) * 0.5;
                    const li = Math.min(Math.max(((grad + 1.5) / 3 * lutMax) | 0, 0), lutMax) * 3;

                    ctx!.beginPath();
                    ctx!.arc(x, y, DOT_RADIUS, 0, TWO_PI);
                    ctx!.fillStyle = `rgba(${colorLUT[li]},${colorLUT[li + 1]},${colorLUT[li + 2]},${a})`;
                    ctx!.fill();
                }
            }

            time += 0.04;
            animationId = requestAnimationFrame(draw);
        }

        draw();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none"
        />
    );
}

export function ColorBreak() {
    return (
        <section className="relative overflow-hidden bg-[#050505]">
            <GradientDots />

            <div className="absolute top-0 inset-x-0 h-px bg-white/[0.06]" />
            <div className="absolute bottom-0 inset-x-0 h-px bg-white/[0.06]" />

            <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 py-16 sm:py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col md:flex-row items-center justify-between gap-8"
                >
                    <div className="max-w-lg">
                        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
                            Free.{" "}
                            <span className="font-display italic text-primary">
                                Forever.
                            </span>
                        </h2>
                        <p className="text-[15px] text-white/50 leading-relaxed">
                            No premium tier, no usage limits, no bait-and-switch.
                            You bring your own API keys and pay the providers
                            directly. We don't see your data, your conversations,
                            or your keys.
                        </p>
                    </div>

                    <Button
                        size="lg"
                        className="h-12 px-8 text-base font-semibold bg-white text-black hover:bg-white/90 shadow-[0_0_40px_rgba(136,192,87,0.15)] shrink-0"
                        asChild
                    >
                        <Link to="/download" className="gap-2">
                            <Download className="w-4 h-4" />
                            Download Now
                        </Link>
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
