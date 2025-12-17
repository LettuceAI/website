import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TocItem {
    id: string;
    text: string;
    level: number;
}

export function TableOfContents() {
    const [items, setItems] = useState<TocItem[]>([]);
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        const elements = Array.from(document.querySelectorAll("h1, h2"))
            .map((el) => {
                const htmlEl = el as HTMLElement;
                const text = htmlEl.textContent || "";
                if (!htmlEl.id) {
                    htmlEl.id = text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
                }

                // Add anchor link icon if not already present
                if (!htmlEl.querySelector(".anchor-link")) {
                    htmlEl.classList.add("group", "relative", "flex", "items-center", "gap-2");
                    const anchor = document.createElement("button");
                    anchor.className = "anchor-link opacity-0 group-hover:opacity-100 transition-opacity text-primary hover:text-primary/80";
                    anchor.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>';
                    anchor.title = "Copy link to section";
                    anchor.onclick = (e) => {
                        e.preventDefault();
                        const url = new URL(window.location.href);
                        url.hash = htmlEl.id;
                        navigator.clipboard.writeText(url.toString());
                        htmlEl.scrollIntoView({ behavior: "smooth" });
                    };
                    htmlEl.appendChild(anchor);
                }

                return {
                    id: htmlEl.id,
                    text,
                    level: htmlEl.tagName === "H1" ? 1 : 2,
                };
            });
        setItems(elements);

        // Handle initial scroll to hash
        if (window.location.hash) {
            const id = window.location.hash.slice(1);
            setTimeout(() => {
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                    setActiveId(id);
                }
            }, 100);
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "0% 0% -80% 0%" }
        );

        elements.forEach((item) => {
            const el = document.getElementById(item.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    if (items.length === 0) return null;

    return (
        <div className="space-y-4">
            <h5 className="text-xs font-semibold text-white uppercase tracking-wider mb-6">
                On this page
            </h5>
            <div className="relative">
                <ul className="space-y-0 text-sm">
                    {items.map((item, index) => {
                        const isLastInGroup = index === items.length - 1 || items[index + 1].level === 1;
                        const isH1 = item.level === 1;
                        const hasH2sBelow = !isLastInGroup && items[index + 1].level === 2;

                        return (
                            <li key={item.id} className="relative py-1.5 grayscale-0">
                                {/* Vertical tree connectivity */}
                                {!isH1 && (
                                    <>
                                        <div className="absolute left-1.75 top-0 w-px h-1/2 bg-border/60" />
                                        {!isLastInGroup && (
                                            <div className="absolute left-1.75 top-1/2 w-px h-1/2 bg-border/60" />
                                        )}
                                    </>
                                )}
                                {isH1 && hasH2sBelow && (
                                    <div className="absolute left-1.75 top-1/2 w-px h-1/2 bg-border/60" />
                                )}

                                <div className="flex items-center">
                                    {!isH1 && (
                                        <div className="absolute left-1.75 w-6 h-px bg-border/60" />
                                    )}
                                    <a
                                        href={`#${item.id}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                                            window.history.pushState(null, "", `#${item.id}`);
                                        }}
                                        className={cn(
                                            "block transition-all duration-200 hover:text-white",
                                            isH1 ? "font-semibold text-[13px] pl-0" : "pl-10 text-[13px]",
                                            activeId === item.id
                                                ? "text-primary scale-105 origin-left"
                                                : "text-muted-foreground"
                                        )}
                                    >
                                        {item.text}
                                    </a>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
