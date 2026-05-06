import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import TurndownService from "turndown";
import { gfm } from "@joplin/turndown-plugin-gfm";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const prerenderDir = path.join(rootDir, ".prerender");
const templatePath = path.join(distDir, "index.html");
const serverEntryPath = path.join(prerenderDir, "entry-server.js");

const turndown = new TurndownService({
  headingStyle: "atx",
  bulletListMarker: "-",
  codeBlockStyle: "fenced",
  emDelimiter: "_",
});
turndown.use(gfm);
// Drop noise that has no value as markdown for LLMs.
turndown.remove(["script", "style", "noscript", "svg", "iframe", "nav", "footer", "form"]);
// Keep raw text from buttons (often link-like CTAs) without their wrapper.
turndown.addRule("stripButtons", {
  filter: ["button"],
  replacement: (content) => content.trim() ? `${content.trim()} ` : "",
});

const template = await fs.readFile(templatePath, "utf8");
const { render, prerenderRoutes } = await import(
  pathToFileURL(serverEntryPath).href
);

// Strip the baseline noscript fallback — prerendered routes ship real HTML.
const cleanedTemplate = template.replace(
  /<div id="root">[\s\S]*?<\/div>\s*/,
  '<div id="root"></div>',
);

/**
 * Extracts document-metadata tags (title, meta, link, ld+json) that React 19
 * rendered inline in the body, and returns them alongside the body with those
 * tags stripped. react-helmet-async@3 in React 19 mode emits these as real JSX
 * elements; React only auto-hoists them when rendering a full document, so
 * with our partial prerender we do the hoisting here.
 */
function extractHeadTags(body) {
  const extracted = [];
  let stripped = body;

  const patterns = [
    /<title>[\s\S]*?<\/title>/gi,
    /<meta\b[^>]*\/?>/gi,
    /<link\b[^>]*\/?>/gi,
    /<script\b[^>]*type="application\/ld\+json"[^>]*>[\s\S]*?<\/script>/gi,
  ];

  for (const pattern of patterns) {
    const matches = stripped.match(pattern);
    if (matches) {
      extracted.push(...matches);
      stripped = stripped.replace(pattern, "");
    }
  }

  return { head: extracted.join("\n"), body: stripped };
}

function pickMain(html) {
  const match = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i);
  return match ? match[1] : html;
}

function unescape(str) {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function pickMeta(headHtml, name) {
  const re = new RegExp(
    `<meta\\s+(?:name|property)=["']${name}["']\\s+content=["']([^"']*)["']`,
    "i",
  );
  const m = headHtml.match(re);
  return m ? unescape(m[1]) : "";
}

function pickTitle(headHtml) {
  const m = headHtml.match(/<title>([\s\S]*?)<\/title>/i);
  return m ? unescape(m[1].trim()) : "";
}

function buildMarkdown(route, headHtml, mainHtml) {
  const title = pickTitle(headHtml);
  const description = pickMeta(headHtml, "description");
  const md = turndown
    .turndown(mainHtml)
    // Collapse 3+ blank lines that turndown sometimes emits.
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  const frontmatter = [
    "---",
    `url: https://lettuceai.app${route}`,
    title ? `title: ${JSON.stringify(title)}` : null,
    description ? `description: ${JSON.stringify(description)}` : null,
    "---",
  ]
    .filter(Boolean)
    .join("\n");
  return `${frontmatter}\n\n${md}\n`;
}

let ok = 0;
let failed = 0;

for (const route of prerenderRoutes) {
  try {
    const { headContent, appHtml } = await render(route);
    // React 19 hoists <title>/<meta>/<link> into <head>; ld+json scripts render
    // inline in the body. Combine both sources.
    const bodyExtraction = extractHeadTags(appHtml);
    const head = [headContent.trim(), bodyExtraction.head].filter(Boolean).join("\n");
    const body = bodyExtraction.body;

    let html = cleanedTemplate;

    if (head) {
      // Drop template defaults that per-route Helmet tags now own.
      html = html
        .replace(/<title>[\s\S]*?<\/title>\s*/i, "")
        .replace(/<meta\s+name="description"[^>]*>\s*/i, "")
        .replace(/<meta\s+name="keywords"[^>]*>\s*/i, "")
        .replace(/<meta\s+property="og:title"[^>]*>\s*/i, "")
        .replace(/<meta\s+property="og:description"[^>]*>\s*/i, "")
        .replace(/<meta\s+property="og:url"[^>]*>\s*/i, "")
        .replace(/<meta\s+name="twitter:title"[^>]*>\s*/i, "")
        .replace(/<meta\s+name="twitter:description"[^>]*>\s*/i, "")
        .replace(/<meta\s+name="twitter:url"[^>]*>\s*/i, "")
        .replace(/<meta\s+property="og:image"[^>]*>\s*/i, "")
        .replace(/<meta\s+property="og:image:width"[^>]*>\s*/i, "")
        .replace(/<meta\s+property="og:image:height"[^>]*>\s*/i, "")
        .replace(/<meta\s+property="og:image:alt"[^>]*>\s*/i, "")
        .replace(/<meta\s+name="twitter:image"[^>]*>\s*/i, "");
    }

    html = html.replace(
      '<div id="root"></div>',
      `<div id="root">${body}</div>`,
    );
    html = html.replace("</head>", `${head ? `\n${head}\n` : ""}</head>`);

    const filePath =
      route === "/"
        ? path.join(distDir, "index.html")
        : path.join(distDir, route.replace(/^\//, ""), "index.html");

    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, html);

    // Companion markdown for AI crawlers: served at /foo.md (and /index.md for "/").
    const mdPath =
      route === "/"
        ? path.join(distDir, "index.md")
        : path.join(distDir, `${route.replace(/^\//, "")}.md`);
    const mainHtml = pickMain(body);
    const markdown = buildMarkdown(route, head, mainHtml);
    await fs.mkdir(path.dirname(mdPath), { recursive: true });
    await fs.writeFile(mdPath, markdown);

    ok++;
    console.log(`  ✓ ${route}`);
  } catch (err) {
    failed++;
    console.error(`  ✗ ${route}: ${err instanceof Error ? err.message : err}`);
  }
}

await fs.rm(prerenderDir, { recursive: true, force: true });

console.log(`\nPrerendered ${ok} route(s)${failed ? `, ${failed} failed` : ""}.`);
if (failed) process.exit(1);
