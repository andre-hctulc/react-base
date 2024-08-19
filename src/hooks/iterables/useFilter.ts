import React from "react";
import type { Falsy } from "../../types";

export default function useFilter<T = any>(
    arr: T[] | Falsy,
    filter: (item: T) => any,
    deps?: React.DependencyList
) {
    const filtered = React.useMemo(() => {
        if (!arr) return [];
        return arr.filter((item) => filter(item));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [arr, ...(deps || [])]);

    return filtered;
}
