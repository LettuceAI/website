import { SEO } from "@/components/common/SEO";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function TermsPage() {
    return (
        <>
        <SEO
            title="Terms of Service"
            description="LettuceAI Terms of Service — your responsibilities, acceptable use, and legal terms."
            path="/terms"
        />
        <main className="min-h-screen bg-[#050505] pt-28 pb-20">
            <div className="max-w-3xl mx-auto px-6 sm:px-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-px bg-primary/40" />
                        <span className="text-primary text-[11px] font-semibold uppercase tracking-[0.2em]">
                            Legal
                        </span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-4">
                        Terms of{" "}
                        <span className="font-display italic text-primary">
                            Service
                        </span>
                    </h1>
                    <p className="text-[15px] text-white/35">
                        Effective Date: March 29, 2026
                    </p>
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="space-y-8"
                >
                    {/* Intro */}
                    <p className="text-[15px] text-white/45 leading-[1.8]">
                        These Terms of Service ("Terms") govern your use of the
                        LettuceAI app, website, and related materials provided
                        by LettuceAI ("we," "us," or "our"). By using
                        LettuceAI, you agree to these Terms. If you do not
                        agree, do not use the app.
                    </p>

                    {/* 1. What LettuceAI Is */}
                    <Section title="1. What LettuceAI Is">
                        <p>
                            LettuceAI is open source, local-first software for
                            roleplay, storytelling, character management, and
                            related AI-assisted features. LettuceAI is not a
                            hosted social network, community platform, or
                            managed account system. We do not currently provide
                            first-party user accounts for ordinary app use.
                        </p>
                    </Section>

                    {/* 2. Eligibility */}
                    <Section title="2. Eligibility">
                        <p>
                            You must be at least 18 years old, and legally able
                            to enter into these Terms, to use LettuceAI.
                        </p>
                    </Section>

                    {/* 3. License */}
                    <Section title="3. License">
                        <p>
                            LettuceAI is open source software. Your rights to
                            use, copy, modify, and distribute the code are
                            governed by the open source license published with
                            the repository. These Terms do not replace or narrow
                            rights granted to you under that open source
                            license. If there is a conflict between these Terms
                            and the repository's open source license as to the
                            software code itself, the open source license
                            controls.
                        </p>
                        <p className="mt-3">You may not use the app, website, or related infrastructure to:</p>
                        <ul>
                            <li>Remove or obscure proprietary notices</li>
                            <li>
                                Circumvent security or technical restrictions
                            </li>
                            <li>
                                Interfere with the normal operation of the app,
                                website, or related infrastructure
                            </li>
                            <li>
                                Use LettuceAI in violation of applicable law
                            </li>
                        </ul>
                    </Section>

                    {/* 4. Your Content */}
                    <Section title="4. Your Content And Responsibility">
                        <p>
                            LettuceAI is a tool. You are solely responsible for
                            the content you create, import, store, export, sync,
                            or send through it. This includes:
                        </p>
                        <ul>
                            <li>Chats and prompts</li>
                            <li>
                                Characters, personas, lorebooks, and templates
                            </li>
                            <li>
                                Images, attachments, and generated content
                            </li>
                            <li>
                                API keys, model settings, and connected provider
                                configurations
                            </li>
                            <li>
                                Anything you send to third-party providers
                                through the app
                            </li>
                        </ul>
                        <p className="mt-3">
                            You are also responsible for making sure you have
                            the rights needed to use any content you import,
                            process, or share. You are solely responsible for
                            any sexual, explicit, violent, or otherwise
                            sensitive content you create, import, store, export,
                            sync, process, or send through LettuceAI, whether
                            you are using local models or third-party providers.
                        </p>
                    </Section>

                    {/* 5. Third-Party Providers */}
                    <Section title="5. Third-Party Providers And Services">
                        <p>
                            LettuceAI allows you to connect third-party
                            providers and services, including AI model
                            providers, voice providers, discovery sources, model
                            repositories, and custom endpoints. You are solely
                            responsible for:
                        </p>
                        <ul>
                            <li>Choosing which providers to use</li>
                            <li>
                                Your provider accounts, API keys, and billing
                            </li>
                            <li>
                                Reviewing the terms, privacy policies, and
                                content rules of those providers
                            </li>
                            <li>
                                Any data you send to them through the app
                            </li>
                        </ul>
                        <p className="mt-3">
                            We are not responsible for third-party availability,
                            output, pricing, retention, moderation, downtime, or
                            security.
                        </p>
                    </Section>

                    {/* 6. No App Fee */}
                    <Section title="6. No App Fee And No First-Party Billing">
                        <p>
                            We do not charge users for access to the LettuceAI
                            app itself. If you use third-party AI, voice, or
                            other services through the app, those providers may
                            charge you directly. Those charges are between you
                            and the provider. We do not process those payments,
                            do not control those prices, and are not responsible
                            for third-party billing.
                        </p>
                    </Section>

                    {/* 7. Acceptable Use */}
                    <Section title="7. Acceptable Use Rules">
                        <p>You may not use LettuceAI:</p>
                        <ul>
                            <li>For unlawful activity</li>
                            <li>
                                To infringe intellectual property, privacy,
                                publicity, or other rights
                            </li>
                            <li>
                                To distribute malware or malicious code
                            </li>
                            <li>
                                To abuse third-party services, rate limits,
                                billing systems, or endpoints
                            </li>
                            <li>
                                To evade provider restrictions or use
                                unauthorized credentials
                            </li>
                            <li>
                                In ways that could harm the app, website, our
                                infrastructure, or other people
                            </li>
                        </ul>
                        <p className="mt-3">
                            If we provide a website, download service, analytics
                            endpoint, or support channel, you may not abuse
                            those services either.
                        </p>
                    </Section>

                    {/* 8. No Duty To Monitor */}
                    <Section title="8. No Duty To Monitor Local Content">
                        <p>
                            Because LettuceAI is local-first software and not a
                            hosted community service, we do not generally
                            monitor or review content stored only on your
                            device. We generally cannot remove, block, or
                            disclose local content that we do not possess.
                        </p>
                    </Section>

                    {/* 9. Discovery */}
                    <Section title="9. Discovery And Imported Content">
                        <p>
                            LettuceAI may let you browse or import content from
                            third-party sources. That content is provided by
                            third parties, not by us. We do not guarantee that
                            imported or discovered content is accurate, lawful,
                            safe, properly licensed, or appropriate for any
                            audience. You use it at your own risk.
                        </p>
                    </Section>

                    {/* 10. Backups */}
                    <Section title="10. Backups, Sync, And Device Security">
                        <p>
                            LettuceAI may let you export backups, import
                            backups, and sync data between devices. You are
                            responsible for:
                        </p>
                        <ul>
                            <li>Securing your device</li>
                            <li>
                                Securing exported backups and synced devices
                            </li>
                            <li>
                                Choosing strong passwords for encrypted backups
                            </li>
                            <li>
                                Understanding that backups and sync transfers
                                may include sensitive local data, such as API
                                keys, secrets, chats, and media
                            </li>
                        </ul>
                        <p className="mt-3">
                            We are not responsible for loss, corruption,
                            disclosure, or misuse caused by your handling of
                            local files, backups, sync sessions, or third-party
                            storage.
                        </p>
                    </Section>

                    {/* 11. AI Output */}
                    <Section title="11. AI Output Disclaimer">
                        <p>
                            LettuceAI may generate or help process AI output. AI
                            output can be inaccurate, incomplete, offensive,
                            biased, or otherwise unsuitable. You are solely
                            responsible for reviewing and deciding whether to
                            use any output. Do not rely on LettuceAI or AI
                            output for medical, legal, financial,
                            safety-critical, or other high-risk decisions.
                        </p>
                    </Section>

                    {/* 12. IP */}
                    <Section title="12. Intellectual Property">
                        <p>
                            Except for rights granted under the applicable open
                            source license, we retain rights in the LettuceAI
                            name, branding, website materials, and other
                            non-code project materials, except for your own
                            content and any third-party content.
                        </p>
                    </Section>

                    {/* 13. Open Source */}
                    <Section title="13. Open Source And Third-Party Software">
                        <p>
                            LettuceAI may include open source or third-party
                            components subject to separate license terms. Those
                            terms continue to apply to the relevant components.
                        </p>
                    </Section>

                    {/* 14. Privacy */}
                    <Section title="14. Privacy">
                        <p>
                            Our privacy practices are described in our{" "}
                            <Link
                                to="/privacy"
                                className="text-primary/70 hover:text-primary transition-colors"
                            >
                                Privacy Policy
                            </Link>
                            .
                        </p>
                    </Section>

                    {/* 15. Suspension */}
                    <Section title="15. Suspension, Discontinuation, And Updates">
                        <p>
                            We may modify, suspend, or discontinue the app,
                            website, downloads, or related services at any time.
                            We may also restrict access to any website, support
                            channel, download service, or infrastructure we
                            operate if needed to prevent abuse, address security
                            issues, comply with law, or protect our rights.
                        </p>
                    </Section>

                    {/* 16. Disclaimers */}
                    <Section title="16. Disclaimers">
                        <p className="uppercase text-[13px] !text-white/30 !leading-[1.9]">
                            To the maximum extent permitted by law, LettuceAI is
                            provided "as is" and "as available," without
                            warranties of any kind, whether express, implied,
                            statutory, or otherwise, including implied
                            warranties of merchantability, fitness for a
                            particular purpose, title, non-infringement, and
                            that the app will be uninterrupted, error-free, or
                            secure.
                        </p>
                    </Section>

                    {/* 17. Limitation of Liability */}
                    <Section title="17. Limitation Of Liability">
                        <p className="uppercase text-[13px] !text-white/30 !leading-[1.9]">
                            To the maximum extent permitted by law, LettuceAI
                            will not be liable for any indirect, incidental,
                            special, consequential, exemplary, or punitive
                            damages, or for any loss of data, profits, revenue,
                            or business opportunity, arising out of or related
                            to LettuceAI or these Terms.
                        </p>
                        <p className="uppercase text-[13px] !text-white/30 !leading-[1.9] mt-3">
                            To the maximum extent permitted by law, our total
                            liability for all claims relating to LettuceAI or
                            these Terms will not exceed the amount you paid us
                            for LettuceAI in the 12 months before the claim
                            arose, which for a free app will generally be zero.
                        </p>
                        <p className="mt-3">
                            Some jurisdictions do not allow certain limitations,
                            so parts of this section may not apply to you.
                        </p>
                    </Section>

                    {/* 18. Changes */}
                    <Section title="18. Changes To These Terms">
                        <p>
                            We may update these Terms from time to time. If we
                            do, we will post the updated version and update the
                            Effective Date above.
                        </p>
                    </Section>

                    {/* 19. Contact */}
                    <Section title="19. Contact">
                        <p>
                            Questions about these Terms can be sent to:
                        </p>
                        <p className="mt-2">
                            <span className="text-white/60">LettuceAI</span>
                            <br />
                            <a
                                href="mailto:lettuceai.app@gmail.com"
                                className="text-primary/70 hover:text-primary transition-colors"
                            >
                                lettuceai.app@gmail.com
                            </a>
                        </p>
                    </Section>

                    {/* Footer nav */}
                    <div className="pt-8 border-t border-white/[0.06] flex flex-wrap gap-x-6 gap-y-2">
                        <Link
                            to="/privacy"
                            className="text-sm text-white/30 hover:text-white/50 transition-colors"
                        >
                            Privacy Policy
                        </Link>
                        <Link
                            to="/license"
                            className="text-sm text-white/30 hover:text-white/50 transition-colors"
                        >
                            License (AGPL-3.0)
                        </Link>
                    </div>
                </motion.div>
            </div>
        </main>
        </>
    );
}

function Section({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <section className="[&>p]:text-[15px] [&>p]:text-white/45 [&>p]:leading-[1.8] [&>ul]:mt-3 [&>ul]:space-y-1.5 [&>ul]:list-none [&>ul]:pl-0 [&_li]:relative [&_li]:pl-5 [&_li]:text-[15px] [&_li]:text-white/45 [&_li]:leading-[1.8] [&_li]:before:content-[''] [&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[11px] [&_li]:before:w-1.5 [&_li]:before:h-1.5 [&_li]:before:rounded-full [&_li]:before:bg-primary/30">
            <h2 className="text-lg font-semibold text-white mb-3">{title}</h2>
            {children}
        </section>
    );
}
