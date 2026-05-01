import { useEffect, useMemo, useState } from "react";
import { SEO } from "@/components/common/SEO";
import { motion } from "framer-motion";
import {
  Brain,
  Sparkles,
  BookOpen,
  Image as ImageIcon,
  Zap,
  Monitor,
  Bug,
  Heart,
  Volume2,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import {
  formatChangelogDate,
  getAllChangelogEntries,
  type ChangelogEntry,
  type ChangelogSection,
} from "@/lib/changelog";

type IconStyle = { Icon: LucideIcon; color: string };

const ICONS: Record<string, IconStyle> = {
  highlights:  { Icon: Sparkles,  color: "text-primary" },
  fixes:       { Icon: Bug,       color: "text-green-400" },
  changes:     { Icon: Heart,     color: "text-green-400" },
  memory:      { Icon: Brain,     color: "text-cyan-400" },
  prompts:     { Icon: BookOpen,  color: "text-amber-400" },
  local:       { Icon: Zap,       color: "text-purple-400" },
  desktop:     { Icon: Monitor,   color: "text-pink-400" },
  diagnostics: { Icon: Monitor,   color: "text-pink-400" },
  onboarding:  { Icon: Users,     color: "text-blue-400" },
  chat:        { Icon: Users,     color: "text-blue-400" },
  group:       { Icon: Users,     color: "text-blue-400" },
  tts:         { Icon: Volume2,   color: "text-purple-400" },
  voice:       { Icon: Volume2,   color: "text-purple-400" },
  image:       { Icon: ImageIcon, color: "text-pink-400" },
  scene:       { Icon: ImageIcon, color: "text-pink-400" },
  platform:    { Icon: Heart,     color: "text-green-400" },
  reliability: { Icon: Heart,     color: "text-green-400" },
  performance: { Icon: Zap,       color: "text-purple-400" },
  default:     { Icon: Sparkles,  color: "text-primary" },
};

function iconForSection(title: string): IconStyle {
  const lc = title.toLowerCase();
  const checks: Array<[string, string]> = [
    ["highlight", "highlights"],
    ["bug", "fixes"], ["fix", "fixes"], ["stability", "fixes"],
    ["change", "changes"],
    ["memory", "memory"], ["embedding", "memory"], ["context", "memory"],
    ["prompt", "prompts"], ["template", "prompts"], ["lorebook", "prompts"], ["smart", "prompts"],
    ["local", "local"], ["runtime", "local"], ["inference", "local"],
    ["ollama", "local"], ["llama", "local"], ["model", "local"], ["api", "local"],
    ["performance", "performance"],
    ["desktop", "desktop"], ["ux", "desktop"], ["ui", "desktop"],
    ["diagnostic", "diagnostics"], ["log", "diagnostics"],
    ["onboarding", "onboarding"], ["sync", "onboarding"], ["backup", "onboarding"],
    ["data", "onboarding"], ["import", "onboarding"], ["export", "onboarding"],
    ["group", "group"], ["discovery", "group"],
    ["chat", "chat"], ["help", "chat"], ["reply", "chat"],
    ["scene", "scene"], ["image", "image"],
    ["voice", "voice"], ["tts", "tts"], ["text-to-speech", "tts"],
    ["accessibility", "platform"], ["network", "platform"],
    ["platform", "platform"], ["build", "platform"],
    ["polish", "reliability"], ["reliability", "reliability"], ["localization", "reliability"],
  ];
  for (const [needle, key] of checks) {
    if (lc.includes(needle)) return ICONS[key];
  }
  return ICONS.default;
}

function isHighlights(title: string) {
  return /highlight/i.test(title);
}

// "Android 1.5.1 & Desktop 1.2.1" → "1.5.1 / 1.2.1"
// "Beta 6.2" → "Beta 6.2"
function shortVersion(version: string): string {
  return version
    .replace(/Android\s+/gi, "")
    .replace(/Desktop\s+/gi, "")
    .replace(/&/g, "/")
    .replace(/\s+/g, " ")
    .trim();
}

function HighlightsGrid({ section }: { section: ChangelogSection }) {
  return (
    <div className="mb-14 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
      {section.items.map((item, i) => (
        <div key={i} className="flex gap-3">
          <span
            aria-hidden
            className="mt-[0.6rem] w-1 h-1 rounded-full bg-primary shrink-0"
          />
          <p
            className="text-[14px] text-white/75 leading-[1.6]"
            dangerouslySetInnerHTML={{ __html: item }}
          />
        </div>
      ))}
    </div>
  );
}

function SectionBlock({ section }: { section: ChangelogSection }) {
  const { Icon, color } = iconForSection(section.title);
  return (
    <section className="mb-10">
      <div className="flex items-center gap-2 mb-3.5">
        <Icon className={`w-3.5 h-3.5 ${color} shrink-0`} />
        <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/55">
          {section.title}
        </span>
      </div>
      <ul className="space-y-2 text-[15px] text-white/65 leading-[1.7] list-disc list-outside pl-5 marker:text-white/20">
        {section.items.map((item, i) => (
          <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </ul>
    </section>
  );
}

function ReleaseEntry({
  entry,
  isLast,
}: {
  entry: ChangelogEntry;
  isLast: boolean;
}) {
  const highlights = entry.sections.find((s) => isHighlights(s.title));
  const otherSections = entry.sections.filter((s) => !isHighlights(s.title));

  return (
    <article
      id={`v-${entry.slug}`}
      className="scroll-mt-28 pt-12 lg:pt-16 first:pt-0"
    >
      <div className="flex flex-col lg:flex-row lg:gap-12">
        {/* Sticky left rail */}
        <aside className="lg:w-[160px] lg:shrink-0 mb-6 lg:mb-0">
          <div className="lg:sticky lg:top-28">
            {entry.platforms.length > 0 && (
              <div className="text-primary text-[10px] font-semibold uppercase tracking-[0.22em] mb-3">
                {entry.platforms.join(" · ")}
              </div>
            )}
            <div className="font-mono text-[15px] text-white/90 leading-tight mb-2 break-all">
              {shortVersion(entry.version)}
            </div>
            <time
              className="text-[12px] text-white/40"
              dateTime={entry.date}
            >
              {formatChangelogDate(entry.date)}
            </time>
          </div>
        </aside>

        {/* Content */}
        <div className="flex-1 min-w-0 max-w-[720px]">
          <h2 className="text-[26px] sm:text-[30px] font-semibold text-white tracking-[-0.015em] leading-[1.2] mb-3">
            {entry.title}
          </h2>
          {entry.tagline && (
            <p className="text-[15px] text-white/45 leading-[1.7] mb-10">
              {entry.tagline}
            </p>
          )}

          {highlights && <HighlightsGrid section={highlights} />}

          {otherSections.map((s, i) => (
            <SectionBlock key={i} section={s} />
          ))}

          {entry.githubUrl && (
            <a
              href={entry.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-primary/75 hover:text-primary text-sm transition-colors"
            >
              View full release on GitHub →
            </a>
          )}
        </div>
      </div>

      {!isLast && (
        <div className="mt-16 lg:mt-20 border-t border-white/[0.06]" />
      )}
    </article>
  );
}

function FloatingTOC({
  entries,
  activeSlug,
}: {
  entries: ChangelogEntry[];
  activeSlug: string;
}) {
  const byYear = useMemo(() => {
    const groups: Array<[string, ChangelogEntry[]]> = [];
    for (const e of entries) {
      const year = (e.date || "0000").slice(0, 4);
      const last = groups[groups.length - 1];
      if (last && last[0] === year) last[1].push(e);
      else groups.push([year, [e]]);
    }
    return groups;
  }, [entries]);

  return (
    <aside
      aria-label="Release index"
      className="hidden xl:block fixed top-32 right-[max(2rem,calc((100vw-78rem)/2))] w-[150px] max-h-[calc(100vh-200px)] overflow-y-auto pr-2"
      style={{ scrollbarWidth: "none" }}
    >
      <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/35 mb-5">
        Releases
      </div>
      {byYear.map(([year, list]) => (
        <div key={year} className="mb-6">
          <div className="font-mono text-[10px] text-white/30 mb-2.5 pl-3">
            {year}
          </div>
          <ul className="relative">
            <span
              aria-hidden
              className="absolute left-0 top-1 bottom-1 w-px bg-white/[0.06]"
            />
            {list.map((e) => {
              const active = activeSlug === e.slug;
              return (
                <li key={e.slug} className="relative">
                  {active && (
                    <span
                      aria-hidden
                      className="absolute left-0 top-1 bottom-1 w-px bg-primary"
                    />
                  )}
                  <a
                    href={`#v-${e.slug}`}
                    className={`block pl-3 py-1.5 transition-colors ${
                      active
                        ? "text-primary"
                        : "text-white/45 hover:text-white/80"
                    }`}
                  >
                    <div className="font-mono text-[11px] leading-tight">
                      {shortVersion(e.version)}
                    </div>
                    <div
                      className={`text-[10px] mt-0.5 ${
                        active ? "text-white/55" : "text-white/30"
                      }`}
                    >
                      {new Date(e.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </div>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </aside>
  );
}

function MobileTOC({ entries }: { entries: ChangelogEntry[] }) {
  return (
    <details className="xl:hidden mb-12 group">
      <summary className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.02] cursor-pointer list-none [&::-webkit-details-marker]:hidden hover:border-white/15 transition-colors">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
            Jump to release
          </span>
          <span className="font-mono text-[12px] text-white/70">
            {entries.length} versions
          </span>
        </div>
        <svg
          className="w-4 h-4 text-white/40 transition-transform group-open:rotate-180"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </summary>
      <div className="mt-3 p-2 rounded-xl border border-white/[0.06] bg-white/[0.015] max-h-[60vh] overflow-y-auto">
        <ul className="grid grid-cols-2 sm:grid-cols-3 gap-1">
          {entries.map((e) => (
            <li key={e.slug}>
              <a
                href={`#v-${e.slug}`}
                className="block px-3 py-2 rounded-md hover:bg-white/[0.04] transition-colors"
              >
                <div className="font-mono text-[12px] text-white/80">
                  {shortVersion(e.version)}
                </div>
                <div className="text-[10px] text-white/35 mt-0.5">
                  {new Date(e.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}

export function ChangelogPage() {
  const navigate = useNavigate();
  const entries = getAllChangelogEntries();
  const [activeSlug, setActiveSlug] = useState<string>(
    entries[0]?.slug ?? "",
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (entries.length === 0) return;

    const observer = new IntersectionObserver(
      (observed) => {
        const visible = observed.filter((o) => o.isIntersecting);
        if (visible.length === 0) return;
        const topmost = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
        );
        const slug = topmost.target.id.replace(/^v-/, "");
        setActiveSlug(slug);
      },
      { rootMargin: "-120px 0px -55% 0px", threshold: 0 },
    );

    const els = document.querySelectorAll<HTMLElement>("article[id^='v-']");
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [entries]);

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
          description:
            "Track updates, improvements, and fixes across LettuceAI releases.",
          isPartOf: {
            "@type": "WebSite",
            name: "LettuceAI",
            url: "https://lettuceai.app",
          },
        }}
      />
      <main className="min-h-screen bg-[#050505] pt-28 pb-24">
        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          <motion.header
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-primary/40" />
              <span className="text-primary text-[11px] font-semibold uppercase tracking-[0.22em]">
                Changelog
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-[-0.02em] mb-4">
              What's{" "}
              <span className="font-display italic text-primary">new</span>
            </h1>
            <p className="text-[15px] text-white/40 leading-[1.7] max-w-xl mb-7">
              Track updates, improvements, and fixes across LettuceAI releases.
            </p>
            <ShimmerButton
              className="h-10 px-6 text-sm"
              onClick={() => navigate("/download")}
            >
              Download Latest Version
            </ShimmerButton>
          </motion.header>

          <MobileTOC entries={entries} />
          <FloatingTOC entries={entries} activeSlug={activeSlug} />

          <div>
            {entries.map((entry, i) => (
              <ReleaseEntry
                key={entry.slug}
                entry={entry}
                isLast={i === entries.length - 1}
              />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
