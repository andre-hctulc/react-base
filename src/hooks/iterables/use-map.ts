"use client";

import React from "react";

type MapSource<K, V> = Map<K, V> | Iterable<[K, V]>;

export function useMap<K, V>(
    source?: MapSource<K, V> | (() => MapSource<K, V>),
    resetOnSourceChange = false
) {
    const [map, setMap] = React.useState<Map<K, V>>(() => {
        return new Map<K, V>(typeof source === "object" ? source : source ? source() : []);
    });
    const resetActive = React.useRef(false);

    React.useEffect(() => {
        if (!resetActive.current) {
            resetActive.current = true;
            return;
        }

        if (resetOnSourceChange) {
            setMap(new Map(typeof source === "object" ? source : source ? source() : []));
        }
    }, [source]);

    const set = React.useCallback((key: K, value: V) => {
        setMap((map) => {
            const newMap = new Map(map);
            newMap.set(key, value);
            return newMap;
        });
    }, []);

    const del = React.useCallback((key: K) => {
        setMap((map) => {
            const newMap = new Map(map);
            newMap.delete(key);
            return newMap;
        });
    }, []);

    const clear = React.useCallback(() => {
        setMap(new Map());
    }, []);

    const has = React.useCallback(
        (key: K) => {
            return map.has(key);
        },
        [map]
    );

    return { map, set, del, clear, has };
}
