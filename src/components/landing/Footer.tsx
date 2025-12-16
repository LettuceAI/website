import { Github, Heart } from "lucide-react";
import { images } from "@/config/images";

const footerLinks = [
    {
        title: "Product",
        links: [
            { name: "Features", href: "/features", external: false },
            { name: "Providers", href: "/providers", external: false },
            { name: "Download", href: "/download", external: false },
        ],
    },
    {
        title: "Community",
        links: [
            { name: "GitHub", href: "https://github.com/LettuceAI/", external: true },
            { name: "Discord", href: "https://discord.gg/745bEttw2r", external: true },
            { name: "Documentation", href: "/docs", external: true },
        ],
    },
    {
        title: "Legal",
        links: [
            { name: "Privacy Policy", href: "#", external: false },
            { name: "Terms of Service", href: "#", external: false },
            { name: "License (GPL-3.0)", href: "#", external: false },
        ],
    },
];

export function Footer() {
    return (
        <footer className="relative border-t border-border/50 bg-card/30 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid gap-8 md:grid-cols-4">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <a href="#" className="flex items-center gap-2 mb-4">
                            <img
                                src={images.logo}
                                alt="LettuceAI Logo"
                                className="w-8 h-8"
                            />
                            <span className="text-xl font-bold bg-primary bg-clip-text text-transparent">
                                LettuceAI
                            </span>
                        </a>
                        <p className="text-sm text-muted-foreground mb-4">
                            Open source AI roleplay companion. Your stories, your privacy, your control.
                        </p>
                        <a
                            href="https://github.com/lettuce-ai"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <Github className="w-4 h-4" />
                            Star on GitHub
                        </a>
                    </div>

                    {/* Links */}
                    {footerLinks.map((section) => (
                        <div key={section.title}>
                            <h3 className="font-semibold mb-4 text-foreground">{section.title}</h3>
                            <ul className="space-y-3">
                                {section.links.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            target={link.external ? "_blank" : undefined}
                                            rel={link.external ? "noopener noreferrer" : undefined}
                                            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} LettuceAI. Open source under GPL-3.0.
                    </p>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                        Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> and 🥬 by the community
                    </p>
                </div>
            </div>
        </footer>
    );
}
