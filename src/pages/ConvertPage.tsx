import { SEO } from "@/components/common/SEO";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useRef, useCallback } from "react";
import {
  Upload,
  FileDown,
  AlertTriangle,
  CheckCircle2,
  X,
  Trash2,
  Loader2,
} from "lucide-react";
import {
  extractCharaFromPng,
  type PngCharaResult,
  type PngCharaError,
} from "@/lib/png-parser";
import { convertCharaToUEC, type ConvertResult } from "@/lib/chara-to-uec";
import {
  convertUECToChara,
  type UecToCharaResult,
} from "@/lib/uec-to-chara";
import { embedCharaInPng } from "@/lib/png-writer";
import { stringifyUEC } from "unified-entity-card";

/* ── Types ─────────────────────────────────────────────── */

type OutputFormat = "uec" | "chara_v2" | "chara_v3" | "png_v2" | "png_v3";
type FileStatus = "pending" | "parsing" | "ready" | "converting" | "done" | "error";
type SourceType = "png_chara" | "uec";

interface FileEntry {
  id: string;
  file: File;
  sourceType: SourceType | null;
  status: FileStatus;
  // PNG chara → UEC path
  parsedChara: PngCharaResult | null;
  convertedUec: ConvertResult | null;
  // UEC → chara path
  parsedUec: Record<string, unknown> | null;
  convertedChara: UecToCharaResult | null;
  // Shared
  parseError: string | null;
  convertError: string | null;
}

const OUTPUT_OPTIONS: { value: OutputFormat; label: string; from: SourceType }[] = [
  { value: "uec", label: "UEC v2 (.uec)", from: "png_chara" },
  { value: "chara_v2", label: "Chara Card v2 (JSON)", from: "uec" },
  { value: "chara_v3", label: "Chara Card v3 (JSON)", from: "uec" },
  { value: "png_v2", label: "Chara Card v2 (PNG)", from: "uec" },
  { value: "png_v3", label: "Chara Card v3 (PNG)", from: "uec" },
];

function getAvailableOutputs(sourceType: SourceType): typeof OUTPUT_OPTIONS {
  return OUTPUT_OPTIONS.filter((o) => o.from === sourceType);
}

function getDefaultOutput(sourceType: SourceType): OutputFormat {
  return sourceType === "png_chara" ? "uec" : "chara_v2";
}

/* ── Preview helper ────────────────────────────────────── */

function getPreview(entry: FileEntry) {
  if (entry.sourceType === "png_chara" && entry.parsedChara?.ok) {
    const d = entry.parsedChara.data;
    const data =
      d.data && typeof d.data === "object"
        ? (d.data as Record<string, unknown>)
        : d;
    return {
      name: (data.name as string) || "Unknown",
      description: (data.description as string) || "",
      creator: (data.creator as string) || null,
      spec: entry.parsedChara.spec.replace("chara_card_", ""),
      imageUrl: entry.parsedChara.imageDataUrl,
    };
  }

  if (entry.sourceType === "uec" && entry.parsedUec) {
    const payload = entry.parsedUec.payload as Record<string, unknown> | undefined;
    const version = (entry.parsedUec.schema as Record<string, unknown>)?.version || "?";
    return {
      name: (payload?.name as string) || (payload?.title as string) || "Unknown",
      description: (payload?.description as string) || "",
      creator: (payload?.creator as string) || null,
      spec: `UEC v${version}`,
      imageUrl: null as string | null,
    };
  }

  return null;
}

/* ── Component ─────────────────────────────────────────── */

