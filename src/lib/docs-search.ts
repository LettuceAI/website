import { allDocsItems } from "@/config/docs-nav";

const rawSources = import.meta.glob(
  ["../pages/docs/*.tsx", "../pages/FAQPage.tsx"],
  {
    eager: true,
    import: "default",
    query: "?raw",
  },
) as Record<string, string>;

const sourceByHref: Record<string, string> = {
  "/docs": "../pages/docs/DocsIndex.tsx",
  "/docs/installation": "../pages/docs/InstallationDoc.tsx",
  "/docs/quickstart": "../pages/docs/QuickStartDoc.tsx",
  "/docs/ai-basics": "../pages/docs/AIBasicsDoc.tsx",
  "/docs/api-keys": "../pages/docs/ApiKeysDoc.tsx",
  "/docs/providers": "../pages/docs/ProvidersDoc.tsx",
  "/docs/models": "../pages/docs/ModelsDoc.tsx",
  "/docs/model-browser": "../pages/docs/ModelBrowserDoc.tsx",
  "/docs/ollama": "../pages/docs/OllamaDoc.tsx",
  "/docs/host-api": "../pages/docs/HostApiDoc.tsx",
  "/docs/images": "../pages/docs/ImageGenDoc.tsx",
  "/docs/accessibility": "../pages/docs/AccessibilityDoc.tsx",
  "/docs/characters": "../pages/docs/CharactersDoc.tsx",
  "/docs/chat-templates": "../pages/docs/ChatTemplatesDoc.tsx",
  "/docs/personas": "../pages/docs/PersonasDoc.tsx",
  "/docs/group-chats": "../pages/docs/GroupChatsDoc.tsx",
  "/docs/chat-widgets": "../pages/docs/ChatWidgetsDoc.tsx",
  "/docs/branching": "../pages/docs/BranchingDoc.tsx",
  "/docs/discovery": "../pages/docs/DiscoveryDoc.tsx",
  "/docs/system-prompts": "../pages/docs/SystemPromptsDoc.tsx",
  "/docs/companion-mode": "../pages/docs/CompanionModeDoc.tsx",
  "/docs/memory": "../pages/docs/MemoryDoc.tsx",
  "/docs/lorebooks": "../pages/docs/LorebooksDoc.tsx",
  "/docs/sync": "../pages/docs/SyncDoc.tsx",
  "/docs/help-me-reply": "../pages/docs/ReplyHelperDoc.tsx",
  "/docs/tts": "../pages/docs/TTSDoc.tsx",
  "/docs/speech-recognition": "../pages/docs/SpeechRecognitionDoc.tsx",
  "/docs/smart-creator": "../pages/docs/CharacterCreatorDoc.tsx",
  "/docs/security": "../pages/docs/SecurityDoc.tsx",
  "/docs/usage": "../pages/docs/UsageDoc.tsx",
  "/docs/backup-restore": "../pages/docs/BackupRestoreDoc.tsx",
  "/faq": "../pages/FAQPage.tsx",
};

type DocsNavItem = {
  section: string;
  title: string;
  href: string;
  icon: (typeof allDocsItems)[number]["icon"];
  keywords: string[];
};

export type DocsSearchResult = DocsNavItem & {
  snippet: string;
  matchedIn: string;
  score: number;
  targetHref: string;
};

type SearchHeading = {
  id: string;
  text: string;
  normalizedText: string;
};

type SearchDocument = DocsNavItem & {
  body: string;
  headings: SearchHeading[];
  headingsText: string;
  haystack: string;
  normalizedTitle: string;
  normalizedKeywords: string;
  normalizedSection: string;
  normalizedHeadings: string;
  normalizedBody: string;
};

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9+#.\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const uniqueTerms = (value: string) =>
  Array.from(new Set(normalize(value).split(" ").filter(Boolean)));

