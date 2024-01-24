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
}

export default function BreakpointsProvider(props: BreakpointsProviderProps) {
    const sm = useMediaQuery("(min-width: 0px)");
    const md = useMediaQuery("(min-width: 720px)");
    const lg = useMediaQuery("(min-width: 1300px)");
    const xl = useMediaQuery("(min-width: 1600px)");
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
