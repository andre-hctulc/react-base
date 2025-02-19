import React from "react";
const createSet = (source) => {
    if (source instanceof Set)
        return source;
    if (source) {
        if (typeof source === "function")
            return new Set(source());
        else
            return new Set(source);
    }
    else
        return new Set();
};
export function useSet(source, resetOnSourceChange = false) {
    const [set, setSet] = React.useState(() => createSet(source || []));
    const resetActive = React.useRef(false);
    React.useEffect(() => {
        if (!resetActive.current) {
            resetActive.current = true;
            return;
        }
        if (resetOnSourceChange)
            setSet(createSet(source || []));
    }, [source]);
    const add = React.useCallback((item) => {
        setSet((set) => {
            return new Set([...Array.from(set), item]);
        });
    }, []);
    const del = React.useCallback((item) => {
        setSet((set) => new Set(Array.from(set).filter((i) => i !== item)));
    }, []);
    const clear = React.useCallback(() => {
        setSet(new Set());
    }, []);
    const has = React.useCallback((item) => {
        return set.has(item);
    }, [set]);
    return { set, add, del, clear, has };
}
