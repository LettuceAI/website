import { cn } from "@/lib/utils";

interface DocImageProps {
    src: string;
    alt: string;
    caption?: string;
    className?: string;
    containerClassName?: string;
}

export function DocImage({ src, alt, caption, className, containerClassName }: DocImageProps) {
    return (
        <figure className={cn("my-8 space-y-3", containerClassName)}>
            <div className="relative group overflow-hidden rounded-2xl border border-border/10 bg-zinc-900/50 shadow-2xl">
                <img
                    src={src}
                    alt={alt}
                    className={cn(
                        "w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]",
                        className
                    )}
                />

                {/* Subtle overlay on hover */}
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>

            {caption && (
                <figcaption className="text-center text-xs text-muted-foreground italic px-4">
                    {caption}
                </figcaption>
            )}
        </figure>
    );
}
