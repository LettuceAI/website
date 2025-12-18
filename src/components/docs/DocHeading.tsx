import { Link } from "lucide-react";
import { cn } from "@/lib/utils";

interface DocHeadingProps {
    level: 1 | 2 | 3 | 4;
    children: React.ReactNode;
    id?: string;
    className?: string;
}

export function DocHeading({ level, children, id, className }: DocHeadingProps) {
    const generateId = (text: string) => {
        return text
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]/g, "");
    };

    const textContent = typeof children === "string" ? children : "";
    const finalId = id || generateId(textContent);

    const getComponent = () => {
        switch (level) {
            case 1:
                return "h1";
            case 2:
                return "h2";
            case 3:
                return "h3";
            case 4:
                return "h4";
            default:
                return "h2";
        }
    };

    const Component = getComponent();

    const handleCopyLink = (e: React.MouseEvent) => {
        e.preventDefault();
        const url = new URL(window.location.href);
        url.hash = finalId;
        navigator.clipboard.writeText(url.toString());
        window.history.pushState(null, "", `#${finalId}`);
        document.getElementById(finalId)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <Component
            id={finalId}
            className={cn(
                "group relative flex items-center gap-2 scroll-m-20 tracking-tight",
                level === 1 && "text-4xl font-extrabold lg:text-5xl mb-8",
                level === 2 && "text-3xl font-semibold first:mt-0 mt-10 mb-4 pb-2 border-b border-border/50",
                level === 3 && "text-2xl font-semibold mt-8 mb-4",
                level === 4 && "text-xl font-semibold mt-6 mb-4",
                className
            )}
        >
            {children}
            <button
                onClick={handleCopyLink}
                className="opacity-0 group-hover:opacity-100 transition-opacity text-primary hover:text-primary/80"
                title="Copy link to section"
                aria-label="Copy link to section"
            >
                <Link className="h-4 w-4" />
            </button>
        </Component>
    );
}
