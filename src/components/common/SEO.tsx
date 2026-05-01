import { Helmet } from "react-helmet-async";

const DEFAULTS = {
    siteName: "LettuceAI",
    description:
        "Free, open-source AI roleplay and storytelling app with text-to-speech, scene-aware image generation, long-term memory, group chats, lorebooks, custom characters, and 20+ AI providers. Cross-platform, private, BYOK.",
    url: "https://lettuceai.app",
    image: "https://raw.githubusercontent.com/LettuceAI/.github/refs/heads/main/profile/LettuceAI-banner.png",
};

interface SEOProps {
    title?: string;
    description?: string;
    path?: string;
    image?: string;
    noIndex?: boolean;
    jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

function absoluteUrl(maybeUrl: string): string {
    if (/^https?:\/\//i.test(maybeUrl)) return maybeUrl;
    return `${DEFAULTS.url}${maybeUrl.startsWith("/") ? "" : "/"}${maybeUrl}`;
}

export function SEO({
    title,
    description,
    path = "",
    image,
    noIndex,
    jsonLd,
}: SEOProps) {
    const fullTitle = title
        ? `${title} — ${DEFAULTS.siteName}`
        : `${DEFAULTS.siteName} — Free Open-Source AI Roleplay App`;
    const desc = description || DEFAULTS.description;
    const url = `${DEFAULTS.url}${path}`;
    const ogImage = image ? absoluteUrl(image) : DEFAULTS.image;

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={desc} />
            <link rel="canonical" href={url} />

            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={desc} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={DEFAULTS.siteName} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={desc} />
            <meta name="twitter:image" content={ogImage} />

            {noIndex && <meta name="robots" content="noindex,nofollow" />}

            {jsonLd && (
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            )}
        </Helmet>
    );
}
