import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Navbar, Footer } from "@/components/landing";

export function NotFoundPage() {
    return (
        <>
            <Navbar />
            <main className="min-h-screen flex items-center justify-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center max-w-md"
                >
                    {/* 404 Number */}
                    <div className="relative mb-8">
                        <span className="text-[150px] sm:text-[200px] font-bold text-zinc-900 leading-none select-none">
                            404
                        </span>
                    </div>

                    {/* Message */}
                    <h1 className="text-2xl sm:text-3xl font-bold mb-4">
                        Page not found
                    </h1>
                    <p className="text-muted-foreground mb-8">
                        Looks like this page got lost in the garden. Let's get you back on track.
                    </p>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Button variant="outline" className="gap-2" onClick={() => window.history.back()}>
                            <ArrowLeft className="w-4 h-4" />
                            Go Back
                        </Button>
                        <Button asChild className="gap-2">
                            <Link to="/">
                                <Home className="w-4 h-4" />
                                Back to Home
                            </Link>
                        </Button>
                    </div>
                </motion.div>
            </main>
            <Footer />
        </>
    );
}
