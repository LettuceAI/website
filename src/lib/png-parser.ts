/**
 * Extract character card data from PNG tEXt chunks.
 * PNG character cards store a base64-encoded JSON string in a tEXt chunk
 * with the keyword "chara".
 */

const PNG_SIGNATURE = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]);

function readUint32(data: Uint8Array, offset: number): number {
  return (
    ((data[offset] << 24) |
      (data[offset + 1] << 16) |
      (data[offset + 2] << 8) |
      data[offset + 3]) >>>
    0
  );
}

function bytesToString(data: Uint8Array, start: number, end: number): string {
  let result = "";
  for (let i = start; i < end; i++) {
    result += String.fromCharCode(data[i]);
  }
  return result;
}

export interface PngCharaResult {
  ok: true;
  data: Record<string, unknown>;
  spec: "chara_card_v1" | "chara_card_v2" | "chara_card_v3";
  imageDataUrl: string;
}

export interface PngCharaError {
  ok: false;
  error: string;
}

export type PngParseResult = PngCharaResult | PngCharaError;

export async function extractCharaFromPng(
  file: File,
): Promise<PngParseResult> {
  const buffer = await file.arrayBuffer();
  const data = new Uint8Array(buffer);

  // Verify PNG signature
  for (let i = 0; i < PNG_SIGNATURE.length; i++) {
    if (data[i] !== PNG_SIGNATURE[i]) {
      return { ok: false, error: "Not a valid PNG file" };
    }
  }

  let offset = 8; // Skip signature
  let charaText: string | null = null;

  // Walk through PNG chunks
  while (offset < data.length) {
    if (offset + 8 > data.length) break;

    const length = readUint32(data, offset);
    const type = bytesToString(data, offset + 4, offset + 8);

    if (type === "tEXt" || type === "iTXt") {
      const chunkData = data.slice(offset + 8, offset + 8 + length);

      // Find null terminator separating keyword from text
      let nullIndex = -1;
      for (let i = 0; i < chunkData.length; i++) {
        if (chunkData[i] === 0) {
          nullIndex = i;
          break;
        }
      }

      if (nullIndex !== -1) {
        const keyword = bytesToString(chunkData, 0, nullIndex);
        if (keyword === "chara") {
          if (type === "iTXt") {
            // iTXt: keyword \0 compression_flag compression_method language_tag \0 translated_keyword \0 text
            let textStart = nullIndex + 1;
            // Skip compression flag + compression method (2 bytes)
            textStart += 2;
            // Skip language tag (null-terminated)
            while (textStart < chunkData.length && chunkData[textStart] !== 0)
              textStart++;
            textStart++; // skip null
            // Skip translated keyword (null-terminated)
            while (textStart < chunkData.length && chunkData[textStart] !== 0)
              textStart++;
            textStart++; // skip null
            charaText = bytesToString(
              chunkData,
              textStart,
              chunkData.length,
            );
          } else {
            charaText = bytesToString(
              chunkData,
              nullIndex + 1,
              chunkData.length,
            );
          }
          break;
        }
      }
    }

    // Move to next chunk: length + type(4) + data(length) + crc(4)
    offset += 12 + length;
  }

  if (!charaText) {
    return {
      ok: false,
      error: "No character data found in PNG. Is this a valid character card?",
    };
  }

  // Decode base64
  let jsonString: string;
  try {
    jsonString = atob(charaText);
    // Handle UTF-8 encoding
    jsonString = decodeURIComponent(
      jsonString
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join(""),
    );
  } catch {
    return { ok: false, error: "Failed to decode character data from PNG" };
  }

  let parsed: Record<string, unknown>;
  try {
    parsed = JSON.parse(jsonString);
  } catch {
    return { ok: false, error: "Character data is not valid JSON" };
  }

  // Determine spec version
  let spec: PngCharaResult["spec"];
  if (parsed.spec === "chara_card_v3") {
    spec = "chara_card_v3";
  } else if (
    parsed.spec === "chara_card_v2" ||
    (parsed.data && typeof parsed.data === "object")
  ) {
    spec = "chara_card_v2";
  } else {
    // v1: flat structure with name, description, etc.
    spec = "chara_card_v1";
  }

  // Convert PNG to data URL for avatar
  const blob = new Blob([buffer], { type: "image/png" });
  const imageDataUrl = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });

  return { ok: true, data: parsed, spec, imageDataUrl };
}
