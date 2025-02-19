"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
const DevContext = React.createContext({
    devMode: process.env.NODE_ENV === "development",
    observe: {},
    setObservable: () => {
        throw new Error("`DevProvider` required");
    },
});
export function useDev() {
    const ctx = React.useContext(DevContext);
    return ctx;
}
/**
 * The _devMode_ defaults to `process.env.NODE_ENV === "development"`, if not set
 */
export default function DevProvider(props) {
    const observeRef = React.useRef({});
    const [observe, setObserve] = React.useState({});
    function setObservable(key, value) {
        observeRef.current[key] = value;
        setObserve({ ...observeRef.current });
    }
    return (_jsx(DevContext.Provider, { value: {
            observe,
            setObservable,
            devMode: props.devMode ?? process.env.NODE_ENV === "development",
        }, children: props.children }));
}
