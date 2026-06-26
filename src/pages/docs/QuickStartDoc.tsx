import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Callout } from "@/components/docs/Callout";
import { DocHeading } from "@/components/docs/DocHeading";
import { DocSplit } from "@/components/docs/DocSplit";
import { images } from "@/config/images";
import { SEO } from "@/components/common/SEO";
import { buildBreadcrumbSchema } from "@/config/schemas";

export function QuickStartDoc() {
  return (
    <>
    <SEO
      title="Quick Start"
      description="Set up LettuceAI in a few minutes. A guided first-run flow helps you connect a provider, add a key, pick a model, and start chatting."
      path="/docs/quickstart"
      jsonLd={buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Docs", path: "/docs" },
        { name: "Quick Start", path: "/docs/quickstart" },
      ])}
    />
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="prose prose-invert max-w-none"
    >
      <DocHeading level={1}>Quick Start</DocHeading>
      <p className="lead">
        The first time you open LettuceAI, a guided setup walks you through
        everything you need. This page mirrors that flow so you know what to
        expect.
      </p>

      <Callout type="info" title="New to AI apps?">
        If terms like tokens, context length, provider, or model are unfamiliar,
        read <Link to="/docs/ai-basics">AI Basics</Link> first. The setup itself
        also includes a short, plain-language explainer for first-time users.
      </Callout>

      {/* STEP 1 */}
      <DocHeading level={2}>Step 1: Welcome</DocHeading>

      <DocSplit
        imageSrc={images.quickStart.step1}
        imageAlt="LettuceAI welcome screen"
      >
        <p>
          When you first launch LettuceAI, you will see the welcome screen. Tap{" "}
          <strong>Get Started</strong> to begin the guided setup.
        </p>

        <p>
          The welcome screen also has an <strong>Other options</strong> menu if
          you are not starting fresh:
        </p>

        <ul>
          <li>
            <strong>Sync from another device</strong>: copy your chats,
            characters, and settings from a device that already has LettuceAI
            set up. See <Link to="/docs/sync">Sync</Link>.
          </li>
          <li>
            <strong>Restore from Backup</strong>: load a previously saved{" "}
            <code>.lettuce</code> backup file.
          </li>
          <li>
            <strong>Skip for now</strong>: jump straight into the app. Note that
            the app cannot generate replies until you have added at least one
            model, so most people should complete the setup first.
          </li>
        </ul>

        <Callout type="info" title="Beta Build">
          LettuceAI is currently in beta. If you encounter issues, please report
          them on our GitHub repository.
        </Callout>
      </DocSplit>

      {/* STEP 2 */}
      <DocHeading level={2}>Step 2: Tell it your experience level</DocHeading>

      <p>
        Setup first asks a quick question: have you set up an app like this
        before?
      </p>

      <ul>
        <li>
          <strong>No, this is new to me</strong>: you get a short, plain-language
          explainer (about two minutes). It uses a simple car analogy. The app is
          the car, a <strong>provider</strong> supplies the engine, your{" "}
          <strong>API key</strong> is the key that starts it, and the{" "}
          <strong>model</strong> is the engine itself. It also explains that some
          models are free with a daily limit and others charge a small amount per
          message.
        </li>
        <li>
          <strong>Yes, I know how this works</strong>: skip the explainer and go
          straight to provider setup, where you choose any provider, paste a key,
          test the connection, and continue.
        </li>
      </ul>

      {/* STEP 3 */}
      <DocHeading level={2}>Step 3: Choose free or paid</DocHeading>

      <DocSplit
        imageSrc={images.quickStart.step2}
        imageAlt="Choosing a setup path"
        reverse
      >
        <p>
          First-time users are offered two easy starting points. You only ever
          pay the provider, never LettuceAI, and you can switch later without
          losing anything.
        </p>

        <ul>
          <li>
            <strong>Free (Google Gemini)</strong>: costs nothing and never asks
            for a card, with a generous daily allowance. You can only use
            Google's own models, and mature or explicit content is blocked.
          </li>
          <li>
            <strong>Paid (OpenRouter)</strong>: pick from almost every AI model
            through one account, with no daily caps. You pay only for what you
            use, and you need a card or prepaid balance to start.
          </li>
        </ul>

        <Callout type="info" title="Not sure?">
          Start free. You can always add a paid provider later from{" "}
          <strong>Settings</strong>. See the{" "}
          <Link to="/docs/api-keys">API Keys guide</Link> for where to get a key
          from each provider.
        </Callout>
      </DocSplit>

      {/* STEP 4 */}
      <DocHeading level={2}>Step 4: Add your API key</DocHeading>

      <p>
        LettuceAI does not require an account. Instead you connect your own
        provider using an API key. Keys are encrypted and stored only on your
        device, never on our servers.
      </p>

      <p>
        Whichever path you picked, the setup walks you through creating a key
        with step-by-step screenshots, then asks you to paste it in:
      </p>

      <ol>
        <li>
          Tap the button to open the provider site (Google AI Studio for Gemini,
          or OpenRouter for the paid path) and follow the guided screens to
          create and copy a key.
        </li>
        <li>Paste the key into the box.</li>
        <li>
          Tap <strong>Connect</strong>. LettuceAI checks that the key works
          before continuing.
        </li>
      </ol>

      <Callout type="warning" title="Copy the whole key">
        Most "key did not work" errors are caused by a partially copied key.
        Copy it immediately when the provider shows it, as some providers only
        display the full key once.
      </Callout>

      {/* STEP 5 */}
      <DocHeading level={2}>Step 5: Pick a model</DocHeading>

      <DocSplit
        imageSrc={images.quickStart.step3}
        imageAlt="Model selection screen"
      >
        <p>
          A model is the specific AI that writes the replies. How you choose one
          depends on your path:
        </p>

        <ul>
          <li>
            <strong>Free (Gemini)</strong>: a recommended model is set up for you
            automatically once your key is verified.
          </li>
          <li>
            <strong>Paid (OpenRouter)</strong>: you are shown a short list of
            strong starter models with their current live prices. Pick one (the
            recommended option is a good default) and it is set up instantly.
          </li>
          <li>
            <strong>Experienced path</strong>: choose your provider, then enter
            the exact model identifier, or pick from the provider's list.
          </li>
        </ul>

        <Callout type="warning" title="A model is required">
          LettuceAI needs at least one working model before you can create
          characters or start chatting. You can add more models or switch
          between them at any time from Settings.
        </Callout>
      </DocSplit>

      {/* STEP 6 */}
      <DocHeading level={2}>Step 6: Choose your memory style</DocHeading>

      <DocSplit
        imageSrc={images.quickStart.step5}
        imageAlt="Memory system selection"
        reverse
      >
        <p>
          LettuceAI includes a memory system so characters can remember details
          across long conversations without resending the entire chat history
          every time. Pick how you want it to work:
        </p>

        <ul>
          <li>
            <strong>Dynamic Memory (Recommended)</strong>: uses a small local
            embedding model to automatically retrieve the most relevant context.
            This keeps quality high in long chats and reduces token costs, with
            zero configuration.
          </li>
          <li>
            <strong>Manual Memory</strong>: you pin and edit what gets remembered
            yourself, for total control.
          </li>
        </ul>

        <p>
          If you choose Dynamic Memory, the final step offers to download the
          embedding model (around 120 MB). It runs fully offline on your device.
          You can tap <strong>Download &amp; Enable</strong> to set it up now, or{" "}
          <strong>Skip for now</strong> and enable it later in Settings.
        </p>

        <Callout type="success" title="Recommended">
          Dynamic Memory gives the best balance of quality, privacy, and lower
          cost. Learn more in the <Link to="/docs/memory">Memory</Link> guide.
        </Callout>
      </DocSplit>

      {/* STEP 7 */}
      <DocHeading level={2}>Step 7: Start chatting</DocHeading>

      <DocSplit
        imageSrc={images.quickStart.step6}
        imageAlt="Chat screen"
        disableHoverAnimation
        disableHoverGradient
      >
        <p>
          That is it. Setup is complete and everything runs locally on your
          device. Now you just need someone to talk to.
        </p>

        <ol>
          <li>
            Create a <Link to="/docs/characters">Character</Link> and a{" "}
            <Link to="/docs/personas">Persona</Link>, or import one and browse
            community characters from <Link to="/docs/discovery">Discovery</Link>.
          </li>
          <li>Open the character and start the conversation.</li>
        </ol>

        <Callout type="success" title="You're ready!">
          LettuceAI is now fully set up. From here you can explore voices,
          image generation, group chats, and more.
        </Callout>
      </DocSplit>

      <DocHeading level={2}>Where to go next</DocHeading>

      <p>
        Once you are past setup, a few places are the main hubs you will return
        to from anywhere in the app:
      </p>

      <ul>
        <li>
          <strong>Library</strong>: a single view for everything you create
          locally. Filter tabs cover characters, personas, lorebooks, and
          images. New characters, personas, and lorebooks are created from here,
          including the AI-guided{" "}
          <Link to="/docs/smart-creator">Smart Creator</Link>.
        </li>
        <li>
          <strong>Search</strong>: a fast finder over your characters and
          personas. Type to filter by name or description, then tap a result to
          start a chat or open the editor.
        </li>
        <li>
          <strong>Settings</strong>: add more providers and{" "}
          <Link to="/docs/models">models</Link>, change your{" "}
          <Link to="/docs/memory">memory</Link> setup, and tune the app. You can
          re-run pieces of the setup from here at any time.
        </li>
      </ul>

      <Callout type="warning" title="Privacy First">
        Your API keys and chat data never leave your device. LettuceAI does not
        run its own servers and cannot see your conversations.
      </Callout>
    </motion.article>
    </>
  );
}
