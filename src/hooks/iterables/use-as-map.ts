import React from "react";

class AsMap<K, V> extends Map<K, V> {
    mapEntries<U>(callbackfn: (key: K, value: V, index: number, array: [K, V][]) => U): U[] {
        return (
            Array.from(this.entries()).map(([key, value], index, array) =>
                callbackfn(key, value, index, array)
            ) || []
        );
    }

    mapKeys<U>(callbackfn: (key: K, value: V, index: number, array: K[]) => U): U[] {
        return Array.from(this.keys()).map((key, index, array) =>
            callbackfn(key, this.get(key)!, index, array)
        );
    }
}

/**
 * Use `map.mapKeys` or `map.mapEntries` to map over the keys or entries of the map.
 */
export function useAsMap<K, V>(
    iterable: Iterable<V>,
    key: (value: V) => K,
    deps?: React.DependencyList
): AsMap<K, V> {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const map = React.useMemo(() => {
        return new AsMap(Array.from(iterable).map((value) => [key(value), value] as [K, V]));
    }, [iterable, ...(deps || [])]);
    return map;
}

/**
 * Use `map.mapKeys` or `map.mapEntries` to map over the keys or entries of the map.
 */
export function useAsArrayMap<K, V>(
    iterable: Iterable<V>,
    key: (value: V) => K,
    deps?: React.DependencyList
): AsMap<K, V[]> {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const map = React.useMemo(() => {
        const map = new AsMap<K, V[]>();
        for (const value of iterable) {
            const k = key(value);
            if (!map.has(k)) map.set(k, []);
            map.get(k)?.push(value);
        }
        return map;
    }, [iterable, ...(deps || [])]);
    return map;
}
