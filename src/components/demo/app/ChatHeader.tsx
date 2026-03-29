import { useMemo, useState } from "react";
import { ArrowLeft, Brain, Loader2, AlertTriangle, Search, BookOpen } from "lucide-react";
import type { Character, Persona, Session } from "./types";
import { AvatarImage } from "./AvatarImage";
import { useAvatar, useI18n, isRenderableImageUrl } from "./stubs";
import { cn } from "./design-tokens";

interface ChatHeaderProps {
  character: Character;
  persona?: Persona | null;
  swapPlaces?: boolean;
  sessionId?: string;
  session?: Session | null;
  hasBackgroundImage?: boolean;
  headerOverlayClassName?: string;
  onSessionUpdate?: () => void;
}

function isImageLike(value?: string) {
  return isRenderableImageUrl(value);
}

export function ChatHeader({
  character,
  persona = null,
  swapPlaces = false,
  sessionId,
  session,
  hasBackgroundImage,
  headerOverlayClassName,
  onSessionUpdate: _onSessionUpdate,
}: ChatHeaderProps) {
  const navigate = (_path: string) => {}; // no-op for demo
  const characterId = character?.id;
  const { t } = useI18n();
  const avatarUrl = useAvatar(
    swapPlaces ? "persona" : "character",
    swapPlaces ? persona?.id : character?.id,
    swapPlaces ? persona?.avatarPath : character?.avatarPath,
    "round",
  );
  const [memoryBusy] = useState(false);
  const [memoryError] = useState<string | null>(null);
  const isDynamic = useMemo(() => character?.memoryType === "dynamic", [character?.memoryType]);

  // Tauri event listeners removed for web demo — memory state is static

  const avatarImageUrl = useMemo(() => {
    if (avatarUrl && isImageLike(avatarUrl)) return avatarUrl;
    return null;
  }, [avatarUrl]);

  const initials = useMemo(() => {
    if (swapPlaces) {
      return persona?.title ? persona.title.slice(0, 2).toUpperCase() : "?";
    }
    return character?.name ? character.name.slice(0, 2).toUpperCase() : "?";
  }, [character, persona, swapPlaces]);

  const avatarFallback = (
    <div className="flex h-full w-full items-center justify-center rounded-full bg-white/10 text-xs font-semibold text-white">
      {initials}
    </div>
  );

  const headerTitle = useMemo(() => {
    if (swapPlaces) {
      if (!persona) return "Unknown";
      return persona.nickname ? `${persona.title} (${persona.nickname})` : persona.title;
    }
    return character?.name ?? "Unknown";
  }, [character?.name, persona, swapPlaces]);

  return (
    <>
      <header
        className={cn(
          "z-20 shrink-0 border-b border-white/10 px-3 lg:px-8",
          hasBackgroundImage ? headerOverlayClassName || "bg-surface/40" : "bg-surface",
        )}
        style={{
          paddingTop: "calc(env(safe-area-inset-top) + 12px)",
          paddingBottom: "12px",
        }}
      >
        <div className="flex items-center h-10">
          <button
            onClick={() => navigate("/chat")}
            className="flex px-[0.6em] py-[0.3em] shrink-0 items-center justify-center -ml-2 text-white transition hover:text-white/80"
            aria-label={t("chats.header.back")}
          >
            <ArrowLeft size={18} strokeWidth={2.5} />
          </button>

          <button
            onClick={() => {
              if (!characterId) return;
              navigate("#");
            }}
            className="min-w-0 flex-1 text-left truncate text-xl font-bold text-white/90 p-0 hover:opacity-80 transition-opacity"
            aria-label={t("chats.header.openSettings")}
          >
            {headerTitle}
          </button>

          <div className="flex shrink-0 items-center gap-1.5">
            {/* Memory Button */}
            {session &&
              (() => {
                const isBusy = isDynamic && (memoryBusy || session.memoryStatus === "processing");
                const isError = isDynamic && (!!memoryError || session.memoryStatus === "failed");
                return (
                  <button
                    onClick={() => {
                      if (!characterId || !sessionId) return;
                      navigate("#");
                    }}
                    className="relative flex px-[0.6em] py-[0.3em] h-10 w-10 items-center justify-center text-white/80 transition hover:text-white"
                    aria-label={t("chats.header.manageMemories")}
                  >
                    {isBusy ? (
                      <Loader2
                        size={18}
                        strokeWidth={2.5}
                        className="animate-spin text-emerald-400"
                      />
                    ) : isError ? (
                      <AlertTriangle size={18} strokeWidth={2.5} className="text-red-400" />
                    ) : (
                      <Brain size={18} strokeWidth={2.5} />
                    )}
                    {!isBusy && !isError && session.memories && session.memories.length > 0 && (
                      <span className="absolute right-0.5 top-0.5 inline-flex min-w-4 h-4 items-center justify-center rounded-full bg-emerald-500 px-1 text-[10px] font-bold leading-none text-white shadow-md ring-1 ring-emerald-200/40">
                        {session.memories.length > 99 ? "99+" : session.memories.length}
                      </span>
                    )}
                  </button>
                );
              })()}

            {/* Search Button */}
            {session && (
              <button
                onClick={() => {
                  if (!characterId || !sessionId) return;
                  navigate("#");
                }}
                className="flex items-center px-[0.6em] py-[0.3em] justify-center text-white/80 transition hover:text-white"
                aria-label={t("chats.header.searchMessages")}
              >
                <Search size={18} strokeWidth={2.5} />
              </button>
            )}

            {/* Lorebooks Button */}
            <button
              onClick={() => {
                if (!characterId) return;
                navigate("#");
              }}
              className="flex items-center px-[0.6em] py-[0.3em] justify-center text-white/80 transition hover:text-white"
              aria-label={t("chats.header.manageLorebooks")}
            >
              <BookOpen size={18} strokeWidth={2.5} />
            </button>

            {/* Avatar (Settings) Button */}
            <button
              onClick={() => {
                if (!characterId) return;
                navigate("#");
              }}
              className="relative shrink-0 rounded-full overflow-hidden ring-1 ring-white/20 transition hover:ring-white/40"
              style={{
                width: "36px",
                height: "36px",
                minWidth: "36px",
                minHeight: "36px",
                flexShrink: 0,
              }}
              aria-label={t("chats.header.conversationSettings")}
            >
              {avatarImageUrl ? (
                <AvatarImage
                  src={avatarImageUrl}
                  alt={swapPlaces ? persona?.title || "Avatar" : character?.name || "Avatar"}
                  crop={swapPlaces ? persona?.avatarCrop : character?.avatarCrop}
                  applyCrop
                  className="absolute inset-0 z-10"
                />
              ) : (
                avatarFallback
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
