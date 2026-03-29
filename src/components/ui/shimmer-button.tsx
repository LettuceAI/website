import { type ComponentProps } from "react";
import { cn } from "@/lib/utils";

/**
 * Shimmer Button — a CTA button with a traveling light effect.
 * Inspired by Magic UI's shimmer-button.
 */

type ShimmerButtonProps = ComponentProps<"button"> & {
    shimmerColor?: string;
    shimmerSize?: string;
    shimmerDuration?: string;
    background?: string;
};

export function ShimmerButton({
    children,
    className,
    shimmerColor = "rgba(255, 255, 255, 0.15)",
    shimmerSize = "0.1em",
    shimmerDuration = "2.5s",
    background = "white",
    ...props
}: ShimmerButtonProps) {
    return (
        <button
            className={cn(
                "group relative inline-flex h-11 items-center justify-center overflow-hidden rounded-lg px-7 text-sm font-semibold transition-all",
                className
            )}
            style={
                {
                    "--shimmer-color": shimmerColor,
                    "--shimmer-size": shimmerSize,
                    "--shimmer-duration": shimmerDuration,
                    background,
                    color: "black",
                } as React.CSSProperties
            }
            {...props}
        >
            {/* Shimmer effect */}
            <div
                className="absolute inset-0 overflow-hidden"
                style={{
                    maskImage:
                        "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
                }}
            >
                <div
                    className="absolute inset-[-100%] animate-[shimmer-slide_var(--shimmer-duration)_linear_infinite]"
                    style={{
                        background: `linear-gradient(90deg, transparent 0%, var(--shimmer-color) 30%, var(--shimmer-color) 70%, transparent 100%)`,
                        width: "200%",
                    }}
                />
            </div>

            {/* Subtle border glow */}
            <div className="absolute inset-0 rounded-lg ring-1 ring-inset ring-white/20 group-hover:ring-white/30 transition-all" />

            <span className="relative z-10">{children}</span>
        </button>
    );
}
