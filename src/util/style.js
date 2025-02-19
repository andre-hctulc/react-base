export function hideScrollbar(element) {
    element.style.overflow = "scroll"; // Ensure it's scrollable
    // @ts-ignore
    element.style.scrollbarWidth = "none"; // For Firefox
    // Hide the scrollbar for Webkit-based browsers
    element.style.setProperty("webkitOverflowScrolling", "touch");
    element.style.setProperty("::-webkit-scrollbar", "display: none");
}
export function themeColor(color, prefix) {
    if (!prefix)
        prefix = "";
    return {
        bg: `${prefix}bg-${color}`,
        bgA: (alpha) => `${prefix}bg-${color}/${alpha}`,
        text: `${prefix}text-${color}`,
        border: `${prefix}border-${color}`,
        textC: `${prefix}text-${color}-contrast`,
    };
}
