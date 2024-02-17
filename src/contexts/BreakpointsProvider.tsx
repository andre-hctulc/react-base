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
    // base tailwind config
    // sm: "720px",
    // md: "1300px",
    // lg: "1600px",
    // xl: "2000px",
    const sm = useMediaQuery(`(max-width: ${props.values?.sm || 720}px)`);
    const md = useMediaQuery(`(max-width: ${props.values?.md || 1300}px)`);
    const lg = useMediaQuery(`(max-width: ${props.values?.lg || 1600}px)`);
    const size = sm ? "sm" : md ? "md" : lg ? "lg" : "xl";
    const xl = !md && !lg && !sm;

    return (
        <BreakpointsContext.Provider
            value={{ sm: sm, md: md && !sm, lg: lg && !md, xl: xl && !lg, minSm: true, minMd: !sm, minLg: !sm && !md, minXl: !sm && !md && !lg, size: size }}
        >
            {props.children}
        </BreakpointsContext.Provider>
    );
}
