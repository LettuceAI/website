import { SEO } from "@/components/common/SEO";
import { softwareSchema } from "@/config/schemas";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Download, ChevronDown, ExternalLink, Copy, Check } from "lucide-react";
import { FaAndroid, FaApple, FaLinux, FaWindows } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { images } from "@/config/images";
import {
  useLatestRelease,
  type ReleaseChannel,
} from "../hooks/useLatestRelease";

/* ── GPU detection commands ─────────────────────────────── */
const linuxGpuCheckCommand =
  "lspci | grep -iE 'vga|3d|display' | sed 's/.*: //' | awk '{if(/NVIDIA|GeForce|Quadro|RTX|GTX/){print \"Nvidia \"$0; d=1} else if(/AMD|ATI|Radeon/){print \"AMD \"$0; d=1}} END{if(!d) print \"no GPU (integrated only)\"}'";

const windowsGpuCheckCommand =
  'Get-WmiObject Win32_VideoController | ForEach-Object { $n = $_.Name; if($n -match \'NVIDIA|GeForce|RTX|GTX|Quadro\'){$script:d=1; "Nvidia $n"} elseif($n -match \'AMD|Radeon|ATI\'){$script:d=1; "AMD $n"} }; if(!$d){"no GPU (integrated only)"}';

/* ── Dropdown for multi-build platforms ─────────────────── */
function BuildDropdown({
  label,
  builds,
}: {
  label: string;
  builds: { name: string; href: string }[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (builds.length === 0) return null;

  if (builds.length === 1) {
    return (
      <a
        href={builds[0].href}
        className="inline-flex items-center justify-center gap-2 h-11 w-full rounded-lg bg-primary text-black text-[13px] font-semibold hover:bg-primary/90 transition-colors"
      >
        <Download className="w-4 h-4" />
        {label}
      </a>
    );
  }

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex items-center justify-center gap-2 h-11 w-full rounded-lg bg-primary text-black text-[13px] font-semibold hover:bg-primary/90 transition-colors"
      >
        <Download className="w-4 h-4" />
        {label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.12 }}
            className="absolute top-full left-0 right-0 mt-1.5 rounded-lg border border-white/[0.08] bg-[#111] z-20 overflow-hidden shadow-xl"
          >
            {builds.map((build) => (
              <a
                key={build.name}
                href={build.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 px-4 py-3 text-[13px] text-white/70 hover:text-white hover:bg-white/[0.04] transition-colors border-b border-white/[0.04] last:border-b-0"
              >
                <Download className="w-3.5 h-3.5 text-white/30" />
                {build.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── CopyBlock for GPU commands ─────────────────────────── */
function CopyBlock({ code, label }: { code: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch { /* noop */ }
  };
  return (
    <div className="mt-3">
      <p className="text-[10px] uppercase tracking-wider text-white/20 mb-1.5">{label}</p>
      <div className="flex items-center gap-2 rounded-lg border border-white/[0.06] bg-black/40 px-3 py-2.5">
        <code className="flex-1 text-[11px] text-white/40 overflow-x-auto whitespace-nowrap">{code}</code>
        <button type="button" onClick={handleCopy} className="shrink-0 text-white/25 hover:text-white/50 transition-colors">
          {copied ? <Check className="w-3.5 h-3.5 text-primary" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  );
}

/* ── Main page ──────────────────────────────────────────── */
export function DownloadPage() {
  const [searchParams] = useSearchParams();
  const requestedPlatformParam = searchParams.get("platform");
  const requestedChannel: ReleaseChannel =
    searchParams.get("channel") === "dev" ? "dev" : "release";
  const requestedReleaseTag = searchParams.get("release")?.trim() || "";
  const requestedVersion = searchParams.get("version")?.trim() || "";
  const fallbackReleaseUrl =
    searchParams.get("fallback")?.trim() ||
    "https://github.com/LettuceAI/app/releases";
  const isInAppUpdate = searchParams.get("source") === "in-app-update";

  const requestedPlatform =
    requestedPlatformParam === "android" ||
    requestedPlatformParam === "windows" ||
    requestedPlatformParam === "linux" ||
    requestedPlatformParam === "macos"
      ? requestedPlatformParam
      : null;

  const isRequestedAndroid = requestedPlatform === "android";
  const isRequestedDesktop =
    requestedPlatform === "windows" ||
    requestedPlatform === "linux" ||
    requestedPlatform === "macos";

  const androidRelease = useLatestRelease({
    family: "android",
    channel: requestedChannel,
    releaseTag: isRequestedAndroid ? requestedReleaseTag || undefined : undefined,
  });
  const desktopRelease = useLatestRelease({
    family: "desktop",
    channel: requestedChannel,
    releaseTag: isRequestedDesktop ? requestedReleaseTag || undefined : undefined,
  });

  const fallbackUrl = fallbackReleaseUrl;
  const desktopReleaseUrl = desktopRelease.releaseUrl || fallbackUrl;
  const androidReleaseUrl = androidRelease.releaseUrl || fallbackUrl;
  const desktopVersion = desktopRelease.version || requestedVersion || "";
  const androidVersion = androidRelease.version || requestedVersion || "";

  /* ── Build lists per platform ─────────────────────────── */
  const androidBuilds: { name: string; href: string }[] = [];
  if (androidRelease.downloads.android)
    androidBuilds.push({ name: "Download APK", href: androidRelease.downloads.android });

  const windowsBuilds: { name: string; href: string }[] = [];
  if (desktopRelease.downloads.windows?.cpu)
    windowsBuilds.push({ name: "CPU (default)", href: desktopRelease.downloads.windows.cpu });
  if (desktopRelease.downloads.windows?.cuda)
    windowsBuilds.push({ name: "NVIDIA (CUDA)", href: desktopRelease.downloads.windows.cuda });
  if (desktopRelease.downloads.windows?.vulkan)
    windowsBuilds.push({ name: "Vulkan (AMD/Intel)", href: desktopRelease.downloads.windows.vulkan });

  const linuxBuilds: { name: string; href: string }[] = [];
  if (desktopRelease.downloads.linux?.cpu)
    linuxBuilds.push({ name: "CPU (default)", href: desktopRelease.downloads.linux.cpu });
  if (desktopRelease.downloads.linux?.cuda)
    linuxBuilds.push({ name: "NVIDIA (CUDA)", href: desktopRelease.downloads.linux.cuda });
  if (desktopRelease.downloads.linux?.vulkan)
    linuxBuilds.push({ name: "Vulkan (AMD/Intel)", href: desktopRelease.downloads.linux.vulkan });

  const hasSplitMac = Boolean(
    desktopRelease.downloads.macos?.intelCpu ||
    desktopRelease.downloads.macos?.appleSiliconCpu,
  );

  const macBuilds: { name: string; href: string }[] = [];
  if (hasSplitMac) {
    if (desktopRelease.downloads.macos?.appleSiliconMetal)
      macBuilds.push({ name: "Apple Silicon — Metal", href: desktopRelease.downloads.macos.appleSiliconMetal });
    if (desktopRelease.downloads.macos?.appleSiliconCpu)
      macBuilds.push({ name: "Apple Silicon — CPU", href: desktopRelease.downloads.macos.appleSiliconCpu as string });
    if (desktopRelease.downloads.macos?.intelMetal)
      macBuilds.push({ name: "Intel — Metal", href: desktopRelease.downloads.macos.intelMetal as string });
    if (desktopRelease.downloads.macos?.intelCpu)
      macBuilds.push({ name: "Intel — CPU", href: desktopRelease.downloads.macos.intelCpu as string });
  } else {
    if (desktopRelease.downloads.macos?.metal)
      macBuilds.push({ name: "Metal", href: desktopRelease.downloads.macos.metal });
    if (desktopRelease.downloads.macos?.cpu)
      macBuilds.push({ name: "CPU", href: desktopRelease.downloads.macos.cpu });
  }

  const channelLabel = requestedChannel === "dev" ? "Dev" : "Stable";

  /* ── Help me choose state ─────────────────────────────── */
  const [helpOpen, setHelpOpen] = useState(false);
  const [helpOs, setHelpOs] = useState<"windows" | "linux" | null>(null);

  const platformCards = [
    {
      key: "android" as const,
      name: "Android",
      icon: FaAndroid,
      req: "Android 12+",
      version: androidVersion ? `v${androidVersion}` : "",
      builds: androidBuilds,
      releaseUrl: androidReleaseUrl,
      featured: requestedPlatform === "android",
    },
    {
      key: "macos" as const,
      name: "macOS",
      icon: FaApple,
      req: "macOS 13+",
      version: desktopVersion ? `v${desktopVersion}` : "",
      builds: macBuilds,
      releaseUrl: desktopReleaseUrl,
      featured: requestedPlatform === "macos",
    },
    {
      key: "windows" as const,
      name: "Windows",
      icon: FaWindows,
      req: "Windows 10, 11",
      version: desktopVersion ? `v${desktopVersion}` : "",
      builds: windowsBuilds,
      releaseUrl: desktopReleaseUrl,
      featured: requestedPlatform === "windows",
    },
    {
      key: "linux" as const,
      name: "Linux",
      icon: FaLinux,
      req: "64-bit",
      version: desktopVersion ? `v${desktopVersion}` : "",
      builds: linuxBuilds,
      releaseUrl: desktopReleaseUrl,
      featured: requestedPlatform === "linux",
    },
  ];

  // If a specific platform is requested, put it first
  const sortedCards = requestedPlatform
    ? [
        ...platformCards.filter((c) => c.key === requestedPlatform),
        ...platformCards.filter((c) => c.key !== requestedPlatform),
      ]
    : platformCards;

  return (
    <>
      <SEO
        title="Download"
        description="Download LettuceAI for Android, Windows, macOS, and Linux. Free, open source AI chat with long-term memory."
        path="/download"
        jsonLd={softwareSchema}
      />
      <main className="min-h-screen bg-[#050505] relative overflow-hidden">
        {/* Background atmosphere — gradient glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none z-0 rounded-full opacity-[0.07]"
          style={{
            background: "radial-gradient(ellipse at center, rgba(136,192,87,0.5) 0%, rgba(136,192,87,0.15) 35%, transparent 70%)",
          }}
        />
        {/* Dot grid */}
        <div
          className="absolute top-0 left-0 w-full h-[700px] pointer-events-none z-0 opacity-[0.5]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.25) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
            maskImage: "radial-gradient(ellipse 60% 50% at 50% 30%, black 0%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 30%, black 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-10 pt-28 sm:pt-36 pb-20">
          {/* ─── Hero ─── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 blur-3xl bg-primary/20 rounded-full scale-150" />
              <img
                src={images.logo}
                alt="LettuceAI"
                className="relative w-20 h-20 rounded-2xl"
              />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
              Download LettuceAI
            </h1>
            <p className="text-[15px] text-white/35">
              Available for Android, macOS, Windows, and Linux.
            </p>
            {(androidVersion || desktopVersion) && (
              <div className="flex items-center justify-center gap-3 mt-4">
                {desktopVersion && (
                  <span className="text-[12px] text-white/20">
                    Desktop {desktopVersion}
                  </span>
                )}
                {androidVersion && desktopVersion && (
                  <span className="text-white/10">·</span>
                )}
                {androidVersion && (
                  <span className="text-[12px] text-white/20">
                    Android {androidVersion}
                  </span>
                )}
                <span className="text-white/10">·</span>
                <span className="text-[12px] text-white/20">{channelLabel}</span>
              </div>
            )}
          </motion.div>

          {/* ─── In-app update banner ─── */}
          {isInAppUpdate && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="mb-8 rounded-xl border border-primary/20 bg-primary/[0.04] px-5 py-4 text-center"
            >
              <p className="text-[13px] text-white/60">
                {requestedVersion
                  ? `Update v${requestedVersion} is available. Download your platform below.`
                  : "A new update is available. Download your platform below."}
              </p>
            </motion.div>
          )}

          {/* ─── Platform cards ─── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {sortedCards.map((platform) => (
              <div
                key={platform.key}
                className={`flex flex-col items-center text-center rounded-xl border p-6 sm:p-8 transition-colors ${
                  platform.featured
                    ? "border-primary/25 bg-primary/[0.03]"
                    : platform.builds.length > 0
                      ? "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.10]"
                      : "border-white/[0.04] bg-white/[0.01] opacity-50"
                }`}
              >
                <platform.icon className="w-8 h-8 text-white/40 mb-4" />
                <h2 className="text-lg font-semibold text-white mb-0.5">
                  {platform.name}
                </h2>
                <p className="text-[12px] text-white/20 mb-5">{platform.req}</p>
                <div className="w-full">
                  {platform.builds.length > 0 ? (
                    <BuildDropdown
                      label={platform.builds.length === 1 ? platform.builds[0].name : "Download"}
                      builds={platform.builds}
                    />
                  ) : (
                    <a
                      href={platform.releaseUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 h-11 w-full rounded-lg border border-white/[0.08] text-[13px] font-medium text-white/30 hover:text-white/50 hover:border-white/[0.12] transition-colors"
                    >
                      View releases
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
                {platform.version && (
                  <p className="text-[11px] text-white/15 mt-3">{platform.version}</p>
                )}
              </div>
            ))}
          </motion.div>

          {/* ─── Value props ─── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[12px] text-white/25"
          >
            {[
              "No accounts required",
              "Bring your own API keys",
              "20+ AI providers",
              "Open source (AGPL-3.0)",
            ].map((text) => (
              <span key={text} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-primary/50" />
                {text}
              </span>
            ))}
          </motion.div>

          {/* ─── GPU build help ─── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-10"
          >
            <button
              type="button"
              onClick={() => setHelpOpen(!helpOpen)}
              className="w-full flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.015] px-5 py-4 hover:border-white/[0.10] transition-colors"
            >
              <span className="text-[14px] font-medium text-white/60">
                Which build should I download?
              </span>
              <ChevronDown className={`w-4 h-4 text-white/20 transition-transform ${helpOpen ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {helpOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 space-y-5">
                    {/* Explainer cards */}
                    <div className="grid gap-3 sm:grid-cols-3">
                      {[
                        {
                          title: "CPU",
                          desc: "Works everywhere. Use this if you only connect to remote AI providers.",
                        },
                        {
                          title: "NVIDIA (CUDA)",
                          desc: "For NVIDIA GPUs on Windows/Linux. Requires CUDA installed.",
                        },
                        {
                          title: "Vulkan",
                          desc: "For AMD or Intel GPUs on Windows/Linux. Also works as a fallback.",
                        },
                      ].map((item) => (
                        <div
                          key={item.title}
                          className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4"
                        >
                          <h4 className="text-[13px] font-medium text-white/70 mb-1">{item.title}</h4>
                          <p className="text-[12px] text-white/25 leading-relaxed">{item.desc}</p>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
                      <h4 className="text-[13px] font-medium text-white/70 mb-1">macOS — Metal</h4>
                      <p className="text-[12px] text-white/25 leading-relaxed">
                        Use Metal on Apple Silicon (M1/M2/M3+) for GPU-accelerated local inference. Intel Macs should start with the CPU build.
                      </p>
                    </div>

                    {/* GPU detection */}
                    <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
                      <h4 className="text-[13px] font-medium text-white/70 mb-2">
                        Not sure what GPU you have?
                      </h4>
                      <p className="text-[12px] text-white/25 mb-3">
                        Run this command to check:
                      </p>
                      <div className="flex gap-2 mb-3">
                        <button
                          type="button"
                          onClick={() => setHelpOs("linux")}
                          className={`text-[11px] px-2.5 py-1 rounded-md border transition-colors ${
                            helpOs === "linux"
                              ? "border-primary/30 bg-primary/[0.06] text-primary/80"
                              : "border-white/[0.06] text-white/30 hover:text-white/50"
                          }`}
                        >
                          Linux
                        </button>
                        <button
                          type="button"
                          onClick={() => setHelpOs("windows")}
                          className={`text-[11px] px-2.5 py-1 rounded-md border transition-colors ${
                            helpOs === "windows"
                              ? "border-primary/30 bg-primary/[0.06] text-primary/80"
                              : "border-white/[0.06] text-white/30 hover:text-white/50"
                          }`}
                        >
                          Windows
                        </button>
                      </div>
                      <AnimatePresence mode="wait">
                        {helpOs === "linux" && (
                          <motion.div key="linux" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.12 }}>
                            <CopyBlock label="Terminal" code={linuxGpuCheckCommand} />
                          </motion.div>
                        )}
                        {helpOs === "windows" && (
                          <motion.div key="win" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.12 }}>
                            <CopyBlock label="PowerShell" code={windowsGpuCheckCommand} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ─── System requirements ─── */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-14 border-t border-white/[0.06] pt-10"
          >
            <h3 className="text-[13px] font-semibold text-white/40 mb-5">
              System Requirements
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { name: "Android", os: "Android 12+", storage: "2 GB", notes: "APK" },
                { name: "macOS", os: "macOS 13+", storage: "2 GB", notes: hasSplitMac ? "Intel / Apple Silicon .dmg" : ".dmg" },
                { name: "Windows", os: "Windows 10/11", storage: "2 GB", notes: ".zip" },
                { name: "Linux", os: "64-bit", storage: "2 GB", notes: ".zip" },
              ].map((req) => (
                <div key={req.name}>
                  <p className="text-[13px] font-medium text-white/60 mb-1">{req.name}</p>
                  <p className="text-[12px] text-white/25">{req.os}</p>
                  <p className="text-[12px] text-white/25">{req.storage} free</p>
                  <p className="text-[12px] text-white/20">{req.notes}</p>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-white/15 mt-5">
              Local LLM usage requires additional RAM, storage, and a compatible GPU.
            </p>
          </motion.div>

          {/* ─── GitHub link ─── */}
          <div className="mt-10 text-center">
            <a
              href="https://github.com/LettuceAI/app/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[12px] text-white/20 hover:text-white/40 transition-colors"
            >
              View all releases on GitHub
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
