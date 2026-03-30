/**
 * Convert Chara Card v2/v3 data to UEC v2 format.
 */
import {
  createCharacterUECv2,
  type CharacterPayloadV2,
  type CharacterBookEntry,
  type CharacterBook,
  type CharacterSceneV2,
  type UecCharacterV2,
  type AssetLocatorInlineBase64,
} from "unified-entity-card";

interface CharaCardData {
  name?: string;
  description?: string;
  personality?: string;
  scenario?: string;
  first_mes?: string;
  mes_example?: string;
  creator_notes?: string;
  system_prompt?: string;
  post_history_instructions?: string;
  alternate_greetings?: string[];
  tags?: string[];
  creator?: string;
  character_version?: string;
  extensions?: Record<string, unknown>;
  character_book?: {
    name?: string;
    description?: string;
    entries?: Array<{
      keys?: string[];
      secondary_keys?: string[];
      content?: string;
      name?: string;
      enabled?: boolean;
      insertion_order?: number;
      case_sensitive?: boolean;
      priority?: number;
      constant?: boolean;
      [key: string]: unknown;
    }>;
    [key: string]: unknown;
  };
  // v3 additions
  assets?: Array<{
    type: string;
    uri: string;
    name?: string;
    ext?: string;
  }>;
  nickname?: string;
  group_only_greetings?: string[];
  creation_date?: number;
  modification_date?: number;
}

function generateId(): string {
  return crypto.randomUUID();
}

function buildDefinitions(data: CharaCardData): string {
  const parts: string[] = [];

  if (data.personality?.trim()) {
    parts.push(`Personality: ${data.personality.trim()}`);
  }
  if (data.scenario?.trim()) {
    parts.push(`Scenario: ${data.scenario.trim()}`);
  }
  if (data.mes_example?.trim()) {
    parts.push(`Example dialogue:\n${data.mes_example.trim()}`);
  }

  return parts.join("\n\n");
}

function buildScene(data: CharaCardData): CharacterSceneV2 | null {
  if (!data.first_mes?.trim()) return null;

  const now = Math.floor(Date.now() / 1000);
  const variants: CharacterSceneV2["variants"] = [];

  if (data.alternate_greetings?.length) {
    for (const greeting of data.alternate_greetings) {
      if (greeting.trim()) {
        variants.push({
          id: generateId(),
          content: greeting.trim(),
          createdAt: now,
        });
      }
    }
  }

  return {
    id: generateId(),
    content: data.first_mes.trim(),
    createdAt: now,
    ...(variants.length > 0 ? { variants } : {}),
  };
}

function buildCharacterBook(
  book: CharaCardData["character_book"],
): CharacterBook | null {
  if (!book?.entries?.length) return null;

  const entries: CharacterBookEntry[] = book.entries
    .filter((e) => e.content?.trim())
    .map((entry) => ({
      name: entry.name ?? null,
      keys: entry.keys ?? [],
      secondary_keys: entry.secondary_keys ?? [],
      content: entry.content!,
      enabled: entry.enabled ?? true,
      insertion_order: entry.insertion_order ?? 0,
      case_sensitive: entry.case_sensitive ?? false,
      priority: entry.priority ?? 50,
      constant: entry.constant ?? false,
    }));

  if (entries.length === 0) return null;

  return {
    name: book.name ?? null,
    description: book.description ?? null,
    entries,
  };
}

function buildAvatar(
  imageDataUrl: string | null,
): AssetLocatorInlineBase64 | null {
  if (!imageDataUrl) return null;

  // Extract base64 data from data URL
  const match = imageDataUrl.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) return null;

  return {
    type: "inline_base64",
    data: match[2],
    mimeType: match[1],
  };
}

export interface ConvertResult {
  ok: true;
  uec: UecCharacterV2;
  warnings: string[];
}

export interface ConvertError {
  ok: false;
  error: string;
}

export function convertCharaToUEC(
  charaCard: Record<string, unknown>,
  imageDataUrl: string | null,
): ConvertResult | ConvertError {
  const warnings: string[] = [];

  // Extract the data object (v2/v3 nest under "data", v1 is flat)
  const data: CharaCardData =
    charaCard.data && typeof charaCard.data === "object"
      ? (charaCard.data as CharaCardData)
      : (charaCard as unknown as CharaCardData);

  if (!data.name?.trim()) {
    return { ok: false, error: "Character card has no name" };
  }

  const now = Math.floor(Date.now() / 1000);

  // Build system prompt: combine system_prompt and post_history_instructions
  let systemPrompt: string | null = null;
  const promptParts: string[] = [];
  if (data.system_prompt?.trim()) {
    promptParts.push(data.system_prompt.trim());
  }
  if (data.post_history_instructions?.trim()) {
    promptParts.push(data.post_history_instructions.trim());
  }
  if (promptParts.length > 0) {
    systemPrompt = promptParts.join("\n\n");
  }

  // Build definitions from personality, scenario, example messages
  const definitions = buildDefinitions(data);

  // Build scene from first_mes + alternate_greetings
  const scene = buildScene(data);

  // Build character book
  const characterBook = buildCharacterBook(data.character_book);

  // Build avatar from PNG image
  const avatar = buildAvatar(imageDataUrl);

  // Track fields that were dropped
  if (data.post_history_instructions?.trim()) {
    warnings.push(
      "post_history_instructions was merged into systemPrompt",
    );
  }
  if (data.mes_example?.trim()) {
    warnings.push("Example messages were included in definitions");
  }
  if (data.extensions && Object.keys(data.extensions).length > 0) {
    warnings.push(
      "Chara card extensions were placed in UEC extensions field",
    );
  }
  if (
    (charaCard as Record<string, unknown>).spec === "chara_card_v3" &&
    data.assets?.length
  ) {
    warnings.push(
      "v3 assets array was not converted (UEC uses asset locators)",
    );
  }
  if (data.group_only_greetings?.length) {
    warnings.push("group_only_greetings were not converted");
  }

  const payload: CharacterPayloadV2 = {
    id: generateId(),
    name: data.name.trim(),
    description: data.description?.trim() || "",
    definitions: definitions || undefined,
    tags: data.tags?.length ? data.tags : undefined,
    systemPrompt,
    creator: data.creator?.trim() || null,
    creatorNotes: data.creator_notes?.trim() || null,
    nickname: data.nickname?.trim() || null,
    source: ["chara_card"],
    ...(avatar ? { avatar } : {}),
    ...(scene ? { scene } : {}),
    ...(characterBook ? { characterBook } : {}),
    createdAt: data.creation_date || now,
    updatedAt: data.modification_date || now,
  };

  const uec = createCharacterUECv2(payload, {
    meta: {
      createdAt: now,
      updatedAt: now,
      source: "lettuce-convert",
      originalSource: `chara_card_${(charaCard as Record<string, unknown>).spec === "chara_card_v3" ? "v3" : "v2"}`,
    },
    extensions: data.extensions
      ? { "com.chara_card.original": data.extensions }
      : {},
  });

  return { ok: true, uec, warnings };
}
