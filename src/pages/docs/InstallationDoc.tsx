import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Callout } from "@/components/docs/Callout";
import { DocHeading } from "@/components/docs/DocHeading";

export function InstallationDoc() {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="prose prose-invert max-w-none"
        >
            <DocHeading level={1}>Installation</DocHeading>

            <p className="lead">
                Install LettuceAI on your device and start chatting in minutes.
            </p>

            <DocHeading level={2}>Android</DocHeading>
            <p>
                The Android version is distributed as a standalone APK.
                Download the latest release from the{" "}
                <Link to="/download" className="text-primary hover:underline">
                    downloads page
                </Link>{" "}
                or directly from GitHub Releases.
            </p>

            <ol>
                <li>Download the APK file to your device</li>
                <li>Open the APK file</li>
                <li>Allow installation from unknown sources if prompted</li>
                <li>Complete the installation and launch LettuceAI</li>
            </ol>

            <Callout type="info" title="Requirements">
                Android 10 or higher is required. Make sure you have at least
                300&nbsp;MB of free storage available.
            </Callout>

            <DocHeading level={2}>Windows & Linux</DocHeading>
            <p>
                Native desktop apps for Windows and Linux are currently under development
                and are not yet available for download.
            </p>

            <p>
                Join our Discord if you want updates or early testing builds.
            </p>

            <DocHeading level={2}>Building from Source</DocHeading>
            <p>
                LettuceAI is open source, but building it yourself is intended
                for developers.
            </p>

            <Callout type="warning" title="Advanced Setup">
                Building from source requires Rust, Android build tools,
                and signing keys. If you just want to use LettuceAI,
                we strongly recommend downloading the prebuilt APK instead.
            </Callout>

            <DocHeading level={3}>Prerequisites</DocHeading>
            <ul>
                <li>Rust installed (with Android targets)</li>
                <li>Android SDK & NDK</li>
                <li>Node.js and npm</li>
                <li>An Android signing key</li>
            </ul>

            <p>
                Install Rust and Android targets:
            </p>
            <div className="not-prose">
                <CodeBlock language="bash">{`# Install Rust
# Checkout the latest installation script from https://sh.rustup.rs
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh

# Add Android targets
rustup target add aarch64-linux-android armv7-linux-androideabi i686-linux-android x86_64-linux-android`}</CodeBlock>
            </div>

            <p>
                Install Android Studio and the Android SDK from the official website:
            </p>

            <Callout type="info" title="Android SDK & NDK">
                <a
                    href="https://developer.android.com/studio"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                >
                    Android Studio & SDK – developer.android.com
                </a>
                <br />
                Make sure the Android SDK, platform tools, and NDK are installed.
            </Callout>

            <DocHeading level={3}>Clone the Repository</DocHeading>
            <p>
                Clone the LettuceAI repository from GitHub:
            </p>

            <CodeBlock language="bash">{`git clone https://github.com/LettuceAI/mobile-app.git
cd mobile-app`}</CodeBlock>

            <DocHeading level={3}>Android Signing Key</DocHeading>

            <p>
                Android release builds require a signing key.
                You must provide a configuration file for Gradle.
            </p>

            <Callout type="info" title="Signing Key Required">
                Create a file named <code>keystore.properties</code> inside:
                <br />
                <code>src-tauri/gen/android/</code>
                <br />
                <a
                    href="https://developer.android.com/studio/publish/app-signing#generate-key "
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                >
                    Generate a keystore for signing - developer.android.com
                </a>
            </Callout>

            <DocHeading level={3}>Example keystore.properties</DocHeading>

            <p>Example contents:</p>

            <div className="not-prose">
                <CodeBlock language="properties">{`# Android signing configuration
# DO NOT commit this file to version control

password=<key password>
keyAlias=upload
storeFile=<path to keystore>`}</CodeBlock>
            </div>

            <Callout type="warning" title="Keep This File Secret">
                The <code>keystore.properties</code> file contains sensitive credentials.
                Do not commit it to Git or share it publicly.
            </Callout>

            <DocHeading level={3}>Build Steps</DocHeading>

            <div className="not-prose">
                <CodeBlock language="bash">{`
# Install JavaScript dependencies
npm install

# Build Android app
npm run tauri android build`}</CodeBlock>
            </div>
            <p>
                The build process produces a local Android APK and AAB, with file paths provided by the Tauri script.
            </p>
        </motion.article>
    );
}
