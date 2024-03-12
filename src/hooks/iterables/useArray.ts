import React from "react";

export default function useArray<T = any>(defaultValue?: T[] | (() => T[])) {
    const [array, setArray] = React.useState<T[]>(defaultValue || []);

    const push = React.useCallback((item: T, noDuplicates?: boolean) => {
        setArray((arr) => {
            if (noDuplicates && arr.includes(item)) return arr;
            return [...arr, item];
        });
    }, []);

    const filter = React.useCallback((callback: (item: T) => any) => {
        setArray((arr) => arr.filter(callback));
    }, []);

    const update = React.useCallback((index: number, newItem: T) => {
        setArray((arr) => [...arr.slice(0, index), newItem, ...arr.slice(index + 1, arr.length)]);
    }, []);

    const remove = React.useCallback((index: number | { item: T }) => {
        setArray((arr) => {
            if (typeof index === "object") return arr.filter((item) => item !== index.item);
            else return [...arr.slice(0, index), ...arr.slice(index + 1, arr.length)];
        });
    }, []);

    const pop = React.useCallback(() => {
        const top = array[array.length - 1];
        if (array.length) setArray(array.slice(0, array.length - 1));
        else setArray([]);
        return top;
    }, [array]);

    const toggle = React.useCallback((item: T) => {
        setArray((arr) => {
            if (arr.includes(item)) return arr.filter((i) => i !== item);
            else return [...arr, item];
        });
    }, []);

    return { array, set: setArray, push, filter, update, remove, pop, toggle };
}
