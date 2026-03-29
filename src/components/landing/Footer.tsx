import { FaGithub, FaDiscord } from "react-icons/fa";
import { Link } from "react-router-dom";
import { images } from "@/config/images";
import { links } from "@/config/links";

const footerLinks = [
    {
        title: "Product",
        links: [
            { name: "Download", href: "/download" },
            { name: "Providers", href: "/providers" },
            { name: "Changelog", href: "/changelog" },
            { name: "FAQ", href: "/faq" },
        ],
    },
    {
        title: "Resources",
        links: [
            { name: "Documentation", href: "/docs" },
            { name: "Quick Start", href: "/docs/quickstart" },
            { name: "API Keys", href: "/docs/api-keys" },
            { name: "Memory System", href: "/docs/memory" },
        ],
    },
    {
        title: "Legal",
        links: [
            { name: "Privacy Policy", href: "/privacy" },
            { name: "Terms of Service", href: "/terms" },
            { name: "License (AGPL-3.0)", href: "/license" },
        ],
    },
];

export function Footer() {
    return (
        <footer className="bg-[#050505] border-t border-white/[0.06]">
            <div className="max-w-[1440px] mx-auto px-6 sm:px-10 py-12 sm:py-14">
                <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link to="/" className="inline-flex items-center gap-2.5 mb-4">
                            <img
                                src={images.logo}
                                alt="LettuceAI"
                                className="w-6 h-6"
                            />
                            <span className="text-[15px] font-bold text-white tracking-tight">
                                LettuceAI
                            </span>
                        </Link>
                        <p className="text-[13px] text-white/30 leading-[1.7] max-w-xs mb-5">
                            Open-source AI roleplay companion. No filters, no
                            accounts, no restrictions. Your stories, your privacy.
                        </p>
                        <div className="flex items-center gap-2">
                            <a
                                href={links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-white/25 hover:text-white/60 transition-colors rounded-lg hover:bg-white/[0.04]"
                                aria-label="GitHub"
                            >
                                <FaGithub size={16} />
                            </a>
                            <a
                                href={links.discord}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-white/25 hover:text-white/60 transition-colors rounded-lg hover:bg-white/[0.04]"
                                aria-label="Discord"
                            >
                                <FaDiscord size={16} />
                            </a>
                        </div>
                    </div>

                    {/* Link columns */}
                    {footerLinks.map((section) => (
                        <div key={section.title}>
                            <h3 className="text-[12px] font-semibold text-white/50 uppercase tracking-[0.1em] mb-4">
                                {section.title}
                            </h3>
                            <ul className="space-y-2.5">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <Link
                                            to={link.href}
                                            className="text-[13px] text-white/30 hover:text-white/60 transition-colors"
                                        >
                                            {link.name}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom */}
                <div className="mt-10 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-[12px] text-white/20">
                        &copy; {new Date().getFullYear()} LettuceAI. Open source
                        under AGPL-3.0.
                    </p>
                    <p className="text-[12px] text-white/20">
                        Built by the community.
                    </p>
                </div>
            </div>
        </footer>
    );
}
