"use client";

import { useEffect, type RefObject } from "react";
import { useRefOf } from "../others";

export function useResizeObserver(
    ref: RefObject<Element | null> | Element,
    callback: (entry: ResizeObserverEntry) => void,
) {
    const element = "current" in ref ? ref.current : ref;
    const callbackRef = useRefOf(callback);

    useEffect(() => {
        if (!element) return;

        const observer = new ResizeObserver((entries) => {
            if (entries[0]) {
                callbackRef.current(entries[0]);
            }
        });

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [element]);
}
