import { cn } from "@/lib/utils";

interface DocSplitProps {
    imageSrc: string;
    imageAlt: string;
    children: React.ReactNode;
    reverse?: boolean;
    className?: string;
    imageContainerClassName?: string;
    disableHoverGradient?: boolean;
    disableHoverAnimation?: boolean;
}

export function DocSplit({
    imageSrc,
    imageAlt,
    children,
    reverse = false,
    disableHoverGradient = false,
    disableHoverAnimation = false,
    className,
    imageContainerClassName
}: DocSplitProps) {
    return (
        <div className={cn(
            "my-12 flex flex-col gap-8 items-center",
            reverse ? "md:flex-row-reverse" : "md:flex-row",
            className
        )}>
            <div className={cn(
                "w-full md:w-5/12 shrink-0",
                imageContainerClassName
            )}>
                <div className="relative group overflow-hidden rounded-2xl border border-border/10 bg-zinc-900/50 shadow-2xl aspect-3/4">
                    <img
                        src={imageSrc}
                        alt={imageAlt}
                        className={cn(
                            "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",
                            disableHoverAnimation && "group-hover:scale-100"
                        )}
                    />
                    <div className={cn(
                        "absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity",
                        disableHoverGradient && "opacity-0"
                    )} />
                </div>
            </div>

            {/* Text Side */}
            <div className="flex-1 space-y-4">
                <div className="prose-direct-children">
                    {children}
                </div>
            </div>
        </div>
    );
}
