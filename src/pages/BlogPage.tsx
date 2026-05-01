import { SEO } from "@/components/common/SEO";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getAllPosts, formatBlogDate } from "@/lib/blog";

export function BlogPage() {
  const posts = getAllPosts();
  const featuredIndex = posts.findIndex((p) => p.featured);
  const featured = featuredIndex >= 0 ? posts[featuredIndex] : posts[0];
  const rest = posts.filter((p) => p.slug !== featured?.slug);

  return (
    <>
      <SEO
        title="Blog"
        description="Notes from the LettuceAI team — releases, technical deep-dives, and the thinking behind the product."
        path="/blog"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "LettuceAI Blog",
          url: "https://lettuceai.app/blog",
          description:
            "Notes from the LettuceAI team — releases, technical deep-dives, and the thinking behind the product.",
        }}
      />
      <main className="min-h-screen bg-[#050505] pt-28 pb-24">
        <div className="max-w-6xl mx-auto px-6 sm:px-10">
          <motion.header
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-20"
          >
            <div className="text-[13px] font-semibold text-white/80 mb-8">
              Blog
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-semibold text-white tracking-[-0.02em] leading-[1.05] mb-6">
              Notes &{" "}
              <span className="italic text-primary">writing</span>
            </h1>
            <p className="text-base text-white/45 leading-[1.7] max-w-xl mx-auto">
              Releases, technical deep-dives, and the thinking behind the
              product. Written by the people building it.
            </p>
          </motion.header>

          {posts.length === 0 ? (
            <p className="text-center text-white/30 text-sm">
              No posts yet. Check back soon.
            </p>
          ) : (
            <>
              {featured && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  className="mb-20"
                >
                  <FeaturedCard post={featured} />
                </motion.div>
              )}

              {rest.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
                  {rest.map((post, i) => (
                    <motion.div
                      key={post.slug}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.05 * (i + 1) }}
                    >
                      <PostCard post={post} />
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
}

function FeaturedCard({ post }: { post: ReturnType<typeof getAllPosts>[number] }) {
  return (
    <Link to={`/blog/${post.slug}`} className="group block">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]">
          {post.cover ? (
            <img
              src={post.cover}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-primary/5 to-transparent" />
          )}
        </div>
        <div className="lg:col-span-5">
          <CategoryRow categories={post.categories} />
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-white leading-[1.1] tracking-[-0.015em] mb-5 group-hover:text-primary transition-colors duration-300">
            {post.title}
          </h2>
          {post.excerpt && (
            <p className="text-[15px] text-white/50 leading-[1.65] mb-5">
              {post.excerpt}
            </p>
          )}
          <time className="text-[12px] text-white/35" dateTime={post.date}>
            {formatBlogDate(post.date)}
          </time>
        </div>
      </div>
    </Link>
  );
}

function PostCard({ post }: { post: ReturnType<typeof getAllPosts>[number] }) {
  return (
    <Link to={`/blog/${post.slug}`} className="group block">
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] mb-6">
        {post.cover ? (
          <img
            src={post.cover}
            alt={post.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent" />
        )}
      </div>
      <CategoryRow categories={post.categories} />
      <h3 className="font-display text-2xl font-semibold text-white leading-[1.15] tracking-[-0.01em] mb-3 group-hover:text-primary transition-colors duration-300">
        {post.title}
      </h3>
      {post.excerpt && (
        <p className="text-[14px] text-white/45 leading-[1.65] mb-4">
          {post.excerpt}
        </p>
      )}
      <time className="text-[12px] text-white/35" dateTime={post.date}>
        {formatBlogDate(post.date)}
      </time>
    </Link>
  );
}

function CategoryRow({ categories }: { categories: string[] }) {
  if (categories.length === 0) return null;
  return (
    <div className="flex items-center gap-4 mb-4 text-[12px] font-semibold text-white/75">
      {categories.map((cat, i) => (
        <span key={cat} className="flex items-center gap-4">
          {i > 0 && <span className="text-white/20">·</span>}
          <span>{cat}</span>
        </span>
      ))}
    </div>
  );
}
