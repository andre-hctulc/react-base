export * from "./react";

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

export function resolvePropertyPath(obj: object, path: string): any {
    const val = path.split(".").reduce((acc: any, key) => {
        return acc && acc[key] !== undefined ? acc[key] : undefined;
    }, obj);
    return val;
}

export function setPropertyByPath(obj: object, path: string, value: any): void {
    const keys = path.split(".");
    keys.reduce((acc: any, key: string, index: number) => {
        // If we're at the last key, set the value
        if (index === keys.length - 1) {
            acc[key] = value;
        }
        // Otherwise, create the next object if it doesn't exist
        else {
            if (!acc[key]) {
                acc[key] = {};
            }
        }
        return acc[key];
    }, obj);
}
