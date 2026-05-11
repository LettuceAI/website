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
        description="Install LettuceAI on Android, Arch Linux, Debian and Ubuntu systems, build a Flatpak locally, or build it from source for desktop and mobile development."
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
          LettuceAI is available as an Android app, desktop release assets, Arch
          Linux AUR packages, a Debian-style APT repository, and a Flatpak
          manifest you can build locally. Contributors can also build it from
          source for desktop, Android, and iOS.
        </p>

        <DocHeading level={2}>Choose a Path</DocHeading>
        <ul>
          <li>
            Use the Android release if you want the mobile app on a phone or tablet.
          </li>
          <li>
            Use the AUR package if you are on Arch Linux or an Arch-based
            distribution.
          </li>
          <li>
            Use the APT repository if you are on Debian, Ubuntu, or a compatible
            derivative and want updates through <code>apt</code>.
          </li>
          <li>
            Use the Flatpak manifest if you want a sandboxed Linux install that
            works across distributions. The manifest currently ships in the
            repository as a local build path.
          </li>
          <li>
            Build from source if you are contributing, developing locally, or need
            a custom desktop or mobile build.
          </li>
        </ul>

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
          <li>Download the APK file to your Android device.</li>
          <li>Open the APK file from your file manager or browser downloads.</li>
          <li>
            Allow installation from unknown sources if Android prompts you to do
            so.
          </li>
          <li>Finish installation and launch LettuceAI.</li>
        </ol>

        <Callout type="info" title="Android Requirements">
          Android 12 or higher is required. Keep several gigabytes of free storage
          available for chats, assets, downloaded models, voices, and generated
          media.
        </Callout>

        <DocHeading level={2}>Desktop Release Assets</DocHeading>
        <p>
          Desktop releases are published for Windows, macOS, and Linux. If you do
          not want to build from source, use the matching installer or package for
          your platform.
        </p>

        <ul>
          <li>
            Windows: use the published <code>.msi</code> installer or
            <code>-setup.exe</code> package for the CPU, Vulkan, or CUDA variant.
          </li>
          <li>
            macOS: use the published <code>.dmg</code> installer for the matching
            architecture and rendering path.
          </li>
          <li>
            Linux: use the AUR or APT repository instructions below if you want
            package-manager installs, or download the published <code>.deb</code> or
            release tarball assets directly from GitHub Releases.
          </li>
        </ul>

        <DocHeading level={2}>Arch Linux and AUR</DocHeading>
        <p>
          LettuceAI publishes separate AUR packages for CPU, Vulkan, and CUDA
          variants. Choose exactly one package for a system.
        </p>

        <ul>
          <li>
            <code>lettuceai-bin</code>: default CPU build
          </li>
          <li>
            <code>lettuceai-vulkan-bin</code>: Vulkan build for AMD, Intel, or
            NVIDIA systems with a working Vulkan stack
          </li>
          <li>
            <code>lettuceai-cuda-bin</code>: CUDA build for NVIDIA systems with the
            CUDA stack installed
          </li>
        </ul>

        <DocHeading level={3}>Install with yay</DocHeading>
        <div className="not-prose">
          <CodeBlock language="bash">{`# CPU
yay -S lettuceai-bin

# Vulkan
yay -S lettuceai-vulkan-bin

# CUDA
yay -S lettuceai-cuda-bin`}</CodeBlock>
        </div>

        <DocHeading level={3}>Install with makepkg</DocHeading>
        <div className="not-prose">
          <CodeBlock language="bash">{`# Example: CPU package
git clone https://aur.archlinux.org/lettuceai-bin.git
cd lettuceai-bin
makepkg -si`}</CodeBlock>
        </div>

        <Callout type="info" title="AUR Variant Guidance">
          Install only one LettuceAI AUR package at a time. The packages provide the
          same application and are marked as conflicting variants.
        </Callout>

        <DocHeading level={2}>Debian, Ubuntu, and Other APT-Based Systems</DocHeading>
        <p>
          LettuceAI publishes a signed APT repository with separate roots for CPU,
          Vulkan, and CUDA builds. This lets Debian and Ubuntu users install and
          update LettuceAI through <code>apt</code>.
        </p>

        <DocHeading level={3}>CPU Repository</DocHeading>
        <div className="not-prose">
          <CodeBlock language="bash">{`curl -fsSL https://lettuceai.github.io/app/debian-repo-public.asc | sudo gpg --dearmor -o /usr/share/keyrings/lettuceai-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/lettuceai-archive-keyring.gpg arch=amd64] https://lettuceai.github.io/app/apt/cpu stable main" | sudo tee /etc/apt/sources.list.d/lettuceai.list
sudo apt update
sudo apt install lettuceai`}</CodeBlock>
        </div>

        <DocHeading level={3}>Vulkan Repository</DocHeading>
        <div className="not-prose">
          <CodeBlock language="bash">{`curl -fsSL https://lettuceai.github.io/app/debian-repo-public.asc | sudo gpg --dearmor -o /usr/share/keyrings/lettuceai-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/lettuceai-archive-keyring.gpg arch=amd64] https://lettuceai.github.io/app/apt/vulkan stable main" | sudo tee /etc/apt/sources.list.d/lettuceai.list
sudo apt update
sudo apt install lettuceai`}</CodeBlock>
        </div>

        <DocHeading level={3}>CUDA Repository</DocHeading>
        <div className="not-prose">
          <CodeBlock language="bash">{`curl -fsSL https://lettuceai.github.io/app/debian-repo-public.asc | sudo gpg --dearmor -o /usr/share/keyrings/lettuceai-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/lettuceai-archive-keyring.gpg arch=amd64] https://lettuceai.github.io/app/apt/cuda stable main" | sudo tee /etc/apt/sources.list.d/lettuceai.list
sudo apt update
sudo apt install lettuceai`}</CodeBlock>
        </div>

        <DocHeading level={3}>Direct .deb Installation</DocHeading>
        <p>
          If you only need a one-off install and do not want to add the APT
          repository, you can install the published <code>.deb</code> asset directly.
        </p>

        <div className="not-prose">
          <CodeBlock language="bash">{`# Example: install a downloaded CPU package
sudo apt install ./lettuceai-linux-x86_64-cpu.deb`}</CodeBlock>
        </div>

        <Callout type="info" title="APT Variant Guidance">
          Use only one LettuceAI APT source at a time. The CPU, Vulkan, and CUDA
          repositories are intentionally split so package managers do not treat
          incompatible builds as interchangeable candidates.
        </Callout>

        <DocHeading level={2}>Flatpak (Local Build)</DocHeading>
        <p>
          The repository ships a Flatpak manifest at{" "}
          <code>flatpak/com.lettuceai.app.yml</code> and a helper script at{" "}
          <code>scripts/flatpak-local-build.sh</code>. This lets you build a
          sandboxed Linux package on your own machine and install it through{" "}
          <code>flatpak</code>. There is no hosted Flathub or remote repository
          yet, so this is a build-from-manifest workflow rather than a one-line
          install.
        </p>

        <DocHeading level={3}>Prerequisites</DocHeading>
        <ul>
          <li>
            <code>flatpak</code> and <code>flatpak-builder</code> installed
          </li>
          <li>The Flathub remote configured for your user</li>
          <li>
            GNOME platform and SDK runtimes plus the Rust and Node SDK
            extensions (the build script will install missing dependencies from
            Flathub on first run)
          </li>
        </ul>

        <div className="not-prose">
          <CodeBlock language="bash">{`# From the mobile-app repository root
bash scripts/flatpak-local-build.sh

# Install the produced bundle
flatpak install --user ./lettuceai.flatpak

# Run it
flatpak run com.lettuceai.app`}</CodeBlock>
        </div>

        <Callout type="info" title="Flatpak Status">
          Flatpak support is currently a local build path. The manifest and
          helper script are in the repository, but there is no published
          Flathub or remote Flatpak repository yet.
        </Callout>

        <DocHeading level={2}>Build from Source</DocHeading>
        <p>
          The project uses Bun, Tauri v2, React, and Rust. Most contributors should
          use the wrapper commands in the repository rather than invoking raw Tauri
          commands directly. The wrappers encode platform-specific fixes, toolchain
          setup, and build-time workarounds.
        </p>

        <DocHeading level={3}>Prerequisites</DocHeading>
        <ul>
          <li>Bun 1.1 or newer</li>
          <li>Rust and Cargo</li>
          <li>Android Studio and Android SDK components for Android work</li>
          <li>Xcode and the iOS toolchain for iOS work on macOS</li>
          <li>
            Platform-native runtime dependencies such as WebKitGTK on Linux and
            eSpeak NG for Kokoro TTS on desktop
          </li>
        </ul>

        <DocHeading level={3}>Clone and Install Dependencies</DocHeading>
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

