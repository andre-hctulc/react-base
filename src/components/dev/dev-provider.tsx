"use client";

import React from "react";
import type { ChildrenProps } from "../../types/index.js";

interface DevContext {
    /** @default process.env.NODE_ENV === "development" */
    devMode: boolean;
    observe: Record<string, any>;
    /** Only works for contexts initialized by `DevProvider`  */
    setObservable: (key: string, value: any) => void;
}

const DevContext = React.createContext<DevContext>({
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

interface DevProviderProps extends ChildrenProps {
    devMode?: boolean;
}

/**
 * The _devMode_ defaults to `process.env.NODE_ENV === "development"`, if not set
 */
export default function DevProvider(props: DevProviderProps) {
    const observeRef = React.useRef<Record<string, any>>({});
    const [observe, setObserve] = React.useState<Record<string, any>>({});

    function setObservable(key: string, value: any) {
        observeRef.current[key] = value;
        setObserve({ ...observeRef.current });
    }

    return (
        <DevContext.Provider
            value={{
                observe,
                setObservable,
                devMode: props.devMode ?? process.env.NODE_ENV === "development",
            }}
        >
            {props.children}
        </DevContext.Provider>
    );
}
