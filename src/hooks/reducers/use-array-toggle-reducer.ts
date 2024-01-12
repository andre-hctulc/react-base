import React from "react";

function toggleReducer<T = string>(previousItems: T[], toggleItem: T): T[] {
    let newArr: T[];
    if (previousItems.includes(toggleItem)) newArr = previousItems.filter(item => item !== toggleItem);
    else newArr = [...previousItems, toggleItem];
    return newArr as any;
}

export type ArrayToggleReducer<T = any> = {
    set: Set<T>;
    items: T[];
    toggleItem: (toggleItem: T) => void;
    lastChange: { item: T; mode: "remove" | "add" } | null;
};

/** @return `[Array, toggleValue, Set]` */
export default function useArrayToggleReducer<T = string>(initialValue: T[]): ArrayToggleReducer {
    const [values, toggleValue] = React.useReducer(toggleReducer, initialValue);
    const valuesSet = React.useMemo<Set<T>>(() => new Set(values) as any, [values]);
    const [lastChange, setLastChange] = React.useState<{ item: T; mode: "remove" | "add" } | null>(null);
    
    function _toggleValue(toggleItem: T) {
        toggleValue(toggleItem);
        setLastChange({ item: toggleItem, mode: valuesSet.has(toggleItem) ? "remove" : "add" });
    }

    return { items: values, set: valuesSet, toggleItem: _toggleValue, lastChange };
}
