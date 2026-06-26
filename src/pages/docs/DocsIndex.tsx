import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SEO } from "@/components/common/SEO";
import { buildBreadcrumbSchema } from "@/config/schemas";

export function DocsIndex() {
  return (
    <>
    <SEO
      title="Documentation"
      description="LettuceAI documentation. Guides for installation, AI providers, characters, memory, and all features."
      path="/docs"
      jsonLd={buildBreadcrumbSchema([
        { name: "Home", path: "/" },
        { name: "Docs", path: "/docs" },
      ])}
    />
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-4xl font-bold mb-4">Documentation</h1>
      <p className="text-lg text-muted-foreground mb-8">
        Welcome to the LettuceAI documentation. Learn how to get started,
        configure providers, and make the most of your AI companion.
      </p>

      {/* Quick Links */}
      <div className="grid sm:grid-cols-2 gap-4 mb-12">
        <Link
          to="/docs/installation"
          className="p-5 rounded-xl bg-zinc-900/50 border border-border/30 hover:border-primary/30 transition-colors group"
        >
          <h3 className="font-semibold text-white mb-2 group-hover:text-primary transition-colors">
            Installation
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            Download and install LettuceAI on your device.
          </p>
          <span className="text-sm text-primary flex items-center gap-1">
            Get started <ArrowRight className="w-4 h-4" />
          </span>
        </Link>

        <Link
          to="/docs/quickstart"
          className="p-5 rounded-xl bg-zinc-900/50 border border-border/30 hover:border-primary/30 transition-colors group"
        >
          <h3 className="font-semibold text-white mb-2 group-hover:text-primary transition-colors">
            Quick Start
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            Set up your first provider and start chatting.
          </p>
          <span className="text-sm text-primary flex items-center gap-1">
            Learn more <ArrowRight className="w-4 h-4" />
          </span>
        </Link>

        <Link
          to="/docs/ai-basics"
          className="p-5 rounded-xl bg-zinc-900/50 border border-border/30 hover:border-primary/30 transition-colors group"
        >
          <h3 className="font-semibold text-white mb-2 group-hover:text-primary transition-colors">
            AI Basics
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            Learn what tokens, context length, models, and providers actually
            mean.
          </p>
          <span className="text-sm text-primary flex items-center gap-1">
            Start here <ArrowRight className="w-4 h-4" />
          </span>
        </Link>

        <Link
          to="/docs/api-keys"
          className="p-5 rounded-xl bg-zinc-900/50 border border-border/30 hover:border-primary/30 transition-colors group"
        >
          <h3 className="font-semibold text-white mb-2 group-hover:text-primary transition-colors">
            API Keys
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            Learn how to add and manage your API keys.
          </p>
          <span className="text-sm text-primary flex items-center gap-1">
            Configure <ArrowRight className="w-4 h-4" />
          </span>
        </Link>

        <Link
          to="/docs/memory"
          className="p-5 rounded-xl bg-zinc-900/50 border border-border/30 hover:border-primary/30 transition-colors group"
        >
          <h3 className="font-semibold text-white mb-2 group-hover:text-primary transition-colors">
            Memory System
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            Understand how adaptive long-term memory works.
          </p>
          <span className="text-sm text-primary flex items-center gap-1">
            Explore <ArrowRight className="w-4 h-4" />
          </span>
        </Link>

        <Link
          to="/docs/images"
          className="p-5 rounded-xl bg-zinc-900/50 border border-border/30 hover:border-primary/30 transition-colors group"
        >
          <h3 className="font-semibold text-white mb-2 group-hover:text-primary transition-colors">
            Image Generation
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            Generate avatars, scene art, and design references with image
            models.
          </p>
          <span className="text-sm text-primary flex items-center gap-1">
            Generate <ArrowRight className="w-4 h-4" />
          </span>
        </Link>

        <Link
          to="/docs/tts"
          className="p-5 rounded-xl bg-zinc-900/50 border border-border/30 hover:border-primary/30 transition-colors group"
        >
          <h3 className="font-semibold text-white mb-2 group-hover:text-primary transition-colors">
            Text-to-Speech
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            Give characters a voice with ElevenLabs, Gemini TTS,
            OpenAI-compatible TTS, or local Kokoro.
          </p>
          <span className="text-sm text-primary flex items-center gap-1">
            Listen <ArrowRight className="w-4 h-4" />
          </span>
        </Link>

        <Link
          to="/docs/sync"
          className="p-5 rounded-xl bg-zinc-900/50 border border-border/30 hover:border-primary/30 transition-colors group"
        >
          <h3 className="font-semibold text-white mb-2 group-hover:text-primary transition-colors">
            Sync
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            Move chats, characters, and settings between devices over an
            encrypted local connection.
          </p>
          <span className="text-sm text-primary flex items-center gap-1">
            Transfer <ArrowRight className="w-4 h-4" />
          </span>
        </Link>

        <Link
          to="/docs/accessibility"
          className="p-5 rounded-xl bg-zinc-900/50 border border-border/30 hover:border-primary/30 transition-colors group"
        >
          <h3 className="font-semibold text-white mb-2 group-hover:text-primary transition-colors">
            Accessibility & Customization
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            Sound cues, haptics, theme colors, and desktop window styling.
          </p>
          <span className="text-sm text-primary flex items-center gap-1">
            Customize <ArrowRight className="w-4 h-4" />
          </span>
        </Link>

        <Link
          to="/docs/companion-mode"
          className="p-5 rounded-xl bg-zinc-900/50 border border-border/30 hover:border-primary/30 transition-colors group"
        >
          <h3 className="font-semibold text-white mb-2 group-hover:text-primary transition-colors">
            Companion Mode
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            A persistent persona, evolving emotional state, and lasting memories.
          </p>
          <span className="text-sm text-primary flex items-center gap-1">
            Bond <ArrowRight className="w-4 h-4" />
          </span>
        </Link>

        <Link
          to="/docs/characters"
          className="p-5 rounded-xl bg-zinc-900/50 border border-border/30 hover:border-primary/30 transition-colors group"
        >
          <h3 className="font-semibold text-white mb-2 group-hover:text-primary transition-colors">
            Characters
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            Create, customize, and import characters and personas.
          </p>
          <span className="text-sm text-primary flex items-center gap-1">
            Create <ArrowRight className="w-4 h-4" />
          </span>
        </Link>

        <Link
          to="/docs/group-chats"
          className="p-5 rounded-xl bg-zinc-900/50 border border-border/30 hover:border-primary/30 transition-colors group"
        >
          <h3 className="font-semibold text-white mb-2 group-hover:text-primary transition-colors">
            Group Chats
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            Chat with several characters at once in scenes and roleplay.
          </p>
          <span className="text-sm text-primary flex items-center gap-1">
            Gather <ArrowRight className="w-4 h-4" />
          </span>
        </Link>

        <Link
          to="/docs/model-browser"
          className="p-5 rounded-xl bg-zinc-900/50 border border-border/30 hover:border-primary/30 transition-colors group"
        >
          <h3 className="font-semibold text-white mb-2 group-hover:text-primary transition-colors">
            Local Models
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            Download and run models on your own device, fully offline.
          </p>
          <span className="text-sm text-primary flex items-center gap-1">
            Run local <ArrowRight className="w-4 h-4" />
          </span>
        </Link>
      </div>

      {/* Features Overview */}
      <h2 className="text-2xl font-bold mb-4">Key Features</h2>
      <ul className="space-y-3 text-muted-foreground">
        <li className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
          <span>
            <strong className="text-white">Bring your own key:</strong> connect
            your own accounts across 20+ AI providers, or run models locally
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
          <span>
            <strong className="text-white">Privacy first:</strong> your chats,
            characters, and keys are stored locally on your device
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
          <span>
            <strong className="text-white">Smart memory:</strong> long-term
            memory that keeps quality high in long chats while cutting token cost
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
          <span>
            <strong className="text-white">Characters and personas:</strong>
            {" "}build, import, and discover characters, personas, and lorebooks
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
          <span>
            <strong className="text-white">Companion mode:</strong> a persistent
            persona with an evolving emotional state and lasting memories
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
          <span>
            <strong className="text-white">Branching and widgets:</strong> fork a
            chat into alternate paths, and add interactive in-chat widgets
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
          <span>
            <strong className="text-white">Local inference:</strong> download and
            run models on your own hardware, with GPU acceleration
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
          <span>
            <strong className="text-white">Image generation:</strong> create
            avatars and scenes via local engines or cloud image providers
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
          <span>
            <strong className="text-white">Voice:</strong> give characters a
            voice with text-to-speech, and dictate messages with on-device
            speech recognition
          </span>
        </li>
        <li className="flex items-start gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
          <span>
            <strong className="text-white">Group chats:</strong> bring several
            characters into one conversation
          </span>
        </li>
      </ul>
    </motion.div>
    </>
  );
}
