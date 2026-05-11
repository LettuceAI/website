import { useEffect, useSyncExternalStore } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AnimatePresence, motion } from "framer-motion";
import { ScrollToTop } from "@/components/common/ScrollToTop";
import { Layout } from "@/components/layout/Layout";
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
  ConvertPage,
  BlogPage,
  BlogPostPage,
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
  ModelBrowserDoc,
  OllamaDoc,
  CompanionModeDoc,
  HostApiDoc,
  SecurityDoc,
  UsageDoc,
  BackupRestoreDoc,
  SpeechRecognitionDoc,
} from "@/pages/docs";
import Snowfall from "react-snowfall";
import { SnowProvider, useSnow } from "@/contexts/SnowContext";

function ExternalRedirect({ url }: { url: string }) {
  useEffect(() => {
    window.location.replace(url);
  }, [url]);
  return null;
}

const emptySubscribe = () => () => {};
function useIsHydrated() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15, ease: "easeInOut" }}
        style={{ minHeight: "100vh" }}
      >
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/download" element={<DownloadPage />} />
          <Route path="/providers" element={<ProvidersPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/license" element={<LicensePage />} />
          <Route path="/changelog" element={<ChangelogPage />} />
          <Route path="/convert" element={<ConvertPage />} />
          <Route path="/blog/end-of-lettuceai" element={<ExternalRedirect url="https://www.youtube.com/watch?v=dQw4w9WgXcQ&autoplay=1" />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export function AppContent() {
  const { snowEnabled, isHolidaySeason } = useSnow();
  const location = useLocation();
  const isDocsPage = location.pathname.startsWith("/docs");
  const isHydrated = useIsHydrated();

  return (
    <>
      <ScrollToTop />
      {isHydrated && isHolidaySeason && snowEnabled && !isDocsPage && (
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
      <div className="dark grain min-h-screen bg-background text-foreground">
        {isDocsPage ? (
          <Routes location={location}>
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
              <Route path="model-browser" element={<ModelBrowserDoc />} />
              <Route path="ollama" element={<OllamaDoc />} />
              <Route path="companion-mode" element={<CompanionModeDoc />} />
              <Route path="host-api" element={<HostApiDoc />} />
              <Route path="security" element={<SecurityDoc />} />
              <Route path="usage" element={<UsageDoc />} />
              <Route path="backup-restore" element={<BackupRestoreDoc />} />
              <Route path="speech-recognition" element={<SpeechRecognitionDoc />} />
              <Route
                path="character-creator"
                element={<Navigate to="/docs/smart-creator" replace />}
              />
            </Route>
          </Routes>
        ) : (
          <Layout>
            <AnimatedRoutes />
          </Layout>
        )}
      </div>
    </>
  );
}

export function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <SnowProvider>
          <AppContent />
        </SnowProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
