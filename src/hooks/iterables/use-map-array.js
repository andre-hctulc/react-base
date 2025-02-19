import React from "react";
/**
 * Map an array based on a mapper function.
 * @param arr The array to map
 * @param mapper The mapper function
 * @param deps Additional dependencies
 * @param reactiveMapper Whether to remap when the mapper changes.
 */
export function useMapArray(arr, mapper) {
    const mapped = React.useMemo(() => arr.map(mapper), [arr]);
    return mapped;
}
