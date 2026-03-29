/**
 * Stub implementations for Tauri-specific hooks and utilities.
 * These replace the native app's dependencies for the website demo.
 */

import type { ImageAttachment } from "./types";

// ── useAvatar stub ──
// In the real app this loads avatars from Tauri's filesystem.
// For the demo, we pass avatar URLs directly as props or return a static URL.
export function useAvatar(
    _type: "character" | "persona",
    _id: string | undefined,
    avatarPath: string | undefined,
    _shape?: string,
): string | null {
    // If an avatarPath is provided (as a URL for the demo), return it directly
    return avatarPath ?? null;
}

// ── useSessionAttachments stub ──
// In the real app this loads persisted image attachments from Tauri storage.
// For the demo, attachments are already inline (base64 data URLs).
export function useSessionAttachments(
    attachments?: ImageAttachment[],
): ImageAttachment[] {
    return attachments ?? [];
}

// ── useI18n stub ──
// Returns a passthrough t() function that just returns the key's last segment
// as readable text, or a provided fallback.
const DEMO_STRINGS: Record<string, string> = {
    "chats.message.regenerateResponse": "Regenerate",
    "chats.message.assistantIsTyping": "Typing...",
    "chats.message.thoughtProcess": "Thought process",
    "chats.message.sceneLabel": "Scene",
    "chats.message.variantLabel": "Variant",
    "chats.message.regenerating": "Regenerating...",
    "chats.message.attachedImage": "Attached image",
    "chats.message.cancelAudioGeneration": "Cancel",
    "chats.message.stopAudio": "Stop",
    "chats.message.playMessageAudio": "Play audio",
    "chats.message.playAudio": "Play audio",
    "chats.header.back": "Back",
    "chats.header.openSettings": "Settings",
    "chats.header.manageMemories": "Memories",
    "chats.header.searchMessages": "Search",
    "chats.header.manageLorebooks": "Lorebooks",
    "chats.header.conversationSettings": "Settings",
    "chats.footer.sendMessagePlaceholder": "Write a message...",
    "chats.footer.moreOptions": "More options",
    "chats.footer.addImage": "Add image",
    "chats.footer.addImageAttachment": "Add image",
    "chats.footer.removeAttachment": "Remove",
    "chats.footer.stopGeneration": "Stop",
    "chats.footer.sendMessage": "Send",
    "chats.footer.continueConversation": "Continue",
    // Thinking messages
    "chats.message.thinkingMessages.thinkingReallyHard": "Thinking really hard...",
    "chats.message.thinkingMessages.lettuceCouncil": "Consulting the lettuce council...",
    "chats.message.thinkingMessages.stealingThoughts": "Stealing thoughts...",
    "chats.message.thinkingMessages.warmingBrainCells": "Warming brain cells...",
    "chats.message.thinkingMessages.forbiddenKnowledge": "Accessing forbidden knowledge...",
    "chats.message.thinkingMessages.overthinking": "Overthinking as usual...",
    "chats.message.thinkingMessages.pretendingToBeSmart": "Pretending to be smart...",
    "chats.message.thinkingMessages.crunchingNumbers": "Crunching numbers...",
    "chats.message.thinkingMessages.arguingWithMyself": "Arguing with myself...",
    "chats.message.thinkingMessages.askingUniverse": "Asking the universe...",
};

export function useI18n() {
    return {
        t: (key: string) => DEMO_STRINGS[key] ?? key.split(".").pop() ?? key,
    };
}

// ── replacePlaceholders stub ──
export function replacePlaceholders(
    content: string,
    _charName: string,
    _personaName: string,
): string {
    return content;
}

// ── getPlatform stub ──
export function getPlatform() {
    return { type: "desktop" as const };
}

// ── isRenderableImageUrl stub ──
export function isRenderableImageUrl(value?: string): boolean {
    if (!value) return false;
    return /\.(png|jpe?g|gif|webp|svg|avif|bmp|ico)$/i.test(value) || value.startsWith("data:") || value.startsWith("http");
}
