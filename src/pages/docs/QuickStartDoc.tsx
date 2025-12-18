import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Callout } from "@/components/docs/Callout";
import { DocHeading } from "@/components/docs/DocHeading";
import { DocSplit } from "@/components/docs/DocSplit";
import { images } from "@/config/images";

export function QuickStartDoc() {
    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="prose prose-invert max-w-none"
        >
            <DocHeading level={1}>Quick Start</DocHeading>
            <p className="lead">
                Set up LettuceAI and start chatting in under 2 minutes.
            </p>

            {/* STEP 1 */}
            <DocHeading level={2}>Step 1: Welcome & Get Started</DocHeading>

            <DocSplit
                imageSrc={images.quickStart.step1}
                imageAlt="LettuceAI welcome screen"
            >
                <p>
                    When you first launch LettuceAI, you’ll see the welcome screen.
                    From here, you can begin the guided setup or skip it and configure things later.
                </p>

                <ol>
                    <li>Open LettuceAI</li>
                    <li>Tap <strong>Get Started</strong></li>
                </ol>

                <Callout type="info" title="Beta Build">
                    LettuceAI is currently in beta. If you encounter issues, please report them on our GitHub repository.
                </Callout>
            </DocSplit>

            {/* STEP 2 */}
            <DocHeading level={2}>Step 2: Connect an AI Provider</DocHeading>

            <DocSplit
                imageSrc={images.quickStart.step2}
                imageAlt="AI provider selection"
                reverse
            >
                <p>
                    LettuceAI does not require an account. Instead, you connect your own AI providers
                    using API keys. Keys are encrypted and stored locally on your device.
                </p>

                <ol>
                    <li>Select an AI provider (for example{" "}<code>Chutes</code>)</li>
                    <li>Enter your API key</li>
                    <li>Optionally customize the display name or base URL</li>
                    <li>Tap <strong>Test Connection</strong></li>
                    <li>Tap <strong>Continue</strong></li>
                </ol>

                <Callout type="info" title="Need an API key?">
                    See the <Link to="/docs/api-keys">API Keys guide</Link> to learn where to get keys for each provider.
                </Callout>
            </DocSplit>

            {/* STEP 3 */}
            <DocHeading level={2}>Step 3: Choose Your Default Model</DocHeading>

            <DocSplit
                imageSrc={images.quickStart.step3}
                imageAlt="Model selection screen"
            >
                <p>
                    Next, choose which model LettuceAI should use by default.
                    You can add more models or switch between them later.
                </p>

                <ol>
                    <li>Select the provider you just added</li>
                    <li>
                        Enter the exact model identifier (for example{" "}
                        <code>Qwen/Qwen3-32B</code>)
                    </li>
                    <li>Set a friendly display name</li>
                    <li>Tap <strong>Next: Memory System</strong></li>
                </ol>

                <Callout type="warning" title="Use the supported model">
                    Make sure the model name matches one that is actually available from the provider you selected.
                </Callout>
            </DocSplit>

            {/* STEP 4 */}
            <DocHeading level={2}>Step 4: Configure Memory</DocHeading>

            <DocSplit
                imageSrc={images.quickStart.step5}
                imageAlt="Memory system selection"
                reverse
            >
                <p>
                    LettuceAI includes a powerful memory system designed to maintain long conversations
                    without repeatedly sending full chat histories to the model.
                </p>

                <ul>
                    <li>
                        <strong>Dynamic Memory (Recommended):</strong> Uses a local embedding model
                        to summarize and retrieve relevant context automatically.
                    </li>
                    <li>
                        <strong>Manual Memory:</strong> You explicitly control what gets remembered.
                    </li>
                </ul>

                <Callout type="success" title="Recommended">
                    Dynamic Memory provides the best balance of quality, privacy, and token cost reduction.
                </Callout>
            </DocSplit>

            {/* STEP 5 */}
            <DocHeading level={2}>Step 5: Start Chatting</DocHeading>

            <DocSplit
                imageSrc={images.quickStart.step6}
                imageAlt="Chat screen"
                disableHoverAnimation
                disableHoverGradient
            >
                <p>
                    That’s it. Setup is complete. You can now start a conversation with your AI companion.
                </p>

                <ol>
                    <li>Go to the <strong>Chats</strong> screen</li>
                    <li>Create a new Character and a Persona</li>
                    <li>Start Chatting!</li>
                </ol>

                <Callout type="success" title="You’re ready!">
                    LettuceAI is now fully set up and running locally on your device.
                </Callout>
            </DocSplit>

            <Callout type="warning" title="Privacy First">
                Your API keys and chat data never leave your device. LettuceAI does not run its own servers
                and cannot see your conversations.
            </Callout>
        </motion.article>
    );
}
