export type ChangelogSection = {
  title: string;
  items: string[];
};

export type ChangelogEntry = {
  slug: string;
  version: string;
  platforms: string[];
  date: string;
  title: string;
  tagline: string;
  githubUrl?: string;
  sections: ChangelogSection[];
};

type RawModule = string;

const rawFiles = import.meta.glob<RawModule>("../content/changelog/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

function parseFrontmatter(raw: string): { data: Record<string, string>; body: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) return { data: {}, body: raw };
  const data: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  }
  return { data, body: match[2] };
}

// Convert a markdown bullet item into an HTML fragment.
// Supports inline backticks for `code`, **bold**, and *italic*.
function renderItem(text: string): string {
  return text
    .trim()
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/(?<!\*)\*(?!\*)([^*]+)\*(?!\*)/g, "<em>$1</em>");
}

// Parse changelog body: ## Heading lines split sections, - lines are items.
// Multi-line items are joined.
function parseSections(body: string): ChangelogSection[] {
  const sections: ChangelogSection[] = [];
  let current: ChangelogSection | null = null;
  let buffer: string | null = null;

  const flushItem = () => {
    if (buffer != null && current) {
      current.items.push(renderItem(buffer));
    }
    buffer = null;
  };

  const lines = body.split("\n");
  for (const line of lines) {
    const heading = line.match(/^##\s+(.+?)\s*$/);
    if (heading) {
      flushItem();
      if (current) sections.push(current);
      current = { title: heading[1].trim(), items: [] };
      continue;
    }
    const itemMatch = line.match(/^[-*]\s+(.+?)\s*$/);
    if (itemMatch) {
      flushItem();
      buffer = itemMatch[1];
      continue;
    }
    // Continuation line for a multi-line item (indented or non-empty after item)
    if (buffer != null && /^\s+\S/.test(line)) {
      buffer += " " + line.trim();
      continue;
    }
    if (line.trim() === "") {
      flushItem();
    }
  }
  flushItem();
  if (current) sections.push(current);

  return sections;
}

function slugFromPath(filePath: string): string {
  const name = filePath.split("/").pop()!.replace(/\.md$/, "");
  return name.replace(/^\d{4}-\d{2}-\d{2}-/, "");
}

const entries: ChangelogEntry[] = Object.entries(rawFiles)
  .map(([path, raw]) => {
    const { data, body } = parseFrontmatter(raw);
    const platforms = (data.platforms || "")
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean);
    return {
      slug: data.slug || slugFromPath(path),
      version: data.version || "",
      platforms,
      date: data.date || "",
      title: data.title || "",
      tagline: data.tagline || "",
      githubUrl: data.githubUrl,
      sections: parseSections(body),
    };
  })
  .sort((a, b) => {
    if (a.date !== b.date) return a.date < b.date ? 1 : -1;
    return a.slug < b.slug ? 1 : -1;
  });

export function getAllChangelogEntries(): ChangelogEntry[] {
  return entries;
}

export function formatChangelogDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
