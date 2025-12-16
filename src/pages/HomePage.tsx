import {
    Navbar,
    HeroSection,
    FeaturesSection,
    ProvidersSection,
    TrustSection,
    FAQSection,
    CTASection,
    Footer,
} from "@/components/landing";

export function HomePage() {
    return (
        <>
            <Navbar />
            <HeroSection />
            <FeaturesSection />
            <ProvidersSection />
            <TrustSection />
            <FAQSection />
            <CTASection />
            <Footer />
        </>
    );
}
