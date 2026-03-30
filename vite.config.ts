import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import prerender from "@prerenderer/rollup-plugin"

const routes = [
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
]

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    prerender({
      routes,
      renderer: "@prerenderer/renderer-puppeteer",
      rendererOptions: {
        maxConcurrentRoutes: 4,
        renderAfterTime: 3000,
      },
      postProcess(renderedRoute) {
        renderedRoute.route = renderedRoute.originalRoute
        renderedRoute.html = renderedRoute.html
          .replace(/<title>LettuceAI - Private, User-Controlled AI Chat<\/title>/, "")
          .replace(/<!-- Open Graph -->[\s\S]*?<!-- Twitter \/ X -->[\s\S]*?twitter:image[^>]*>/, "")
          .replace(/<meta name="description"[\s\S]*?content="LettuceAI is a privacy-first[^"]*"\s*\/?>/, "")
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    sourcemap: false,
  },
})
