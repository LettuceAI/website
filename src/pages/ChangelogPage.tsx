import { SEO } from "@/components/common/SEO";
import { motion } from "framer-motion";
import {
  History,
  Brain,
  Sparkles,
  BookOpen,
  Image,
  Zap,
  Monitor,
  Bug,
  Heart,
  Volume2,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export function ChangelogPage() {
  const navigate = useNavigate();
  return (
    <>
      <SEO
        title="Changelog"
        description="Track updates, improvements, and fixes across LettuceAI releases."
        path="/changelog"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "LettuceAI Changelog",
          url: "https://lettuceai.app/changelog",
          description: "Track updates, improvements, and fixes across LettuceAI releases.",
          isPartOf: { "@type": "WebSite", name: "LettuceAI", url: "https://lettuceai.app" },
        }}
      />
      <main className="min-h-screen bg-[#050505] pt-28 pb-16">
        <div className="max-w-3xl mx-auto px-6 sm:px-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-14"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-primary/40" />
              <span className="text-primary text-[11px] font-semibold uppercase tracking-[0.2em]">
                Changelog
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
              What's{" "}
              <span className="font-display italic text-primary">new</span>
            </h1>
            <p className="text-[15px] text-white/35 leading-[1.7] max-w-xl mb-6">
              Track updates, improvements, and fixes across LettuceAI releases.
            </p>
            <ShimmerButton
              className="h-10 px-6 text-sm"
              onClick={() => navigate("/download")}
            >
              Download Latest Version
            </ShimmerButton>
          </motion.div>

          {/* Android 1.4.0 & Desktop 1.1.0 update */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="prose prose-invert max-w-none mb-14"
          >
            <div className="not-prose mb-8 pb-6 border-b border-white/[0.06]">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary/80 text-xs font-medium border border-primary/15">
                  Android 1.4.0 & Desktop 1.1.0 update
                </span>
                <span className="text-white/25 text-xs">
                  April 6, 2026 • 3:38 PM GMT
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Local AI Expansion, Dynamic Memory Upgrades & Desktop UX
                Overhaul
              </h2>
              <p className="text-white/35">
                This release is a major update focused on local AI, Dynamic
                Memory, desktop UX, and reliability.
              </p>
            </div>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <span className="text-base font-semibold text-white/80">
                  Highlights
                </span>
              </div>
              <ul>
                <li>
                  Native <strong>Ollama</strong> integration joins a much more
                  capable built-in <code>llama.cpp</code> runtime with smarter
                  GPU offload, CPU-safe fallbacks, and better local tool
                  calling
                </li>
                <li>
                  Dynamic Memory now has clearer progress, stronger safeguards,
                  revert support, and more reliable recovery from stale runs
                </li>
                <li>Added runtime fallback reports for local inference</li>
                <li>Improved CPU fallback context and batch clamping</li>
                <li>
                  Prompt caching, chat settings, and session controls were
                  expanded with cache-aware routing, better live-session sync,
                  and a redesigned settings flow
                </li>
                <li>
                  Desktop gets custom frameless window chrome, wider TopNav
                  adoption, stronger theme-token coverage, and a redesigned
                  Logs page
                </li>
                <li>
                  Models, onboarding, networking, and platform support all
                  received another broad pass for setup quality and runtime
                  reliability
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 text-purple-400" />
                </div>
                <span className="text-base font-semibold text-white/80">
                  Local AI & Runtime
                </span>
              </div>
              <ul>
                <li>
                  Added native Ollama integration and support for native Ollama
                  tool call payloads
                </li>
                <li>
                  Updated <code>llama.cpp</code> and related bindings, with
                  better local stability and runtime behavior
                </li>
                <li>
                  Reused loaded local models across concurrent requests to
                  reduce unnecessary reloads
                </li>
                <li>Added runtime fallback reports for local inference</li>
                <li>
                  Improved CPU fallback context and batch clamping, plus
                  CPU-safe auto-context behavior on CPU runtimes
                </li>
                <li>
                  Fixed several CPU-only safety issues for local inference
                </li>
                <li>Added smart GPU layer offload and strict mode overrides</li>
                <li>
                  Added GPU layer split visibility, sampler order presets, and
                  additional reasoning settings in the model editor
                </li>
                <li>
                  Improved model load progress reporting and embedded template
                  rendering via <code>oaicompat</code>
                </li>
                <li>
                  Improved fallback behavior across local chat templating and
                  rendering paths
                </li>
                <li>
                  Hardened and stabilized local tool calling, including
                  structured-output failure handling
                </li>
                <li>
                  Shared local backend usage between runtime and context-info
                  paths
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
                  <Brain className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="text-base font-semibold text-white/80">
                  Dynamic Memory & Prompting
                </span>
              </div>
              <ul>
                <li>Added a progress bar for Dynamic Memory cycles</li>
                <li>Allowed cancelling stale non-idle memory runs</li>
                <li>Reconciled stale processing state on load</li>
                <li>Improved Dynamic Memory UI state handling</li>
                <li>Switched memory fallback protocol from JSON to XML</li>
                <li>Hardened local tool fallback and repair logging</li>
                <li>
                  Added a llama sampler overwrite toggle for Dynamic Memory and
                  increased its overwrite temperature
                </li>
                <li>Hardened deletion safeguards and preset behavior</li>
                <li>Added deleted memory text to tool logs</li>
                <li>Added revert support for memory activity cycles</li>
                <li>
                  Preserved Dynamic Memory settings during backup restore
                </li>
                <li>Added prompt cache TTL and sticky routing</li>
                <li>Completed prompt caching support</li>
                <li>Improved cache-aware usage and pricing tracking</li>
                <li>Added a local RP default prompt template</li>
                <li>
                  Improved prompt and template compatibility with embedded GGUF
                  templates
                </li>
                <li>Supported USC system prompt imports</li>
              </ul>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-base font-semibold text-white/80">
                  Chat, Scenes & Roleplay Tools
                </span>
              </div>
              <ul>
                <li>Added a chat settings drawer</li>
                <li>Redesigned session advanced settings</li>
                <li>Simplified session advanced settings in some flows</li>
                <li>
                  Restored footer focus correctly after closing the drawer
                </li>
                <li>
                  Synced edited messages back into the live session cache after
                  failures and cancels
                </li>
                <li>
                  Added support for combined <code>***bold italic***</code>{" "}
                  markdown emphasis
                </li>
                <li>
                  Ignored inline image tags when scene generation is unavailable
                </li>
                <li>
                  Added support for using chat background as a scene reference
                </li>
                <li>Added a session-specific chat background picker</li>
                <li>
                  Added lorebook keyword detection modes and migration support
                  for the new detection mode
                </li>
                <li>Fixed lorebook query column alignment and schema issues</li>
                <li>
                  Improved unicode thinking parsing related to lorebooks
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-pink-500/10 border border-pink-500/30 flex items-center justify-center shrink-0">
                  <Monitor className="w-4 h-4 text-pink-400" />
                </div>
                <span className="text-base font-semibold text-white/80">
                  Desktop UX, Models & Visibility
                </span>
              </div>
              <ul>
                <li>
                  Added a runability score for <code>llama.cpp</code> models
                  and redesigned the model editor for better horizontal space
                  usage
                </li>
                <li>Kept the model editor on the same page after saving</li>
                <li>Added a local LLM setup flow to onboarding</li>
                <li>Improved recommended model installation flow</li>
                <li>
                  Fixed linking <code>mmproj</code> downloads before model
                  creation and auto-creation of recommended installs from queue
                  metadata
                </li>
                <li>Unified model selector bottom menus</li>
                <li>Redesigned the Logs page</li>
                <li>Added full DB operation logging</li>
                <li>Added <code>Ctrl+Shift+L</code> shortcut for logs</li>
                <li>Hardened logs against errors</li>
                <li>
                  Improved mobile overflow and desktop layout behavior in logs
                </li>
                <li>Added copy line(s) to the logs context menu</li>
                <li>
                  Normalized chat debug events for better parser compatibility
                </li>
                <li>
                  Added better message, load, and runtime visibility across the
                  app
                </li>
                <li>Added custom frameless titlebar and window decorations</li>
                <li>Added window controls and drag regions to more pages</li>
                <li>Migrated discovery pages to TopNav</li>
                <li>Added window controls to chat sub-pages</li>
                <li>Eliminated empty-state flashes during navigation</li>
                <li>
                  Connected more chat, sheet, and group chat surfaces to theme
                  color tokens
                </li>
                <li>Added About page GitHub icon support</li>
                <li>
                  Centralized toggle-switch UI work was introduced during this
                  cycle
                </li>
                <li>Added session background selection from chat UI</li>
              </ul>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-green-500/10 border border-green-500/30 flex items-center justify-center shrink-0">
                  <Heart className="w-4 h-4 text-green-400" />
                </div>
                <span className="text-base font-semibold text-white/80">
                  Platform, Networking & Reliability
                </span>
              </div>
              <ul>
                <li>Added LAN OpenAI gateway and Lettuce Host provider</li>
                <li>Renamed LAN Host API to API Server</li>
                <li>
                  Deferred timed-out OpenRouter pricing refreshes instead of
                  failing inline
                </li>
                <li>Added iOS ONNX Runtime installer workflow</li>
                <li>
                  Improved Windows DXGI adapter and video-memory checks
                </li>
                <li>Improved Windows Vulkan VRAM estimation clamps</li>
                <li>Repaired macOS ONNX dylib acceptance</li>
                <li>
                  Fixed valid macOS title bar style enum usage for Tauri
                </li>
                <li>Updated dependencies and runtime libraries</li>
                <li>Expanded supported thinking tag variants</li>
                <li>Normalized thinking tags across API and local responses</li>
                <li>Improved stacked toast behavior</li>
                <li>Routed persona flows through the library</li>
                <li>Removed the legacy Personas page</li>
              </ul>
            </section>

            <p className="not-prose">
              <a
                href="https://github.com/LettuceAI/app/releases"
                target="_blank"
                rel="noopener noreferrer"
              >
                View full release on GitHub →
              </a>
            </p>
          </motion.article>

          {/* Android 1.3.3 & Desktop 1.0.3 update */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="prose prose-invert max-w-none mb-14"
          >
            <div className="not-prose mb-8 pb-6 border-b border-white/[0.06]">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary/80 text-xs font-medium border border-primary/15">
                  Android 1.3.3 & Desktop 1.0.3 update
                </span>
                <span className="text-white/25 text-xs">
                  March 29, 2026
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Sync Reliability, Provider Streaming Controls & Timeout
                Consistency
              </h2>
              <p className="text-white/35">
                This update fixes a sync regression affecting some devices, adds
                per-provider streaming controls, and standardizes API request
                timeouts across the app.
              </p>
            </div>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-green-500/10 border border-green-500/30 flex items-center justify-center shrink-0">
                  <Bug className="w-4 h-4 text-green-400" />
                </div>
                <span className="text-base font-semibold text-white/80">Fixes</span>
              </div>
              <ul>
                <li>
                  Fixed a sync issue where some devices failed to apply data
                  from other devices due to replaying stale local sync payloads
                  from older app versions
                </li>
                <li>
                  After updating, the app rebuilds its local sync state once and
                  continues syncing using the current data format
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                </div>
                <span className="text-base font-semibold text-white/80">
                  Changes
                </span>
              </div>
              <ul>
                <li>Providers now have independent streaming toggles</li>
                <li>
                  Streaming can be enabled or disabled per officially supported
                  provider
                </li>
                <li>
                  Features that require non-streaming, such as dynamic memory
                  flows, continue to enforce it where needed
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-pink-500/10 border border-pink-500/30 flex items-center justify-center shrink-0">
                  <Heart className="w-4 h-4 text-pink-400" />
                </div>
                <span className="text-base font-semibold text-white/80">
                  Improvements
                </span>
              </div>
              <ul>
                <li>
                  Normalized API request timeouts to <strong>30 minutes</strong>{" "}
                  across the app
                </li>
                <li>
                  This removes inconsistent timeout behavior between chat,
                  memory, creation, group chat, and transport flows
                </li>
                <li>Improves reliability for long-running requests</li>
              </ul>
            </section>

            <p className="not-prose">
              <a
                href="https://github.com/LettuceAI/app/releases"
                target="_blank"
                rel="noopener noreferrer"
              >
                View full release on GitHub →
              </a>
            </p>
          </motion.article>

          {/* Android 1.3.2 & Desktop 1.0.2 update */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.5 }}
            className="prose prose-invert max-w-none mb-14"
          >
            <div className="not-prose mb-8 pb-6 border-b border-white/[0.06]">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary/80 text-xs font-medium border border-primary/15">
                  Android 1.3.2 & Desktop 1.0.2 update
                </span>
                <span className="text-white/25 text-xs">
                  March 27, 2026
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Security Fixes, Image Generation Providers & System Prompt Tools
              </h2>
              <p className="text-white/35">
                This update fixes two medium-severity security issues and adds
                new image generation integrations, prompt tooling, and a set of
                quality-of-life improvements across Android and Desktop.
              </p>
            </div>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-red-500/10 border border-red-500/30 flex items-center justify-center shrink-0">
                  <Bug className="w-4 h-4 text-red-400" />
                </div>
                <span className="text-base font-semibold text-white/80">
                  Security
                </span>
              </div>
              <p className="text-white/35">
                Two medium-severity security issues were fixed in this release.
                Updating is strongly recommended.
              </p>
              <ul>
                <li>
                  Fixed a backup import path traversal issue that could allow
                  arbitrary file writes
                </li>
                <li>
                  Fixed a local media path traversal issue that could allow
                  unintended file reads, writes, or deletions
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                </div>
                <span className="text-base font-semibold text-white/80">New</span>
              </div>
              <ul>
                <li>
                  Added AUTOMATIC1111 and Stability AI support for image
                  generation
                </li>
                <li>Added an update checker</li>
                <li>Added Injection Rules for System Prompts</li>
                <li>Added inline code text coloring</li>
                <li>Added the ability to delete images</li>
                <li>
                  Added Scene Generation modes: <code>manual</code>,{" "}
                  <code>ask first</code>, and <code>automatic</code>
                </li>
                <li>Added an About App page in Settings</li>
                <li>Added Debug Mode</li>
                <li>Added a Reddit button</li>
              </ul>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-pink-500/10 border border-pink-500/30 flex items-center justify-center shrink-0">
                  <Heart className="w-4 h-4 text-pink-400" />
                </div>
                <span className="text-base font-semibold text-white/80">
                  Improvements
                </span>
              </div>
              <ul>
                <li>Redesigned the Image Generation Settings page</li>
                <li>Redesigned the System Prompts entry editor</li>
              </ul>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-green-500/10 border border-green-500/30 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-green-400" />
                </div>
                <span className="text-base font-semibold text-white/80">Fixes</span>
              </div>
              <ul>
                <li>AI reference drafts now inherit model settings</li>
                <li>
                  Fixed an issue where the UI could get stuck if generation was
                  canceled mid-process
                </li>
                <li>
                  Character import now accepts <code>.uec</code> files again
                </li>
              </ul>
            </section>

            <p className="not-prose">
              <a
                href="https://github.com/LettuceAI/app/releases"
                target="_blank"
                rel="noopener noreferrer"
              >
                View full release on GitHub →
              </a>
            </p>
          </motion.article>

          {/* Android 1.3.1 & Desktop 1.0.1 update */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.5 }}
            className="prose prose-invert max-w-none mb-14"
          >
            <div className="not-prose mb-8 pb-6 border-b border-white/[0.06]">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary/80 text-xs font-medium border border-primary/15">
                  Android 1.3.1 & Desktop 1.0.1 update
                </span>
                <span className="text-white/25 text-xs">
                  March 23, 2026
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Stability Fixes, Scene Writing Options & PNG Character Cards
              </h2>
              <p className="text-white/35">
                This release focuses on bug fixes, small quality-of-life
                upgrades, and a few targeted additions for scene writing,
                reference text generation, and character card compatibility.
              </p>
            </div>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <span className="text-base font-semibold text-white/80">
                  Highlights
                </span>
              </div>
              <ul>
                <li>
                  Added Scene Description Writer and Reference Text Writer LLM
                  options
                </li>
                <li>Added support for PNG-based Character Cards</li>
                <li>
                  Fixed message images, scene toggles, sync loading, and text
                  color application issues
                </li>
                <li>
                  Improved unsaved-changes toast behavior and chat appearance
                  preview consistency on mobile
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-green-500/10 border border-green-500/30 flex items-center justify-center shrink-0">
                  <Bug className="w-4 h-4 text-green-400" />
                </div>
                <span className="text-base font-semibold text-white/80">Fixes</span>
              </div>
              <ul>
                <li>
                  Fixed memories resetting when pressing Enter during editing
                </li>
                <li>Bundled feedback sounds directly into the app binaries</li>
                <li>Fixed the Sync page so it loads correctly again</li>
                <li>Fixed Character Creation reset behavior after creation</li>
                <li>
                  Fixed regenerated images so they display correctly inside
                  messages
                </li>
                <li>
                  Fixed scene generation so it respects the disable toggle
                </li>
                <li>
                  Fixed text color application on the Colors settings page
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-pink-500/10 border border-pink-500/30 flex items-center justify-center shrink-0">
                  <Heart className="w-4 h-4 text-pink-400" />
                </div>
                <span className="text-base font-semibold text-white/80">
                  Improvements
                </span>
              </div>
              <ul>
                <li>
                  Unsaved changes toasts now stay dismissed until the next leave
                  attempt
                </li>
                <li>
                  The Chat Appearance preview now uses the same overlay as scene
                  editing on mobile
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                </div>
                <span className="text-base font-semibold text-white/80">New</span>
              </div>
              <ul>
                <li>
                  Added a Scene Description Writer LLM option for better scene
                  writing
                </li>
                <li>Added a Reference Text Writer LLM option</li>
                <li>Added support for PNG-based Character Cards</li>
              </ul>
            </section>

            <p className="not-prose">
              <a
                href="https://github.com/LettuceAI/app/releases"
                target="_blank"
                rel="noopener noreferrer"
              >
                View full release on GitHub →
              </a>
            </p>
          </motion.article>

          {/* Android 1.3.0 & Desktop release update */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.5 }}
            className="prose prose-invert max-w-none mb-14"
          >
            <div className="not-prose mb-8 pb-6 border-b border-white/[0.06]">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary/80 text-xs font-medium border border-primary/15">
                  Android 1.3.0 & Desktop release update
                </span>
                <span className="text-white/25 text-xs">
                  March 22, 2026
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Images 2.0, Built-In Local AI, Sync 2.0 & Full Chat
                Customization
              </h2>
              <p className="text-white/35">
                This release overhauls LettuceAI&apos;s image system, expands
                the local model ecosystem with built-in llama.cpp and a
                hardware-aware HuggingFace browser, rewrites sync, and ships a
                broad set of chat, UI, performance, and architecture upgrades
                across Android and Desktop.
              </p>
            </div>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <span className="text-base font-semibold text-white/80">
                  Highlights
                </span>
              </div>
              <ul>
                <li>
                  Images 2.0 redesign with scene-based generation, reusable
                  library assets, and avatar editing
                </li>
                <li>
                  Built-in llama.cpp runtime with GPU support, image generation,
                  and native tool calling
                </li>
                <li>
                  New HuggingFace GGUF browser with hardware-aware compatibility
                  estimates
                </li>
                <li>
                  Large chat upgrade covering group chats, templates, memory,
                  and streaming reliability
                </li>
                <li>
                  Full sync rewrite, deeper UI customization, and a major
                  internal architecture refactor
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <Image className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="text-base font-semibold text-white/80">
                  Images 2.0
                </span>
              </div>
              <p className="text-white/35">
                Image generation is now a first-class part of the app instead of
                a side flow.
              </p>
              <ul>
                <li>Added full image generation support for chat and scenes</li>
                <li>
                  Introduced Image Language so any LLM can trigger image
                  generation by writing scene prompts after responses
                </li>
                <li>
                  Unified all avatars, backgrounds, and generated images inside
                  one reusable library
                </li>
                <li>
                  Added avatar generation and avatar editing with image models
                </li>
                <li>
                  Added reusable reference images and text for Characters and
                  Personas during scene generation
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 text-purple-400" />
                </div>
                <span className="text-base font-semibold text-white/80">
                  Local AI & Model Ecosystem
                </span>
              </div>
              <ul>
                <li>
                  Added a built-in llama.cpp runtime with support for NVIDIA,
                  AMD, Intel GPUs, and Apple Silicon
                </li>
                <li>
                  Expanded runtime customization for local inference workflows
                </li>
                <li>
                  Added image generation and tool calling support to the local
                  runtime
                </li>
                <li>
                  Added a HuggingFace model browser for searching and exploring
                  GGUF models
                </li>
                <li>
                  Introduced hardware-aware compatibility checks with estimates
                  for context length, quantization, and KV cache usage
                </li>
                <li>
                  Added a detailed scoring breakdown for model recommendations
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-base font-semibold text-white/80">
                  Chat & Roleplay System
                </span>
              </div>
              <ul>
                <li>Increased the default max output token limit to 2048</li>
                <li>
                  Added proper memory rewind when branching chats and scene
                  editing per session
                </li>
                <li>
                  Improved streaming stability, abort handling, and multimodal
                  attachment reliability
                </li>
                <li>
                  Reworked group chats with configurable speaker selection modes
                  for LLM, heuristic, and round-robin turn management
                </li>
                <li>
                  Added per-character mute, lorebooks, pinned messages, and
                  typing haptics in group chats
                </li>
                <li>
                  Added reusable chat templates for preconfigured single-chat
                  setups
                </li>
                <li>
                  Improved Dynamic Memory with missing-tag repair, cancelable
                  memory cycles, and a no-tool-calling mode for unsupported
                  models
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-pink-500/10 border border-pink-500/30 flex items-center justify-center shrink-0">
                  <Monitor className="w-4 h-4 text-pink-400" />
                </div>
                <span className="text-base font-semibold text-white/80">
                  UI / UX & Customization
                </span>
              </div>
              <ul>
                <li>
                  Added a full chat appearance system with controls for font
                  size, text colors, card colors, background blur, and more
                </li>
                <li>Added multiple appearance presets for faster setup</li>
                <li>
                  Redesigned chat history, persona editor, character editor, and
                  model editor
                </li>
                <li>
                  Added grid view support in the model browser and persona
                  nicknames
                </li>
                <li>
                  Added full multi-language support with auto-detection and a
                  language selector
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <History className="w-4 h-4 text-amber-400" />
                </div>
                <span className="text-base font-semibold text-white/80">
                  Sync, Storage & Data
                </span>
              </div>
              <ul>
                <li>
                  Rebuilt sync to compare client state and transfer only missing
                  or outdated data instead of sending everything
                </li>
                <li>
                  Reduced bandwidth use and improved sync reliability with the
                  new diff-based flow
                </li>
                <li>Added chat package import and export support</li>
                <li>
                  Added SillyTavern <code>.jsonl</code> import support
                </li>
                <li>
                  Unified export flows for lorebooks, system prompts, and model
                  configurations
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
                  <Brain className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="text-base font-semibold text-white/80">
                  Platform & Performance
                </span>
              </div>
              <ul>
                <li>
                  Experimental iOS and macOS support is now available, though
                  some features remain unstable
                </li>
                <li>
                  Optimized Android ONNX Runtime packaging and added a crash
                  logger for fallback logging coverage
                </li>
                <li>
                  Refactored image delivery to use the Tauri Asset Protocol
                  instead of IPC, reducing memory use and lag
                </li>
                <li>
                  Reduced UI jank in image-heavy flows and the HuggingFace
                  browser
                </li>
                <li>
                  Improved lazy loading, rendering performance, and GPU fallback
                  stability
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-orange-500/10 border border-orange-500/30 flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4 text-orange-400" />
                </div>
                <span className="text-base font-semibold text-white/80">
                  Internal Architecture
                </span>
              </div>
              <ul>
                <li>
                  Modularized the chat system into execution, memory, scene
                  generation, and reply-helper layers
                </li>
                <li>
                  Added typed internal persistence and removed legacy command
                  hops
                </li>
                <li>
                  Reorganized the app around feature-based module grouping with
                  cleaner bootstrap boundaries
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-green-500/10 border border-green-500/30 flex items-center justify-center shrink-0">
                  <Bug className="w-4 h-4 text-green-400" />
                </div>
                <span className="text-base font-semibold text-white/80">
                  Fixes & Stability
                </span>
              </div>
              <ul>
                <li>Fixed provider credential routing issues</li>
                <li>Fixed chat resend and duplicate-message behavior</li>
                <li>Fixed scene and lorebook import bugs</li>
                <li>Improved accessibility contrast and layout behavior</li>
                <li>Improved mobile keyboard handling</li>
                <li>Improved crash logging reliability</li>
              </ul>
            </section>

            <p className="not-prose">
              <a
                href="https://github.com/LettuceAI/app/releases"
                target="_blank"
                rel="noopener noreferrer"
              >
                View full release on GitHub →
              </a>
            </p>
          </motion.article>

          {/* Android 1.2.0 & Desktop Beta 4 release */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.5 }}
            className="prose prose-invert max-w-none mb-14"
          >
            <div className="not-prose mb-8 pb-6 border-b border-white/[0.06]">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary/80 text-xs font-medium border border-primary/15">
                  Android 1.2.0 & Desktop Beta 4 release
                </span>
                <span className="text-white/25 text-xs">
                  February 15, 2026
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Desktop UX Overhaul, Prompt Runtime Controls, Dynamic Memory
                Upgrades & ONNX Reliability
              </h2>
              <p className="text-white/35">
                Major investment in desktop UX and character creation flow, a
                significantly expanded prompt system, broad chat stability and
                performance hardening, and continued ONNX runtime reliability
                work across desktop, Android, and Windows.
              </p>
            </div>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <span className="text-base font-semibold text-white/80">
                  Highlights
                </span>
              </div>
              <ul>
                <li>
                  Major investment in desktop UX, especially the Create
                  Character flow
                </li>
                <li>
                  Significant expansion of the prompt system with a Prompt
                  Structure Viewer and runtime prompt injection controls
                </li>
                <li>
                  Broad chat stability and performance hardening with large
                  dynamic-memory improvements
                </li>
                <li>
                  Continued embedding and ONNX runtime reliability work across
                  desktop, Android, and Windows
                </li>
                <li>
                  Expanded provider and model ecosystem, including NVIDIA NIM,
                  plus safer import behavior
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-pink-500/10 border border-pink-500/30 flex items-center justify-center shrink-0">
                  <Monitor className="w-4 h-4 text-pink-400" />
                </div>
                <span className="text-base font-semibold text-white/80">
                  Desktop UI and Character Creation Redesign
                </span>
              </div>
              <ul>
                <li>
                  Added responsive desktop layouts across character creation
                  steps
                </li>
                <li>
                  Reworked character creation step order to improve setup flow
                </li>
                <li>
                  Redesigned character extras inputs for clearer, faster editing
                </li>
                <li>
                  Improved character create/edit with fallback-model selector
                  support
                </li>
                <li>
                  Fixed create-step ordering and navigation consistency issues
                </li>
                <li>
                  Added metadata handling improvements for imported cards and
                  avatar URL behavior
                </li>
                <li>
                  Added lorebook import support in character creation workflows
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                </div>
                <span className="text-base font-semibold text-white/80">
                  Prompt System Upgrades
                </span>
              </div>
              <ul>
                <li>
                  Added Prompt Structure Viewer in the system prompt editor to
                  preview message composition
                </li>
                <li>Added conditional prompt injection mode</li>
                <li>Added interval prompt injection mode</li>
                <li>
                  Added runtime option to condense prompts into a single system
                  message
                </li>
                <li>
                  Fixed prompt import behavior to correctly respect
                  <code>prompt_order</code>
                </li>
                <li>
                  Fixed drag-and-drop reorder bugs in the prompt entry editor
                </li>
                <li>Improved prompt import UX and editor predictability</li>
              </ul>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-base font-semibold text-white/80">
                  Chat, Group Chat, and UI
                </span>
              </div>
              <ul>
                <li>
                  Added shared ChatLayout for persistent background behavior
                  across chat sub-routes
                </li>
                <li>Added shared GroupChatLayout with lifted data loading</li>
                <li>Added branch-to-group-chat action from message actions</li>
                <li>Added lorebook usage visibility per message</li>
                <li>
                  Added safe-area padding fixes for chat footer and bottom menu
                </li>
                <li>Removed unwanted dark overlay above background images</li>
                <li>
                  Fixed chat search back-button sizing and related UI polish
                </li>
                <li>
                  Improved session back-stack handling across settings/history
                  navigation
                </li>
                <li>
                  Fixed persona selection conflicts during scroll interactions
                </li>
                <li>
                  Removed duplicate dismiss controls in chat memories error
                  state
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-green-500/10 border border-green-500/30 flex items-center justify-center shrink-0">
                  <Bug className="w-4 h-4 text-green-400" />
                </div>
                <span className="text-base font-semibold text-white/80">
                  Chat Stability and Performance
                </span>
              </div>
              <ul>
                <li>
                  Fixed dynamic-memory listener leak during async chat setup
                </li>
                <li>Bounded attachment cache growth in session hooks</li>
                <li>
                  Ignored stale attachment loads after chat state transitions
                </li>
                <li>
                  Fixed cleanup of jump-to-message RAF and timeout resources
                </li>
                <li>Improved message memo checks with derived display props</li>
                <li>Reduced attachment diff cost in chat memoization</li>
                <li>Added fallback model retry logic with usage attribution</li>
                <li>
                  Disabled fallback attempts when no fallback model is
                  configured
                </li>
                <li>Added swap-places mode with role-aware generation</li>
                <li>
                  Reverted one streaming animation performance change after
                  validation feedback
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
                  <Brain className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="text-base font-semibold text-white/80">
                  Dynamic Memory System
                </span>
              </div>
              <ul>
                <li>Added cursor-delta summarization of new messages</li>
                <li>
                  Added self-healing cursor behavior after deletes/rewinds
                </li>
                <li>
                  Added deduplication by cosine similarity at memory creation
                </li>
                <li>Added adaptive decay rate based on access count</li>
                <li>Added category tagging for memories</li>
                <li>
                  Added hybrid retrieval using similarity, recency, and access
                  frequency
                </li>
                <li>Added configurable retrieval selection limit</li>
                <li>Added smart and cosine retrieval strategies</li>
                <li>Added memory panel category filter chips</li>
                <li>
                  Added memory activity log redesign with timeline and
                  collapsible UX
                </li>
                <li>
                  Auto-refresh of memory views after dynamic-memory completion
                </li>
                <li>Enforced gating behavior for dynamic-memory manual mode</li>
              </ul>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 text-purple-400" />
                </div>
                <span className="text-base font-semibold text-white/80">
                  Embeddings, ONNX Runtime, and Android
                </span>
              </div>
              <ul>
                <li>Fixed ONNX runtime bundling and dylib path handling</li>
                <li>
                  Fixed dev rebuild-loop behavior tied to ONNX runtime
                  integration
                </li>
                <li>
                  Pinned and standardized dylib preloading and path behavior
                </li>
                <li>
                  Ensured Android ONNX resource directory and packaging
                  consistency
                </li>
                <li>
                  Improved desktop guards around ONNX runtime initialization
                </li>
                <li>
                  Improved handling of ORT init result variants and booleans
                </li>
                <li>
                  Added pre-step for embedding download and runtime ORT fetch
                </li>
                <li>
                  Extracted Windows DLL dependencies for ONNX runtime packaging
                </li>
                <li>Locked ORT version to 2.0.0-rc.10</li>
                <li>
                  Added embedding model v3 support and multi-version management
                </li>
                <li>
                  Added experimental keep-loaded embedding runtime with cache
                  reset on version switch
                </li>
                <li>
                  Fixed Android post-regenerate WebView freeze and tracing
                  consistency
                </li>
                <li>Made Android ONNX runtime init deterministic</li>
              </ul>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <Image className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="text-base font-semibold text-white/80">
                  Providers, Models, Endpoints, and Security
                </span>
              </div>
              <ul>
                <li>Added NVIDIA NIM provider</li>
                <li>Added custom-provider tool-choice mode configurability</li>
                <li>Added OpenRouter free-model toggle in model selector</li>
                <li>Improved model selector search and suggestions</li>
                <li>
                  Added custom endpoint config persistence and auth/model-fetch
                  mapping controls
                </li>
                <li>
                  Hid llama.cpp provider on mobile onboarding/settings where
                  unsupported
                </li>
                <li>
                  Added security toggle to disable remote avatar downloads on
                  card import
                </li>
                <li>
                  Disabled Chutes API key validation where it blocked onboarding
                  flows
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-orange-500/10 border border-orange-500/30 flex items-center justify-center shrink-0">
                  <Heart className="w-4 h-4 text-orange-400" />
                </div>
                <span className="text-base font-semibold text-white/80">
                  Lorebooks, Usage, Sync, and Tooling
                </span>
              </div>
              <ul>
                <li>
                  Added world-info import/export and creation import action
                </li>
                <li>
                  Added character card metadata support and lorebook import path
                  improvements
                </li>
                <li>Added new pure mode content filtering system</li>
                <li>
                  Added app-time tracking backend support and analytics view
                </li>
                <li>Enforced host-authoritative manifest diff in sync logic</li>
                <li>
                  Improved DB reset error surfacing and reset-in-place behavior
                </li>
                <li>Migrated workflows to Blacksmith</li>
                <li>
                  Switched workflows to Bun and refreshed README/tooling docs
                </li>
                <li>Added libclang dependency for Windows CI builds</li>
                <li>
                  Removed duplicate Cargo libraries and cleaned project config
                </li>
                <li>
                  Added <code>.gitignore</code> updates and docs-folder ignore
                  adjustments
                </li>
                <li>Fixed Tailwind warning noise in UI build paths</li>
              </ul>
            </section>

            <p className="not-prose">
              <a
                href="https://github.com/LettuceAI/app/releases/tag/1.2.0"
                target="_blank"
                rel="noopener noreferrer"
              >
                View full release on GitHub →
              </a>
            </p>
          </motion.article>

          {/* Android 1.1.0 & Desktop Beta 3 update */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.5 }}
            className="prose prose-invert max-w-none mb-14"
          >
            {/* Release Header */}
            <div className="not-prose mb-8 pb-6 border-b border-white/[0.06]">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary/80 text-xs font-medium border border-primary/15">
                  Android 1.1.0 & Desktop Beta 3 update
                </span>
                <span className="text-white/25 text-xs">
                  January 31, 2026
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Discovery, Group Chats, Smart Creator, Prompt Editor & Local
                Inference
              </h2>
              <p className="text-white/35">
                This update brings Discovery, multi-character chats, a
                redesigned Smart Creator, and deeper local inference controls
                across Android and Desktop. It also includes a broad set of UI,
                stability, and workflow refinements shipped through January 31,
                2026.
              </p>
            </div>

            {/* Discovery */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-pink-500/10 border border-pink-500/30 flex items-center justify-center shrink-0">
                  <Image className="w-4 h-4 text-pink-400" />
                </div>
                <span className="text-base font-semibold text-white/80">
                  Discovery
                </span>
              </div>
              <p className="text-white/35">
                A brand-new Discovery system powered by Character Tavern. Browse
                trending, popular, and newest cards or search directly, preview
                details before importing, and keep Pure Mode enabled to
                automatically filter NSFW results (with blurred avatars until
                you add a character).
              </p>
            </section>

            {/* Group Chats */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0">
                  <Users className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-base font-semibold text-white/80">
                  Group Chats
                </span>
              </div>
              <p className="text-white/35">
                A brand-new chat mode that lets multiple characters share one
                conversation. The app selects the next speaker automatically (or
                you can @mention to force a character), and roleplay groups can
                start with custom scenes. Long sessions are more stable with
                improved abort handling and streaming fixes.
              </p>
            </section>

            {/* Smart Creator */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                </div>
                <span className="text-base font-semibold text-white/80">
                  Smart Creator
                </span>
              </div>
              <p className="text-white/35">
                The creation flow is now goal-based with streaming and expanded
                entity support.
              </p>

              <ul>
                <li>
                  Smart Creator now supports Characters, Personas, and Lorebooks
                  with a new goal selector and preview modes
                </li>
                <li>Streaming responses and inline previews during creation</li>
                <li>
                  Smart Tool Selection toggle added, with manual tool presets
                  and per-tool control in Advanced Settings
                </li>
                <li>
                  Image generation support with model selection in Advanced
                  Settings
                </li>
                <li>Smart Creator previews for Personas and Lorebooks</li>
              </ul>
            </section>

            {/* Help Me Reply */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-emerald-400" />
                </div>
                <span className="text-base font-semibold text-white/80">
                  Help Me Reply
                </span>
              </div>
              <p className="text-white/35">
                Reply suggestions now stream and are configurable for different
                styles.
              </p>
              <ul>
                <li>
                  Help Me Reply now supports streaming, conversation/roleplay
                  styles, and max token settings
                </li>
                <li>
                  Help Me Reply settings now allow per-feature model selection
                </li>
              </ul>
            </section>

            {/* Prompting System */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                </div>
                <span className="text-base font-semibold text-white/80">
                  Prompting System
                </span>
              </div>
              <p className="text-white/35">
                Prompts are now entry-based with presets, mobile editing, and
                clearer system controls.
              </p>

              <ul>
                <li>
                  Prompt Editor redesigned to be entry-based, with auto-scroll
                  and mobile renaming
                </li>
                <li>
                  Per-entry roles and injection controls (including in-chat
                  entries) for modular templates
                </li>
                <li>System Prompt presets can be imported and exported</li>
                <li>
                  System Prompts UI redesigned and model-level prompts removed
                </li>
                <li>
                  Added <code>{"{{user}}"}</code> placeholder support and
                  updated scene directions
                </li>
              </ul>
            </section>

            {/* Import/Export */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                </div>
                <span className="text-base font-semibold text-white/80">
                  Import & Export
                </span>
              </div>
              <p className="text-white/35">
                Expanded format support for sharing and migrating characters and
                personas.
              </p>

              <ul>
                <li>Unified Entity Card (UEC) import/export support</li>
                <li>Chara Card v1, v2, and v3 import support</li>
                <li>Export characters as UEC, Chara Card v2 and v3</li>
                <li>Personas can now be exported from the Library</li>
              </ul>
            </section>

            {/* Local Inference */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="text-base font-semibold text-white/80">
                  Local Inference
                </span>
              </div>
              <p className="text-white/35">
                Stronger local model support with advanced controls and
                stability fixes.
              </p>

              <ul>
                <li>Built-in llama.cpp runtime for desktop builds</li>
                <li>Ollama now uses native endpoints</li>
                <li>
                  Automatic context length recommendations to prevent hardware
                  crashes
                </li>
                <li>
                  Toggle to merge same-role messages for Ollama/llama.cpp
                  compatibility
                </li>
                <li>
                  Advanced settings for local inference and support for
                  &lt;think&gt; tags
                </li>
                <li>
                  CUDA support attempted for llama.cpp (currently disabled)
                </li>
              </ul>
            </section>

            {/* UI, UX & Stability */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-green-500/10 border border-green-500/30 flex items-center justify-center shrink-0">
                  <Heart className="w-4 h-4 text-green-400" />
                </div>
                <span className="text-base font-semibold text-white/80">
                  UI, UX & Stability
                </span>
              </div>
              <p className="text-white/35">
                Wide-ranging refinements across settings, editors, and
                performance.
              </p>

              <ul>
                <li>Redesigned Advanced Settings and Dynamic Memory pages</li>
                <li>
                  Creation menu refreshed and full-screen scene editor added
                </li>
                <li>
                  Improved persona selector and chat settings model selector
                  menu
                </li>
                <li>
                  Long-press reordering for Lorebook and System Prompt entries
                  on mobile
                </li>
                <li>
                  Redesigned toasts with unsaved changes protection (sticky +
                  mobile bottom)
                </li>
                <li>
                  Fixed avatar display inconsistencies and Usage page text
                  overflow
                </li>
                <li>
                  Bottom navigation simplified with larger icons and hidden
                  labels
                </li>
                <li>
                  Dynamic Memory now works correctly after 120+ messages, with
                  fixed counters
                </li>
                <li>
                  Fixed Mistral reasoning parameter handling and custom endpoint
                  base URL display
                </li>
                <li>
                  Cost calculation fixes with a new recalc option in Advanced
                  Settings
                </li>
                <li>
                  ONNX Runtime downgraded for broader device compatibility
                </li>
                <li>
                  Logging improved with a diagnostics section and global error
                  integration
                </li>
                <li>Embedding model load now has additional fail-safes</li>
              </ul>
            </section>
          </motion.article>

          {/* Android Release & Desktop Beta 2 */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.5 }}
            className="prose prose-invert max-w-none mb-14"
          >
            {/* Release Header */}
            <div className="not-prose mb-8 pb-6 border-b border-white/[0.06]">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary/80 text-xs font-medium border border-primary/15">
                  Android Release & Desktop Beta 2
                </span>
                <span className="text-white/25 text-xs">
                  January 4, 2026
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Text-to-Speech, AI Character Creator, Reply Helper, Sync,
                Accessibility Upgrades & Voice Playback
              </h2>
              <p className="text-white/35">
                This release brings LettuceAI to Android along with the second
                desktop beta update. It introduces Text-to-Speech voices, reply
                generation assistance, encrypted device-to-device sync, enhanced
                accessibility features, and per-character voice playback
                controls. These updates focus on expressiveness, comfort, and
                smoother roleplay workflows.
              </p>
            </div>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                </div>
                <span className="text-base font-semibold text-white/80">
                  AI Character Creator
                </span>
              </div>

              <p>
                The AI Character Creator helps you build fully-formed characters
                through conversation. Instead of filling forms, you describe the
                character you have in mind, and the Creator guides you
                step-by-step through details like personality, backstory, style,
                and scenes.
              </p>

              <ul>
                <li>Conversational guided character creation</li>
                <li>
                  Automatic field filling (name, traits, description, etc.)
                </li>
                <li>Optional starting scenes to define tone</li>
                <li>Attach avatars & reference material</li>
              </ul>

              <p>
                You can stop at any time, everything remains editable in the
                manual editor.
              </p>

              <p className="text-white/25 text-xs">
                The Creator uses your default app model.
              </p>
            </section>

            {/* Text-to-Speech */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                  <Volume2 className="w-4 h-4 text-primary" />
                </div>
                <span className="text-base font-semibold text-white/80">
                  Text-to-Speech Voices
                </span>
              </div>

              <p>
                Characters can now speak using natural-sounding generated
                voices. You can assign a voice per-character and optionally
                enable automatic playback for new replies.
              </p>

              <ul>
                <li>
                  <strong>Device TTS</strong> – uses your system’s built-in
                  voice engine
                </li>
                <li>
                  <strong>ElevenLabs</strong> – natural voice synthesis with
                  custom voice support
                </li>
                <li>
                  <strong>Gemini TTS</strong> – neural speech generation with
                  custom voice support
                </li>
              </ul>

              <p>
                You can also create custom voices with style descriptions and
                reuse them across characters.
              </p>

              <p className="text-white/25 text-xs">
                Generated audio is cached locally to reduce repeated
                regenerations.
              </p>
            </section>

            {/* Reply Helper */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </div>
                <span className="text-base font-semibold text-white/80">
                  Reply Helper
                </span>
              </div>

              <p>
                Sometimes it’s hard to think of what to say next. Reply Helper
                can generate a suggested reply for your current message — either
                starting from scratch or expanding the text you already wrote.
              </p>

              <ul>
                <li>
                  <strong>Use my text as base</strong> — improve or complete
                  your draft
                </li>
                <li>
                  <strong>Write something new</strong> — generate a fresh reply
                </li>
                <li>
                  <strong>Regenerate</strong> — try multiple suggestions
                </li>
              </ul>

              <p className="text-white/25 text-xs">
                Reply Helper uses your default app model.
              </p>
            </section>

            {/* Sync */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0">
                  <History className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-base font-semibold text-white/80">
                  Encrypted Device Sync
                </span>
              </div>

              <p>
                Sync lets you transfer your data securely between your own
                devices without accounts or cloud storage.
              </p>

              <ul>
                <li>Peer-to-peer encrypted transfer</li>
                <li>No servers or permanent connections</li>
                <li>You start sync manually when needed</li>
              </ul>

              <p>
                One device hosts a session, the other joins with a code. Once
                connected, your data is synced directly between devices.
              </p>
            </section>

            {/* Accessibility */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-green-500/10 border border-green-500/30 flex items-center justify-center shrink-0">
                  <Heart className="w-4 h-4 text-green-400" />
                </div>
                <span className="text-base font-semibold text-white/80">
                  Accessibility Improvements
                </span>
              </div>

              <p>
                Accessibility options now include sound and haptic feedback for
                key chat events such as sending, successful replies, and errors.
              </p>

              <ul>
                <li>Per-event volume controls</li>
                <li>Optional haptic feedback with selectable intensity</li>
                <li>Lightweight and non-intrusive</li>
              </ul>
            </section>

            {/* Character Voice Playback */}
            <section className="mb-10">
              <h3>Per-Message Voice Playback</h3>

              <p>
                You can now play voice audio for individual messages — or enable
                autoplay so your character always speaks when replying.
              </p>

              <ul>
                <li>Assign a default voice per character</li>
                <li>Optional autoplay</li>
                <li>Manual playback button per message</li>
              </ul>
            </section>

            {/* Scene Directions */}
            <section className="mb-10">
              <h3>Scene Directions</h3>

              <p>
                Scenes now support private “direction” notes that are hidden
                from the chat UI and used only to guide model behaviour during
                the opening context of a scene.
              </p>
            </section>

            {/* General Improvements */}
            <section className="mb-10">
              <h3>General Improvements</h3>
              <ul>
                <li>Improved character editing workflow</li>
                <li>Better consistency across Android & Desktop</li>
                <li>Internal cleanup & UI polish</li>
              </ul>
            </section>

            {/* Bug Fixes */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-red-500/10 border border-red-500/30 flex items-center justify-center shrink-0">
                  <Bug className="w-4 h-4 text-red-400" />
                </div>
                <span className="text-base font-semibold text-white/80">
                  Bug Fixes & Behaviour Improvements
                </span>
              </div>

              <ul>
                <li>
                  Reasoning now works correctly with the Google Gemini endpoint
                </li>
                <li>
                  Fixed an issue where Dynamic Memory processing could cancel
                  when switching pages
                </li>
                <li>
                  Fixed an issue where characters could be duplicated
                  unexpectedly
                </li>
                <li>Added a retry button to the embedding download screen</li>
                <li>Fixed Backup settings failing to load existing backups</li>
                <li>
                  Redesigned the Edit Model page into a single-page layout
                </li>
                <li>Disabled reasoning controls for the Mistral endpoint</li>
                <li>Optimised entry animations in Settings</li>
                <li>Optimised Markdown rendering performance</li>
                <li>
                  Added support for <code>(...)</code> and <code>[...]</code> as
                  italic formatting shortcuts
                </li>
                <li>
                  Added Scene Directions to help guide starting scene behaviour
                </li>
              </ul>
            </section>
          </motion.article>

          {/* Beta 6.2 Release */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.5 }}
            className="prose prose-invert max-w-none mb-14"
          >
            {/* Release Header */}
            <div className="not-prose mb-8 pb-6 border-b border-white/[0.06]">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary/80 text-xs font-medium border border-primary/15">
                  v1.0-beta.6.2
                </span>
                <span className="text-white/25 text-xs">
                  December 24, 2025
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Backup Fixes, Provider Expansion & Extended Timeout
              </h2>
              <p className="text-white/35">
                Beta 6.2 is a stability and compatibility update focused on
                fixing critical backup issues, expanding provider support with
                Ollama and LM Studio, and improving reasoning model
                compatibility.
              </p>
            </div>

            {/* Bug Fixes */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-red-500/10 border border-red-500/30 flex items-center justify-center shrink-0">
                  <Bug className="w-4 h-4 text-red-400" />
                </div>
                <span className="text-base font-semibold text-white/80">
                  Bug Fixes
                </span>
              </div>
              <ul>
                <li>
                  <strong>Fixed backup issues</strong> where data wasn't fully
                  saved
                </li>
                <li>
                  <strong>Fixed characters losing context</strong> after restore
                </li>
                <li>
                  <strong>Fixed OpenRouter & MistralAI reasoning</strong> to
                  work correctly with reasoning-capable models
                </li>
                <li>
                  <strong>Fixed backups with images</strong> not loading
                  properly
                </li>
              </ul>
            </section>

            {/* New Features */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-primary" />
                </div>
                <span className="text-base font-semibold text-white/80">
                  New Features
                </span>
              </div>
              <ul>
                <li>
                  <strong>Added Ollama & LM Studio endpoint support</strong> for
                  locally hosted models
                </li>
                <li>
                  <strong>
                    Added custom OpenAI / Anthropic-compatible endpoints
                  </strong>{" "}
                  for flexible API integration
                </li>
                <li>
                  <strong>Increased request timeout</strong> from 2 minutes to
                  15 minutes for better handling of slow models and reasoning
                  tasks
                </li>
              </ul>
            </section>
          </motion.article>

          {/* Beta 6 Release */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0 }}
            transition={{ duration: 0.5 }}
            className="prose prose-invert max-w-none"
          >
            {/* Release Header */}
            <div className="not-prose mb-8 pb-6 border-b border-white/[0.06]">
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary/80 text-xs font-medium border border-primary/15">
                  v1.0-beta.6
                </span>
                <span className="text-white/25 text-xs">
                  December 21, 2025
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Dynamic Memory v2, Lorebooks, In-Chat Image Generation & Major
                Performance Improvements
              </h2>
              <p className="text-white/35">
                Beta 6 is a major systems and UX update focused on memory
                accuracy, world consistency, creative flexibility, and
                performance. It's designed to make long conversations faster,
                more coherent, and easier to control, while expanding what's
                possible inside a single chat.
              </p>
            </div>

            {/* Dynamic Memory v2 */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                  <Brain className="w-4 h-4 text-primary" />
                </div>
                <span className="text-base font-semibold text-white/80">
                  Dynamic Memory v2
                </span>
              </div>
              <p>
                Dynamic Memory has been significantly upgraded with faster, more
                responsive memory handling, higher recall accuracy, improved
                behavior in long-running chats, and better stability across
                multiple memory cycles.
              </p>
              <p>
                Dynamic Memory v2 is designed to scale cleanly as conversations
                grow.
              </p>
            </section>

            {/* New Embedding Model */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-blue-500/10 border border-blue-500/30 flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                </div>
                <span className="text-base font-semibold text-white/80">
                  New Embedding Model
                </span>
              </div>
              <p>
                A new embedding model now powers memory retrieval in Beta 6. It
                is approximately 50% smaller than the previous model, runs
                faster during inference, and supports up to 4096 tokens
                (previously 512).
              </p>
              <p>Existing memories remain compatible. No migration required.</p>
            </section>

            {/* Context Enrichment */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 text-purple-400" />
                </div>
                <span className="text-base font-semibold text-white/80">
                  Context Enrichment{" "}
                  <span className="text-sm font-normal text-white/35">
                    (Experimental)
                  </span>
                </span>
              </div>
              <p>
                An experimental Context Enrichment feature has been introduced.
                It enhances memory queries using the new embedding model,
                improves recall accuracy in follow-up messages, and reduces
                ambiguity during semantic search.
              </p>
              <p className="text-white/25 text-xs">
                This feature is currently experimental and may evolve in future
                releases.
              </p>
            </section>

            {/* Lorebooks */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                </div>
                <span className="text-base font-semibold text-white/80">
                  Lorebooks
                </span>
              </div>
              <p>
                Lorebooks introduce a structured way to inject world, character,
                and knowledge information into chats. Define locations,
                factions, rules, history, and concepts. Lore entries are
                automatically injected when relevant and treated as established
                canon.
              </p>
              <p>
                Lorebooks improve consistency across scenes and long roleplay
                sessions while staying separate from character memory.
              </p>
            </section>

            {/* In-Chat Image Generation */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-pink-500/10 border border-pink-500/30 flex items-center justify-center shrink-0">
                  <Image className="w-4 h-4 text-pink-400" />
                </div>
                <span className="text-base font-semibold text-white/80">
                  In-Chat Image Generation
                </span>
              </div>
              <p>
                Images can now be generated directly inside conversations. This
                is supported for models that expose image generation
                capabilities, enabling visual storytelling and richer creative
                workflows directly within the chat flow.
              </p>
            </section>

            {/* Model & API Improvements */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 text-cyan-400" />
                </div>
                <span className="text-base font-semibold text-white/80">
                  Model & API Improvements
                </span>
              </div>
              <ul>
                <li>
                  Added support for the <strong>Chutes API endpoint</strong>
                </li>
                <li>
                  Introduced an <strong>OpenAI-compatible API endpoint</strong>{" "}
                  with extensive customization including custom user/assistant
                  role names and flexible chat completion behavior
                </li>
                <li>
                  Added <strong>Reasoning support</strong> for models that
                  expose reasoning tokens
                </li>
              </ul>
            </section>

            {/* Chat & Workflow Improvements */}
            <section className="mb-10">
              <h3>Chat & Workflow Improvements</h3>
              <p>
                <strong>Rewind to Here:</strong> Resume conversations from any
                previous user message. Explore alternate paths without losing
                history.
              </p>
              <p>
                <strong>Redesigned Chat Settings:</strong> A new Chat Settings
                panel designed based on user feedback and suggestions.
              </p>
            </section>

            {/* UI & Layout Improvements */}
            <section className="mb-10">
              <h3>UI & Layout Improvements</h3>
              <ul>
                <li>
                  Redesigned Character Cards for better clarity and hierarchy
                </li>
                <li>
                  Chat Header memory button now shows memory status and usage
                </li>
                <li>
                  Improved consistency across chat, settings, and character
                  screens
                </li>
                <li>Refined spacing, typography, and interaction feedback</li>
                <li>Reduced visual noise in frequently used views</li>
                <li>Redesigned chat history layout for readability</li>
              </ul>
            </section>

            {/* Desktop Builds */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-zinc-700/50 border border-zinc-600/50 flex items-center justify-center shrink-0">
                  <Monitor className="w-4 h-4 text-zinc-300" />
                </div>
                <span className="text-base font-semibold text-white/80">
                  Desktop Builds
                </span>
              </div>
              <p>
                LettuceAI continues to be available as beta desktop builds
                alongside the mobile app.
              </p>
              <ul>
                <li>
                  <strong>Windows:</strong> .msi installer, .exe portable build
                </li>
                <li>
                  <strong>Linux:</strong> .AppImage, .deb, .rpm
                </li>
              </ul>
              <p className="text-white/25 text-xs">
                Desktop builds are still considered beta while platform-specific
                issues are being refined. Functionality generally matches the
                mobile app unless otherwise noted.
              </p>
            </section>

            {/* Performance Improvements */}
            <section className="mb-10">
              <h3>Performance Improvements</h3>
              <ul>
                <li>
                  Long chats now load up to <strong>~8× faster</strong>
                </li>
                <li>
                  Character list on the homepage loads faster and scrolls more
                  smoothly
                </li>
                <li>Improved internal state handling and caching logic</li>
                <li>Backup system robustness significantly improved</li>
              </ul>
            </section>

            {/* Bug Fixes */}
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4 not-prose">
                <div className="w-7 h-7 rounded-md bg-red-500/10 border border-red-500/30 flex items-center justify-center shrink-0">
                  <Bug className="w-4 h-4 text-red-400" />
                </div>
                <span className="text-base font-semibold text-white/80">
                  Bug Fixes
                </span>
              </div>
              <ul>
                <li>
                  Fixed an issue where Dynamic Memory could get stuck after
                  cycle 2
                </li>
                <li>
                  Fixed an app freeze caused by corrupted or invalid backup
                  files
                </li>
                <li>Fixed an incorrect Google API endpoint URL</li>
              </ul>
            </section>

            {/* Thank You */}
            <section className="not-prose mt-12 p-6 rounded-2xl bg-linear-to-br from-primary/10 to-primary/5 border border-primary/20">
              <div className="flex items-center gap-3 mb-3">
                <Heart className="w-5 h-5 text-primary shrink-0" />
                <span className="text-lg font-semibold text-white">
                  Thank You
                </span>
              </div>
              <p className="text-white/35">
                Beta 6 is a foundational release that strengthens LettuceAI's
                core systems while expanding both creative and technical
                flexibility. Your feedback continues to shape LettuceAI into a
                deeply customizable, privacy-first AI companion built for
                long-term conversations and roleplay.
              </p>
              <a
                href="https://github.com/LettuceAI/mobile-app/compare/1.0-beta.5...1.0-beta.6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-sm text-primary hover:underline"
              >
                View full changelog on GitHub →
              </a>
            </section>

            {/* Bottom Download CTA */}
            <div className="not-prose mt-12 text-center">
              <ShimmerButton
                className="h-10 px-6 text-sm"
                onClick={() => navigate("/download")}
              >
                Download LettuceAI
              </ShimmerButton>
            </div>
          </motion.article>
        </div>
      </main>
    </>
  );
}
