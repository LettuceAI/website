/**
 * Global link configuration
 * All links are stored here for easy management
 * Replace the placeholder URLs with your actual links
 */
export const links = {
    discord: "https://discord.gg/lettuceai",
    github: "https://github.com/LettuceAI",
    githubRepo: "https://github.com/LettuceAI/mobile-app",
} as const;

export type LinkKey = keyof typeof links;
export type LinkValue = typeof links[LinkKey];