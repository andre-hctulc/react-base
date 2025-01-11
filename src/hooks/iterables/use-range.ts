import React from "react";

export function useRange<T = number>(length: number, map?: (index: number) => T): T[] {
    const r = React.useMemo(() => Array.from({ length }, (_, i) => (map ? map(i) : i)), [length]);
    return r as T[];
}
