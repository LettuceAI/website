import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { HelmetProvider } from "react-helmet-async";
import { AppContent } from "@/App";
import { SnowProvider } from "@/contexts/SnowContext";
import { getAllSlugs } from "@/lib/blog";

type RenderedPage = {
  headContent: string;
  appHtml: string;
};

export const prerenderRoutes = [
  "/",
  "/download",
  "/providers",
  "/faq",
  "/changelog",
  "/convert",
  "/privacy",
  "/terms",
  "/license",
  "/docs",
  "/docs/installation",
  "/docs/quickstart",
  "/docs/ai-basics",
  "/docs/api-keys",
  "/docs/providers",
  "/docs/models",
  "/docs/images",
  "/docs/sync",
  "/docs/accessibility",
  "/docs/help-me-reply",
  "/docs/tts",
  "/docs/characters",
  "/docs/chat-templates",
  "/docs/group-chats",
  "/docs/discovery",
  "/docs/memory",
  "/docs/lorebooks",
  "/docs/personas",
  "/docs/system-prompts",
  "/docs/smart-creator",
  "/docs/model-browser",
  "/docs/ollama",
  "/blog",
  ...getAllSlugs().map((slug) => `/blog/${slug}`),
];

export async function render(url: string): Promise<RenderedPage> {
  // Render inside a minimal <html><head><body> shell so React 19's metadata
  // hoisting lands <title>/<meta>/<link> into the head where we can find them.
  const html = renderToString(
    <html>
      <head />
      <body>
        <HelmetProvider>
          <SnowProvider>
            <div data-prerender-app="">
              <StaticRouter location={url}>
                <AppContent />
              </StaticRouter>
            </div>
          </SnowProvider>
        </HelmetProvider>
      </body>
    </html>,
  );

  const headMatch = html.match(/<head>([\s\S]*?)<\/head>/i);
  const headContent = headMatch ? headMatch[1] : "";

  const openMarker = '<div data-prerender-app="">';
  const closeMarker = "</div>";
  const openIdx = html.indexOf(openMarker);
  if (openIdx === -1) {
    throw new Error(`Prerender marker not found for route: ${url}`);
  }
  const bodyStart = openIdx + openMarker.length;
  const bodyEnd = html.lastIndexOf(closeMarker);
  if (bodyEnd < bodyStart) {
    throw new Error(`Prerender close marker not found for route: ${url}`);
  }

  return {
    headContent,
    appHtml: html.slice(bodyStart, bodyEnd),
  };
}
