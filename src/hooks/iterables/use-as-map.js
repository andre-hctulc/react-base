import React from "react";
class AsMap extends Map {
    mapEntries(callbackfn) {
        return (Array.from(this.entries()).map(([key, value], index, array) => callbackfn(key, value, index, array)) || []);
    }
    mapKeys(callbackfn) {
        return Array.from(this.keys()).map((key, index, array) => callbackfn(key, this.get(key), index, array));
    }
}
/**
 * Use `map.mapKeys` or `map.mapEntries` to map over the keys or entries of the map.
 */
export function useAsMap(iterable, key, deps) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const map = React.useMemo(() => {
        return new AsMap(Array.from(iterable).map((value) => [key(value), value]));
    }, [iterable, ...(deps || [])]);
    return map;
}
/**
 * Use `map.mapKeys` or `map.mapEntries` to map over the keys or entries of the map.
 */
export function useAsArrayMap(iterable, key, deps) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const map = React.useMemo(() => {
        const map = new AsMap();
        for (const value of iterable) {
            const k = key(value);
            if (!map.has(k))
                map.set(k, []);
            map.get(k)?.push(value);
        }
        return map;
    }, [iterable, ...(deps || [])]);
    return map;
}
