import { range } from "u/src/iterables";
import React from "react";

export default function useRange(length: number) {
    const r = React.useMemo(() => range(length), [length]);
    return r;
}