export function ConvertPage() {
  const [files, setFiles] = useState<FileEntry[]>([]);
  const [outputFormat, setOutputFormat] = useState<OutputFormat>("uec");
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const updateFile = useCallback(
    (id: string, update: Partial<FileEntry>) =>
      setFiles((prev) =>
        prev.map((f) => (f.id === id ? { ...f, ...update } : f)),
      ),
    [],
  );

  const parseFile = useCallback(
    async (entry: FileEntry) => {
      updateFile(entry.id, { status: "parsing" });

      const ext = entry.file.name.split(".").pop()?.toLowerCase();

      if (ext === "uec" || ext === "json") {
        // Parse as UEC
        try {
          const text = await entry.file.text();
          const parsed = JSON.parse(text);
          if (
            !parsed.schema ||
            typeof parsed.schema !== "object" ||
            (parsed.schema as Record<string, unknown>).name !== "UEC"
          ) {
            updateFile(entry.id, {
              status: "error",
              parseError: "Not a valid UEC file",
            });
            return;
          }
          if (parsed.kind !== "character") {
            updateFile(entry.id, {
              status: "error",
              parseError: `Only character UECs are supported (got "${parsed.kind}")`,
            });
            return;
          }
          updateFile(entry.id, {
            status: "ready",
            sourceType: "uec",
            parsedUec: parsed,
          });
        } catch {
          updateFile(entry.id, {
            status: "error",
            parseError: "Failed to parse JSON",
          });
        }
        return;
      }

      // Parse as PNG chara card
      const result = await extractCharaFromPng(entry.file);
      if (!result.ok) {
        updateFile(entry.id, {
          status: "error",
          parseError: (result as PngCharaError).error,
        });
      } else {
        updateFile(entry.id, {
          status: "ready",
          sourceType: "png_chara",
          parsedChara: result,
        });
      }
    },
    [updateFile],
  );

  const addFiles = useCallback(
    (fileList: FileList | File[]) => {
      const newEntries: FileEntry[] = [];
      let firstSourceType: SourceType | null = null;

      for (const file of Array.from(fileList)) {
        const ext = file.name.split(".").pop()?.toLowerCase();
        const isPng =
          file.type.startsWith("image/png") || ext === "png";
        const isUec = ext === "uec" || ext === "json";
        if (!isPng && !isUec) continue;

        if (!firstSourceType) {
          firstSourceType = isPng ? "png_chara" : "uec";
        }

        const entry: FileEntry = {
          id: crypto.randomUUID(),
          file,
          sourceType: null,
          status: "pending",
          parsedChara: null,
          convertedUec: null,
          parsedUec: null,
          convertedChara: null,
          parseError: null,
          convertError: null,
        };
        newEntries.push(entry);
      }

      if (newEntries.length === 0) return;

      setFiles((prev) => [...prev, ...newEntries]);

      // Auto-set output format based on first new file type
      if (firstSourceType) {
        setOutputFormat((prev) => {
          const available = getAvailableOutputs(firstSourceType);
          if (available.some((o) => o.value === prev)) return prev;
          return getDefaultOutput(firstSourceType);
        });
      }

      for (const entry of newEntries) {
        parseFile(entry);
      }
    },
    [parseFile],
  );

  const removeFile = useCallback((id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setFiles([]);
    if (inputRef.current) inputRef.current.value = "";
  }, []);

  const convertOne = useCallback(
    async (entry: FileEntry) => {
      updateFile(entry.id, { status: "converting" });

      if (entry.sourceType === "png_chara" && entry.parsedChara?.ok) {
        const result = convertCharaToUEC(
          entry.parsedChara.data,
          entry.parsedChara.imageDataUrl,
        );
        if (!result.ok) {
          updateFile(entry.id, {
            status: "error",
            convertError: result.error,
          });
        } else {
          updateFile(entry.id, { status: "done", convertedUec: result });
        }
        return;
      }

      if (entry.sourceType === "uec" && entry.parsedUec) {
        const targetVersion =
          outputFormat === "chara_v3" || outputFormat === "png_v3"
            ? "v3"
            : "v2";
        const result = convertUECToChara(entry.parsedUec, targetVersion);
        if (!result.ok) {
          updateFile(entry.id, {
            status: "error",
            convertError: result.error,
          });
        } else {
          updateFile(entry.id, { status: "done", convertedChara: result });
        }
        return;
      }

      updateFile(entry.id, {
        status: "error",
        convertError: "Cannot convert this file",
      });
    },
    [updateFile, outputFormat],
  );

  const convertAll = useCallback(async () => {
    const ready = files.filter((f) => f.status === "ready");
    for (const entry of ready) {
      await convertOne(entry);
    }
  }, [files, convertOne]);

  const downloadOne = useCallback(
    (entry: FileEntry) => {
      const safeName = (name: string) =>
        name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "") || "character";

      if (entry.sourceType === "png_chara" && entry.convertedUec) {
        const json = stringifyUEC(entry.convertedUec.uec);
        const blob = new Blob([json], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${safeName(entry.convertedUec.uec.payload.name)}.uec`;
        a.click();
        URL.revokeObjectURL(url);
        return;
      }

      if (entry.sourceType === "uec" && entry.convertedChara) {
        const charaJson = JSON.stringify(
          entry.convertedChara.charaCard,
          null,
          2,
        );
        const charName = safeName(
          entry.convertedChara.charaCard.data.name,
        );

        if (outputFormat === "png_v2" || outputFormat === "png_v3") {
          const blob = embedCharaInPng(
            charaJson,
            entry.convertedChara.avatarDataUrl,
          );
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${charName}.png`;
          a.click();
          URL.revokeObjectURL(url);
        } else {
          const blob = new Blob([charaJson], { type: "application/json" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${charName}.json`;
          a.click();
          URL.revokeObjectURL(url);
        }
      }
    },
    [outputFormat],
  );

  const downloadAll = useCallback(() => {
    const done = files.filter((f) => f.status === "done");
    for (const entry of done) {
      downloadOne(entry);
    }
  }, [files, downloadOne]);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      if (e.dataTransfer.files.length > 0) addFiles(e.dataTransfer.files);
    },
    [addFiles],
  );

  const readyCount = files.filter((f) => f.status === "ready").length;
  const doneCount = files.filter((f) => f.status === "done").length;
  const errorCount = files.filter((f) => f.status === "error").length;

  // Determine which source types are present
  const sourceTypes = new Set(
    files.filter((f) => f.sourceType).map((f) => f.sourceType!),
  );
  const availableOutputs =
    sourceTypes.size === 1
      ? getAvailableOutputs([...sourceTypes][0])
      : OUTPUT_OPTIONS;

  const warnings = files
    .filter((f) => f.status === "done")
    .flatMap((f) => {
      if (f.convertedUec?.warnings.length) return f.convertedUec.warnings;
      if (f.convertedChara?.warnings.length) return f.convertedChara.warnings;
      return [];
    });

  return (
    <>
      <SEO
        title="Convert"
        description="Convert between PNG character cards (Chara Card v2/v3) and UEC format."
        path="/convert"
      />
      <main className="min-h-screen bg-[#050505]">
        <div className="max-w-3xl mx-auto px-6 sm:px-10 pt-28 sm:pt-36 pb-20">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-8"
          >
            <h1 className="text-2xl font-bold text-white tracking-tight mb-2">
              Character Card Converter
            </h1>
            <p className="text-[14px] text-white/50">
              PNG character cards (v2/v3) to UEC, or UEC to Chara Card.
              Everything runs in your browser.
            </p>
          </motion.div>

          {/* Output format selector */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.03 }}
            className="mb-6 rounded-lg border border-white/[0.08] bg-white/[0.02] px-4 py-3.5"
          >
            <span className="text-[11px] text-white/40 uppercase tracking-wider font-medium block mb-2.5">
              Output format
            </span>
            <div className="flex flex-wrap gap-2">
              {availableOutputs.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setOutputFormat(opt.value)}
                  className={`px-3.5 py-1.5 rounded-md text-[13px] border transition-colors ${
                    outputFormat === opt.value
                      ? "border-primary/50 bg-primary/[0.12] text-primary font-semibold"
                      : "border-white/[0.12] text-white/60 hover:text-white/80 hover:border-white/[0.22] bg-white/[0.02]"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Drop zone */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.05 }}
          >
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => inputRef.current?.click()}
              className={`cursor-pointer rounded-lg border-2 border-dashed transition-colors ${
                dragOver
                  ? "border-primary/60 bg-primary/[0.06]"
                  : "border-white/[0.15] hover:border-white/[0.25]"
              } ${files.length > 0 ? "py-5" : "py-12"}`}
            >
              <div className="flex flex-col items-center gap-1.5">
                <Upload
                  className={`w-5 h-5 ${dragOver ? "text-primary" : "text-white/40"}`}
                />
                <p className="text-[13px] text-white/55">
                  {files.length > 0
                    ? "Drop more files or click to add"
                    : "Drop .png or .uec files here, or click to browse"}
                </p>
              </div>
              <input
                ref={inputRef}
                type="file"
                accept="image/png,.png,.uec,.json"
                multiple
                className="hidden"
                onChange={(e) => {
                  if (e.target.files?.length) addFiles(e.target.files);
                  e.target.value = "";
                }}
              />
            </div>
          </motion.div>

          {/* File list */}
          {files.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="mt-5"
            >
              {/* Toolbar */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3 text-[12px] text-white/45">
                  <span>
                    {files.length} file{files.length !== 1 ? "s" : ""}
                  </span>
                  {readyCount > 0 && (
                    <span className="text-primary/80">
                      {readyCount} ready
                    </span>
                  )}
                  {doneCount > 0 && (
                    <span className="text-green-400/80">
                      {doneCount} converted
                    </span>
                  )}
                  {errorCount > 0 && (
                    <span className="text-red-400/80">
                      {errorCount} failed
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {readyCount > 0 && (
                    <button
                      type="button"
                      onClick={convertAll}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-primary text-black text-[12px] font-semibold hover:bg-primary/90 transition-colors"
                    >
                      Convert{readyCount > 1 ? ` all (${readyCount})` : ""}
                    </button>
                  )}
                  {doneCount > 1 && (
                    <button
                      type="button"
                      onClick={downloadAll}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-white/[0.12] text-[12px] text-white/60 hover:text-white/80 transition-colors"
                    >
                      <FileDown className="w-3 h-3" />
                      Download all
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={clearAll}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] text-white/40 hover:text-white/60 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                    Clear
                  </button>
                </div>
              </div>

              {/* Rows */}
              <div className="rounded-lg border border-white/[0.10] overflow-hidden divide-y divide-white/[0.07]">
                <AnimatePresence initial={false}>
                  {files.map((entry) => {
                    const preview = getPreview(entry);
                    return (
                      <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.15 }}
                        className="overflow-hidden"
                      >
                        <div className="flex items-center gap-4 px-4 py-3 bg-white/[0.015]">
                          {/* Thumbnail */}
                          {preview?.imageUrl ? (
                            <img
                              src={preview.imageUrl}
                              alt=""
                              className="w-10 h-10 rounded-md object-cover border border-white/[0.06] shrink-0"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-md bg-white/[0.04] border border-white/[0.08] shrink-0 flex items-center justify-center text-[10px] text-white/30 font-mono">
                              {entry.sourceType === "uec" ? "UEC" : ""}
                            </div>
                          )}

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <p className="text-[13px] text-white/80 font-medium truncate">
                                {preview?.name || entry.file.name}
                              </p>
                              {preview?.spec && (
                                <span className="shrink-0 text-[10px] text-primary/70 bg-primary/[0.08] border border-primary/15 px-1.5 py-0.5 rounded font-medium uppercase tracking-wider">
                                  {preview.spec}
                                </span>
                              )}
                            </div>
                            {preview?.description && (
                              <p className="text-[11px] text-white/40 truncate mt-0.5">
                                {preview.description}
                              </p>
                            )}
                            {entry.parseError && (
                              <p className="text-[11px] text-red-400/80 mt-0.5">
                                {entry.parseError}
                              </p>
                            )}
                            {entry.convertError && (
                              <p className="text-[11px] text-red-400/80 mt-0.5">
                                {entry.convertError}
                              </p>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-2 shrink-0">
                            {(entry.status === "pending" ||
                              entry.status === "parsing" ||
                              entry.status === "converting") && (
                              <Loader2 className="w-4 h-4 text-white/40 animate-spin" />
                            )}
                            {entry.status === "ready" && (
                              <button
                                type="button"
                                onClick={() => convertOne(entry)}
                                className="px-2.5 py-1 rounded-md bg-primary text-black text-[11px] font-semibold hover:bg-primary/90 transition-colors"
                              >
                                Convert
                              </button>
                            )}
                            {entry.status === "done" && (
                              <>
                                <button
                                  type="button"
                                  onClick={() => downloadOne(entry)}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-primary/20 text-primary text-[11px] font-medium hover:bg-primary/[0.06] transition-colors"
                                >
                                  <FileDown className="w-3 h-3" />
                                  {outputFormat.startsWith("png")
                                    ? ".png"
                                    : outputFormat === "uec"
                                      ? ".uec"
                                      : ".json"}
                                </button>
                                <CheckCircle2 className="w-4 h-4 text-green-400/70" />
                              </>
                            )}
                            {entry.status === "error" && (
                              <AlertTriangle className="w-4 h-4 text-red-400/70" />
                            )}
                            <button
                              type="button"
                              onClick={() => removeFile(entry.id)}
                              className="p-1 text-white/30 hover:text-white/60 transition-colors"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* Conversion notes */}
              {warnings.length > 0 && (
                <div className="mt-3 rounded-lg border border-yellow-500/15 bg-yellow-500/[0.03] px-4 py-3">
                  <div className="flex items-center gap-1.5 mb-2">
                    <AlertTriangle className="w-3 h-3 text-yellow-500/70" />
                    <span className="text-[11px] font-medium text-yellow-500/70 uppercase tracking-wider">
                      Conversion notes
                    </span>
                  </div>
                  <ul className="space-y-1">
                    {[...new Set(warnings)].map((w, i) => (
                      <li
                        key={i}
                        className="text-[11px] text-white/45 pl-3 relative before:absolute before:left-0 before:top-[6px] before:w-1 before:h-1 before:rounded-full before:bg-white/20"
                      >
                        {w}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          )}

          {/* Footer */}
          <div className="mt-12 text-[12px] text-white/30 space-y-1">
            <p>
              Accepts .png (Chara Card v2/v3) and .uec/.json (UEC v1/v2)
              files. Outputs UEC v2, Chara Card v2/v3 JSON, or PNG with
              embedded character data.
            </p>
            <p>
              UEC spec:{" "}
              <a
                href="https://github.com/LettuceAI/Unified-Entity-Cards"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white/60 underline underline-offset-2 transition-colors"
              >
                github.com/LettuceAI/Unified-Entity-Cards
              </a>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
