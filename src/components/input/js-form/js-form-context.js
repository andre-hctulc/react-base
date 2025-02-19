"use client";
import { createContext, useContext } from "react";
export const JSFormCtx = createContext(null);
export function useJSForm() {
    const ctx = useContext(JSFormCtx);
    if (!ctx)
        return null;
    return ctx;
}
