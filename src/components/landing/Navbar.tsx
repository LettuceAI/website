import { motion } from "framer-motion";
import { Menu, X, Snowflake } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { images } from "@/config/images";
import { useSnow } from "@/contexts/SnowContext";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { snowEnabled, toggleSnow, isHolidaySeason } = useSnow();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Documentation", href: "/docs" },
        { name: "Providers", href: "/providers" },
        { name: "GitHub", href: "https://github.com/LettuceAI/", external: true },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? "bg-background/70 backdrop-blur-xl border-b border-border/50 shadow-lg shadow-black/5"
                : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <motion.a
                        href="/"
                        className="flex items-center gap-2 group"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <img
                            src={images.logo}
                            alt="LettuceAI Logo"
                            className="w-8 h-8 transition-transform"
                        />
                        <span className="text-xl font-bold bg-primary bg-clip-text text-transparent">
                            LettuceAI
                        </span>
                    </motion.a>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <motion.a
                                key={link.name}
                                href={link.href}
                                target={link.external ? "_blank" : undefined}
                                rel={link.external ? "noopener noreferrer" : undefined}
                                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-accent/50"
                                whileHover={{ y: -1 }}
                                whileTap={{ y: 0 }}
                            >
                                {link.name}
                            </motion.a>
                        ))}
                        {isHolidaySeason && (
                            <motion.button
                                onClick={toggleSnow}
                                className={`p-2 rounded-lg transition-colors ${snowEnabled
                                    ? "text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20"
                                    : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                                    }`}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                title={snowEnabled ? "Turn off snow" : "Turn on snow"}
                            >
                                <Snowflake size={18} />
                            </motion.button>
                        )}
                        <div className="ml-2">
                            <Button asChild className="gap-2">
                                <a href="/docs/get-started">
                                    Get Started
                                </a>
                            </Button>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-border/50 shadow-lg"
                    >
                        <div className="py-4 space-y-2 px-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    target={link.external ? "_blank" : undefined}
                                    rel={link.external ? "noopener noreferrer" : undefined}
                                    className="block px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                            {isHolidaySeason && (
                                <button
                                    onClick={toggleSnow}
                                    className={`flex items-center gap-2 w-full px-4 py-2 text-sm font-medium rounded-lg transition-colors ${snowEnabled
                                        ? "text-cyan-400 bg-cyan-500/10"
                                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                                        }`}
                                >
                                    <Snowflake size={18} />
                                    {snowEnabled ? "Snow: On" : "Snow: Off"}
                                </button>
                            )}
                            <div className="pt-2">
                                <Button className="w-full gap-2" asChild>
                                    <a href="/download">
                                        Get Started
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </motion.nav>
    );
}
