import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  ArrowDown,
  CheckCircle,
  Download,
  ExternalLink,
  Laptop,
  Monitor,
  Smartphone,
  Terminal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar, Footer } from "@/components/landing";

const linuxGpuCheckCommand =
  "lspci | grep -iE 'vga|3d|display' | sed 's/.*: //' | awk '{if(/NVIDIA|GeForce|Quadro|RTX|GTX/){print \"Nvidia \"$0; d=1} else if(/AMD|ATI|Radeon/){print \"AMD \"$0; d=1}} END{if(!d) print \"no GPU (integrated only)\"}'";

const windowsGpuCheckCommand =
  'Get-WmiObject Win32_VideoController | ForEach-Object { $n = $_.Name; if($n -match \'NVIDIA|GeForce|RTX|GTX|Quadro\'){$script:d=1; "Nvidia $n"} elseif($n -match \'AMD|Radeon|ATI\'){$script:d=1; "AMD $n"} }; if(!$d){"no GPU (integrated only)"}';

type PlatformButton = {
  label: string;
  href: string;
  variant?: "default" | "outline";
};

type Platform = {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  status: "available" | "coming-soon";
  badge: string;
  badgeClassName?: string;
  version: string;
  description: string;
  note?: string;
  noteHref?: string;
  actions: PlatformButton[];
  githubUrl: string;
};

type Recommendation = {
  title: string;
  description: string;
  action?: PlatformButton;
  warning?: boolean;
} | null;

type ChoiceCardProps = {
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
};

type CopyCodeBlockProps = {
  label: string;
  code: string;
};

function ChoiceCard({
  title,
  description,
  selected,
  onClick,
}: ChoiceCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-lg border px-4 py-4 text-left transition-colors ${
        selected
          ? "border-green-500/40 bg-zinc-900"
          : "border-border/40 bg-zinc-950/40 hover:border-border/70 hover:bg-zinc-950/70"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-medium text-white">{title}</div>
          <div className="mt-1 text-sm text-muted-foreground">
            {description}
          </div>
        </div>
        {selected ? (
          <span className="rounded-md bg-green-500/15 px-2 py-1 text-[11px] font-medium text-green-300">
            Selected
          </span>
        ) : null}
      </div>
    </button>
  );
}

function CopyCodeBlock({ label, code }: CopyCodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="mt-4">
      <div className="mt-2 rounded-md border border-border/40 bg-black/30">
        <div className="flex items-center justify-between border-b border-border/40 px-2 py-2">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
            {label}
          </p>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleCopy}
          >
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>
        <pre className="overflow-x-auto whitespace-pre-wrap break-words p-3 text-xs text-zinc-200">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

