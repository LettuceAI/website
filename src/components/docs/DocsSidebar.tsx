import { NavLink } from "react-router-dom";
import { docsNav } from "@/config/docs-nav";
import { cn } from "@/lib/utils";

interface DocsSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export function DocsSidebar({ isOpen, onClose }: DocsSidebarProps) {
    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed top-0 left-0 z-50 h-screen w-72 bg-zinc-950 border-r border-border/10 pt-20 pb-6 overflow-y-auto no-scrollbar",
                    "transform transition-all duration-300 ease-in-out underline-offset-4",
                    "lg:sticky lg:top-14 lg:h-[calc(100vh-3.5rem)] lg:z-auto lg:transform-none lg:pt-8 lg:bg-transparent",
                    isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                )}
            >
                <div className="px-4 space-y-8">
                    {docsNav.map((section) => (
                        <div key={section.title} className="space-y-1">
                            <h4 className="text-xs font-semibold text-muted-foreground/50 uppercase tracking-wider px-4 mb-2">
                                {section.title}
                            </h4>
                            <ul className="space-y-0.5">
                                {section.items.map((item) => (
                                    <li key={item.href}>
                                        <NavLink
                                            to={item.href}
                                            end={item.href === "/docs"}
                                            onClick={onClose}
                                            className={({ isActive }) =>
                                                cn(
                                                    "group flex items-center gap-3 px-4 py-2 rounded-lg text-[13px] font-medium transition-colors",
                                                    isActive
                                                        ? "text-primary bg-primary/5"
                                                        : "text-muted-foreground hover:text-white hover:bg-zinc-800/30"
                                                )
                                            }
                                        >
                                            {({ isActive }) => (
                                                <>
                                                    <item.icon className={cn(
                                                        "w-4 h-4 transition-colors",
                                                        "group-hover:text-white",
                                                        isActive ? 'text-primary' : 'text-muted-foreground/60'
                                                    )} />
                                                    <span className="flex-1">{item.title}</span>
                                                </>
                                            )}
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
