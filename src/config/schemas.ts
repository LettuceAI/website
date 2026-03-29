export const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "LettuceAI",
    url: "https://lettuceai.app",
    logo: "https://lettuceai.app/logo.png",
    sameAs: [
        "https://github.com/LettuceAI",
        "https://discord.gg/745bEttw2r",
    ],
};

export const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "LettuceAI",
    url: "https://lettuceai.app",
    applicationCategory: "EntertainmentApplication",
    operatingSystem: "Android, Windows, macOS, Linux",
    offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
    },
    description:
        "Open-source AI roleplay companion with long-term memory, custom characters, and 20+ provider support.",
    license: "https://www.gnu.org/licenses/agpl-3.0.en.html",
};

export const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "LettuceAI",
    url: "https://lettuceai.app",
};

export function buildFaqSchema(
    faqs: { question: string; answer: string }[]
): Record<string, unknown> {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };
}
