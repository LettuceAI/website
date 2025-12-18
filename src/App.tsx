import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/common/ScrollToTop";
import { HomePage, DownloadPage, ProvidersPage, FAQPage, PrivacyPage, TermsPage, LicensePage, NotFoundPage } from "@/pages";
import {
    DocsLayout,
    DocsIndex,
    InstallationDoc,
    QuickStartDoc,
    ApiKeysDoc,
    ProvidersDoc,
    CharactersDoc,
    MemoryDoc,
    LorebooksDoc,
} from "@/pages/docs";

export function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <main className="dark min-h-screen bg-background text-foreground">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/download" element={<DownloadPage />} />
                    <Route path="/providers" element={<ProvidersPage />} />
                    <Route path="/faq" element={<FAQPage />} />
                    <Route path="/privacy" element={<PrivacyPage />} />
                    <Route path="/terms" element={<TermsPage />} />
                    <Route path="/license" element={<LicensePage />} />

                    {/* Docs Routes */}
                    <Route path="/docs" element={<DocsLayout />}>
                        <Route index element={<DocsIndex />} />
                        <Route path="installation" element={<InstallationDoc />} />
                        <Route path="quickstart" element={<QuickStartDoc />} />
                        <Route path="api-keys" element={<ApiKeysDoc />} />
                        <Route path="providers" element={<ProvidersDoc />} />
                        <Route path="characters" element={<CharactersDoc />} />
                        <Route path="memory" element={<MemoryDoc />} />
                        <Route path="lorebooks" element={<LorebooksDoc />} />
                    </Route>

                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;