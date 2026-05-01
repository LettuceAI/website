import { useEffect, useRef } from "react";
import { SEO } from "@/components/common/SEO";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import {
  formatBlogDate,
  getAllPosts,
  getPostBySlug,
} from "@/lib/blog";
import { NotFoundPage } from "./NotFoundPage";

export function BlogPostPage() {
  const { slug = "" } = useParams<{ slug: string }>();
  const post = getPostBySlug(slug);
  const articleRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!post) return;
    if (!articleRef.current?.querySelector(".mermaid")) return;
    let cancelled = false;
    (async () => {
      const { default: mermaid } = await import("mermaid");
      if (cancelled) return;
      mermaid.initialize({
        startOnLoad: false,
        theme: "dark",
        themeVariables: {
          background: "#050505",
          primaryColor: "#1a1a1a",
          primaryTextColor: "#e4e4e7",
          primaryBorderColor: "rgba(255,255,255,0.12)",
          lineColor: "rgba(255,255,255,0.35)",
          secondaryColor: "#0d0d0d",
          tertiaryColor: "#0a0a0a",
          fontFamily: "inherit",
        },
        securityLevel: "strict",
      });
      const nodes = articleRef.current?.querySelectorAll<HTMLElement>(".mermaid");
      if (!nodes) return;
      for (const [i, node] of nodes.entries()) {
        if (node.dataset.processed === "true") continue;
        const code = node.textContent || "";
        try {
          const { svg } = await mermaid.render(`mermaid-${post.slug}-${i}`, code);
          if (cancelled) return;
          node.innerHTML = svg;
          node.dataset.processed = "true";
        } catch (err) {
          node.innerHTML = `<pre class="text-red-400 text-sm">Mermaid error: ${err instanceof Error ? err.message : String(err)}</pre>`;
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [post?.slug, post]);

  if (!post) return <NotFoundPage />;

  const allPosts = getAllPosts();
  const idx = allPosts.findIndex((p) => p.slug === slug);
  const prev = idx >= 0 ? allPosts[idx + 1] : undefined;
  const next = idx > 0 ? allPosts[idx - 1] : undefined;

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.date,
          image: post.cover,
          author: post.author
            ? { "@type": "Person", name: post.author }
            : { "@type": "Organization", name: "LettuceAI" },
          url: `https://lettuceai.app/blog/${post.slug}`,
        }}
      />
      <main className="min-h-screen bg-[#050505] pt-24 pb-24">
        {/* Hero — left-aligned title, wide cover image */}
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto px-6 sm:px-10"
        >
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-12 text-[13px] text-white/40">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span className="text-white/20">/</span>
            <Link to="/blog" className="hover:text-primary transition-colors inline-flex items-center gap-1.5">
              <ArrowLeft className="w-3 h-3" />
              Blog
            </Link>
            {post.categories[0] && (
              <>
                <span className="text-white/20">/</span>
                <span className="text-white/60">{post.categories[0]}</span>
              </>
            )}
          </nav>

          <h1 className="font-display text-[2.5rem] sm:text-[3.5rem] lg:text-[4.25rem] font-bold text-white leading-[1.05] tracking-[-0.025em] mb-6 max-w-4xl">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="text-lg sm:text-xl text-white/55 leading-[1.55] mb-12 max-w-3xl">
              {post.excerpt}
            </p>
          )}

          {/* Big cover image */}
          {post.cover && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative aspect-[2/1] sm:aspect-[21/9] overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] mb-10"
            >
              <img
                src={post.cover}
                alt={post.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </motion.div>
          )}

          {/* Author + meta row, below image, left-aligned */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pb-10 mb-12 border-b border-white/[0.06]">
            {post.author && (
              <div className="flex items-center gap-3">
                {post.avatarUrl ? (
                  <img
                    src={post.avatarUrl}
                    alt={post.author}
                    className="w-9 h-9 rounded-full object-cover border border-white/10"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-primary/15 border border-primary/25 flex items-center justify-center text-primary text-sm font-semibold">
                    {post.author.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="text-sm text-white/80">{post.author}</span>
              </div>
            )}
            <span className="text-white/15">·</span>
            <time className="text-[13px] text-white/45" dateTime={post.date}>
              {formatBlogDate(post.date)}
            </time>
            <span className="text-white/15">·</span>
            <span className="text-[13px] text-white/45">
              {post.readingMinutes} min read
            </span>
          </div>
        </motion.header>

        {/* Body — narrower column, left-aligned */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="max-w-6xl mx-auto px-6 sm:px-10"
        >

          <article
            ref={articleRef}
            className="prose blog-content"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />

          {(prev || next) && (
            <nav className="mt-24 pt-10 border-t border-white/[0.06] grid grid-cols-1 sm:grid-cols-2 gap-6">
              {prev ? (
                <Link
                  to={`/blog/${prev.slug}`}
                  className="group block p-5 rounded-xl border border-white/[0.06] hover:border-primary/30 transition-colors"
                >
                  <div className="text-[11px] uppercase tracking-[0.2em] text-white/35 mb-2">
                    ← Previous
                  </div>
                  <div className="text-white/80 group-hover:text-primary transition-colors leading-snug">
                    {prev.title}
                  </div>
                </Link>
              ) : (
                <div />
              )}
              {next ? (
                <Link
                  to={`/blog/${next.slug}`}
                  className="group block p-5 rounded-xl border border-white/[0.06] hover:border-primary/30 transition-colors sm:text-right"
                >
                  <div className="text-[11px] uppercase tracking-[0.2em] text-white/35 mb-2">
                    Next →
                  </div>
                  <div className="text-white/80 group-hover:text-primary transition-colors leading-snug">
                    {next.title}
                  </div>
                </Link>
              ) : (
                <div />
              )}
            </nav>
          )}
        </motion.div>
      </main>
    </>
  );
}
