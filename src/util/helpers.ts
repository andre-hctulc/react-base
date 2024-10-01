export * from "./react";

// * Helpers

/** 🌊 🎯 */
export function collapse<V extends string, R = any>(value: V, map: { [K in V]: R }, fallback?: R): R {
    if (!(value in map) && fallback !== undefined) return fallback as R;
    return map[value];
}

/** 🌊 🎯 🥈 */
export function collapseWeak<V extends string, R = any>(
    value: V | undefined,
    map: { [K in V]?: R }
): R | undefined {
    if (value === undefined) return undefined;
    return map[value];
}
