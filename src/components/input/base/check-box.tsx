"use client";

import HelperText from "@react-client/components/text/helper-text";
import type { PropsOf } from "@react-client/util";
import clsx from "clsx";
import Label from "../label";
import React from "react";
import { useJSForm } from "../form/js-form";
import Stack from "@react-client/components/layout/containers/stack";
import { randomId } from "@client-util/strings";
import { InputLikeProps, inputLikeProps } from "./input";

export interface InputProps extends Omit<InputLikeProps<boolean>, "required" | "noBorder"> {
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onClick?: React.MouseEventHandler<HTMLInputElement>;
    className?: string;
    style?: React.CSSProperties;
    slotProps?: { input?: PropsOf<"input">; helperText?: PropsOf<typeof HelperText> };
    inputRef?: (inp: HTMLInputElement | null) => void;
}

const CheckBox = React.forwardRef<HTMLDivElement, InputProps>((props, ref) => {
    const id = React.useRef(randomId());
    const form = useJSForm();
    const { helperText, error, readOnly, disabled, defaultValue } = inputLikeProps(props, form);
    const formInited = React.useRef(false);
    const classes = clsx("", props.label && "mt-3", props.className);
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
        props.onChange?.(e);
        if (props.name) form?.change?.(props.name, e.target.checked);
    };

    React.useEffect(() => {
        return () => {
            if (props.name) form?.change(props.name, undefined);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.name]);

    return (
        <Stack className={classes} minH0 style={props.style}>
            <div className="flex min-h-0" style={props.style} ref={ref}>
                <input
                    {...props.slotProps?.input}
                    onFocus={props.onFocus}
                    onClick={props.onClick}
                    onBlur={props.onBlur}
                    checked={props.value}
                    defaultChecked={defaultValue}
                    /* readOnly alleine hat keinen Effekt bei type type="checkbox" */
                    disabled={disabled || readOnly}
                    readOnly={readOnly}
                    id={id.current}
                    type="checkbox"
                    ref={inp => {
                        if (formInited.current) return;
                        formInited.current = true;
                        props.inputRef?.(inp);
                        if (inp && props.name) form?.change(props.name, inp.defaultChecked);
                    }}
                    className={clsx("transition duration-90", props.label && "mr-3", props.slotProps?.input?.className)}
                    onChange={handleChange}
                />
                {props.label && (
                    <Label variant={props.dense ? "caption" : "form_control"} htmlFor={id.current} noMargin>
                        {props.label}
                    </Label>
                )}
            </div>
            {helperText && (
                <HelperText error={error} {...props.slotProps?.helperText}>
                    {helperText}
                </HelperText>
            )}
        </Stack>
    );
});

CheckBox.displayName = "CheckBox";

export default CheckBox;
