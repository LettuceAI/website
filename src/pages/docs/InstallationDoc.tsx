import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Callout } from "@/components/docs/Callout";
import { DocHeading } from "@/components/docs/DocHeading";
import { SEO } from "@/components/common/SEO";
import { buildBreadcrumbSchema } from "@/config/schemas";

export function InstallationDoc() {
  return (
    <>
      <SEO
        title="Installation"
        description="Install LettuceAI on Android or build it from source for desktop and mobile platforms."
        path="/docs/installation"
        jsonLd={buildBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Docs", path: "/docs" },
          { name: "Installation", path: "/docs/installation" },
        ])}
      />
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="prose prose-invert max-w-none"
      >
        <DocHeading level={1}>Installation</DocHeading>

        <p className="lead">
          Install LettuceAI on Android, or build it yourself for desktop and mobile
          development.
        </p>

        <DocHeading level={2}>Android App</DocHeading>
        <p>
          The Android app is distributed as a standalone APK. Download the latest
          release from the{" "}
          <Link to="/download" className="text-primary hover:underline">
            downloads page
          </Link>{" "}
          or from GitHub Releases.
        </p>

        <ol>
          <li>Download the APK file to your Android device</li>
          <li>Open the APK file</li>
          <li>Allow installation from unknown sources if Android prompts you</li>
          <li>Finish installation and launch LettuceAI</li>
        </ol>

        <Callout type="info" title="Requirements">
          Android 12 or higher is required. Keep a few gigabytes of free storage
          available for app data, models, and generated assets.
        </Callout>

        <DocHeading level={2}>Desktop Builds</DocHeading>
        <p>
          LettuceAI also runs on Windows, macOS, and Linux, but desktop usage is
          currently source-first rather than installer-first. If you want desktop
          builds today, clone the repository and run the Tauri app locally.
        </p>

        <DocHeading level={2}>Build from Source</DocHeading>
        <p>
          The project uses Bun, Tauri v2, React, and Rust. Most contributors should
          follow the wrapper commands in the repository instead of invoking raw Tauri
          commands directly.
        </p>

        <DocHeading level={3}>Prerequisites</DocHeading>
        <ul>
          <li>Bun 1.1+ </li>
          <li>Rust and Cargo</li>
          <li>Android Studio with SDK, platform-tools, command-line tools, and NDK for Android work</li>
          <li>Xcode for iOS work on macOS</li>
        </ul>

        <DocHeading level={3}>Clone and Install</DocHeading>
        <div className="not-prose">
          <CodeBlock language="bash">{`git clone https://github.com/LettuceAI/mobile-app.git
cd mobile-app
bun install`}</CodeBlock>
        </div>

        <DocHeading level={3}>Common Commands</DocHeading>
        <div className="not-prose">
          <CodeBlock language="bash">{`# Frontend only
bun run dev
bun run build

# Desktop
bun run tauri dev
bun run tauri build

# Linux / Wayland fallback if WebKit is unstable
bun run tauri:dev:webkit-safe
bun run tauri:build:webkit-safe

# NVIDIA CUDA desktop flow
bun run tauri:dev:cuda:auto
bun run tauri:build:cuda:auto

# Android
bun run tauri:android:init
bun run tauri:android:dev
bun run tauri:android:build

# iOS (macOS only)
bun run tauri:ios:init
bun run tauri:ios:dev:ready
bun run tauri:ios:build:ready

# Checks
bun run check`}</CodeBlock>
        </div>

        <Callout type="info" title="Windows Contributors">
          If you prefer native Windows entry points, the repo also includes helper
          wrappers under <code>scripts/windows/</code> in both <code>.cmd</code> and
          PowerShell formats.
        </Callout>

        <DocHeading level={3}>Android Setup</DocHeading>
        <p>
          For Android development, set your SDK and NDK environment variables in your
          shell startup files and make sure both interactive shells and build shells
          resolve the same paths.
        </p>

        <div className="not-prose">
          <CodeBlock language="bash">{`export ANDROID_SDK_ROOT="$HOME/Android/Sdk"
export ANDROID_HOME="$ANDROID_SDK_ROOT"
export ANDROID_NDK_HOME="$ANDROID_SDK_ROOT/ndk/<your-installed-ndk>"
export NDK_HOME="$ANDROID_NDK_HOME"
export PATH="$ANDROID_SDK_ROOT/platform-tools:$ANDROID_SDK_ROOT/emulator:$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$PATH"

bash -lc 'echo ANDROID_HOME=$ANDROID_HOME; echo ANDROID_SDK_ROOT=$ANDROID_SDK_ROOT; echo ANDROID_NDK_HOME=$ANDROID_NDK_HOME; echo NDK_HOME=$NDK_HOME'`}</CodeBlock>
        </div>

        <Callout type="info" title="Android eSpeak Bundle">
          Android builds automatically download the default Kokoro eSpeak bundle from
          the project release if you do not provide your own
          <code> KOKORO_ESPEAK_ANDROID_BUNDLE_PATH </code>
          or <code>KOKORO_ESPEAK_ANDROID_BUNDLE_URL</code>.
        </Callout>

        <DocHeading level={3}>Notes</DocHeading>
        <ul>
          <li>Use the wrapper commands in the repo where possible; they encode platform-specific fixes and setup.</li>
          <li>If you are on Linux and hit Wayland or WebKit issues, try the <code>webkit-safe</code> commands.</li>
          <li>If Android Rust builds fail in <code>whisper-rs-sys</code>, check your NDK and CMake setup first.</li>
        </ul>
      </motion.article>
    </>
  );
}
