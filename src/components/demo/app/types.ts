/**
 * Minimal type stubs extracted from appui/core/storage/schemas.ts
 * Only the types needed for the chat UI components.
 */

export interface AvatarCrop {
    x: number;
    y: number;
    scale: number;
}

export interface VoiceConfig {
    source: "user" | "provider";
    userVoiceId?: string;
    providerId?: string;
    voiceId?: string;
    modelId?: string;
    voiceName?: string;
}

export interface Character {
    id: string;
    name: string;
    avatarPath?: string;
    avatarCrop?: AvatarCrop;
    memoryType?: "dynamic" | "static";
    voiceConfig?: VoiceConfig;
}

export interface Persona {
    id: string;
    title: string;
    nickname?: string;
    avatarPath?: string;
    avatarCrop?: AvatarCrop;
}

export interface ImageAttachment {
    id: string;
    data: string;
    mimeType: string;
    filename?: string;
    width?: number;
    height?: number;
    storagePath?: string;
}

export interface StoredMessage {
    id: string;
    role: "user" | "assistant" | "scene" | "system";
    content: string;
    isPinned?: boolean;
    selectedVariantId?: string;
    variants?: Array<{ id: string; content: string; createdAt: number }>;
    attachments?: ImageAttachment[];
    reasoning?: string;
}

export interface Session {
    id: string;
    memories?: Array<{ id: string; content: string }>;
    memoryStatus?: "idle" | "processing" | "failed";
    memoryError?: string;
}

export type ChatAppearanceSettings = {
    fontSize: "small" | "medium" | "large" | "xlarge";
    lineSpacing: "tight" | "normal" | "relaxed";
    bubbleRadius: "sharp" | "rounded" | "pill";
    bubbleMaxWidth: "compact" | "normal" | "wide";
    bubblePadding: "compact" | "normal" | "spacious";
    bubbleBlur: "none" | "light" | "medium" | "heavy";
    bubbleStyle: "filled" | "bordered" | "minimal";
    avatarShape: "circle" | "rounded" | "hidden";
    avatarSize: "small" | "medium" | "large";
    messageTextColorHex?: string;
    plainTextColorHex?: string;
    italicTextColorHex?: string;
    quotedTextColorHex?: string;
    inlineCodeTextColorHex?: string;
};

export interface ThemeColors {
    userBg: string;
    userText: string;
    userBorder: string;
    userBgColor: string;
    userBorderColor: string;
    assistantBg: string;
    assistantText: string;
    assistantBorder: string;
    assistantBgColor: string;
    assistantBorderColor: string;
}