export function DownloadPage() {
  const [devicePlatform, setDevicePlatform] = useState<
    "android" | "desktop" | null
  >(null);
  const [desktopOs, setDesktopOs] = useState<
    "linux" | "windows" | "macos" | null
  >(null);
  const [wantsLocalLlm, setWantsLocalLlm] = useState<"yes" | "no" | null>(null);
  const [hardwareType, setHardwareType] = useState<
    "cpu" | "amd" | "nvidia" | "unknown" | null
  >(null);
  const [macChip, setMacChip] = useState<"intel" | "apple-silicon" | null>(
    null,
  );

  const platforms: Platform[] = [
    {
      name: "Android",
      icon: Smartphone,
      status: "available",
      badge: "Release",
      version: "Android 1.3.1",
      description: "Download the APK directly from our GitHub releases.",
      actions: [
        {
          label: "APK",
          href: "https://github.com/LettuceAI/app/releases/download/android-release-1.3.1/android-universal-release.apk",
        },
      ],
      githubUrl: "https://github.com/LettuceAI/app/releases",
    },
    {
      name: "Windows",
      icon: Monitor,
      status: "available",
      badge: "Release",
      version: "1.0.1",
      description:
        "Pick the runtime that matches your machine. Windows downloads are provided as .exe installers.",
      note: "NVIDIA build requires CUDA to already be installed.",
      noteHref: "https://developer.nvidia.com/cuda-downloads",
      actions: [
        {
          label: "CPU",
          href: "https://github.com/LettuceAI/app/releases/download/desktop-release-1.0.1/windows-cpu.zip",
        },
        {
          label: "NVIDIA",
          href: "https://github.com/LettuceAI/app/releases/download/desktop-release-1.0.1/windows-cuda.zip",
          variant: "outline",
        },
        {
          label: "Vulkan",
          href: "https://github.com/LettuceAI/app/releases/download/desktop-release-1.0.1/windows-vulkan.zip",
          variant: "outline",
        },
      ],
      githubUrl: "https://github.com/LettuceAI/app/releases",
    },
    {
      name: "Linux",
      icon: Terminal,
      status: "available",
      badge: "Release",
      version: "1.0.1",
      description:
        "Choose the runtime that matches your machine. Linux downloads are provided as .deb packages.",
      actions: [
        {
          label: "CPU",
          href: "https://github.com/LettuceAI/app/releases/download/desktop-release-1.0.1/linux-cpu.zip",
        },
        {
          label: "NVIDIA",
          href: "https://github.com/LettuceAI/app/releases/download/desktop-release-1.0.1/linux-cuda.zip",
          variant: "outline",
        },
        {
          label: "Vulkan",
          href: "https://github.com/LettuceAI/app/releases/download/desktop-release-1.0.1/linux-vulkan.zip",
          variant: "outline",
        },
      ],
      githubUrl: "https://github.com/LettuceAI/app/releases",
    },
    {
      name: "macOS",
      icon: Laptop,
      status: "available",
      badge: "EXPERIMENTAL",
      badgeClassName: "bg-red-500/20 text-red-400",
      version: "1.0.1",
      description:
        "Download the standard CPU build or the Metal build for Apple Silicon. macOS downloads are provided as .dmg installers.",
      note: "Requires macOS 13 or higher.",
      actions: [
        {
          label: "CPU",
          href: "https://github.com/LettuceAI/app/releases/download/desktop-release-1.0.1/macos-cpu.dmg",
        },
        {
          label: "Metal",
          href: "https://github.com/LettuceAI/app/releases/download/desktop-release-1.0.1/macos-metal.dmg",
          variant: "outline",
        },
      ],
      githubUrl: "https://github.com/LettuceAI/app/releases",
    },
  ];

  const systemRequirements = [
    {
      name: "Android",
      os: "Android 12 or higher",
      ram: "2GB minimum for basic remote-provider use, 4GB recommended",
      storage: "2 GB free storage",
      notes: "APK install",
    },
    {
      name: "Windows",
      os: "Windows 10/11",
      ram: "2GB minimum for basic remote-provider use, 4GB recommended",
      storage: "2 GB free storage",
      notes: "CUDA required for NVIDIA build",
    },
    {
      name: "Linux",
      os: "Modern 64-bit distribution",
      ram: "2GB minimum for basic remote-provider use, 4GB recommended",
      storage: "2 GB free storage",
      notes: ".deb package",
    },
    {
      name: "macOS",
      os: "macOS 13 or higher",
      ram: "2GB minimum for basic remote-provider use, 4GB recommended",
      storage: "2 GB free storage",
      notes: "Apple Silicon recommended for Metal",
    },
  ];

  const getPlatform = (name: Platform["name"]) =>
    platforms.find((platform) => platform.name === name);

  const getAction = (platformName: Platform["name"], label: string) =>
    getPlatform(platformName)?.actions.find((action) => action.label === label);

  const resetChooser = () => {
    setDevicePlatform(null);
    setDesktopOs(null);
    setWantsLocalLlm(null);
    setHardwareType(null);
    setMacChip(null);
  };

  const setPlatformChoice = (value: "android" | "desktop") => {
    setDevicePlatform(value);
    setDesktopOs(null);
    setWantsLocalLlm(null);
    setHardwareType(null);
    setMacChip(null);
  };

  const setDesktopOsChoice = (value: "linux" | "windows" | "macos") => {
    setDesktopOs(value);
    setWantsLocalLlm(null);
    setHardwareType(null);
    setMacChip(null);
  };

  const setLocalLlmChoice = (value: "yes" | "no") => {
    setWantsLocalLlm(value);
    setHardwareType(null);
    setMacChip(null);
  };

  const goToStep = (step: "platform" | "os" | "local" | "hardware") => {
    if (step === "platform") {
      resetChooser();
      return;
    }

    if (step === "os" && devicePlatform === "desktop") {
      setDesktopOs(null);
      setWantsLocalLlm(null);
      setHardwareType(null);
      setMacChip(null);
      return;
    }

    if (step === "local" && devicePlatform === "desktop" && desktopOs) {
      setWantsLocalLlm(null);
      setHardwareType(null);
      setMacChip(null);
      return;
    }

    if (
      step === "hardware" &&
      devicePlatform === "desktop" &&
      desktopOs &&
      wantsLocalLlm === "yes"
    ) {
      setHardwareType(null);
      setMacChip(null);
    }
  };

  const stepState = {
    platform:
      devicePlatform === null
        ? "active"
        : ("complete" as "active" | "complete"),
    os:
      devicePlatform !== "desktop"
        ? "pending"
        : desktopOs === null
          ? "active"
          : "complete",
    local:
      devicePlatform !== "desktop" || desktopOs === null
        ? "pending"
        : wantsLocalLlm === null
          ? "active"
          : "complete",
    hardware:
      devicePlatform !== "desktop" || wantsLocalLlm !== "yes"
        ? "pending"
        : desktopOs === "macos"
          ? macChip === null
            ? "active"
            : "complete"
          : hardwareType === null
            ? "active"
            : "complete",
  } as const;

  const activeQuestion = (() => {
    if (devicePlatform === null) return "platform";
    if (devicePlatform === "desktop" && desktopOs === null) return "os";
    if (devicePlatform === "desktop" && wantsLocalLlm === null) return "local";
    if (
      devicePlatform === "desktop" &&
      wantsLocalLlm === "yes" &&
      (desktopOs === "windows" || desktopOs === "linux") &&
      (hardwareType === null || hardwareType === "unknown")
    ) {
      return "hardware";
    }
    if (
      devicePlatform === "desktop" &&
      desktopOs === "macos" &&
      wantsLocalLlm === "yes" &&
      macChip === null
    ) {
      return "hardware";
    }
    return null;
  })();

  const recommendation: Recommendation = (() => {
    if (devicePlatform === "android") {
      return {
        title: "You should install Android.",
        description: "This is the direct APK build for Android devices.",
        action: getAction("Android", "APK"),
      };
    }

    if (devicePlatform !== "desktop" || !desktopOs) {
      return null;
    }

    if (wantsLocalLlm === "no") {
      if (desktopOs === "windows") {
        return {
          title: "You should install the Windows CPU build.",
          description:
            "If you are not running local LLMs, the CPU build is the right default.",
          action: getAction("Windows", "CPU"),
        };
      }

      if (desktopOs === "linux") {
        return {
          title: "You should install the Linux CPU build.",
          description:
            "If you are not running local LLMs, the CPU build is the right default.",
          action: getAction("Linux", "CPU"),
        };
      }

      return {
        title: "You should install the macOS CPU build.",
        description:
          "If you are not running local LLMs, the CPU build is the right default.",
        action: getAction("macOS", "CPU"),
      };
    }

    if (wantsLocalLlm !== "yes") {
      return null;
    }

    if (desktopOs === "windows") {
      if (hardwareType === "cpu") {
        return {
          title: "You should install the Windows CPU build.",
          description:
            "Running local llm on cpu is not really recommended, but this is the correct build if you have no GPU.",
          action: getAction("Windows", "CPU"),
          warning: true,
        };
      }

      if (hardwareType === "amd") {
        return {
          title: "You should install the Windows Vulkan build.",
          description: "Use Vulkan on Windows if you have an AMD or Intel GPU.",
          action: getAction("Windows", "Vulkan"),
        };
      }

      if (hardwareType === "nvidia") {
        return {
          title: "You should install the Windows NVIDIA build.",
          description:
            "This is the right build for NVIDIA GPUs on Windows. Make sure CUDA is already installed on your device before using it.",
          action: getAction("Windows", "NVIDIA"),
        };
      }
    }

    if (desktopOs === "linux") {
      if (hardwareType === "cpu") {
        return {
          title: "You should install the Linux CPU build.",
          description:
            "Running local llm on cpu is not really recommended, but this is the correct build if you have no GPU.",
          action: getAction("Linux", "CPU"),
          warning: true,
        };
      }

      if (hardwareType === "amd") {
        return {
          title: "You should install the Linux Vulkan build.",
          description: "Use Vulkan on Linux if you have an AMD or Intel GPU.",
          action: getAction("Linux", "Vulkan"),
        };
      }

      if (hardwareType === "nvidia") {
        return {
          title: "You should install the Linux NVIDIA build.",
          description: "This is the right build for NVIDIA GPUs on Linux.",
          action: getAction("Linux", "NVIDIA"),
        };
      }
    }

    if (desktopOs === "macos") {
      if (macChip === "apple-silicon") {
        return {
          title: "You should install the macOS Metal build.",
          description:
            "Metal is the right choice for Apple Silicon Macs and MacBooks.",
          action: getAction("macOS", "Metal"),
        };
      }

      if (macChip === "intel") {
        return {
          title: "You should install the macOS CPU build.",
          description:
            "Intel-based Macs should use the CPU build instead of Metal.",
          action: getAction("macOS", "CPU"),
        };
      }
    }

    return null;
  })();

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Download className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">
                Download LettuceAI
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Get LettuceAI for your device
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Take your AI companion everywhere. Available on Android, Windows,
              Linux, and macOS.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex justify-center mb-10"
          >
            <Button asChild variant="outline" className="gap-2">
              <a href="#which-download">
                Which one i should download?
                <ArrowDown className="w-4 h-4" />
              </a>
            </Button>
          </motion.div>

          <div id="downloads" className="grid gap-6">
            {platforms.map((platform, index) => (
              <motion.div
                key={platform.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative rounded-2xl border p-6 ${
                  platform.status === "available"
                    ? "bg-zinc-900/50 border-primary/30"
                    : "bg-zinc-900/30 border-border/30"
                }`}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div
                    className={`h-14 w-14 shrink-0 rounded-xl flex items-center justify-center ${
                      platform.status === "available"
                        ? "bg-primary/10 border border-primary/30"
                        : "bg-zinc-800 border border-border/30"
                    }`}
                  >
                    <platform.icon
                      className={`h-7 w-7 ${
                        platform.status === "available"
                          ? "text-primary"
                          : "text-muted-foreground"
                      }`}
                    />
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-xl font-semibold text-white">
                        {platform.name}
                      </h3>
                      {platform.status === "available" ? (
                        <span
                          className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
                            platform.badgeClassName ??
                            "bg-green-500/20 text-green-400"
                          }`}
                        >
                          <CheckCircle className="w-3 h-3" />
                          {platform.badge}
                        </span>
                      ) : (
                        <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs font-medium text-muted-foreground">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground">
                      {platform.description}
                    </p>
                    {platform.status === "available" && (
                      <p className="mt-1 text-xs text-muted-foreground/70">
                        {platform.version}
                      </p>
                    )}
                    {platform.note && (
                      <p className="mt-2 text-xs text-amber-300/90">
                        {platform.note}
                        {platform.noteHref && (
                          <>
                            {" "}
                            <a
                              href={platform.noteHref}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="underline underline-offset-2 hover:text-amber-200"
                            >
                              Download CUDA
                            </a>
                          </>
                        )}
                      </p>
                    )}
                  </div>

                  <div className="shrink-0 flex items-center gap-2 flex-wrap">
                    {platform.status === "available" && (
                      <>
                        {platform.actions.map((action, actionIndex) => (
                          <Button
                            key={`${platform.name}-${action.label}`}
                            asChild
                            variant={
                              action.variant ??
                              (actionIndex === 0 ? "default" : "outline")
                            }
                            className="gap-2"
                          >
                            <a href={action.href}>
                              <Download className="w-4 h-4" />
                              {action.label}
                            </a>
                          </Button>
                        ))}
                        <Button asChild variant="outline" size="icon">
                          <a
                            href={platform.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.section
            id="which-download"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="scroll-mt-28 mt-12 rounded-xl border border-border/40 bg-zinc-900/30 p-6"
          >
            <div className="flex flex-col gap-4 border-b border-border/40 pb-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Which one i should download?
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  A quick chooser for the right build.
                </p>
              </div>
              {devicePlatform && (
                <Button type="button" variant="outline" onClick={resetChooser}>
                  Reset
                </Button>
              )}
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              {[
                {
                  label: "Platform",
                  value:
                    devicePlatform === "android"
                      ? "Android"
                      : devicePlatform === "desktop"
                        ? "Desktop"
                        : null,
                  state: stepState.platform,
                },
                {
                  label: "Desktop OS",
                  value:
                    desktopOs === "linux"
                      ? "Linux"
                      : desktopOs === "windows"
                        ? "Windows"
                        : desktopOs === "macos"
                          ? "macOS"
                          : null,
                  state: stepState.os,
                },
                {
                  label: "Local LLMs",
                  value:
                    wantsLocalLlm === "yes"
                      ? "Yes"
                      : wantsLocalLlm === "no"
                        ? "No"
                        : null,
                  state: stepState.local,
                },
                {
                  label: desktopOs === "macos" ? "Mac chip" : "Hardware",
                  value:
                    desktopOs === "macos"
                      ? macChip === "intel"
                        ? "Intel"
                        : macChip === "apple-silicon"
                          ? "Apple Silicon"
                          : null
                      : hardwareType === "cpu"
                        ? "CPU only"
                        : hardwareType === "amd"
                          ? "AMD GPU"
                          : hardwareType === "nvidia"
                            ? "NVIDIA GPU"
                            : hardwareType === "unknown"
                              ? "GPU unknown"
                              : null,
                  state: stepState.hardware,
                },
              ].map((step, index) => (
                <button
                  key={step.label}
                  type="button"
                  onClick={() =>
                    goToStep(
                      index === 0
                        ? "platform"
                        : index === 1
                          ? "os"
                          : index === 2
                            ? "local"
                            : "hardware",
                    )
                  }
                  disabled={
                    (index === 1 && devicePlatform !== "desktop") ||
                    (index === 2 &&
                      !(devicePlatform === "desktop" && desktopOs)) ||
                    (index === 3 &&
                      !(
                        devicePlatform === "desktop" &&
                        desktopOs &&
                        wantsLocalLlm === "yes"
                      ))
                  }
                  className={`inline-flex items-center gap-2 rounded-md border px-3 py-2 text-sm ${
                    step.state === "complete"
                      ? "border-green-500/30 bg-green-500/10 text-green-300"
                      : step.state === "active"
                        ? "border-primary/30 bg-primary/10 text-white"
                        : "border-border/40 bg-zinc-950/40 text-zinc-500"
                  }`}
                >
                  <span className="text-xs">{index + 1}</span>
                  <span>
                    {step.state === "complete" && step.value
                      ? `${step.label}: ${step.value}`
                      : step.label}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-6 max-w-3xl">
              <AnimatePresence mode="wait" initial={false}>
                {activeQuestion === "platform" && (
                  <motion.div
                    key="platform"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.18 }}
                    className="rounded-lg border border-border/40 bg-zinc-950/45 p-5"
                  >
                    <p className="text-sm font-medium text-white">
                      Which platform are you on?
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Start with the device you want to install LettuceAI on.
                    </p>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <ChoiceCard
                        title="Android"
                        description="Install the Android APK build."
                        selected={devicePlatform === "android"}
                        onClick={() => setPlatformChoice("android")}
                      />
                      <ChoiceCard
                        title="Desktop"
                        description="Choose Windows, Linux, or macOS."
                        selected={devicePlatform === "desktop"}
                        onClick={() => setPlatformChoice("desktop")}
                      />
                    </div>
                  </motion.div>
                )}

                {activeQuestion === "os" && (
                  <motion.div
                    key="os"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.18 }}
                    className="rounded-lg border border-border/40 bg-zinc-950/45 p-5"
                  >
                    <p className="text-sm font-medium text-white">
                      Which OS are you on?
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Choose the operating system for your desktop install.
                    </p>
                    <div className="mt-5 grid gap-3 sm:grid-cols-3">
                      <ChoiceCard
                        title="Linux"
                        description="Use the Linux release builds."
                        selected={desktopOs === "linux"}
                        onClick={() => setDesktopOsChoice("linux")}
                      />
                      <ChoiceCard
                        title="Windows"
                        description="Use the Windows release builds."
                        selected={desktopOs === "windows"}
                        onClick={() => setDesktopOsChoice("windows")}
                      />
                      <ChoiceCard
                        title="MacOS"
                        description="For Macbook and Mac desktop systems."
                        selected={desktopOs === "macos"}
                        onClick={() => setDesktopOsChoice("macos")}
                      />
                    </div>
                  </motion.div>
                )}

                {activeQuestion === "local" && (
                  <motion.div
                    key="local"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.18 }}
                    className="rounded-lg border border-border/40 bg-zinc-950/45 p-5"
                  >
                    <p className="text-sm font-medium text-white">
                      Do you want to run Local LLMs?
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      If not, the CPU build is the safest recommendation.
                    </p>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <ChoiceCard
                        title="Yes"
                        description="I want a build for local model usage."
                        selected={wantsLocalLlm === "yes"}
                        onClick={() => setLocalLlmChoice("yes")}
                      />
                      <ChoiceCard
                        title="No"
                        description="I only need the standard app build."
                        selected={wantsLocalLlm === "no"}
                        onClick={() => setLocalLlmChoice("no")}
                      />
                    </div>
                  </motion.div>
                )}

                {activeQuestion === "hardware" &&
                  (desktopOs === "windows" || desktopOs === "linux") && (
                    <motion.div
                      key="hardware"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.18 }}
                      className="rounded-lg border border-border/40 bg-zinc-950/45 p-5"
                    >
                      <p className="text-sm font-medium text-white">
                        What hardware you have?
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        This decides whether you should use CPU, NVIDIA, or
                        Vulkan.
                      </p>
                      <div className="mt-5 grid gap-3 sm:grid-cols-2">
                        <ChoiceCard
                          title="CPU (no gpu)"
                          description="Use this only if you do not have a usable GPU."
                          selected={hardwareType === "cpu"}
                          onClick={() => setHardwareType("cpu")}
                        />
                        <ChoiceCard
                          title="Amd GPU"
                          description="This will recommend the Vulkan build."
                          selected={hardwareType === "amd"}
                          onClick={() => setHardwareType("amd")}
                        />
                        <ChoiceCard
                          title="Nvidia GPU"
                          description="This will recommend the NVIDIA build."
                          selected={hardwareType === "nvidia"}
                          onClick={() => setHardwareType("nvidia")}
                        />
                        <ChoiceCard
                          title="I dont know"
                          description="Start safe and check your GPU if needed."
                          selected={hardwareType === "unknown"}
                          onClick={() => setHardwareType("unknown")}
                        />
                      </div>

                      <AnimatePresence>
                        {hardwareType === "unknown" && (
                          <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.16 }}
                            className="mt-4 rounded-lg border border-border/40 bg-zinc-950/70 p-4"
                          >
                            <p className="text-sm font-medium text-white">
                              How to check your GPU
                            </p>
                            <p className="mt-2 text-sm text-muted-foreground">
                              Run this command and check whether it prints
                              NVIDIA, AMD, or only integrated graphics.
                            </p>

                            {desktopOs === "linux" && (
                              <CopyCodeBlock
                                label="Linux"
                                code={linuxGpuCheckCommand}
                              />
                            )}

                            {desktopOs === "windows" && (
                              <CopyCodeBlock
                                label="PowerShell"
                                code={windowsGpuCheckCommand}
                              />
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}

                {activeQuestion === "hardware" && desktopOs === "macos" && (
                  <motion.div
                    key="mac-chip"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.18 }}
                    className="rounded-lg border border-border/40 bg-zinc-950/45 p-5"
                  >
                    <p className="text-sm font-medium text-white">
                      Are you on Intel based Mac/Macbook or Apple Silicon?
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Apple Silicon should use Metal. Intel Macs should stay on
                      CPU.
                    </p>
                    <div className="mt-5 grid gap-3 sm:grid-cols-2">
                      <ChoiceCard
                        title="Intel"
                        description="Use the CPU build."
                        selected={macChip === "intel"}
                        onClick={() => setMacChip("intel")}
                      />
                      <ChoiceCard
                        title="Apple Silicon"
                        description="Use the Metal build."
                        selected={macChip === "apple-silicon"}
                        onClick={() => setMacChip("apple-silicon")}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <AnimatePresence>
                {recommendation && recommendation.action && (
                  <motion.div
                    key="recommendation"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className={`mt-5 rounded-lg border p-5 ${
                      recommendation.warning
                        ? "border-red-500/30 bg-red-500/10"
                        : "border-green-500/30 bg-green-500/10"
                    }`}
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <div
                          className={`inline-flex rounded-md px-2.5 py-1 text-xs font-medium ${
                            recommendation.warning
                              ? "bg-red-500/15 text-red-300"
                              : "bg-green-500/15 text-green-300"
                          }`}
                        >
                          {recommendation.warning
                            ? "Works, but not ideal"
                            : "Recommended build"}
                        </div>
                        <p className="mt-3 text-base font-semibold text-white">
                          {recommendation.title}
                        </p>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {recommendation.description}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button asChild className="gap-2">
                          <a href={recommendation.action.href}>
                            <Download className="w-4 h-4" />
                            Download {recommendation.action.label}
                          </a>
                        </Button>
                        <Button asChild variant="outline">
                          <a href="#downloads">See all downloads</a>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-12 p-6 rounded-xl bg-zinc-900/30 border border-border/30"
          >
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white">
                What do Vulkan, Metal, and NVIDIA mean?
              </h3>
              <p className="text-sm text-muted-foreground mt-2">
                These names describe which GPU backend the desktop build is made
                for.
              </p>
            </div>

            <div className="grid gap-4 text-sm sm:grid-cols-3">
              {[
                {
                  title: "NVIDIA",
                  body: "Use this on Windows or Linux if your machine has an NVIDIA GPU.",
                },
                {
                  title: "Vulkan",
                  body: "Use this on Windows or Linux for AMD GPUs and most Intel GPU setups.",
                },
                {
                  title: "Metal",
                  body: "Use this on Apple Silicon Macs for the accelerated macOS build.",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.28, delay: index * 0.06 }}
                  className="rounded-lg border border-border/40 bg-zinc-950/40 p-4"
                >
                  <h4 className="mb-2 font-medium text-white">{item.title}</h4>
                  <p className="text-muted-foreground">{item.body}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 overflow-hidden rounded-xl border border-border/30 bg-zinc-900/30"
          >
            <div className="border-b border-border/30 px-6 py-5">
              <h3 className="text-lg font-semibold text-white">
                System Requirements
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Baseline specs for the standard CPU builds.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-zinc-950/50 text-xs uppercase tracking-wide text-zinc-500">
                  <tr>
                    <th className="px-6 py-3 font-medium">Platform</th>
                    <th className="px-6 py-3 font-medium">OS</th>
                    <th className="px-6 py-3 font-medium">RAM</th>
                    <th className="px-6 py-3 font-medium">Storage</th>
                    <th className="px-6 py-3 font-medium">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {systemRequirements.map((platform) => (
                    <tr
                      key={platform.name}
                      className="border-t border-border/25 align-top"
                    >
                      <td className="px-6 py-4 font-medium text-white">
                        {platform.name}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {platform.os}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {platform.ram}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {platform.storage}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {platform.notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border-t border-border/30 px-6 py-4 text-sm text-muted-foreground">
              If you plan to run local LLMs, expect to need more RAM, storage,
              and in most cases a compatible GPU runtime.
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
