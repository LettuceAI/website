import { SEO } from "@/components/common/SEO";
import {
    organizationSchema,
    softwareSchema,
    websiteSchema,
} from "@/config/schemas";
import {
    HeroSection,
    TrustSection,
    MemoryShowcase,
    FeaturesSection,
    CapabilitiesSection,
    PullQuote,
    ProvidersSection,
    ColorBreak,
    TestimonialsSection,
    FAQSection,
    CTASection,
} from "@/components/landing";

export function HomePage() {
    return (
        <>
            <SEO
                path="/"
                jsonLd={[organizationSchema, softwareSchema, websiteSchema]}
            />
            <HeroSection />
            <TrustSection />
            <MemoryShowcase />
            <div className="max-w-6xl mx-auto px-6 sm:px-10">
                <div className="h-px bg-white/[0.06]" />
            </div>
            <FeaturesSection />
            <CapabilitiesSection />
            <PullQuote />
            <ProvidersSection />
            <ColorBreak />
            <TestimonialsSection />
            <FAQSection />
            <CTASection />
        </>
    );
}
