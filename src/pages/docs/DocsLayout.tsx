import { Outlet, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";
import { useState } from "react";
import { DocsNavbar } from "@/components/docs/DocsNavbar";
import { DocsSidebar } from "@/components/docs/DocsSidebar";
import { DocsPagination } from "@/components/docs/DocsPagination";
import { TableOfContents } from "@/components/docs/TableOfContents";

export function DocsLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    return (
        <>
            <DocsNavbar />
            <div className="flex min-h-screen pt-14">
                <DocsSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

                {/* Main content */}
                <main className="flex-1 min-w-0">
                    {/* Mobile menu button */}
                    <div className="sticky top-14 z-30 bg-background/80 backdrop-blur-sm border-b border-border/30 px-4 py-3 lg:hidden">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white"
                        >
                            <Menu className="w-5 h-5" />
                            Menu
                        </button>
                    </div>

                    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-3.5rem)]">
                        {/* Content Area - Centered */}
                        <div className="flex-1 flex justify-center px-6 py-12">
                            <div className="w-full max-w-3xl min-w-0">
                                <Outlet />
                                <DocsPagination />
                            </div>
                        </div>

                        {/* TOC Area - Far Right */}
                        <aside className="hidden xl:block w-80 shrink-0 border-l border-border/10 px-8 py-12 sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto">
                            <TableOfContents key={location.pathname} />
                        </aside>
                    </div>
                </main>
            </div>
        </>
    );
}
