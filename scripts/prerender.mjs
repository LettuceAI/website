import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");
const prerenderDir = path.join(rootDir, ".prerender");
const templatePath = path.join(distDir, "index.html");
const serverEntryPath = path.join(prerenderDir, "entry-server.js");

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
        .replace(/<meta\s+name="twitter:url"[^>]*>\s*/i, "");
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
