import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { allDocsItems } from "@/config/docs-nav";

export function DocsPagination() {
    const location = useLocation();
    const currentIndex = allDocsItems.findIndex(item => item.href === location.pathname);

    if (currentIndex === -1) return null;

    const prev = currentIndex > 0 ? allDocsItems[currentIndex - 1] : null;
    const next = currentIndex < allDocsItems.length - 1 ? allDocsItems[currentIndex + 1] : null;

    return (
        <div className="flex flex-col sm:flex-row gap-4 mt-16 pt-8 border-t border-border/10">
            {prev ? (
                <Link
                    to={prev.href}
                    className="flex-1 group p-4 rounded-2xl bg-zinc-900/40 border border-border/10 hover:border-primary/20 hover:bg-zinc-900 transition-all duration-300"
                >
                    <div className="flex flex-col gap-2">
                        <span className="flex items-center gap-2 text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors">
                            <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" />
                            Previous
                        </span>
                        <span className="text-sm font-semibold text-white group-hover:text-primary transition-colors">
                            {prev.title}
                        </span>
                    </div>
                </Link>
            ) : (
                <div className="flex-1" />
            )}

            {next ? (
                <Link
                    to={next.href}
                    className="flex-1 group p-4 rounded-2xl bg-zinc-900/40 border border-border/10 hover:border-primary/20 hover:bg-zinc-900 transition-all duration-300 text-right"
                >
                    <div className="flex flex-col gap-2">
                        <span className="flex items-center justify-end gap-2 text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors">
                            Next
                            <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                        </span>
                        <span className="text-sm font-semibold text-white group-hover:text-primary transition-colors">
                            {next.title}
                        </span>
                    </div>
                </Link>
            ) : (
                <div className="flex-1" />
            )}
        </div>
    );
}
