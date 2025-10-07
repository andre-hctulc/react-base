"use client";

import { useEffect, useMemo, useRef } from "react";
import type { PropsOf } from "../../types/index.js";
import type { JSForm } from "./js-form/js-form.js";
import { useJSForm } from "./js-form/js-form-context.js";

interface HiddenInputProps<T = any> extends Omit<PropsOf<"input">, "type" | "value"> {
    value: T;
    /**
     * Disable JSON stringification/parsing for non primitives.
     */
    noJson?: boolean;
}

/**
 * Hidden input (`type="hidden"`).
 * Uses JSON stringification to store objects in the value. Strings or numbers are stored as is.
 *
 * If `noJson` is set:
 * - For string arrays, multiple hidden inputs will be rendered with the same name
 * - otherwise the value will be used as is
 *
 * **Remember:** Hidden inputs do not trigger any change events natively
 *
 * ### In {@link JSForm}s
 *
 * some behavior is added to hidden inputs:
 *
 * - Hidden inputs will trigger change events when their value changes.
 *   This way we can use {@link useJSForm} to observe live state of hidden inputs.
 * - Validation props (e.g. *required*, *pattern*) will be used to validate the hidden input.
 *
 */
export const HiddenInput: React.FC<HiddenInputProps> = ({ value, name, noJson, ...props }) => {
    const formCtx = useJSForm();
    const hasName = name !== undefined;
    const inited = useRef(false);
    const [val, isJson] = useMemo<[string | number | string[], boolean]>(() => {
        if (value === undefined) {
            return ["", false];
        }

        // Not in a JSForm context: Parse to inp value
        if (noJson || !formCtx || !hasName) {
            if (Array.isArray(value)) {
                return [value.map((v) => String(v)), true];
            } else if (typeof value === "string" || typeof value === "number") {
                return [value, false];
            } else {
                return [String(value), false];
            }
        }

        const isJson = typeof value !== "string" && typeof value !== "number";

        // If in a JSForm context and json data: Use json stringification (rbjsoninp)
        if (isJson) {
            return [JSON.stringify(value), true];
        }

        return [value, false];
    }, [value, formCtx]);
    /**
     * Previous value.
     * Used to check if the value has changed and if we should trigger a change event
     */
    const preValue = useRef<any>(undefined);

    // Trigger JSForm change event on value change
    useEffect(() => {
        if (!hasName) {
            return;
        }

        // Only trigger change event if the value was already initialized
        if (inited.current && preValue.current !== val) {
            formCtx?.triggerChange({ name, value: val });
        } else {
            inited.current = true;
        }

        preValue.current = val;
    }, [val]);

    if (hasName && noJson && Array.isArray(val)) {
        return val.map((v) => <input hidden key={v} name={name} value={v} {...props} />);
    }

    // IMP mark as json input with data attribute. Ths is handled accordingly in js forms
    // SEE inputEventToValue
    return (
        <input data-rbjsoninp={isJson ? true : undefined} name={name} value={val} {...props} type="hidden" />
    );
};
