import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage, DownloadPage, ProvidersPage, FAQPage, NotFoundPage } from "@/pages";
import {
    DocsLayout,
    DocsIndex,
    InstallationDoc,
    QuickStartDoc,
    ApiKeysDoc,
    ProvidersDoc,
    CharactersDoc,
    MemoryDoc,
} from "@/pages/docs";

export function App() {
    return (
        <BrowserRouter>
            <main className="dark min-h-screen bg-background text-foreground">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/download" element={<DownloadPage />} />
                    <Route path="/providers" element={<ProvidersPage />} />
                    <Route path="/faq" element={<FAQPage />} />

                    {/* Docs Routes */}
                    <Route path="/docs" element={<DocsLayout />}>
                        <Route index element={<DocsIndex />} />
                        <Route path="installation" element={<InstallationDoc />} />
                        <Route path="quickstart" element={<QuickStartDoc />} />
                        <Route path="api-keys" element={<ApiKeysDoc />} />
                        <Route path="providers" element={<ProvidersDoc />} />
                        <Route path="characters" element={<CharactersDoc />} />
                        <Route path="memory" element={<MemoryDoc />} />
                    </Route>

                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;