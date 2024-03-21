"use client";

import React from "react";

interface DNDContext<D = any> {
    dragging: boolean;
    setDragging: <T extends boolean>(dragging: T, dragData?: T extends true ? D : never) => void;
    setData: (data: any) => void;
    currentDragData: D | undefined;
    disabled: boolean;
    setDisabled: (disabeld: boolean) => void;
}

const DNDContext = React.createContext<DNDContext | null>(null);

interface DNDProviderProps {
    children?: React.ReactNode;
    defaultDisabled?: boolean;
}

export function useDND<D = any>() {
    const ctx = React.useContext<DNDContext<D> | null>(DNDContext);
    return ctx;
}

/**
 * Drag and Drop. Stellt `DNDContext` bereit!
 * */
export default function DNDProvider(props: DNDProviderProps) {
    const [dragging, setDragging] = React.useState(false);
    const [data, setData] = React.useState<any>();
    const [disabled, setDisabled] = React.useState(props.defaultDisabled || false);

    React.useEffect(() => {
        if (!dragging) setData(undefined);
    }, [dragging]);

    function _setDragging<T extends boolean>(dragging: T, data?: T extends true ? any : never) {
        setDragging(dragging);
        setData(data);
    }

    return (
        <DNDContext.Provider
            value={{
                dragging,
                setDragging: _setDragging,
                currentDragData: data,
                setData,
                disabled,
                setDisabled,
            }}
        >
            {props.children}
        </DNDContext.Provider>
    );
}
