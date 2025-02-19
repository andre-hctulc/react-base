import React from "react";
export function useBreakpoints(customBreakpoints) {
    const defaultBreakpoints = {
        sm: "(min-width: 640px)",
        md: "(min-width: 768px)",
        lg: "(min-width: 1024px)",
        xl: "(min-width: 1280px)",
        "2xl": "(min-width: 1536px)",
    };
    const breakpoints = React.useRef(customBreakpoints || defaultBreakpoints);
    const [state, setState] = React.useState({ breakpoint: "" });
    React.useEffect(() => {
        if (customBreakpoints) {
            breakpoints.current = customBreakpoints;
        }
    }, [customBreakpoints]);
    React.useEffect(() => {
        const mediaQueryLists = Object.entries(breakpoints.current).map(([key, query]) => ({
            key,
            mediaQuery: window.matchMedia(query),
        }));
        const updateState = () => {
            const updatedState = mediaQueryLists.reduce((acc, { key, mediaQuery }) => ({
                ...acc,
                [key]: mediaQuery.matches,
                [`min${capitalize(key)}`]: mediaQuery.matches,
            }), {});
            // for (const defaultSize of ["sm", "md", "lg", "xl", "2xl"]) {
            //     const minKey = `min${capitalize(defaultSize)}`;
            //     if (!(minKey in updateState)) {
            //         updatedState[minKey] = false;
            //     }
            // }
            const activeBreakpoint = Object.entries(updatedState)
                .filter(([key]) => !key.startsWith("min"))
                .reverse()
                .find(([, matches]) => matches);
            setState({
                ...updatedState,
                breakpoint: activeBreakpoint ? activeBreakpoint[0] : null,
            });
        };
        // Add listeners to all breakpoints
        mediaQueryLists.forEach(({ mediaQuery }) => {
            mediaQuery.addEventListener("change", updateState);
        });
        // Initial check
        updateState();
        return () => {
            // Cleanup listeners
            mediaQueryLists.forEach(({ mediaQuery }) => {
                mediaQuery.removeEventListener("change", updateState);
            });
        };
    }, []);
    return state;
}
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
