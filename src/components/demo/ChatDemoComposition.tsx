import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";
import { ChatMessage } from "./app/ChatMessage";
import { ChatHeader } from "./app/ChatHeader";
import { ChatFooter } from "./app/ChatFooter";
import type { StoredMessage, Character, Session, ThemeColors, ChatAppearanceSettings } from "./app/types";

// ── Demo data ──

const DEMO_CHARACTER: Character = {
    id: "demo-cassian",
    name: "Cassian",
    memoryType: "dynamic",
};

const DEMO_SESSION: Session = {
    id: "demo-session",
    memories: Array.from({ length: 18 }, (_, i) => ({
        id: `mem-${i}`,
        content: `Memory ${i}`,
    })),
    memoryStatus: "idle",
};

const DEMO_THEME: ThemeColors = {
    userBg: "",
    userText: "text-white/95",
    userBorder: "",
    userBgColor: "color-mix(in oklab, #34d399 35%, transparent)",
    userBorderColor: "color-mix(in oklab, #34d399 50%, transparent)",
    assistantBg: "",
    assistantText: "text-fg",
    assistantBorder: "",
    assistantBgColor: "color-mix(in oklab, var(--color-fg) 5%, transparent)",
    assistantBorderColor: "color-mix(in oklab, var(--color-fg) 10%, transparent)",
};

const DEMO_APPEARANCE: ChatAppearanceSettings = {
    fontSize: "medium",
    lineSpacing: "relaxed",
    bubbleRadius: "rounded",
    bubbleMaxWidth: "normal",
    bubblePadding: "normal",
    bubbleBlur: "none",
    bubbleStyle: "bordered",
    avatarShape: "circle",
    avatarSize: "medium",
};

const CHARS_PER_FRAME = 3;
function streamLen(text: string): number {
    return Math.ceil(text.length / CHARS_PER_FRAME);
}

// ── Messages: bot > user > bot > user > bot ──

const TEXTS = {
    bot1: "The throne room falls silent as you enter. Cassian's eyes — cold, calculating — track your every step.",
    user1: "I heard you were looking for someone who isn't afraid of you. That narrows the list.",
    bot2: "\"You're either very brave or very foolish to come here uninvited.\"",
    user2: "Maybe both. But I didn't come to be judged — I came to make a deal.",
    bot3: "A slow, dangerous smile crosses his face. \"Now you have my attention.\"",
};

const MESSAGES: StoredMessage[] = [
    { id: "msg-1", role: "assistant", content: TEXTS.bot1 },
    { id: "msg-2", role: "user", content: TEXTS.user1 },
    { id: "msg-3", role: "assistant", content: TEXTS.bot2 },
    { id: "msg-4", role: "user", content: TEXTS.user2 },
    { id: "msg-5", role: "assistant", content: TEXTS.bot3 },
];

// ── Timeline ──
// bot1:  typing 0-25, stream 25-59
// user1: types in footer 75-130, sends at 130
// bot2:  typing 135-160, stream 160-182 (footer sending 130-160)
// user2: types in footer 200-250, sends at 250
// bot3:  typing 255-280, stream 280-298 (footer sending 250-280)
// hold 298-450

type Step = {
    type: "bot";
    msgIndex: number;
    typingStart: number;
    streamStart: number;
    streamEnd: number;
} | {
    type: "user";
    msgIndex: number;
    typeStart: number;
    sendFrame: number;
};

const STEPS: Step[] = [
    { type: "bot", msgIndex: 0, typingStart: 0, streamStart: 25, streamEnd: 25 + streamLen(TEXTS.bot1) },
    { type: "user", msgIndex: 1, typeStart: 75, sendFrame: 130 },
    { type: "bot", msgIndex: 2, typingStart: 135, streamStart: 160, streamEnd: 160 + streamLen(TEXTS.bot2) },
    { type: "user", msgIndex: 3, typeStart: 200, sendFrame: 250 },
    { type: "bot", msgIndex: 4, typingStart: 255, streamStart: 280, streamEnd: 280 + streamLen(TEXTS.bot3) },
];

const TYPING_PLACEHOLDER: StoredMessage = {
    id: "placeholder-typing",
    role: "assistant",
    content: "",
};

