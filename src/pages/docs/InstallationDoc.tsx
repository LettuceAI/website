import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { CodeBlock } from "@/components/ui/CodeBlock";

export function InstallationDoc() {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="prose prose-invert max-w-none"
        >
            <h1>Installation</h1>
            <p className="lead">
                Get LettuceAI running on your device in minutes.
            </p>

            <h2>Android</h2>
            <p>
                Download the latest APK from our <Link to="/download" className="text-primary hover:underline">downloads page</Link> or directly from GitHub releases.
            </p>
            <ol>
                <li>Download the APK file</li>
                <li>Open the APK on your Android device</li>
                <li>Allow installation from unknown sources if prompted</li>
                <li>Complete the installation and launch LettuceAI</li>
            </ol>

            <div className="not-prose my-6 p-4 rounded-lg bg-amber-500/10 border border-amber-500/30">
                <p className="text-sm text-amber-200">
                    <strong>Note:</strong> Android 10.0 or higher is required. Make sure you have at least 300MB of free storage.
                </p>
            </div>

            <h2>Windows & Linux</h2>
            <p>
                Desktop apps for Windows and Linux are currently in development. Join our Discord to get notified when they're ready.
            </p>

            <h2>Building from Source</h2>
            <p>
                LettuceAI is open source. You can build it yourself:
            </p>
            <div className="not-prose">
                <CodeBlock>{`git clone https://github.com/LettuceAI/mobile-app.git
cd mobile-app
npm install
npm run tauri android build`}</CodeBlock>
            </div>

            <div className="not-prose mt-8 flex gap-3">
                <Link
                    to="/docs/quickstart"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-black font-medium hover:bg-primary/90 transition-colors"
                >
                    Next: Quick Start
                    <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </motion.article>
    );
}
