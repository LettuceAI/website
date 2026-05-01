import { marked } from "marked";

export type BlogPostMeta = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  author?: string;
  avatarUrl?: string;
  categories: string[];
  cover?: string;
  featured: boolean;
};

export type BlogPost = BlogPostMeta & {
  html: string;
  readingMinutes: number;
};

type RawModule = string;

const rawFiles = import.meta.glob<RawModule>("../content/blog/*.md", {
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

function slugFromPath(filePath: string): string {
  const name = filePath.split("/").pop()!.replace(/\.md$/, "");
  return name.replace(/^\d{4}-\d{2}-\d{2}-/, "");
}

function readingTime(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 220));
}

marked.setOptions({ gfm: true, breaks: false });

// Render fenced ```mermaid blocks as <div class="mermaid"> for client-side rendering.
marked.use({
  renderer: {
    code(token) {
      if (token.lang === "mermaid") {
        return `<div class="mermaid">${token.text}</div>`;
      }
      return false;
    },
  },
});

const posts: BlogPost[] = Object.entries(rawFiles)
  .map(([path, raw]) => {
    const { data, body } = parseFrontmatter(raw);
    const slug = data.slug || slugFromPath(path);
    const html = marked.parse(body, { async: false }) as string;
    const categoriesRaw = data.categories || data.category || "";
    const categories = categoriesRaw
      .split(",")
      .map((c) => c.trim())
      .filter(Boolean);
    return {
      slug,
      title: data.title || slug,
      date: data.date || "",
      excerpt: data.excerpt || "",
      author: data.author,
      avatarUrl: data.avatarUrl,
      categories,
      cover: data.cover,
      featured: /^(true|1|yes)$/i.test(data.featured || ""),
      html,
      readingMinutes: readingTime(body),
    };
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export function getAllPosts(): BlogPostMeta[] {
  return posts.map((p) => ({
    slug: p.slug,
    title: p.title,
    date: p.date,
    excerpt: p.excerpt,
    author: p.author,
    avatarUrl: p.avatarUrl,
    categories: p.categories,
    cover: p.cover,
    featured: p.featured,
  }));
}

export function getAllPostsWithBody(): BlogPost[] {
  return posts;
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return posts.map((p) => p.slug);
}

export function formatBlogDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
