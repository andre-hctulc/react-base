import React from "react";

export default function useSet<T = any>(defaultValue?: Iterable<T> | (() => Iterable<T>)) {
    const [set, setSet] = React.useState<Set<T>>(() => {
        if (defaultValue) {
            if (typeof defaultValue === "function") return new Set(defaultValue());
            else return new Set(defaultValue);
        } else return new Set();
    });

    const add = React.useCallback((item: T) => {
        setSet((set) => {
            return new Set([...Array.from(set), item]);
        });
    }, []);

    const remove = React.useCallback((item: T) => {
        setSet((set) => new Set(Array.from(set).filter((i) => i !== item)));
    }, []);

    const clear = React.useCallback(() => {
        setSet(new Set());
    }, []);

    const has = React.useCallback(
        (item: T) => {
            return set.has(item);
        },
        [set]
    );

    return { set, add, remove, clear, has };
}
