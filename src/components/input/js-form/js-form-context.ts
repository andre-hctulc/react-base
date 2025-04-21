"use client";

import { createContext, useContext } from "react";
import type { JSFormSnapshot } from "./types.js";
import type { JSForm } from "./js-form.js";

export interface JSFormContext<T extends object = any> extends JSFormSnapshot<T> {
    reset: () => void;
    /**
     * Manually trigger {@link JSForm} change event.
     *
     * Also used by {@link HiddenInput}s to trigger change events.
     */
    triggerChange: (target?: { name: string | undefined; value: any }) => void;
    /**
     * Form default value. Can be consumed by {@link default}
     */
    defaultValues: Partial<T> | undefined;
    /**
     * Gets the default value of an input
     */
    default: (name: string) => any;
    /**
     * Sets the default controlled state for form controls
     */
    controlled: boolean;
    prefixNames: string | undefined;
}

export const JSFormCtx = createContext<JSFormContext | null>(null);

export function useJSForm<T extends object = any>(): JSFormContext<T> | null {
    const ctx = useContext(JSFormCtx);
    if (!ctx) return null;
    return ctx;
}
