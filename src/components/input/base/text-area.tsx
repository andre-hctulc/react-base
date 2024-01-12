"use client";

import HelperText from "@react-client/components/text/helper-text";
import type { PropsOf } from "@react-client/util";
import clsx from "clsx";
import Label from "../label";
import React from "react";
import { useJSForm } from "../form/js-form";
import { InputLikeProps, inputLikeProps } from "./input";

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
    const form = useJSForm();
    const { helperText, error, readOnly, required, disabled, defaultValue } = inputLikeProps(props, form);

    const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = e => {
        props.onChange?.(e);
        if (props.name) form?.change?.(props.name, e.target.value);
    };

    React.useEffect(() => {
        return () => {
            if (props.name) form?.change(props.name, defaultValue);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.name]);

    return (
        <div className={clsx("flex flex-col", props.className)} style={props.style} ref={ref}>
            {props.label && (
                <Label variant={props.dense ? "caption" : "form_control"} requiredError={error} required={required} hint={form?.hint}>
                    {props.label}
                </Label>
            )}
            <textarea
                {...props.slotProps?.textarea}
                ref={props.inputRef}
                placeholder={props.placeholder}
                className={clsx("flex-grow transition duration-90 min-h-0", props.noBorder && "!border-0", props.slotProps?.textarea?.className)}
                onChange={handleChange}
                onFocus={props.onFocus}
                onBlur={props.onBlur}
                value={props.value}
                defaultValue={defaultValue}
                readOnly={readOnly}
                disabled={disabled}
                required={required}
                style={props.styleTextarea}
            />
            {helperText && (
                <HelperText error={error} {...props.slotProps?.helperText}>
                    {helperText}
                </HelperText>
            )}
        </div>
    );
});

TextArea.displayName = "TextArea";

export default TextArea;
