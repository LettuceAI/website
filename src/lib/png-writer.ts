/**
 * Embed character card JSON into a PNG file as a tEXt chunk with keyword "chara".
 * If no source image is provided, creates a minimal 1x1 transparent PNG.
 */

function uint32ToBytes(value: number): Uint8Array {
  return new Uint8Array([
    (value >>> 24) & 0xff,
    (value >>> 16) & 0xff,
    (value >>> 8) & 0xff,
    value & 0xff,
  ]);
}

function stringToBytes(str: string): Uint8Array {
  const bytes = new Uint8Array(str.length);
  for (let i = 0; i < str.length; i++) {
    bytes[i] = str.charCodeAt(i);
  }
  return bytes;
}

// CRC32 table for PNG chunk checksums
const crcTable: number[] = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    if (c & 1) {
      c = 0xedb88320 ^ (c >>> 1);
    } else {
      c = c >>> 1;
    }
  }
  crcTable[n] = c;
}

function crc32(data: Uint8Array): number {
  let crc = 0xffffffff;
  for (let i = 0; i < data.length; i++) {
    crc = crcTable[(crc ^ data[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function buildTextChunk(keyword: string, text: string): Uint8Array {
  const keywordBytes = stringToBytes(keyword);
  const textBytes = stringToBytes(text);
  // keyword + null separator + text
  const chunkData = new Uint8Array(
    keywordBytes.length + 1 + textBytes.length,
  );
  chunkData.set(keywordBytes, 0);
  chunkData[keywordBytes.length] = 0; // null separator
  chunkData.set(textBytes, keywordBytes.length + 1);

  const typeBytes = stringToBytes("tEXt");
  // CRC covers type + data
  const crcInput = new Uint8Array(typeBytes.length + chunkData.length);
  crcInput.set(typeBytes, 0);
  crcInput.set(chunkData, typeBytes.length);
  const checksum = crc32(crcInput);

  // Full chunk: length(4) + type(4) + data + crc(4)
  const chunk = new Uint8Array(12 + chunkData.length);
  chunk.set(uint32ToBytes(chunkData.length), 0);
  chunk.set(typeBytes, 4);
  chunk.set(chunkData, 8);
  chunk.set(uint32ToBytes(checksum), 8 + chunkData.length);

  return chunk;
}

// Minimal 1x1 transparent PNG
function createMinimalPng(): Uint8Array {
  // Pre-built minimal 1x1 RGBA transparent PNG
  const base64 =
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQI12NgAAIABQAB" +
    "Nl7BcQAAAABJRU5ErkJggg==";
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

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

/**
 * Strip any existing "chara" tEXt chunks from a PNG, then inject a new one
 * right before the IEND chunk.
 */
export function embedCharaInPng(
  charaJson: string,
  sourceImageDataUrl: string | null,
): Blob {
  // Encode chara JSON as base64
  const utf8Bytes = new TextEncoder().encode(charaJson);
  let binaryStr = "";
  for (let i = 0; i < utf8Bytes.length; i++) {
    binaryStr += String.fromCharCode(utf8Bytes[i]);
  }
  const base64Data = btoa(binaryStr);

  // Get source PNG bytes
  let pngBytes: Uint8Array;
  if (sourceImageDataUrl) {
    const match = sourceImageDataUrl.match(/^data:[^;]+;base64,(.+)$/);
    if (match) {
      const binary = atob(match[1]);
      pngBytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        pngBytes[i] = binary.charCodeAt(i);
      }
    } else {
      pngBytes = createMinimalPng();
    }
  } else {
    pngBytes = createMinimalPng();
  }

  // Parse PNG chunks, filter out existing chara tEXt, find IEND position
  const signature = pngBytes.slice(0, 8);
  const chunks: Uint8Array[] = [];
  let offset = 8;

  while (offset < pngBytes.length) {
    if (offset + 8 > pngBytes.length) break;

    const length = readUint32(pngBytes, offset);
    const type = bytesToString(pngBytes, offset + 4, offset + 8);
    const chunkEnd = offset + 12 + length;

    if (chunkEnd > pngBytes.length) break;

    const fullChunk = pngBytes.slice(offset, chunkEnd);

    // Skip existing chara tEXt chunks
    if (type === "tEXt" || type === "iTXt") {
      const chunkData = pngBytes.slice(offset + 8, offset + 8 + length);
      let nullIdx = -1;
      for (let i = 0; i < chunkData.length; i++) {
        if (chunkData[i] === 0) {
          nullIdx = i;
          break;
        }
      }
      if (nullIdx !== -1) {
        const keyword = bytesToString(chunkData, 0, nullIdx);
        if (keyword === "chara") {
          offset = chunkEnd;
          continue;
        }
      }
    }

    chunks.push(fullChunk);
    offset = chunkEnd;
  }

  // Build new tEXt chunk
  const charaChunk = buildTextChunk("chara", base64Data);

  // Insert before IEND (last chunk)
  const iendChunk = chunks.pop()!;

  // Calculate total size
  let totalSize = signature.length;
  for (const chunk of chunks) totalSize += chunk.length;
  totalSize += charaChunk.length;
  totalSize += iendChunk.length;

  // Assemble
  const result = new Uint8Array(totalSize);
  let pos = 0;
  result.set(signature, pos);
  pos += signature.length;
  for (const chunk of chunks) {
    result.set(chunk, pos);
    pos += chunk.length;
  }
  result.set(charaChunk, pos);
  pos += charaChunk.length;
  result.set(iendChunk, pos);

  return new Blob([result], { type: "image/png" });
}
