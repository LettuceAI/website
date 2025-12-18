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
        const elements = Array.from(document.querySelectorAll("h1, h2, h3"))
            .filter((el) => {
                // Ensure the element has an ID to link to
                return el.id;
            })
            .map((el) => {
                const htmlEl = el as HTMLElement;
                return {
                    id: htmlEl.id,
                    text: htmlEl.textContent?.replace("Copy link to section", "").trim() || "", // Remove the hidden button text if it gets picked up
                    level: parseInt(htmlEl.tagName.substring(1)),
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
                <ul className="space-y-1 text-sm">
                    {items.map((item) => {
                        const isActive = activeId === item.id;

                        return (
                            <li key={item.id} className="relative">
                                <a
                                    href={`#${item.id}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
                                        window.history.pushState(null, "", `#${item.id}`);
                                        setActiveId(item.id);
                                    }}
                                    className={cn(
                                        "block transition-all duration-200 hover:text-white border-l-2 py-1",
                                        isActive ? "border-primary text-primary font-medium" : "border-transparent text-muted-foreground",
                                        item.level === 1 && "pl-4",
                                        item.level === 2 && "pl-4",
                                        item.level === 3 && "pl-8 text-xs"
                                    )}
                                >
                                    {item.text}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
