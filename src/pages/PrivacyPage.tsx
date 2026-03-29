import { SEO } from "@/components/common/SEO";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function PrivacyPage() {
    return (
        <>
        <SEO
            title="Privacy Policy"
            description="LettuceAI Privacy Policy — learn how your data stays local and what we do and do not collect."
            path="/privacy"
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
                        Privacy{" "}
                        <span className="font-display italic text-primary">
                            Policy
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
                        This Privacy Policy explains what LettuceAI ("we," "us,"
                        or "our") does and does not collect in connection with
                        LettuceAI. LettuceAI is an open source, local-first app.
                        In ordinary use, your chats, characters, prompts,
                        images, settings, API keys, and similar app content are
                        stored on your device, not on our servers.
                    </p>

                    {/* 1. Contact */}
                    <Section title="1. Contact">
                        <p>
                            If you have privacy questions, contact:
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

                    {/* 2. What We Generally Do Not Collect */}
                    <Section title="2. What We Generally Do Not Collect">
                        <p>
                            We do not operate LettuceAI as a hosted account
                            service. As a result, we generally do not receive or
                            store:
                        </p>
                        <ul>
                            <li>Your chats or roleplay history</li>
                            <li>
                                Your characters, personas, lorebooks, prompts,
                                or templates
                            </li>
                            <li>
                                Your locally stored images, avatars, or
                                attachments
                            </li>
                            <li>
                                Your provider API keys or model settings, unless
                                you separately send them to us
                            </li>
                            <li>
                                Your local backups, unless you separately send
                                them to us
                            </li>
                        </ul>
                        <p className="mt-3">
                            Because we generally do not possess that information,
                            we usually cannot access it, export it, correct it,
                            delete it for you, or provide it to third parties.
                        </p>
                    </Section>

                    {/* 3. Information Stored Locally */}
                    <Section title="3. Information Stored Locally On Your Device">
                        <p>
                            LettuceAI stores most app data locally on your
                            device. Depending on how you use the app, that may
                            include:
                        </p>
                        <ul>
                            <li>
                                Chats, prompts, memory data, and message history
                            </li>
                            <li>
                                Characters, personas, lorebooks, scenes, and
                                templates
                            </li>
                            <li>
                                Images, avatars, attachments, generated media,
                                and downloaded models
                            </li>
                            <li>
                                App settings, accessibility settings, and
                                appearance preferences
                            </li>
                            <li>
                                Provider credentials, including API keys, base
                                URLs, headers, and model selections
                            </li>
                            <li>
                                Voice provider settings and cached preview audio
                            </li>
                            <li>
                                Local logs, usage records, and app activity data
                            </li>
                        </ul>
                        <p className="mt-3">
                            That local device data is controlled by you, subject
                            to your device security, backups, and the policies
                            of any third-party services you choose to use.
                        </p>
                    </Section>

                    {/* 4. No App Payments */}
                    <Section title="4. No App Payments">
                        <p>
                            We do not charge users for access to the LettuceAI
                            app itself. If you choose to connect third-party AI,
                            voice, or other providers through the app, those
                            providers may charge you directly under their own
                            pricing and terms. We do not process those payments
                            and do not receive those usage charges on behalf of
                            those providers.
                        </p>
                    </Section>

                    {/* 5. Information We May Receive */}
                    <Section title="5. Information We May Receive">
                        <p>
                            We may receive limited information in the following
                            cases:
                        </p>

                        <h4 className="text-[14px] font-semibold text-white/70 mt-5 mb-2">
                            A. Optional analytics
                        </h4>
                        <p>
                            If the app build includes analytics and analytics
                            are enabled in your copy of the app, we may receive
                            limited, non-identifying usage analytics through
                            Aptabase. As configured by us, this is intended to
                            be limited to aggregate product analytics, such as
                            daily user counts and basic app usage totals, rather
                            than personally identifying user profiles. If
                            analytics are available in your build, you may be
                            able to disable them in the app settings.
                        </p>

                        <h4 className="text-[14px] font-semibold text-white/70 mt-5 mb-2">
                            B. Support communications
                        </h4>
                        <p>
                            If you email us or otherwise contact us, we will
                            receive the information you choose to provide, such
                            as:
                        </p>
                        <ul>
                            <li>Your email address</li>
                            <li>The contents of your message</li>
                            <li>
                                Any attachments, screenshots, logs, or other
                                materials you send us
                            </li>
                        </ul>

                        <h4 className="text-[14px] font-semibold text-white/70 mt-5 mb-2">
                            C. Website and download page traffic
                        </h4>
                        <p>
                            If you visit lettuceai.app or any page we operate,
                            standard web server, hosting, or CDN logs may
                            collect technical information such as IP address,
                            user agent, referrer, and request timestamps.
                        </p>
                    </Section>

                    {/* 6. Information Sent To Third Parties */}
                    <Section title="6. Information Sent To Third Parties At Your Direction">
                        <p>
                            LettuceAI allows you to connect third-party
                            services. When you use those features, data may be
                            sent directly from your device to the provider you
                            selected. If you use local models or other on-device
                            features, your content may be processed locally on
                            your device without being sent to a third-party
                            provider. Depending on the feature, that may
                            include:
                        </p>
                        <ul>
                            <li>Prompts and chat messages</li>
                            <li>
                                Character definitions, persona details, lorebook
                                content, and system prompts
                            </li>
                            <li>Images or attachments</li>
                            <li>Model settings and inference parameters</li>
                            <li>Voice generation input</li>
                            <li>
                                API keys or authentication headers needed to
                                call the provider
                            </li>
                        </ul>
                        <p className="mt-3">
                            Third-party providers are not governed by this
                            Privacy Policy. Their own terms and privacy policies
                            apply.
                        </p>
                    </Section>

                    {/* 7. External Services */}
                    <Section title="7. External Services Used By The App">
                        <p>
                            Depending on which features you use, LettuceAI may
                            connect to external services such as:
                        </p>
                        <ul>
                            <li>
                                AI, image, speech, or voice providers you
                                configure
                            </li>
                            <li>
                                Character Tavern for discovery browsing and
                                character imports
                            </li>
                            <li>
                                Hugging Face for model browsing and model
                                downloads
                            </li>
                            <li>
                                GitHub and our download pages for app update
                                checks
                            </li>
                            <li>Optional analytics providers</li>
                            <li>
                                User-configured custom endpoints or self-hosted
                                services
                            </li>
                        </ul>
                        <p className="mt-3">
                            We do not control how those third parties process
                            data. If you use only local models and local
                            features, some or all of those external connections
                            may not be used for your content generation at all.
                        </p>
                    </Section>

                    {/* 8. Backups, Sync */}
                    <Section title="8. Backups, Sync, And Local Transfers">
                        <p>
                            LettuceAI includes local backup, restore, export,
                            import, and local-network sync features. Please
                            note:
                        </p>
                        <ul>
                            <li>
                                Exported backups may contain sensitive local app
                                data, including chats, settings, API keys,
                                secrets, media, and other app content
                            </li>
                            <li>
                                Backups are stored where you choose to store
                                them, such as your device, cloud storage, or
                                file system
                            </li>
                            <li>
                                Local-network sync transfers data directly
                                between devices you connect
                            </li>
                        </ul>
                        <p className="mt-3">
                            We do not receive those backups or sync transfers
                            unless you separately send them to us.
                        </p>
                    </Section>

                    {/* 9. Camera Access */}
                    <Section title="9. Camera Access">
                        <p>
                            On supported mobile builds, the app may request
                            camera access for QR or barcode scanning used in
                            device sync flows. We do not use the camera for
                            remote collection or background surveillance.
                        </p>
                    </Section>

                    {/* 10. How We Use Information */}
                    <Section title="10. How We Use Information We Actually Receive">
                        <p>
                            If we receive information described in this Privacy
                            Policy, we may use it to:
                        </p>
                        <ul>
                            <li>
                                Operate and improve the app, website, and
                                download experience
                            </li>
                            <li>
                                Understand app stability and product usage,
                                where analytics are enabled
                            </li>
                            <li>Respond to support requests</li>
                            <li>
                                Maintain security and prevent abuse of the
                                website or services we operate
                            </li>
                            <li>Comply with legal obligations</li>
                        </ul>
                    </Section>

                    {/* 11. How We Share Information */}
                    <Section title="11. How We Share Information">
                        <p>
                            We do not sell your personal information. We may
                            share information that we actually possess only in
                            limited circumstances, such as:
                        </p>
                        <ul>
                            <li>
                                With service providers that help us operate
                                analytics, hosting, support, or download
                                infrastructure
                            </li>
                            <li>
                                If you ask us to assist with a support issue and
                                provide materials for that purpose
                            </li>
                            <li>
                                If required by law, legal process, or a valid
                                governmental request, but only as to information
                                we actually have
                            </li>
                        </ul>
                        <p className="mt-3">
                            We cannot disclose local app content we do not have.
                        </p>
                    </Section>

                    {/* 12. Data Retention */}
                    <Section title="12. Data Retention">
                        <p>
                            Local app data remains on your device until you
                            delete it, overwrite it, uninstall the app, or move
                            it elsewhere. For information we actually receive:
                        </p>
                        <ul>
                            <li>
                                Support emails and support materials may be
                                retained as reasonably necessary to respond and
                                maintain records
                            </li>
                            <li>
                                Analytics data may be retained according to the
                                analytics provider's retention settings
                            </li>
                            <li>
                                Website traffic logs may be retained according
                                to hosting or infrastructure retention practices
                            </li>
                        </ul>
                    </Section>

                    {/* 13. Security */}
                    <Section title="13. Security">
                        <p>
                            No system is perfectly secure, but LettuceAI is
                            designed to keep most user content local to the
                            device. You are responsible for:
                        </p>
                        <ul>
                            <li>Securing your device</li>
                            <li>Protecting your backups</li>
                            <li>Choosing strong backup passwords</li>
                            <li>
                                Protecting your API keys and third-party
                                accounts
                            </li>
                            <li>
                                Reviewing the privacy and security practices of
                                the providers you connect
                            </li>
                        </ul>
                    </Section>

                    {/* 14. International Processing */}
                    <Section title="14. International Processing">
                        <p>
                            If you use third-party providers or services, your
                            data may be processed in countries other than your
                            own according to those providers' practices. If we
                            use third-party hosting, analytics, or support
                            tools, information we actually receive may also be
                            processed in other countries where those providers
                            operate.
                        </p>
                    </Section>

                    {/* 15. Your Rights */}
                    <Section title="15. Your Rights">
                        <p>
                            Depending on your jurisdiction, you may have rights
                            regarding personal information we control. Those
                            rights may include the right to request access,
                            correction, deletion, restriction, objection, or
                            portability, subject to applicable law.
                        </p>
                        <p className="mt-3">
                            Because we usually do not control your local app
                            data, many requests about chats, characters,
                            prompts, or other on-device content will need to be
                            handled by you on your own device.
                        </p>
                        <p className="mt-3">
                            To make a request regarding information we actually
                            control, contact{" "}
                            <a
                                href="mailto:lettuceai.app@gmail.com"
                                className="text-primary/70 hover:text-primary transition-colors"
                            >
                                lettuceai.app@gmail.com
                            </a>
                            .
                        </p>
                    </Section>

                    {/* 16. Children's Privacy */}
                    <Section title="16. Children's Privacy">
                        <p>
                            LettuceAI is not directed to children under 18, and
                            we do not knowingly collect personal information
                            from children under that age. If you believe a child
                            has sent us personal information directly, contact{" "}
                            <a
                                href="mailto:lettuceai.app@gmail.com"
                                className="text-primary/70 hover:text-primary transition-colors"
                            >
                                lettuceai.app@gmail.com
                            </a>
                            .
                        </p>
                    </Section>

                    {/* 17. Changes */}
                    <Section title="17. Changes To This Privacy Policy">
                        <p>
                            We may update this Privacy Policy from time to time.
                            If we make material changes, we will post the
                            updated version and update the Effective Date above.
                        </p>
                    </Section>

                    {/* Footer nav */}
                    <div className="pt-8 border-t border-white/[0.06] flex flex-wrap gap-x-6 gap-y-2">
                        <Link
                            to="/terms"
                            className="text-sm text-white/30 hover:text-white/50 transition-colors"
                        >
                            Terms of Service
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
