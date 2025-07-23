"use client";

import React from "react";
import { useRefOf } from "../others/use-ref-of.js";

/**
 * Use `map.mapKeys` or `map.mapEntries` to map over the keys or entries of the map.
 */
export function useAsMap<K, V>(iterable: Iterable<V>, key: (value: V) => K): Map<K, V> {
    const keyRef = useRefOf(key);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const map = React.useMemo(() => {
        return new Map(Array.from(iterable).map((value) => [keyRef.current(value), value] as [K, V]));
    }, [iterable]);
    return map;
}

/**
 * Use `map.mapKeys` or `map.mapEntries` to map over the keys or entries of the map.
 */
export function useAsArrayMap<K, V>(iterable: Iterable<V>, key: (value: V) => K): Map<K, V[]> {
    const keyRef = useRefOf(key);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const map = React.useMemo(() => {
        const map = new Map<K, V[]>();
        for (const value of iterable) {
            const k = keyRef.current(value);
            if (!map.has(k)) map.set(k, []);
            map.get(k)?.push(value);
        }
        return map;
    }, [iterable]);
    return map;
}
