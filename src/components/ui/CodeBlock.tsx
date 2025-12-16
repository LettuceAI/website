import { useState } from "react";
import { Check, Copy } from "lucide-react";

interface CodeBlockProps {
    children: string;
    language?: string;
}

export function CodeBlock({ children }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(children);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative group my-6">
            <button
                onClick={handleCopy}
                className="absolute top-3 right-3 p-2 rounded-md bg-zinc-800 hover:bg-zinc-700 text-muted-foreground hover:text-white transition-all"
                title={copied ? "Copied!" : "Copy code"}
            >
                {copied ? (
                    <Check className="w-4 h-4 text-primary" />
                ) : (
                    <Copy className="w-4 h-4" />
                )}
            </button>
            <pre className="bg-zinc-900 rounded-lg p-4 overflow-x-auto border border-border/30">
                <code className="text-sm text-zinc-300">{children}</code>
            </pre>
        </div>
    );
}