# Desktop (default Tauri flow)
bun run tauri dev
bun run tauri build

# Linux / Wayland fallback if the normal Tauri run has WebKit issues
bun run tauri:dev:webkit-safe
bun run tauri:build:webkit-safe

# Desktop with NVIDIA CUDA llama.cpp acceleration (auto-detect local GPU arch)
bun run tauri:dev:cuda:auto
bun run tauri:build:cuda:auto

# Desktop with Vulkan llama.cpp acceleration
bun run tauri dev --features llama-gpu-vulkan
bun run tauri build --features llama-gpu-vulkan

# Desktop with Metal acceleration on macOS
bun run tauri:dev:metal
bun run tauri:build:metal
bun run tauri:build:macos

# Android
bun run tauri:android:init
bun run tauri:android:dev
bun run tauri:android:build

# iOS (macOS only)
bun run tauri:ios:init
bun run tauri:ios:dev:ready
bun run tauri:ios:build:ready

# Quality checks
bunx tsc --noEmit
bun run check
cd src-tauri && cargo fmt && cargo check`}</CodeBlock>
        </div>

        <DocHeading level={3}>Which Desktop Command Should You Use?</DocHeading>
        <ul>
          <li>
            Use <code>bun run tauri dev</code> and <code>bun run tauri build</code>
            for standard desktop development.
          </li>
          <li>
            If Linux WebKit or Wayland behavior is unstable, use the
            <code>webkit-safe</code> wrappers.
          </li>
          <li>
            Use the CUDA wrappers on NVIDIA systems. These wrappers auto-detect CUDA
            architecture information and apply the Linux position-independent-code
            flags the project expects.
          </li>
          <li>
            Use the Vulkan feature flag path when you want cross-vendor GPU
            acceleration through Vulkan.
          </li>
          <li>
            Use the Metal wrappers on macOS when building the Apple GPU-accelerated
            variant.
          </li>
        </ul>

        <Callout type="info" title="Windows Contributors">
          The repository also includes native Windows wrapper scripts under
          <code>scripts/windows/</code> in both <code>.cmd</code> and PowerShell
          form.
        </Callout>

        <div className="not-prose">
          <CodeBlock language="powershell">{`.\\scripts\\windows\\desktop-dev.ps1
