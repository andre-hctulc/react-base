"use client";

import { useContext, type Context } from "react";

/**
 * Requires the context by default.
 * @param optional If true, returns _undefined_ if the context is not found.
 */
export function useContextX<C, O extends boolean = false>(
    context: Context<C>,
    optional?: O
): O extends true ? C | undefined : C {
    const ctx = useContext(context);
    if (!ctx) {
        if (optional) {
            return undefined as any;
        }
        throw new Error(`Provider for context '${context.displayName || context.name}' not found`);
    }
    return ctx;
}