const stripSourceToText = (source: string) => {
  const withoutImports = source.replace(/^import[\s\S]*?;\n/gm, " ");
  const withoutComments = withoutImports.replace(
    /\{\/\*[\s\S]*?\*\/\}|\/\/.*$/gm,
    " ",
  );
  const withoutCodeBlocks = withoutComments.replace(
    /<CodeBlock[\s\S]*?code=\{`([\s\S]*?)`\}[\s\S]*?\/>/g,
    " $1 ",
  );
  const withoutAttributes = withoutCodeBlocks.replace(
    /\s(?:className|href|to|path|src|alt|target|rel|width|height|initial|animate|transition|jsonLd|description|title)=\{?["'`][\s\S]*?["'`]\}?/g,
    " ",
  );
  const withoutTags = withoutAttributes.replace(/<\/?[\w.:-]+[^>]*>/g, " ");
  const withoutExpressions = withoutTags
    .replace(/\{["'`](.*?)["'`]\}/g, " $1 ")
    .replace(/[{}()[\]<>]/g, " ");

  return withoutExpressions
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
};

const generateHeadingId = (text: string) =>
  text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");

const extractHeadings = (source: string) => {
  const headings: SearchHeading[] = [];
  const docHeadingPattern =
    /<DocHeading[^>]*>([\s\S]*?)<\/DocHeading>/g;
  const htmlHeadingPattern = /<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/g;

  for (const match of source.matchAll(docHeadingPattern)) {
    const text = stripSourceToText(match[1] ?? "");
    if (text) {
      headings.push({
        id: generateHeadingId(text),
        text,
        normalizedText: normalize(text),
      });
    }
  }

  for (const match of source.matchAll(htmlHeadingPattern)) {
    const text = stripSourceToText(match[1] ?? "");
    if (text) {
      headings.push({
        id: generateHeadingId(text),
        text,
        normalizedText: normalize(text),
      });
    }
  }

  return headings;
};

const docsSearchIndex: SearchDocument[] = allDocsItems.map((item) => {
  const source = rawSources[sourceByHref[item.href] ?? ""] ?? "";
  const body = stripSourceToText(source);
  const headings = extractHeadings(source);
  const headingsText = headings.map((heading) => heading.text).join(" ");
  const keywords = item.keywords.join(" ");

  return {
    ...item,
    body,
    headings,
    headingsText,
    haystack: normalize(
      `${item.title} ${item.section} ${keywords} ${headingsText} ${body}`,
    ),
    normalizedTitle: normalize(item.title),
    normalizedKeywords: normalize(keywords),
    normalizedSection: normalize(item.section),
    normalizedHeadings: normalize(headingsText),
    normalizedBody: normalize(body),
  };
});

const scoreField = (field: string, terms: string[], weight: number) => {
  let score = 0;

  for (const term of terms) {
    if (field === term) score += weight * 8;
    else if (field.startsWith(term)) score += weight * 5;
    else if (field.includes(` ${term}`)) score += weight * 4;
    else if (field.includes(term)) score += weight * 2;
  }

  return score;
};

const isSoftMatch = (field: string, term: string) => {
  if (term.length < 4) return false;
  const words = field.split(" ");

  return words.some((word) => {
    if (word.length < 4) return false;
    if (word.startsWith(term.slice(0, Math.max(3, term.length - 1)))) {
      return true;
    }

    let mismatches = 0;
    const maxLength = Math.max(word.length, term.length);
    for (let index = 0; index < maxLength; index += 1) {
      if (word[index] !== term[index]) mismatches += 1;
      if (mismatches > 1) return false;
    }

    return true;
  });
};

const buildSnippet = (body: string, terms: string[]) => {
  const normalizedBody = normalize(body);
  const firstMatch = terms
    .map((term) => normalizedBody.indexOf(term))
    .filter((index) => index >= 0)
    .sort((a, b) => a - b)[0];

  if (firstMatch === undefined) {
    return body.split(" ").slice(0, 24).join(" ");
  }

  const start = Math.max(0, firstMatch - 80);
  const end = Math.min(body.length, firstMatch + 180);
  const snippet = body.slice(start, end).trim();

  return `${start > 0 ? "... " : ""}${snippet}${end < body.length ? " ..." : ""}`;
};

const findBestHeading = (
  headings: SearchHeading[],
  terms: string[],
  phrase: string,
) => {
  let bestHeading: SearchHeading | undefined;
  let bestScore = 0;

  for (const heading of headings) {
    let score = scoreField(heading.normalizedText, terms, 10);
    if (phrase.length > 2 && heading.normalizedText.includes(phrase)) {
      score += 80;
    }

    if (score > bestScore) {
      bestHeading = heading;
      bestScore = score;
    }
  }

  return bestHeading;
};

export function searchDocs(query: string, limit = 8): DocsSearchResult[] {
  const terms = uniqueTerms(query);
  if (terms.length === 0) return [];

  const phrase = normalize(query);
  const results: DocsSearchResult[] = [];

  for (const doc of docsSearchIndex) {
    const missingTerm = terms.some(
      (term) => !doc.haystack.includes(term) && !isSoftMatch(doc.haystack, term),
    );
    if (missingTerm) continue;

    let score = 0;
    score += scoreField(doc.normalizedTitle, terms, 24);
    score += scoreField(doc.normalizedHeadings, terms, 12);
    score += scoreField(doc.normalizedKeywords, terms, 10);
    score += scoreField(doc.normalizedSection, terms, 5);
    score += scoreField(doc.normalizedBody, terms, 2);

    if (phrase.length > 2) {
      if (doc.normalizedTitle.includes(phrase)) score += 120;
      if (doc.normalizedHeadings.includes(phrase)) score += 80;
      if (doc.normalizedKeywords.includes(phrase)) score += 70;
      if (doc.normalizedBody.includes(phrase)) score += 30;
    }

    if (terms.some((term) => isSoftMatch(doc.haystack, term))) score += 4;
    if (score === 0) continue;

    const matchedIn = doc.normalizedTitle.includes(phrase)
      ? "Title"
      : doc.normalizedHeadings.includes(phrase)
        ? "Heading"
        : doc.normalizedKeywords.includes(phrase)
          ? "Keyword"
          : "Content";
    const matchedHeading =
      matchedIn === "Heading" ? findBestHeading(doc.headings, terms, phrase) : undefined;

    results.push({
      section: doc.section,
      title: doc.title,
      href: doc.href,
      icon: doc.icon,
      keywords: doc.keywords,
      snippet: buildSnippet(doc.body, terms),
      matchedIn,
      score,
      targetHref: matchedHeading ? `${doc.href}#${matchedHeading.id}` : doc.href,
    });
  }

  return results
    .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
    .slice(0, limit);
}
