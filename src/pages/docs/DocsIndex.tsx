import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export function DocsIndex() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="text-4xl font-bold mb-4">Documentation</h1>
            <p className="text-lg text-muted-foreground mb-8">
                Welcome to the LettuceAI documentation. Learn how to get started, configure providers, and make the most of your AI companion.
            </p>

            {/* Quick Links */}
            <div className="grid sm:grid-cols-2 gap-4 mb-12">
                <Link
                    to="/docs/installation"
                    className="p-5 rounded-xl bg-zinc-900/50 border border-border/30 hover:border-primary/30 transition-colors group"
                >
                    <h3 className="font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                        Installation
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                        Download and install LettuceAI on your device.
                    </p>
                    <span className="text-sm text-primary flex items-center gap-1">
                        Get started <ArrowRight className="w-4 h-4" />
                    </span>
                </Link>

                <Link
                    to="/docs/quickstart"
                    className="p-5 rounded-xl bg-zinc-900/50 border border-border/30 hover:border-primary/30 transition-colors group"
                >
                    <h3 className="font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                        Quick Start
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                        Set up your first provider and start chatting.
                    </p>
                    <span className="text-sm text-primary flex items-center gap-1">
                        Learn more <ArrowRight className="w-4 h-4" />
                    </span>
                </Link>

                <Link
                    to="/docs/api-keys"
                    className="p-5 rounded-xl bg-zinc-900/50 border border-border/30 hover:border-primary/30 transition-colors group"
                >
                    <h3 className="font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                        API Keys
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                        Learn how to add and manage your API keys.
                    </p>
                    <span className="text-sm text-primary flex items-center gap-1">
                        Configure <ArrowRight className="w-4 h-4" />
                    </span>
                </Link>

                <Link
                    to="/docs/memory"
                    className="p-5 rounded-xl bg-zinc-900/50 border border-border/30 hover:border-primary/30 transition-colors group"
                >
                    <h3 className="font-semibold text-white mb-2 group-hover:text-primary transition-colors">
                        Memory System
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                        Understand how our infinite memory works.
                    </p>
                    <span className="text-sm text-primary flex items-center gap-1">
                        Explore <ArrowRight className="w-4 h-4" />
                    </span>
                </Link>
            </div>

            {/* Features Overview */}
            <h2 className="text-2xl font-bold mb-4">Key Features</h2>
            <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span><strong className="text-white">BYOK</strong> — Use your own API keys from any provider</span>
                </li>
                <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span><strong className="text-white">Privacy First</strong> — All data stored locally on your device</span>
                </li>
                <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span><strong className="text-white">Smart Memory</strong> — Infinite context without token limits</span>
                </li>
                <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span><strong className="text-white">Custom Characters</strong> — Create and customize AI personas</span>
                </li>
                <li className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span><strong className="text-white">Multi-Provider</strong> — Switch between models mid-conversation</span>
                </li>
            </ul>
        </motion.div>
    );
}
