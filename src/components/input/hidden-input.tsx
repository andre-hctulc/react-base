"use client";

import { useEffect, useMemo, useRef } from "react";
import type { PropsOf } from "../../types/index.js";
import type { JSForm } from "./js-form/js-form.js";
import { useJSForm } from "./js-form/js-form-context.js";

interface HiddenInputProps<T = any> extends Omit<PropsOf<"input">, "type" | "value"> {
    value: T;
}

/**
 * Hidden input (`type="hidden"`).
 * Uses JSON stringification to store objects in the value. Strings or numbers are stored as is.
 *
 * **Remember:** Hidden inputs do not trigger any change events natively
 *
 * ### In {@link JSForm}s
 * some behavior is added to hidden inputs:
 * - Hidden inputs will trigger change events when their value changes.
 *   This way we can use {@link useJSForm} to observe live state of hidden inputs.
 * - Validation props (e.g. *required*, *pattern*) will be used to validate the hidden input.
 *
 */
export const HiddenInput: React.FC<HiddenInputProps> = ({ value, ...props }) => {
    const formCtx = useJSForm();
    const inited = useRef(false);
    const [val, isJson] = useMemo<[string, boolean]>(() => {
        if (value === undefined) {
            return ["", false];
        }
        const isJson = typeof value !== "string";
        if (isJson) {
            return [JSON.stringify(value), true];
        }
        return [value, false];
    }, [value]);
    /**
     * Previous value.
     * Used to check if the value has changed and if we should trigger a change event
     */
    const preValue = useRef<any>(undefined);

    // Trigger JSForm change event on value change
    useEffect(() => {
        // Only trigger change event if the value was already initialized
        if (inited.current && preValue.current !== val) {
            formCtx?.triggerChange({ name: props.name, value: val });
        } else {
            inited.current = true;
        }

        preValue.current = val;
    }, [val]);

    // IMP mark as json input with data attribute. Ths is handled accordingly in js forms
    // SEE inputEventToValue
    return <input data-rbjsoninp={isJson ? true : undefined} value={val} {...props} type="hidden" />;
};
