"use client";

import clsx from "clsx";
import React from "react";
import Label from "./Label";
import type { InputLikeProps } from "./Input";
import { useFormInput } from "./JSForm";
import { PropsOf } from "../../types";
import { setRef } from "../../util";
import HelperText from "../text/HelperText";

export interface TextAreaProps extends InputLikeProps<string> {
    className?: string;
    style?: React.CSSProperties;
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
    onFocus?: React.FocusEventHandler<HTMLTextAreaElement>;
    onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
    slotProps?: { textarea?: PropsOf<"textarea">; helperText?: PropsOf<typeof HelperText> };
    placeholder?: string;
    inputRef?: any;
    styleTextarea?: React.CSSProperties;
}

/** Input Element für simple inputs, wie text oder Zahlen. */
const TextArea = React.forwardRef<HTMLDivElement, TextAreaProps>((props, ref) => {
    const innerRef = React.useRef<HTMLTextAreaElement>(null);
    const { readOnly, error, disabled } = useFormInput(props, innerRef.current);

    const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
        props.onChange?.(e);
    };

    return (
        <div className={clsx("inline-flex flex-col", props.className)} style={props.style} ref={ref}>
            {props.label && (
                <Label
                    variant={props.dense ? "caption" : "form_control"}
                    error={error}
                    required={props.required}
                >
                    {props.label}
                </Label>
            )}
            <textarea
                {...props.slotProps?.textarea}
                ref={(textarea) => setRef(textarea, innerRef, props.inputRef)}
                placeholder={props.placeholder}
                className={clsx(
                    "flex-grow transition duration-90 min-h-0",
                    props.noBorder && "!border-0",
                    props.slotProps?.textarea?.className
                )}
                onChange={handleChange}
                onFocus={props.onFocus}
                onBlur={props.onBlur}
                value={props.value}
                defaultValue={props.defaultValue}
                readOnly={readOnly}
                disabled={disabled}
                required={props.required}
                style={props.styleTextarea}
                name={props.name}
            />
            <HelperText errorMessage={props.errorMessage} error={error} {...props.slotProps?.helperText}>
                {props.helperText}
            </HelperText>
        </div>
    );
});

TextArea.displayName = "TextArea";

export default TextArea;
