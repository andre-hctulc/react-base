"use client";

import React from "react";
import { ParentComponentProps } from "../types";

interface DevContext {
    /** @default process.env.NODE_ENV === "development" */
    devMode: boolean;
    observe: Record<string, any>;
    /** Only works for contexts initilized by `DevProvider`  */
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

interface DevProviderProps extends ParentComponentProps {
    devMode?: boolean;
}

export default function DevProvider(props: DevProviderProps) {
    const observeRef = React.useRef<Record<string, any>>({});
    const [observe, setObserve] = React.useState<Record<string, any>>({});

    function setObservable(key: string, value: any) {
        observeRef.current[key] = value;
        setObserve({ ...observeRef.current });
    }

    return (
        <DevContext.Provider value={{ observe, setObservable, devMode: typeof props.devMode === "boolean" ? props.devMode : process.env.NODE_ENV === "development" }}>
            {props.children}
        </DevContext.Provider>
    );
}