.\\scripts\\windows\\desktop-build.ps1
.\\scripts\\windows\\android-init.ps1
.\\scripts\\windows\\android-dev.ps1
.\\scripts\\windows\\android-build.ps1
.\\scripts\\windows\\check.ps1`}</CodeBlock>
        </div>

        <div className="not-prose">
          <CodeBlock language="bat">{`scripts\\windows\\desktop-dev.cmd
scripts\\windows\\desktop-build.cmd
scripts\\windows\\android-init.cmd
scripts\\windows\\android-dev.cmd
scripts\\windows\\android-build.cmd
scripts\\windows\\check.cmd`}</CodeBlock>
        </div>

        <DocHeading level={2}>Desktop Runtime Dependencies</DocHeading>

        <DocHeading level={3}>eSpeak NG for Kokoro TTS</DocHeading>
        <p>
          Desktop Kokoro TTS phonemization shells out to a system-installed
          <code>espeak-ng</code>. If it is not available on <code>PATH</code>, the
          app will surface the same guidance at runtime.
        </p>

        <div className="not-prose">
          <CodeBlock language="bash">{`# Ubuntu / Debian
sudo apt install espeak-ng

# Fedora
sudo dnf install espeak-ng

# Arch / Manjaro
sudo pacman -S espeak-ng`}</CodeBlock>
        </div>

        <div className="not-prose">
          <CodeBlock language="powershell">{`# Windows
winget install eSpeak-NG.eSpeak-NG`}</CodeBlock>
        </div>

        <div className="not-prose">
          <CodeBlock language="bash">{`# macOS
brew install espeak-ng`}</CodeBlock>
        </div>

        <p>
          You can also point the app at a custom eSpeak NG binary or data directory
          through the TTS settings panel.
        </p>

        <DocHeading level={2}>Android Development Environment</DocHeading>
        <p>
          Android development expects Android Studio, the SDK, platform tools,
          command-line tools, and the NDK to be installed. The main source of build
          failures is environment mismatch between your interactive shell and the
          non-interactive shell used by build tooling.
        </p>

        <DocHeading level={3}>Environment Variables</DocHeading>
        <div className="not-prose">
          <CodeBlock language="bash">{`export ANDROID_SDK_ROOT="$HOME/Android/Sdk"
export ANDROID_HOME="$ANDROID_SDK_ROOT"
export ANDROID_NDK_HOME="$ANDROID_SDK_ROOT/ndk/<your-installed-ndk>"
export NDK_HOME="$ANDROID_NDK_HOME"
export PATH="$ANDROID_SDK_ROOT/platform-tools:$ANDROID_SDK_ROOT/emulator:$ANDROID_SDK_ROOT/cmdline-tools/latest/bin:$PATH"

bash -lc 'echo ANDROID_HOME=$ANDROID_HOME; echo ANDROID_SDK_ROOT=$ANDROID_SDK_ROOT; echo ANDROID_NDK_HOME=$ANDROID_NDK_HOME; echo NDK_HOME=$NDK_HOME'`}</CodeBlock>
        </div>

        <div className="not-prose">
          <CodeBlock language="powershell">{`$env:ANDROID_SDK_ROOT = "$HOME\\Android\\Sdk"
