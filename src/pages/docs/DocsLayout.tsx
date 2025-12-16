import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Menu, Home, Download, Zap, Settings, Palette, Brain, Key, HelpCircle, Search } from "lucide-react";
import { useState, useMemo, useRef, useEffect } from "react";
import { Navbar, Footer } from "@/components/landing";
import { cn } from "@/lib/utils";

// Docs navigation structure with keywords for search
const docsNav = [
    {
        title: "Getting Started",
        items: [
            { title: "Introduction", href: "/docs", icon: Home, keywords: ["home", "start", "welcome", "overview"] },
            { title: "Installation", href: "/docs/installation", icon: Download, keywords: ["install", "download", "setup", "android", "apk"] },
            { title: "Quick Start", href: "/docs/quickstart", icon: Zap, keywords: ["quick", "start", "begin", "first", "tutorial"] },
        ],
    },
    {
        title: "Configuration",
        items: [
            { title: "API Keys", href: "/docs/api-keys", icon: Key, keywords: ["api", "key", "openai", "anthropic", "claude", "gemini", "token"] },
            { title: "Providers", href: "/docs/providers", icon: Settings, keywords: ["provider", "model", "ollama", "local", "endpoint", "custom"] },
        ],
    },
    {
        title: "Features",
        items: [
            { title: "Characters", href: "/docs/characters", icon: Palette, keywords: ["character", "persona", "personality", "avatar", "system prompt"] },
            { title: "Memory System", href: "/docs/memory", icon: Brain, keywords: ["memory", "context", "history", "remember", "infinite", "summarization"] },
        ],
    },
    {
        title: "Help",
        items: [
            { title: "FAQ", href: "/faq", icon: HelpCircle, keywords: ["faq", "question", "help", "support", "common"] },
        ],
    },
];

// Flatten all items for search
const allDocsItems = docsNav.flatMap(section =>
    section.items.map(item => ({ ...item, section: section.title }))
);

function DocsSearch({ onClose }: { onClose?: () => void }) {
    const [query, setQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    const results = useMemo(() => {
        if (!query.trim()) return [];
        const q = query.toLowerCase();
        return allDocsItems.filter(item =>
            item.title.toLowerCase().includes(q) ||
            item.keywords.some(k => k.toLowerCase().includes(q))
        );
    }, [query]);

    const handleSelect = (href: string) => {
        navigate(href);
        setQuery("");
        setIsOpen(false);
        onClose?.();
    };

    // Keyboard shortcut (Cmd/Ctrl + K)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                inputRef.current?.focus();
                setIsOpen(true);
            }
            if (e.key === "Escape") {
                setIsOpen(false);
                setQuery("");
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <div className="relative mb-4">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search docs..."
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    className="w-full pl-10 pr-12 py-2 text-sm bg-zinc-900 border border-border/30 rounded-lg text-white placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
                />
                <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-xs text-muted-foreground bg-zinc-800 rounded">
                    ⌘K
                </kbd>
            </div>

            {/* Search Results */}
            {isOpen && query && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-border/30 rounded-lg shadow-xl overflow-hidden z-50">
                    {results.length > 0 ? (
                        <ul>
                            {results.map((item) => (
                                <li key={item.href}>
                                    <button
                                        onClick={() => handleSelect(item.href)}
                                        className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-zinc-800 transition-colors"
                                    >
                                        <item.icon className="w-4 h-4 text-primary" />
                                        <div>
                                            <div className="text-sm text-white">{item.title}</div>
                                            <div className="text-xs text-muted-foreground">{item.section}</div>
                                        </div>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div className="px-4 py-3 text-sm text-muted-foreground">
                            No results found for "{query}"
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function DocsSidebar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed top-0 left-0 z-50 h-screen w-72 bg-zinc-950 border-r border-border/30 pt-20 pb-6 overflow-y-auto",
                    "transform transition-transform duration-300",
                    "lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] lg:z-auto lg:transform-none lg:pt-6",
                    isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                )}
            >
                <div className="px-4">
                    {/* Search */}
                    <DocsSearch onClose={onClose} />

                    {docsNav.map((section) => (
                        <div key={section.title} className="mb-6">
                            <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-3">
                                {section.title}
                            </h4>
                            <ul className="space-y-1">
                                {section.items.map((item) => (
                                    <li key={item.href}>
                                        <NavLink
                                            to={item.href}
                                            end={item.href === "/docs"}
                                            onClick={onClose}
                                            className={({ isActive }) =>
                                                cn(
                                                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                                                    isActive
                                                        ? "bg-primary/10 text-primary"
                                                        : "text-muted-foreground hover:text-white hover:bg-zinc-800/50"
                                                )
                                            }
                                        >
                                            <item.icon className="w-4 h-4" />
                                            {item.title}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </aside>
        </>
    );
}

export function DocsLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <Navbar />
            <div className="flex min-h-screen pt-16">
                <DocsSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

                {/* Main content */}
                <main className="flex-1 min-w-0">
                    {/* Mobile menu button */}
                    <div className="sticky top-16 z-30 bg-background/80 backdrop-blur-sm border-b border-border/30 px-4 py-3 lg:hidden">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white"
                        >
                            <Menu className="w-5 h-5" />
                            Menu
                        </button>
                    </div>

                    <div className="max-w-4xl mx-auto px-6 py-12">
                        <Outlet />
                    </div>
                </main>
            </div>
            <Footer />
        </>
    );
}
