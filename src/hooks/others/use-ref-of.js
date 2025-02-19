"use client";
import { useEffect, useRef } from "react";
/**
 * Returns a ref that always points to the latest value
 */
export function useRefOf(value) {
    const ref = useRef(value);
    useEffect(() => {
        ref.current = value;
    }, [value]);
    return ref;
}