$env:ANDROID_HOME = $env:ANDROID_SDK_ROOT
$env:ANDROID_NDK_HOME = "$env:ANDROID_SDK_ROOT\\ndk\\<your-installed-ndk>"
$env:NDK_HOME = $env:ANDROID_NDK_HOME
$env:PATH = "$env:ANDROID_SDK_ROOT\\platform-tools;$env:ANDROID_SDK_ROOT\\emulator;$env:ANDROID_SDK_ROOT\\cmdline-tools\\latest\\bin;$env:PATH"`}</CodeBlock>
        </div>

        <DocHeading level={3}>Android Project Initialization</DocHeading>
        <div className="not-prose">
          <CodeBlock language="bash">{`bun run tauri:android:init`}</CodeBlock>
        </div>

        <DocHeading level={3}>Android Kokoro eSpeak Bundle</DocHeading>
        <p>
          Android builds require the Kokoro eSpeak native bundle. The Rust build
          script enforces this and will refuse to build without it.
        </p>

        <p>There are four supported ways to provide the bundle:</p>
        <ol>
          <li>
            Let the build script download the default published bundle
            automatically.
          </li>
          <li>Build the bundle locally with the helper script.</li>
          <li>Point the build at a custom remote bundle URL.</li>
          <li>
            Reuse already-installed bundle files under the generated Android
            project.
          </li>
        </ol>

        <div className="not-prose">
          <CodeBlock language="bash">{`# Build a local bundle
ANDROID_SDK_ROOT=$ANDROID_HOME bash scripts/build-espeak-android-bundle.sh
export KOKORO_ESPEAK_ANDROID_BUNDLE_PATH=/tmp/kokoro-espeak-android-bundle.tar.gz
bun run tauri:android:dev`}</CodeBlock>
        </div>

        <div className="not-prose">
          <CodeBlock language="bash">{`# Or override with a remote bundle
export KOKORO_ESPEAK_ANDROID_BUNDLE_URL=https://example.com/kokoro-espeak-android-bundle.tar.gz`}</CodeBlock>
        </div>

        <DocHeading level={3}>Android Build and Run</DocHeading>
        <div className="not-prose">
          <CodeBlock language="bash">{`# Run on emulator or attached device
bun run tauri:android:dev

# Build APK
bun run tauri:android:build`}</CodeBlock>
        </div>

        <Callout type="info" title="Android Troubleshooting">
          If Android Rust builds fail inside <code>whisper-rs-sys</code>, verify
          your NDK and CMake setup first. If Cargo registry outputs become wedged,
          clean the Tauri build tree with
          <code> cargo clean --manifest-path src-tauri/Cargo.toml</code> and retry.
        </Callout>

        <DocHeading level={2}>iOS Development Environment</DocHeading>
        <p>
          iOS development is macOS-only. You need Xcode, the Xcode command-line
          tools, CocoaPods, and an iOS-compatible ONNX Runtime package that includes
          the CoreML execution provider.
        </p>

        <div className="not-prose">
          <CodeBlock language="bash">{`xcode-select --install
export ORT_LIB_LOCATION=/absolute/path/to/onnxruntime/ios/libs
bun run tauri:ios:init
bun run tauri:ios:dev:ready
bun run tauri:ios:build:ready`}</CodeBlock>
        </div>

        <p>
          The project wrappers assume ONNX Runtime slices have already been prepared
          for iOS. Set <code>ORT_LIB_LOCATION</code> before building.
        </p>

        <DocHeading level={2}>macOS Distribution Builds</DocHeading>
        <p>
          To build a native macOS application bundle and DMG installer on macOS,
          use the dedicated macOS wrapper.
        </p>

        <div className="not-prose">
          <CodeBlock language="bash">{`bun run tauri:build:macos`}</CodeBlock>
        </div>

        <p>The generated artifacts are placed under:</p>
        <ul>
          <li>
            <code>src-tauri/target/release/bundle/macos/*.app</code>
          </li>
          <li>
            <code>src-tauri/target/release/bundle/dmg/*.dmg</code>
          </li>
        </ul>

        <DocHeading level={2}>Notes</DocHeading>
        <ul>
          <li>
            Prefer repository wrapper commands over raw tool invocations where the
            repo already provides a wrapper.
          </li>
          <li>
            On Linux, use the WebKit-safe wrappers if the default Tauri window path
            behaves poorly under Wayland.
          </li>
          <li>
            On desktop, install <code>espeak-ng</code> before debugging Kokoro TTS
            issues.
          </li>
          <li>
            On Android, keep your shell environment consistent across interactive
            shells and <code>bash -lc</code> build invocations.
          </li>
          <li>
            For package-manager installs, choose one hardware variant and stay on
            that variant unless you intentionally want to switch builds.
          </li>
        </ul>
      </motion.article>
    </>
  );
}
