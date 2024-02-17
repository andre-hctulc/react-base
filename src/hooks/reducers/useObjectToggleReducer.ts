import React from "react";

function toggleReducer<O extends object = any>(previousObject: O, newItems: Partial<O>): O {
    const newObj: O = { ...previousObject };
    for (const key in newItems) (newObj as any)[key] = newItems[key];
    return newObj;
}

export default function useObjectToggleReducer<O extends object = any>(initialValue: Partial<O>): [O, (newItems: Partial<O>) => void] {
    const [values, setValues] = React.useReducer(toggleReducer, initialValue);
    return [values as any, setValues];
}
