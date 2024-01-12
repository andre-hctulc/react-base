"use client";

import HelperText from "@react-client/components/text/helper-text";
import type { PropsOf } from "@react-client/util";
import clsx from "clsx";
import Label from "../label";
import React from "react";
import { JSFormContext, useJSForm } from "../form/js-form";
import { getInputSizeClasses } from "@client-util/input-helpers";
import { firstBool } from "@client-util/iterables";
import { Size } from "@react-client/types";

/** Berechnet Input props unter Berücksichtigung des `JSFormContext`'s und den gegebenen props.  */
export function inputLikeProps(props: Partial<InputLikeProps>, form: JSFormContext<any> | null) {
    const formState = form?.getInputState(props.name);
    const disabled = firstBool(props.disabled, form?.inputProps?.disabled);
    const readOnly = firstBool(props.readOnly, form?.inputProps?.readOnly);
    const required = firstBool(props.required, form?.inputProps?.required);
    const error = firstBool(props.error, formState?.error);
    const helperText = error ? props.errorMessage || props.helperText : props.helperText;

    let defaultValue: any = undefined;

    if (props.defaultValue !== undefined) defaultValue = props.defaultValue;
    else if (props.name && formState?.defaultValue !== undefined) defaultValue = formState?.defaultValue;

    return { disabled, readOnly, required, error, helperText, defaultValue };
}

export interface InputLikeProps<T = any> {
    /** _controlled_ */
    value?: T;
    defaultValue?: T;
    name?: string;
    error?: boolean;
    errorMessage?: string;
    disabled?: boolean;
    readOnly?: boolean;
    helperText?: string;
    label?: string;
    /** Setzt label variant aud `caption` */
    dense?: boolean;
    required?: boolean;
    onChange?: (...args: any) => void;
    noBorder?: boolean;
}

interface InputProps extends InputLikeProps {
    type?: React.HTMLInputTypeAttribute;
    slotProps?: { input?: PropsOf<"input">; helperText?: PropsOf<typeof HelperText> };
    placeholder?: string;
    inputRef?: any;
    // * Restrictions
    min?: string | number;
    max?: string | number;
    maxLength?: number;
    // * Style
    size?: Size;
    fullWidth?: boolean;
    className?: string;
    style?: React.CSSProperties;
    // * Listeners
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
    onEnterKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

function getValue(e: React.ChangeEvent<HTMLInputElement>, type: React.HTMLInputTypeAttribute | undefined) {
    switch (type) {
        case "datetime-local":
        case "date":
            return e.target.valueAsDate;
        case "number":
            return e.target.valueAsNumber;
        case "text":
        default:
            return e.target.value;
    }
}

/** Input Element für simple inputs, wie text oder Zahlen. */
const Input = React.forwardRef<HTMLDivElement, InputProps>((props, ref) => {
    const sizeClasses = getInputSizeClasses(props.size || "medium");
    const form = useJSForm();
    const { helperText, error, readOnly, required, disabled, defaultValue } = inputLikeProps(props, form);

    const keyDownHandler: React.KeyboardEventHandler<HTMLInputElement> = e => {
        if (props.onKeyDown) props.onKeyDown(e);
        else if (e.key === "Enter") props.onEnterKeyDown?.(e);
    };

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
        props.onChange?.(e);
        if (props.name) form?.change?.(props.name, getValue(e, props.type));
    };

    React.useEffect(() => {
        return () => {
            if (props.name) form?.change(props.name, defaultValue);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.name]);

    return (
        <div className={clsx("flex flex-col flex-shrink-0", props.fullWidth && "w-full", props.className)} style={props.style} ref={ref}>
            {props.label && (
                <Label variant={props.dense ? "caption" : "form_control"} requiredError={error} required={required} hint={form?.hint}>
                    {props.label}
                </Label>
            )}
            <input
                {...props.slotProps?.input}
                ref={props.inputRef}
                placeholder={props.placeholder}
                type={props.type}
                onChange={handleChange}
                onFocus={props.onFocus}
                onBlur={props.onBlur}
                onKeyDown={keyDownHandler}
                value={props.value}
                defaultValue={defaultValue}
                disabled={disabled}
                readOnly={readOnly}
                required={required}
                min={props.min}
                max={props.max}
                maxLength={props.maxLength}
                className={clsx("max-h-full transition duration-90 min-h-0", props.noBorder && "!border-0", sizeClasses, props.slotProps?.input?.className)}
            />
            {helperText && (
                <HelperText error={error} {...props.slotProps?.helperText}>
                    {helperText}
                </HelperText>
            )}
        </div>
    );
});

Input.displayName = "Input";

export default Input;
