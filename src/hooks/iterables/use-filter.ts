import React from "react";

/**
 * Filter an array based on a filter function.
 * @param arr The array to filter
 * @param filter The filter function
 * @param deps Additional dependencies
 * @param reactiveFilter Whether to recompute the filter when the filter changes.
 */
export function useFilter<T = any>(
    arr: T[],
    filter: (item: T) => any,
    deps?: React.DependencyList,
    reactiveFilter = false
): T[] {
    const filtered = React.useMemo(() => {
        if (!arr) return [];
        return arr.filter((item) => filter(item));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [arr, reactiveFilter ? filter : false, ...(deps || [])]);

    return filtered;
}
