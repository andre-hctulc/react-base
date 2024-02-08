"use client";

import React from "react";
import { useMediaQuery } from "usehooks-ts";

const BreakpointsContext = React.createContext<Breakpoints | null>(null);

interface Breakpoints {
    minSm: boolean;
    minMd: boolean;
    minLg: boolean;
    minXl: boolean;
    sm: boolean;
    md: boolean;
    lg: boolean;
    xl: boolean;
    size: "sm" | "md" | "lg" | "xl";
}

export function useBreakpoints() {
    const ctx = React.useContext(BreakpointsContext);
    if (!ctx) throw new Error("`BreakpointsContext` not provided");
    return ctx;
}

interface BreakpointsProviderProps {
    children?: React.ReactNode;
    /** Siehe Implementierung für Default-Werte */
    values?: { sm: number; md: number; lg: number; xl: number };
}

export default function BreakpointsProvider(props: BreakpointsProviderProps) {
    const sm = useMediaQuery(`(min-width: ${props.values?.sm || 0}px)`);
    const md = useMediaQuery(`(min-width: ${props.values?.md || 720}px)`);
    const lg = useMediaQuery(`(min-width: ${props.values?.lg || 1300}px)`);
    const xl = useMediaQuery(`(min-width: ${props.values?.xl || 1600}px)`);
    const size = React.useMemo(() => {
        if (xl) return "xl";
        if (lg) return "lg";
        if (md) return "md";
        return "sm";
    }, [md, lg, xl]);

    return (
        <BreakpointsContext.Provider value={{ minSm: sm, minMd: md, minLg: lg, minXl: xl, lg: lg && !xl, md: md && !lg, sm: sm && !md, xl: xl, size: size }}>
            {props.children}
        </BreakpointsContext.Provider>
    );
}
