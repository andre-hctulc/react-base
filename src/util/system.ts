export const PRE = "RB_";

export function withPrefix(suffix: string) {
    return PRE + suffix;
}

export function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function createId(len: number) {
    return Math.random()
        .toString(36)
        .substring(2, 2 + len);
}


export function hideScrollbar(element: HTMLElement) {
    element.style.overflow = "scroll"; // Ensure it's scrollable
    // @ts-ignore
    element.style.scrollbarWidth = "none"; // For Firefox

    // Hide the scrollbar for Webkit-based browsers
    element.style.setProperty("webkitOverflowScrolling", "touch");
    element.style.setProperty("::-webkit-scrollbar", "display: none");
}