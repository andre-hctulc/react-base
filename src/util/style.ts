import type { ThemeColorSet } from "../types";

export function hideScrollbar(element: HTMLElement) {
    element.style.overflow = "scroll"; // Ensure it's scrollable
    // @ts-ignore
    element.style.scrollbarWidth = "none"; // For Firefox

    // Hide the scrollbar for Webkit-based browsers
    element.style.setProperty("webkitOverflowScrolling", "touch");
    element.style.setProperty("::-webkit-scrollbar", "display: none");
}

export function themeColor(color: string, prefix?: string): ThemeColorSet {
    if (!prefix) prefix = "";

    return {
        bg: `${prefix}bg-${color}`,
        bgA: (alpha: number) => `${prefix}bg-${color}/${alpha}`,
        text: `${prefix}text-${color}`,
        border: `${prefix}border-${color}`,
        textC: `${prefix}text-${color}-contrast`,
    };
}
