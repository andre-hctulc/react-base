import React from "react";
export function useMap(source, resetOnSourceChange = false) {
    const [map, setMap] = React.useState(() => {
        return source instanceof Map ? source : source ? source() : new Map();
    });
    const resetActive = React.useRef(false);
    React.useEffect(() => {
        if (!resetActive.current) {
            resetActive.current = true;
            return;
        }
        if (resetOnSourceChange)
            setMap(source instanceof Map ? source : source ? source() : new Map());
    }, [source]);
    const set = React.useCallback((key, value) => {
        setMap((map) => {
            const newMap = new Map(map);
            newMap.set(key, value);
            return newMap;
        });
    }, []);
    const del = React.useCallback((key) => {
        setMap((map) => {
            const newMap = new Map(map);
            newMap.delete(key);
            return newMap;
        });
    }, []);
    const clear = React.useCallback(() => {
        setMap(new Map());
    }, []);
    const has = React.useCallback((key) => {
        return map.has(key);
    }, [map]);
    return { map, set, del, clear, has };
}
