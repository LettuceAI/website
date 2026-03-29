import { useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

/**
 * Spotlight — mouse-following gradient effect.
 * Wraps a section and adds a subtle radial glow that follows the cursor.
 * Inspired by Aceternity UI's spotlight component.
 */

export function Spotlight({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            ref.current.style.setProperty("--mouse-x", `${x}px`);
            ref.current.style.setProperty("--mouse-y", `${y}px`);
        },
        []
    );

    return (
        <div
            ref={ref}
            onMouseMove={handleMouseMove}
            className={cn("relative", className)}
        >
            <div className="spotlight absolute inset-0 pointer-events-none z-0 transition-opacity duration-300 opacity-0 group-hover/spotlight:opacity-100" />
            <div className="relative z-10">{children}</div>
        </div>
    );
}
