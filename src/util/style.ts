export function hideScrollbar(element: HTMLElement) {
    element.style.overflow = "scroll"; // Ensure it's scrollable
    // @ts-ignore
    element.style.scrollbarWidth = "none"; // For Firefox
}
