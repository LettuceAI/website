import { Helmet } from "react-helmet-async";

const DEFAULTS = {
    siteName: "LettuceAI",
    description:
        "Free, open-source AI roleplay app with long-term memory, custom characters, and 20+ providers. No filters, no accounts, fully private.",
    url: "https://lettuceai.app",
    image: "https://raw.githubusercontent.com/LettuceAI/.github/refs/heads/main/profile/LettuceAI-banner.png",
};

interface SEOProps {
    title?: string;
    description?: string;
    path?: string;
    noIndex?: boolean;
    jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

export function SEO({
    title,
    description,
    path = "",
    noIndex,
    jsonLd,
}: SEOProps) {
    const fullTitle = title
        ? `${title} — ${DEFAULTS.siteName}`
        : `${DEFAULTS.siteName} — Free Open-Source AI Roleplay App`;
    const desc = description || DEFAULTS.description;
    const url = `${DEFAULTS.url}${path}`;

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={desc} />
            <link rel="canonical" href={url} />

            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={desc} />
            <meta property="og:url" content={url} />
            <meta property="og:image" content={DEFAULTS.image} />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={DEFAULTS.siteName} />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={desc} />
            <meta name="twitter:image" content={DEFAULTS.image} />

            {noIndex && <meta name="robots" content="noindex,nofollow" />}

            {jsonLd && (
                <script type="application/ld+json">
                    {JSON.stringify(jsonLd)}
                </script>
            )}
        </Helmet>
    );
}
