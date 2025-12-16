# LettuceAI Website

The official website for [LettuceAI](https://github.com/LettuceAI) — a privacy-first, BYOK (Bring Your Own Key) AI chat application with infinite memory.

![LettuceAI]([public/images/logo.svg](https://lhdgeo5fms.ufs.sh/f/m0TBUtMLsaiEKHtLXijUThaiVjQ5lFnW8C6uS7RMmf4pPb9t))


## Features

- **Landing Page:** Hero section, features showcase, provider logos, testimonials
- **Documentation:** Searchable docs with sidebar navigation and code blocks
- **Download Page:** Fetches latest release from GitHub API
- **Providers Page:** Grid of supported AI providers
- **FAQ Page:** Categorized accordion-style FAQs
- **404 Page:** Custom not found page

## Tech Stack

- **Framework:** React 19 + TypeScript
- **Build:** Vite 7
- **Styling:** Tailwind CSS v4
- **Components:** shadcn/ui + Radix UI
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Routing:** React Router DOM

## Getting Started

### Prerequisites

- Node.js 20+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/LettuceAI/website.git
cd website

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The output will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── landing/       # Landing page sections (Hero, Features, etc.)
│   ├── diagrams/      # SVG diagram components
│   └── ui/            # Reusable UI components (Button, CodeBlock, etc.)
├── pages/
│   ├── docs/          # Documentation pages
│   ├── HomePage.tsx
│   ├── DownloadPage.tsx
│   ├── ProvidersPage.tsx
│   ├── FAQPage.tsx
│   └── NotFoundPage.tsx
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
├── App.tsx            # Main app with routing
├── main.tsx           # Entry point
└── index.css          # Global styles
```

## 📝 Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/download` | Download page with GitHub release info |
| `/providers` | List of supported AI providers |
| `/faq` | Frequently asked questions |
| `/docs` | Documentation index |
| `/docs/installation` | Installation guide |
| `/docs/quickstart` | Quick start tutorial |
| `/docs/api-keys` | API key configuration |
| `/docs/providers` | Provider setup guide |
| `/docs/characters` | Character creation guide |
| `/docs/memory` | Memory system documentation |

## Design System

The site uses a dark theme with green accent colors matching LettuceAI's branding:

- **Primary:** `oklch(0.648 0.2 131.684)` (Lettuce Green)
- **Background:** `oklch(0.145 0 0)` (Near Black)
- **Card:** `oklch(0.205 0 0)` (Dark Gray)

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

## 🔗 Links

- [LettuceAI App](https://github.com/LettuceAI/mobile-app)
- [Discord Community](https://discord.gg/745bEttw2r)