// Noop handlers
const noopVariantState = () => ({ total: 1, selectedIndex: 0 });
const noopHandlers = {};
const noopDrag = () => {};
const noopRegen = async () => {};

// ── Composition ──

export function ChatDemoComposition() {
    const frame = useCurrentFrame();

    // Build visible messages with streaming
    const visibleMessages: Array<{
        msg: StoredMessage;
        displayContent?: string;
    }> = [];

    let showTypingDots = false;
    let footerDraft = "";
    let footerSending = false;

    for (const step of STEPS) {
        if (step.type === "bot") {
            // Show typing dots phase
            if (frame >= step.typingStart && frame < step.streamStart) {
                showTypingDots = true;
            }
            // Show message once streaming starts
            if (frame >= step.streamStart) {
                const progress = interpolate(
                    frame,
                    [step.streamStart, step.streamEnd],
                    [0, 1],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                );
                const text = MESSAGES[step.msgIndex].content;
                const charsVisible = Math.floor(progress * text.length);
                visibleMessages.push({
                    msg: MESSAGES[step.msgIndex],
                    displayContent: progress >= 1 ? undefined : text.slice(0, charsVisible),
                });
            }
        } else {
            // User step
            // Typing in footer
            if (frame >= step.typeStart && frame < step.sendFrame) {
                const progress = interpolate(
                    frame,
                    [step.typeStart, step.sendFrame - 5],
                    [0, 1],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                );
                footerDraft = MESSAGES[step.msgIndex].content.slice(
                    0,
                    Math.floor(progress * MESSAGES[step.msgIndex].content.length)
                );
            }
            // After send — message appears, footer goes to sending state
            if (frame >= step.sendFrame) {
                visibleMessages.push({ msg: MESSAGES[step.msgIndex] });
            }
            // Footer sending state: from send until the next bot starts streaming
            const nextStep = STEPS[STEPS.indexOf(step) + 1];
            if (nextStep && nextStep.type === "bot") {
                if (frame >= step.sendFrame && frame < nextStep.streamStart) {
                    footerSending = true;
                }
            }
        }
    }

    return (
        <AbsoluteFill
            className="app-demo"
            style={{
                backgroundColor: "#050505",
                fontFamily: "'Noto Sans Variable', sans-serif",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <ChatHeader
                character={DEMO_CHARACTER}
                session={DEMO_SESSION}
                sessionId={DEMO_SESSION.id}
            />

            <div
                style={{
                    flex: 1,
                    padding: "12px 16px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    overflow: "hidden",
                }}
            >
                {visibleMessages.map(({ msg, displayContent }, i) => (
                    <ChatMessage
                        key={msg.id}
                        message={msg}
                        index={i}
                        messagesLength={visibleMessages.length}
                        heldMessageId={null}
                        regeneratingMessageId={null}
                        sending={false}
                        eventHandlers={noopHandlers}
                        getVariantState={noopVariantState}
                        handleVariantDrag={noopDrag}
                        handleRegenerate={noopRegen}
                        isStartingSceneMessage={false}
                        theme={DEMO_THEME}
                        chatAppearance={DEMO_APPEARANCE}
                        character={DEMO_CHARACTER}
                        persona={null}
                        displayContent={displayContent}
                    />
                ))}

                {showTypingDots && (
                    <ChatMessage
                        message={TYPING_PLACEHOLDER}
                        index={visibleMessages.length}
                        messagesLength={visibleMessages.length + 1}
                        heldMessageId={null}
                        regeneratingMessageId={null}
                        sending={true}
                        eventHandlers={noopHandlers}
                        getVariantState={noopVariantState}
                        handleVariantDrag={noopDrag}
                        handleRegenerate={noopRegen}
                        isStartingSceneMessage={false}
                        theme={DEMO_THEME}
                        chatAppearance={DEMO_APPEARANCE}
                        character={DEMO_CHARACTER}
                        persona={null}
                    />
                )}
            </div>

            <ChatFooter
                draft={footerDraft}
                setDraft={() => {}}
                error={null}
                sending={footerSending}
                character={DEMO_CHARACTER}
                onSendMessage={async () => {}}
                onAbort={footerSending ? async () => {} : undefined}
                onOpenPlusMenu={() => {}}
            />
        </AbsoluteFill>
    );
}
