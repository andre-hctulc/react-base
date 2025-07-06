import { useEffect, useRef, useState } from "react";
import { capitalizeFirstLetter } from "../../util/system.js";

type Breakpoints = Record<string, string>;

export type BreakpointsSnapshot = {
    [key: string]: boolean | undefined;
    sm?: boolean;
    md?: boolean;
    lg?: boolean;
    xl?: boolean;
    "2xl"?: boolean;
    minSm?: boolean;
    minMd?: boolean;
    minLg?: boolean;
    minXl?: boolean;
    min2xl?: boolean;
} & {
    breakpoint: string;
};

const defaultBreakpoints: Breakpoints = {
    sm: "(min-width: 640px)",
    md: "(min-width: 768px)",
    lg: "(min-width: 1024px)",
    xl: "(min-width: 1280px)",
    "2xl": "(min-width: 1536px)",
};

export function useBreakpoints(customBreakpoints?: Breakpoints): BreakpointsSnapshot {
    const breakpoints = useRef(customBreakpoints || defaultBreakpoints);
    const [state, setState] = useState<BreakpointsSnapshot>({ breakpoint: "" } as any);

    useEffect(() => {
        if (customBreakpoints) {
            breakpoints.current = customBreakpoints;
        }
    }, [customBreakpoints]);

    useEffect(() => {
        const mediaQueryLists = Object.entries(breakpoints.current).map(([key, query]) => ({
            key,
            mediaQuery: window.matchMedia(query),
        }));

        const updateState = () => {
            const updatedState: Record<string, boolean> = mediaQueryLists.reduce(
                (acc, { key, mediaQuery }) => ({
                    ...acc,
                    [key]: mediaQuery.matches,
                    [`min${capitalizeFirstLetter(key)}`]: mediaQuery.matches,
                }),
                {}
            );

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
                ...(updatedState as any),
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
