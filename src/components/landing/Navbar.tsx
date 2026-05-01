import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Snowflake, Download } from "lucide-react";
import { FaGithub, FaDiscord } from "react-icons/fa";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { images } from "@/config/images";
import { links } from "@/config/links";
import { useSnow } from "@/contexts/SnowContext";

const NAV_LINKS = [
    { name: "Docs", href: "/docs" },
    { name: "Blog", href: "/blog" },
    { name: "Convert", href: "/convert" },
    { name: "Changelog", href: "/changelog" },
    { name: "FAQ", href: "/faq" },
] as const;

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { snowEnabled, toggleSnow, isHolidaySeason } = useSnow();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                isScrolled || isMobileMenuOpen
                    ? "bg-[#050505]/95 backdrop-blur-2xl border-b border-white/[0.06]"
                    : "bg-transparent"
            }`}
        >
            <div className="relative px-6 sm:px-10">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link
                        to="/"
                        className="flex items-center gap-2.5 shrink-0 group"
                    >
                        <img
                            src={images.logo}
                            alt="LettuceAI"
                            className="w-7 h-7 transition-transform duration-300 group-hover:scale-105"
                        />
                        <span className="text-[17px] font-bold text-white tracking-tight">
                            LettuceAI
                        </span>
                    </Link>

                    {/* Center: Nav links in a pill — absolutely centered to viewport */}
                    <div className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2">
                        <div className="relative flex items-center gap-0.5 rounded-full border border-white/[0.06] bg-white/[0.02] px-1.5 py-1">
                            {NAV_LINKS.map((link) => {
                                const isActive = location.pathname.startsWith(link.href);
                                return (
                                    <Link
                                        key={link.name}
                                        to={link.href}
                                        className={`relative z-10 px-3.5 py-1.5 text-[13px] font-medium rounded-full transition-colors duration-200 ${
                                            isActive
                                                ? "text-white"
                                                : "text-white/50 hover:text-white"
                                        }`}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="nav-active"
                                                className="absolute inset-0 rounded-full bg-white/[0.08]"
                                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                            />
                                        )}
                                        <span className="relative z-10">{link.name}</span>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="hidden md:flex items-center gap-1">
                        {isHolidaySeason && (
                            <button
                                onClick={toggleSnow}
                                className={`p-2 rounded-full transition-colors ${
                                    snowEnabled
                                        ? "text-cyan-400 bg-cyan-500/10"
                                        : "text-white/30 hover:text-white/60 hover:bg-white/[0.04]"
                                }`}
                                title={snowEnabled ? "Turn off snow" : "Turn on snow"}
                            >
                                <Snowflake size={15} />
                            </button>
                        )}
                        <a
                            href={links.discord}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-white/30 hover:text-white/60 transition-colors rounded-full hover:bg-white/[0.04]"
                            aria-label="Discord"
                        >
                            <FaDiscord size={16} />
                        </a>
                        <a
                            href={links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-white/30 hover:text-white/60 transition-colors rounded-full hover:bg-white/[0.04]"
                            aria-label="GitHub"
                        >
                            <FaGithub size={16} />
                        </a>

                        <div className="w-px h-4 bg-white/[0.08] mx-1.5" />

                        <Link
                            to="/download"
                            className="inline-flex items-center gap-2 h-8 px-4 text-[13px] font-semibold text-white bg-primary/90 hover:bg-primary rounded-full transition-colors"
                        >
                            <Download size={13} strokeWidth={2.5} />
                            Download
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 text-white/50 hover:text-white transition-colors rounded-full hover:bg-white/[0.05]"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                            className="md:hidden overflow-hidden border-t border-white/[0.06]"
                        >
                            <div className="py-4 space-y-1">
                                {NAV_LINKS.map((link, i) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                    >
                                        <Link
                                            to={link.href}
                                            className="block px-3 py-2.5 text-[14px] font-medium text-white/50 hover:text-white hover:bg-white/[0.04] rounded-lg transition-colors"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}

                                <div className="flex items-center gap-2 px-3 pt-2">
                                    <a
                                        href={links.discord}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2.5 text-white/40 hover:text-white/70 transition-colors rounded-lg hover:bg-white/[0.04]"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <FaDiscord size={18} />
                                    </a>
                                    <a
                                        href={links.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2.5 text-white/40 hover:text-white/70 transition-colors rounded-lg hover:bg-white/[0.04]"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <FaGithub size={18} />
                                    </a>
                                    {isHolidaySeason && (
                                        <button
                                            onClick={toggleSnow}
                                            className={`p-2.5 rounded-lg transition-colors ${
                                                snowEnabled
                                                    ? "text-cyan-400 bg-cyan-500/10"
                                                    : "text-white/40 hover:text-white/70 hover:bg-white/[0.04]"
                                            }`}
                                        >
                                            <Snowflake size={18} />
                                        </button>
                                    )}
                                </div>

                                <div className="px-3 pt-2">
                                    <Link
                                        to="/download"
                                        className="flex items-center justify-center gap-2 w-full h-10 text-[14px] font-semibold text-white bg-primary/90 hover:bg-primary rounded-lg transition-colors"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <Download size={15} strokeWidth={2.5} />
                                        Download
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}
