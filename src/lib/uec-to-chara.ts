/**
 * Convert UEC v2 (or v1) character cards to Chara Card v2/v3 format.
 */

interface CharaCardV2Data {
  name: string;
  description: string;
  personality: string;
  scenario: string;
  first_mes: string;
  mes_example: string;
  creator_notes: string;
  system_prompt: string;
  post_history_instructions: string;
  alternate_greetings: string[];
  tags: string[];
  creator: string;
  character_version: string;
  extensions: Record<string, unknown>;
  character_book?: {
    name: string;
    description: string;
    entries: Array<{
      keys: string[];
      secondary_keys: string[];
      content: string;
      name: string;
      enabled: boolean;
      insertion_order: number;
      case_sensitive: boolean;
      priority: number;
      constant: boolean;
      id?: number;
      comment?: string;
      selective?: boolean;
      position?: string;
    }>;
    scan_depth?: number;
    token_budget?: number;
    recursive_scanning?: boolean;
    extensions?: Record<string, unknown>;
  };
}

interface CharaCardV2 {
  spec: "chara_card_v2";
  spec_version: "2.0";
  data: CharaCardV2Data;
}

interface CharaCardV3 {
  spec: "chara_card_v3";
  spec_version: "3.0";
  data: CharaCardV2Data & {
    assets?: Array<{ type: string; uri: string; name: string; ext: string }>;
    group_only_greetings?: string[];
  };
}

export interface UecToCharaResult {
  ok: true;
  charaCard: CharaCardV2 | CharaCardV3;
  avatarDataUrl: string | null;
  warnings: string[];
}

export interface UecToCharaError {
  ok: false;
  error: string;
}

function extractAvatarDataUrl(payload: Record<string, unknown>): string | null {
  const avatar = payload.avatar;
  if (!avatar) return null;

  if (typeof avatar === "string") {
    if (avatar.startsWith("data:")) return avatar;
    return null;
  }

  if (typeof avatar === "object" && avatar !== null) {
    const loc = avatar as Record<string, unknown>;
    if (loc.type === "inline_base64" && typeof loc.data === "string") {
      const mime = (loc.mimeType as string) || "image/png";
      return `data:${mime};base64,${loc.data}`;
    }
    if (loc.type === "remote_url" && typeof loc.url === "string") {
      return loc.url as string;
    }
  }

  return null;
}

function parseDefinitions(definitions: string | undefined): {
  personality: string;
  scenario: string;
  mesExample: string;
} {
  if (!definitions)
    return { personality: "", scenario: "", mesExample: "" };

  let personality = "";
  let scenario = "";
  let mesExample = "";

  // Try to parse structured definitions
  const personalityMatch = definitions.match(
    /^Personality:\s*([\s\S]*?)(?=\n\nScenario:|\n\nExample dialogue:|$)/m,
  );
  const scenarioMatch = definitions.match(
    /^Scenario:\s*([\s\S]*?)(?=\n\nPersonality:|\n\nExample dialogue:|$)/m,
  );
  const exampleMatch = definitions.match(
    /^Example dialogue:\s*([\s\S]*?)(?=\n\nPersonality:|\n\nScenario:|$)/m,
  );

  if (personalityMatch || scenarioMatch || exampleMatch) {
    personality = personalityMatch?.[1]?.trim() || "";
    scenario = scenarioMatch?.[1]?.trim() || "";
    mesExample = exampleMatch?.[1]?.trim() || "";
  } else {
    // Unstructured — put everything in personality
    personality = definitions.trim();
  }

  return { personality, scenario, mesExample };
}

