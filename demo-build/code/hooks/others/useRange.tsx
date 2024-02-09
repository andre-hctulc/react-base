import React from "react";

export default function useRange(length: number) {
    const r = React.useMemo(() => Array.from({ length }, (_, i) => i), [length]);
    return r;
}
