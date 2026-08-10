"use client";

import { createContext, useContext, useRef, useState, type ReactNode } from "react";

interface DevContextValue {
    /** @default process.env.NODE_ENV === "development" */
    devMode: boolean;
    observe: Record<string, any>;
    /** Only works for contexts initialized by `DevProvider`  */
    setObservable: (key: string, value: any) => void;
}

const DevContext = createContext<DevContextValue>({
    devMode: process.env.NODE_ENV === "development",
    observe: {},
    setObservable: () => {
        throw new Error("DevProvider required");
    },
});

export function useDev() {
    const ctx = useContext(DevContext);
    return ctx;
}

interface DevProviderProps {
    devMode?: boolean;
    children?: ReactNode;
}

/**
 * The _devMode_ defaults to `process.env.NODE_ENV === "development"`, if not set
 */
export default function DevProvider(props: DevProviderProps) {
    const observeRef = useRef<Record<string, any>>({});
    const [observe, setObserve] = useState<Record<string, any>>({});

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
