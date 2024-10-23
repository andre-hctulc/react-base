import React from "react";

/**
 * Map an array based on a mapper function.
 * @param arr The array to map
 * @param mapper The mapper function
 * @param deps Additional dependencies
 * @param reactiveMapper Whether to remap when the mapper changes.
 */
export function useMapArray<T, S>(
    arr: T[],
    mapper: (item: T, index: number) => S,
    deps?: React.DependencyList,
    reactiveMapper = false
): S[] {
    const mapped = React.useMemo(
        () => arr.map(mapper),
        [arr, reactiveMapper ? mapper : false, ...(deps || [])]
    );
    return mapped;
}
