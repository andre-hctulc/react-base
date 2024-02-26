import React from "react";

export default function useRange<T = number>(length: number, map?: (index: number) => T): T[] {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const r = React.useMemo(() => Array.from({ length }, (_, i) => (map ? map(i) : i)), [length]);
    return r as T[];
}
