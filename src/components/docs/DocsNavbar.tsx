import { Search, Github, Home } from "lucide-react";
import { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { images } from "@/config/images";
import { links } from "@/config/links";
import { allDocsItems } from "@/config/docs-nav";

function DocsSearch() {
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
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                inputRef.current?.focus();
            }
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <div className="relative w-full max-w-md hidden sm:block">
            <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <input
                    ref={inputRef}
                    type="text"
                    placeholder="Search documentation..."
                    value={query}
                    onChange={(e) => {
                        setQuery(e.target.value);
                        setIsOpen(true);
                    }}
                    onFocus={() => setIsOpen(true)}
                    className="w-full pl-10 pr-12 py-1.5 text-sm bg-zinc-900/50 border border-border/30 rounded-full text-white placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary/50 focus:bg-zinc-900 transition-all"
                />
                <kbd className="absolute right-3 top-1/2 -translate-y-1/2 inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] text-muted-foreground bg-zinc-800 rounded border border-border/30">
                    ⌘K
                </kbd>
            </div>

            {/* Results Dropdown */}
            {isOpen && query && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                    <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-border/30 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                        {results.length > 0 ? (
                            <ul className="max-h-80 overflow-y-auto py-2">
                                {results.map((item) => (
                                    <li key={item.href}>
                                        <button
                                            onClick={() => handleSelect(item.href)}
                                            className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-zinc-800 transition-colors group"
                                        >
                                            <div className="p-2 rounded-lg bg-zinc-800 group-hover:bg-primary/20 transition-colors">
                                                <item.icon className="w-4 h-4 text-primary" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-medium text-white">{item.title}</div>
                                                <div className="text-xs text-muted-foreground">{item.section}</div>
                                            </div>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="px-4 py-6 text-center text-sm text-muted-foreground">
                                No results for <span className="text-white font-medium">"{query}"</span>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export function DocsNavbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-border/30">
            <div className="w-full px-4 sm:px-6">
                <div className="flex items-center justify-between h-14">
                    {/* Left: Logo & Badge */}
                    <div className="flex items-center gap-4">
                        <Link to="/" className="flex items-center gap-2 group">
                            <img
                                src={images.logo}
                                alt="LettuceAI"
                                className="w-7 h-7"
                            />
                            <span className="hidden sm:inline-block text-lg font-bold bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                                LettuceAI
                            </span>
                        </Link>
                        <div className="h-4 w-px bg-border/40 hidden sm:block" />
                        <Link to="/docs" className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-zinc-900 border border-border/30 hover:border-primary/30 transition-colors group">
                            <span className="text-[11px] font-bold text-muted-foreground group-hover:text-primary transition-colors">DOCS</span>
                        </Link>
                    </div>

                    {/* Center: Search */}
                    <div className="flex-1 flex justify-center px-4 max-w-2xl">
                        <DocsSearch />
                    </div>

                    {/* Right: Links */}
                    <div className="flex items-center gap-4">
                        <div className="hidden md:flex items-center gap-4 mr-2">
                            <Link to="/" className="text-xs font-medium text-muted-foreground hover:text-white flex items-center gap-1.5 transition-colors">
                                <Home className="w-3.5 h-3.5" />
                                Website
                            </Link>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-4">
                            <a
                                href={links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-muted-foreground hover:text-white hover:bg-zinc-900 rounded-lg transition-all"
                                title="GitHub"
                            >
                                <Github className="w-4.5 h-4.5" />
                            </a>
                            <a
                                href={links.discord}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-muted-foreground hover:text-white hover:bg-zinc-900 rounded-lg transition-all"
                                title="Discord"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18.8943 4.34399C17.5183 3.71467 16.057 3.256 14.5317 3C14.3396 3.33067 14.1263 3.77866 13.977 4.13067C12.3546 3.89599 10.7439 3.89599 9.14391 4.13067C8.99457 3.77866 8.77056 3.33067 8.58922 3C7.05325 3.256 5.59191 3.71467 4.22552 4.34399C1.46286 8.41865 0.716188 12.3973 1.08952 16.3226C2.92418 17.6559 4.69486 18.4666 6.4346 19C6.86126 18.424 7.24527 17.8053 7.57594 17.1546C6.9466 16.92 6.34927 16.632 5.77327 16.2906C5.9226 16.184 6.07194 16.0667 6.21061 15.9493C9.68793 17.5387 13.4543 17.5387 17.0093 15.9493C17.1479 16.0667 17.2866 16.184 17.4359 16.2906C16.8599 16.632 16.2626 16.92 15.6333 17.1546C15.9733 17.8053 16.3573 18.424 16.794 19C18.5233 18.4666 20.3046 17.6559 22.1393 16.3226C22.5126 12.3973 21.766 8.41865 19.0033 4.34399C18.966 4.288 18.938 4.208 18.8943 4.34399ZM8.08264 13.064C7.06064 13.064 6.22064 12.1973 6.22064 11.1307C6.22064 10.064 7.04931 9.19733 8.08264 9.19733C9.11597 9.19733 9.94597 10.064 9.94597 11.1307C9.94597 12.1973 9.11597 13.064 8.08264 13.064ZM15.0033 13.064C13.9706 13.064 13.1306 12.1973 13.1306 11.1307C13.1306 10.064 13.9606 9.19733 15.0033 9.19733C16.0366 9.19733 16.8666 10.064 16.8666 11.1307C16.8666 12.1973 16.0366 13.064 15.0033 13.064Z" /></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
