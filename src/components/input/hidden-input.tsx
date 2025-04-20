"use client";

import { useEffect, useRef } from "react";
import type { PropsOf } from "../../types/index.js";
import type { JSForm } from "./js-form/js-form.js";
import { useJSForm } from "./js-form/js-form-context.js";

interface HiddenInputProps extends Omit<PropsOf<"input">, "type"> {}

/**
 * Hidden input (`type="hidden"`).
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
export const HiddenInput: React.FC<HiddenInputProps> = (props) => {
    const formCtx = useJSForm();
    const inited = useRef(false);
    /**
     * Value of the input
     */
    const inpValue = props.checked !== undefined ? (props.checked ? "on" : "off") : props.value;
    /**
     * Previous value.
     * Used to check if the value has changed and if we should trigger a change event
     */
    const preValue = useRef<any>(undefined);

    // Trigger JSForm change event on value change
    useEffect(() => {
        // Only trigger change event if the value was already initialized
        if (inited.current && preValue.current !== inpValue) {
            formCtx?.triggerChange({ name: props.name, value: inpValue });
        } else {
            inited.current = true;
        }

        preValue.current = inpValue;
    }, [inpValue]);

    return <input {...props} type="hidden" />;
};