export function convertUECToChara(
  uec: Record<string, unknown>,
  targetVersion: "v2" | "v3",
): UecToCharaResult | UecToCharaError {
  const warnings: string[] = [];

  if (
    !uec.schema ||
    typeof uec.schema !== "object" ||
    (uec.schema as Record<string, unknown>).name !== "UEC"
  ) {
    return { ok: false, error: "Not a valid UEC file" };
  }

  if (uec.kind !== "character") {
    return {
      ok: false,
      error: `Only character UECs can be converted (got "${uec.kind}")`,
    };
  }

  const payload = uec.payload as Record<string, unknown>;
  if (!payload || typeof payload !== "object") {
    return { ok: false, error: "UEC has no payload" };
  }

  const name = (payload.name as string) || "";
  if (!name) {
    return { ok: false, error: "UEC character has no name" };
  }

  const avatarDataUrl = extractAvatarDataUrl(payload);
  const { personality, scenario, mesExample } = parseDefinitions(
    payload.definitions as string | undefined,
  );

  // Build first_mes and alternate_greetings from scene
  let firstMes = "";
  const alternateGreetings: string[] = [];
  const scene = payload.scene as Record<string, unknown> | null;
  if (scene && typeof scene === "object") {
    firstMes = (scene.content as string) || "";
    const variants = scene.variants as
      | Array<Record<string, unknown>>
      | undefined;
    if (Array.isArray(variants)) {
      for (const v of variants) {
        if (v.content && typeof v.content === "string") {
          alternateGreetings.push(v.content);
        }
      }
    }
  }

  // Build character book
  let characterBook: CharaCardV2Data["character_book"] | undefined;
  const book = payload.characterBook as Record<string, unknown> | null;
  if (book && typeof book === "object") {
    const entries = book.entries as Array<Record<string, unknown>> | undefined;
    characterBook = {
      name: (book.name as string) || "",
      description: (book.description as string) || "",
      entries: Array.isArray(entries)
        ? entries.map((e, i) => ({
            keys: Array.isArray(e.keys)
              ? (e.keys as string[])
              : [],
            secondary_keys: Array.isArray(e.secondary_keys)
              ? (e.secondary_keys as string[])
              : [],
            content: (e.content as string) || "",
            name: (e.name as string) || "",
            enabled: e.enabled !== false,
            insertion_order:
              typeof e.insertion_order === "number" ? e.insertion_order : i,
            case_sensitive: e.case_sensitive === true,
            priority: typeof e.priority === "number" ? e.priority : 50,
            constant: e.constant === true,
          }))
        : [],
    };
  }

  // System prompt handling
  const systemPrompt = (payload.systemPrompt as string) || "";
  const promptTemplateId = payload.promptTemplateId as string | undefined;
  if (promptTemplateId) {
    warnings.push(
      `promptTemplateId "${promptTemplateId}" cannot be mapped to Chara Card`,
    );
  }

  // Fields that don't map
  if (payload.fallbackModelId) {
    warnings.push("fallbackModelId was dropped");
  }
  if (payload.defaultModelId) {
    warnings.push("defaultModelId was dropped");
  }
  if (payload.voiceConfig) {
    warnings.push("voiceConfig was dropped");
  }
  if (payload.nickname) {
    warnings.push(
      `nickname "${payload.nickname}" has no Chara Card equivalent`,
    );
  }

  // Check extensions for original chara card data
  const extensions = uec.extensions as Record<string, unknown> | undefined;
  const originalExtensions =
    extensions?.["com.chara_card.original"] as Record<string, unknown> | undefined;

  const data: CharaCardV2Data = {
    name,
    description: (payload.description as string) || "",
    personality,
    scenario,
    first_mes: firstMes,
    mes_example: mesExample,
    creator_notes: (payload.creatorNotes as string) || "",
    system_prompt: systemPrompt,
    post_history_instructions: "",
    alternate_greetings: alternateGreetings,
    tags: Array.isArray(payload.tags) ? (payload.tags as string[]) : [],
    creator: (payload.creator as string) || "",
    character_version: "",
    extensions: originalExtensions || {},
    ...(characterBook ? { character_book: characterBook } : {}),
  };

  if (targetVersion === "v3") {
    const charaCard: CharaCardV3 = {
      spec: "chara_card_v3",
      spec_version: "3.0",
      data: {
        ...data,
        group_only_greetings: [],
      },
    };
    return { ok: true, charaCard, avatarDataUrl, warnings };
  }

  const charaCard: CharaCardV2 = {
    spec: "chara_card_v2",
    spec_version: "2.0",
    data,
  };
  return { ok: true, charaCard, avatarDataUrl, warnings };
}
