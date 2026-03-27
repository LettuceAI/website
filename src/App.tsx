import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { ScrollToTop } from "@/components/common/ScrollToTop";
import {
  HomePage,
  DownloadPage,
  ProvidersPage,
  FAQPage,
  PrivacyPage,
  TermsPage,
  LicensePage,
  ChangelogPage,
  NotFoundPage,
} from "@/pages";
import {
  DocsLayout,
  DocsIndex,
  InstallationDoc,
  QuickStartDoc,
  AIBasicsDoc,
  ApiKeysDoc,
  ProvidersDoc,
  CharactersDoc,
  GroupChatsDoc,
  DiscoveryDoc,
  MemoryDoc,
  LorebooksDoc,
  PersonasDoc,
  SystemPromptsDoc,
  ModelsDoc,
  ImageGenerationDoc,
  SyncDoc,
  AccessibilityDoc,
  ReplyHelperDoc,
  TTSDoc,
  CharacterCreatorDoc,
  ChatTemplatesDoc,
} from "@/pages/docs";
import Snowfall from "react-snowfall";
import { SnowProvider, useSnow } from "@/contexts/SnowContext";

function AppContent() {
  const { snowEnabled, isHolidaySeason } = useSnow();
  const location = useLocation();
  const isDocsPage = location.pathname.startsWith("/docs");

  return (
    <>
      <ScrollToTop />
      {isHolidaySeason && snowEnabled && !isDocsPage && (
        <Snowfall
          style={{
            position: "fixed",
            width: "100vw",
            height: "100vh",
            zIndex: 9999,
            pointerEvents: "none",
          }}
          snowflakeCount={150}
        />
      )}
      <main className="dark min-h-screen bg-background text-foreground">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/download" element={<DownloadPage />} />
          <Route path="/providers" element={<ProvidersPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/license" element={<LicensePage />} />
          <Route path="/changelog" element={<ChangelogPage />} />

          {/* Docs Routes */}
          <Route path="/docs" element={<DocsLayout />}>
            <Route index element={<DocsIndex />} />
            <Route path="installation" element={<InstallationDoc />} />
            <Route path="quickstart" element={<QuickStartDoc />} />
            <Route path="ai-basics" element={<AIBasicsDoc />} />
            <Route path="api-keys" element={<ApiKeysDoc />} />
            <Route path="providers" element={<ProvidersDoc />} />
            <Route path="models" element={<ModelsDoc />} />
            <Route path="images" element={<ImageGenerationDoc />} />
            <Route path="sync" element={<SyncDoc />} />
            <Route path="accessibility" element={<AccessibilityDoc />} />
            <Route path="help-me-reply" element={<ReplyHelperDoc />} />
            <Route path="tts" element={<TTSDoc />} />
            <Route path="characters" element={<CharactersDoc />} />
            <Route path="chat-templates" element={<ChatTemplatesDoc />} />
            <Route path="group-chats" element={<GroupChatsDoc />} />
            <Route path="discovery" element={<DiscoveryDoc />} />
            <Route path="memory" element={<MemoryDoc />} />
            <Route path="lorebooks" element={<LorebooksDoc />} />
            <Route path="personas" element={<PersonasDoc />} />
            <Route path="system-prompts" element={<SystemPromptsDoc />} />
            <Route path="smart-creator" element={<CharacterCreatorDoc />} />
            <Route
              path="character-creator"
              element={<Navigate to="/docs/smart-creator\" replace />}
            />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <SnowProvider>
        <AppContent />
      </SnowProvider>
    </BrowserRouter>
  );
}

export default App;
