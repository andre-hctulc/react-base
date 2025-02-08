"use client";

import { useEffect, useRef } from "react";
import type { PropsOf } from "../../types";
import type { JSForm } from "./js-form/js-form";
import { useJSForm } from "./js-form/context";

interface HiddenInputProps extends Omit<PropsOf<"input">, "type"> {}

/**
 * Hidden input (`type="hidden"`).
 *
 * In {@link JSForm}s this also triggers a change event on value change.
 * This way we can use {@link useJSForm} to observe live state of hidden inputs.
 *
 * **Remember:** Hidden inputs do not trigger any change events
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
        if (inpValue !== undefined) {
            // Only trigger change event if the value was already initialized
            if (inited.current && preValue.current !== inpValue) {
                formCtx?.triggerChange({ name: props.name, value: inpValue });
            } else {
                inited.current = true;
            }

            preValue.current = inpValue;
        }
    }, [inpValue]);

    return <input {...props} type="hidden" />;
};
