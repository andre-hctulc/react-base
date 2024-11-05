import React from "react";
import { useIsHydrated } from "./use-is-hydrated";

export function useClientMemo<T>(func: () => T, deps: React.DependencyList): T | null {
    const mounted = useIsHydrated();
    const memo = React.useMemo(() => {
        if (!mounted) return null;
        return func();
    }, deps);
    return memo;
}
