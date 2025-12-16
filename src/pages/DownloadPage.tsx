import { motion } from "framer-motion";
import { Download, Smartphone, Monitor, Terminal, CheckCircle, Loader2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar, Footer } from "@/components/landing";
import { useLatestRelease } from "@/hooks/useLatestRelease";

export function DownloadPage() {
    // Fetch latest release from GitHub
    const release = useLatestRelease("LettuceAI", "mobile-app");

    const formatDate = (dateStr: string) => {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const platforms = [
        {
            name: "Android",
            icon: Smartphone,
            status: "available" as const,
            description: "Download the APK directly from our GitHub releases.",
        },
        {
            name: "Windows",
            icon: Monitor,
            status: "coming-soon" as const,
            description: "Windows app with full feature support.",
        },
        {
            name: "Linux",
            icon: Terminal,
            status: "coming-soon" as const,
            description: "AppImage, .rpm, and .deb packages for all major distros.",
        },
    ];

    return (
        <>
            <Navbar />
            <main className="min-h-screen pt-24 pb-16">
                <div className="max-w-4xl mx-auto px-6">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                            <Download className="w-4 h-4 text-primary" />
                            <span className="text-sm text-primary font-medium">Download LettuceAI</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                            Get LettuceAI for your device
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            Take your AI companion everywhere. Available on Android now, with Windows and Linux coming soon.
                        </p>
                    </motion.div>

                    {/* Platform Cards */}
                    <div className="grid gap-6">
                        {platforms.map((platform, index) => (
                            <motion.div
                                key={platform.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`
                                    relative p-6 rounded-2xl border
                                    ${platform.status === "available"
                                        ? "bg-zinc-900/50 border-primary/30"
                                        : "bg-zinc-900/30 border-border/30"
                                    }
                                `}
                            >
                                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                    {/* Icon */}
                                    <div className={`
                                        w-14 h-14 rounded-xl flex items-center justify-center shrink-0
                                        ${platform.status === "available"
                                            ? "bg-primary/10 border border-primary/30"
                                            : "bg-zinc-800 border border-border/30"
                                        }
                                    `}>
                                        <platform.icon className={`w-7 h-7 ${platform.status === "available" ? "text-primary" : "text-muted-foreground"}`} />
                                    </div>

                                    {/* Info */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-1">
                                            <h3 className="text-xl font-semibold text-white">{platform.name}</h3>
                                            {platform.status === "available" ? (
                                                <>
                                                    {release.loading ? (
                                                        <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-muted-foreground text-xs font-medium">
                                                            Loading...
                                                        </span>
                                                    ) : release.isPrerelease ? (
                                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-medium">
                                                            Beta
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-medium">
                                                            <CheckCircle className="w-3 h-3" />
                                                            Release
                                                        </span>
                                                    )}
                                                </>
                                            ) : (
                                                <span className="px-2 py-0.5 rounded-full bg-zinc-800 text-muted-foreground text-xs font-medium">
                                                    Coming Soon
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-muted-foreground">{platform.description}</p>
                                        {platform.status === "available" && !release.loading && release.version && (
                                            <p className="text-xs text-muted-foreground/70 mt-1">
                                                {release.version} • {formatDate(release.publishedAt)}
                                            </p>
                                        )}
                                    </div>

                                    {/* Action */}
                                    <div className="shrink-0 flex items-center gap-2">
                                        {platform.status === "available" && (
                                            <>
                                                {release.loading ? (
                                                    <Button disabled className="gap-2">
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                        Loading
                                                    </Button>
                                                ) : release.downloadUrl ? (
                                                    <>
                                                        <Button asChild className="gap-2">
                                                            <a href={release.downloadUrl}>
                                                                <Download className="w-4 h-4" />
                                                                Download APK
                                                            </a>
                                                        </Button>
                                                        <Button asChild variant="outline" size="icon">
                                                            <a href={release.releaseUrl} target="_blank" rel="noopener noreferrer">
                                                                <ExternalLink className="w-4 h-4" />
                                                            </a>
                                                        </Button>
                                                    </>
                                                ) : (
                                                    <Button asChild variant="outline" className="gap-2">
                                                        <a href={release.releaseUrl || `https://github.com/LettuceAI/mobile-app/releases`} target="_blank" rel="noopener noreferrer">
                                                            View on GitHub
                                                            <ExternalLink className="w-4 h-4" />
                                                        </a>
                                                    </Button>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Requirements */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="mt-12 p-6 rounded-xl bg-zinc-900/30 border border-border/30"
                    >
                        <h3 className="text-lg font-semibold mb-4">System Requirements</h3>
                        <div className="grid sm:grid-cols-3 gap-6 text-sm">
                            <div>
                                <h4 className="font-medium text-white mb-2">Android</h4>
                                <ul className="space-y-1 text-muted-foreground">
                                    <li>• Android 10.0 or higher</li>
                                    <li>• 300MB free storage</li>
                                    <li>• Internet connection</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-medium text-white mb-2">Windows</h4>
                                <ul className="space-y-1 text-muted-foreground">
                                    <li>• Windows 10/11</li>
                                    <li>• 1GB RAM minimum</li>
                                    <li>• 300MB free storage</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-medium text-white mb-2">Linux</h4>
                                <ul className="space-y-1 text-muted-foreground">
                                    <li>• 1GB RAM minimum</li>
                                    <li>• 300MB free storage</li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>
            <Footer />
        </>
    );
}
