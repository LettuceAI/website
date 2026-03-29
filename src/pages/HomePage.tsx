import {
    Navbar,
    HeroSection,
    FeaturesSection,
    HowItWorksSection,
    CapabilitiesSection,
    ProvidersSection,
    TrustSection,
    TestimonialsSection,
    FAQSection,
    CTASection,
    Footer,
} from "@/components/landing";

export function HomePage() {
    return (
        <>
            <Navbar />
            <HeroSection />
            <TrustSection />
            <FeaturesSection />
            <CapabilitiesSection />
            <HowItWorksSection />
            <ProvidersSection />
            <TestimonialsSection />
            <FAQSection />
            <CTASection />
            <Footer />
        </>
    );
}
