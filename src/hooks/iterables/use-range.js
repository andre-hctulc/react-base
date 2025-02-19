import React from "react";
export function useRange(length, map) {
    const r = React.useMemo(() => Array.from({ length }, (_, i) => (map ? map(i) : i)), [length]);
    return r;
}
