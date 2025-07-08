"use client";

import React from "react";

/**
 * Filter an array based on a filter function.
 * @param arr The array to filter
 * @param filter The filter function
 * @param deps Additional dependencies
 * @param reactiveFilter Whether to recompute the filter when the filter changes.
 */
export function useFilter<T = any>(arr: T[], filter: (item: T) => any): T[] {
    const filtered = React.useMemo(() => {
        if (!arr) return [];
        return arr.filter(filter);
    }, [arr]);

    return filtered;
}
