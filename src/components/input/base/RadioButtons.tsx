"use client";

import clsx from "clsx";
import React from "react";
import { useFormInput } from "../form/JSForm";
import { InputLikeProps } from "./Input";
import { first } from "u/src/iterables";
import Label from "../Label";
import { PropsOf } from "../../../types";
import Stack from "../../layout/Stack";
import HelperText from "../../text/HelperText";

export type RadioButtonsOption = { label: string; value: string | number };

interface RadioButtonsProps extends Omit<InputLikeProps<string | number>, "noBorder"> {
    options: RadioButtonsOption[];
    onChange?: (e: React.ChangeEvent<HTMLInputElement>, value: string | number) => void;
    className?: string;
    style?: React.CSSProperties;
    slotProps?: { label?: PropsOf<typeof Label>; main?: PropsOf<typeof Stack> };
    // TODO
    // customRadioButton: (active: boolean)=>React.ReactElement<{onClick?: ()=>void}>
    horizontal?: boolean;
}

export default function RadioButtons(props: RadioButtonsProps) {
    const { readOnly, disabled, error } = useFormInput(props, null);
    const isControlled = props.value !== undefined;
    const [value, setValue] = React.useState(() => first(props.value, props.defaultValue));

    React.useEffect(() => {
        if (props.value !== undefined) setValue(props.value);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.value]);

    function changeValue(e: React.ChangeEvent<HTMLInputElement>, value: string | number) {
        props.onChange?.(e, value);
        if (!isControlled) setValue(value);
    }

    return (
        <div className={clsx("flex flex-col", props.className)} style={props.style}>
            {props.label && (
                <Label variant={props.dense ? "caption" : "form_control"} {...props.slotProps?.label}>
                    {props.label}
                </Label>
            )}
            <Stack
                direction={props.horizontal ? "row" : "col"}
                {...props.slotProps?.main}
                className={clsx(props.horizontal ? "space-x-0" : "space-y-0", props.slotProps?.main?.className)}
            >
                {props.options.map(option => {
                    return (
                        <div key={option.value}>
                            <input
                                required={props.required}
                                onChange={e => changeValue(e, option.value)}
                                readOnly={readOnly}
                                disabled={disabled}
                                type="radio"
                                name={props.name}
                                value={option.value}
                                checked={option.value === value}
                            />
                        </div>
                    );
                })}
            </Stack>
            <HelperText error={error} errorMessage={props.errorMessage}>
                {props.helperText}
            </HelperText>
        </div>
    );
}