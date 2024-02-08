"use client";

import clsx from "clsx";
import Label from "../Label";
import React from "react";
import { useFormInput } from "../form/JSForm";
import { getInputSizeClasses } from "../../../input-helpers";
import { PropsOf, Size } from "../../../types";
import { setRef } from "../../../util";
import HelperText from "../../text/HelperText";

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
    pattern?: string;
    // * Style
    size?: Size;
    fullWidth?: boolean;
    className?: string;
    style?: React.CSSProperties;
    // * Events
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
    onEnterKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    onClick?: React.MouseEventHandler<HTMLInputElement>;
}

const Input = React.forwardRef<HTMLDivElement, InputProps>((props, ref) => {
    const sizeClasses = getInputSizeClasses(props.size || "medium");
    const innerRef = React.useRef<HTMLInputElement>(null);
    const { readOnly, disabled, error } = useFormInput(props, innerRef.current);

    const keyDownHandler: React.KeyboardEventHandler<HTMLInputElement> = e => {
        if (props.onKeyDown) props.onKeyDown(e);
        else if (e.key === "Enter") props.onEnterKeyDown?.(e);
    };

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
        props.onChange?.(e);
    };

    return (
        <div className={clsx("flex flex-col flex-shrink-0", props.fullWidth && "w-full", props.className)} style={props.style} ref={ref}>
            {props.label && (
                <Label variant={props.dense ? "caption" : "form_control"} error={error} required={props.required}>
                    {props.label}
                </Label>
            )}
            <input
                {...props.slotProps?.input}
                ref={inp => {
                    setRef(innerRef, inp);
                    setRef(props.inputRef, inp as any);
                }}
                pattern={props.pattern}
                placeholder={props.placeholder}
                type={props.type}
                onChange={handleChange}
                onFocus={props.onFocus}
                onBlur={props.onBlur}
                onKeyDown={keyDownHandler}
                value={props.value}
                defaultValue={props.defaultValue}
                disabled={disabled}
                readOnly={readOnly}
                required={props.required}
                min={props.min}
                max={props.max}
                maxLength={props.maxLength}
                name={props.name}
                className={clsx("max-h-full transition duration-90 min-h-0", props.noBorder && "!border-0", sizeClasses, props.slotProps?.input?.className)}
                onClick={props.onClick}
            />
            <HelperText errorMessage={props.errorMessage} error={error} {...props.slotProps?.helperText}>
                {props.helperText}
            </HelperText>
        </div>
    );
});

Input.displayName = "Input";

export default Input;
