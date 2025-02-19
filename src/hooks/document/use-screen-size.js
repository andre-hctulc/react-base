import React from "react";
/**
 * Tailwind CSS breakpoints
 */
const defaultBreakpoints = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    "2xl": 1536,
};
export function getScreenSize(breakpoints, width) {
    const size = width >= breakpoints["2xl"]
        ? "2xl"
        : width >= breakpoints.xl
            ? "xl"
            : width >= breakpoints.lg
                ? "lg"
                : width >= breakpoints.md
                    ? "md"
                    : "sm";
    return {
        size,
        minSm: width >= breakpoints.sm,
        minMd: width >= breakpoints.md,
        minLg: width >= breakpoints.lg,
        minXl: width >= breakpoints.xl,
        maxSm: width < breakpoints.md,
        maxMd: width < breakpoints.lg,
        maxLg: width < breakpoints.xl,
        maxXl: width < breakpoints["2xl"],
    };
}
/**
 * Hook to get the current screen size based on the window width.
 *
 * @param customBreakpoints Custom breakpoints to use. Defaults to Tailwind CSS breakpoints.
 */
export function useScreenSize(customBreakpoints) {
    const breakpoints = React.useMemo(() => ({ ...defaultBreakpoints, ...customBreakpoints }), [customBreakpoints]);
    const [currentSize, setCurrentSize] = React.useState(() => {
        return getScreenSize(breakpoints, window.innerWidth);
    });
    React.useEffect(() => {
        const handleResize = () => {
            setCurrentSize(getScreenSize(breakpoints, window.innerWidth));
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [breakpoints]);
    return currentSize;
}
