"use client";

import ShortText from "@react-client/components/text/short-text";
import clsx from "clsx";
import React from "react";
import Label from "../label";
import type { PropsOf } from "@react-client/util";
import HelperText from "@react-client/components/text/helper-text";
import { useJSForm } from "../form/js-form";
import Stack from "@react-client/components/layout/containers/stack";
import { firstBool } from "@client-util/iterables";
import { InputLikeProps, inputLikeProps } from "./input";

export type RadioButtonsOption = { label: string; value: string | number };

interface RadioButtonsProps extends Omit<InputLikeProps<string | number>, "required" | "noBorder"> {
    options: RadioButtonsOption[];
    onChange?: (value: string | number) => void;
    className?: string;
    style?: React.CSSProperties;
    slotProps?: { main?: PropsOf<typeof Stack>; label?: PropsOf<typeof Label> };
    // TODO
    // customRadioButton: (active: boolean)=>React.ReactElement<{onClick?: ()=>void}>
}

export default function RadioButtons(props: RadioButtonsProps) {
    const form = useJSForm();
    const { helperText, error, readOnly, disabled, defaultValue } = inputLikeProps(props, form);
    const isControlled = props.value !== undefined;
    const [value, setValue] = React.useState(() => {
        if (props.defaultValue !== undefined) return props.defaultValue;
        else if (props.value !== undefined) return props.value;
        else if (props.name && defaultValue !== undefined) return defaultValue;
        else return "";
    });

    React.useEffect(() => {
        if (props.value !== undefined) setValue(props.value);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.value]);

    React.useEffect(() => {
        if (props.name) form?.change(props.name, value);

        return () => {
            if (props.name) form?.change(props.name, undefined);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.name]);

    function changeValue(newValue: string | number) {
        props.onChange?.(newValue);
        if (props.name) form?.change(props.name, newValue);
        if (!isControlled) setValue(newValue);
    }

    return (
        <div className={clsx("flex flex-col", props.className)} style={props.style}>
            {props.label && (
                <Label variant={props.dense ? "caption" : "form_control"} {...props.slotProps?.label}>
                    {props.label}
                </Label>
            )}
            <Stack
                direction="row"
                align="center"
                minH0
                {...props.slotProps?.main}
                className={clsx("bg-bg-dark rounded-lg p-1 self-start space-x-1", props.slotProps?.main?.className)}
            >
                {props.options.map(option => {
                    const active = option.value === value;
                    const classes = clsx(
                        "rounded-lg h-8 flex items-center py-1 px-2 transition duration-200",
                        active && "text-primary-contrast-text bg-primary-light",
                        active && disabled && "bg-opacity-50",
                        !readOnly && !disabled && "cursor-pointer"
                    );

                    return (
                        <ShortText
                            onClick={() => {
                                if (!readOnly && !disabled) changeValue(option.value);
                            }}
                            key={option.value}
                            variant="body2"
                            className={classes}
                        >
                            {option.label}
                        </ShortText>
                    );
                })}
            </Stack>
            {helperText && <HelperText error={error}>{helperText}</HelperText>}
        </div>
    );
}
