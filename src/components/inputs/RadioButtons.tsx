"use client";

import React from "react";
import type { PropsOf, StyleProps } from "../../types";
import { useFormInput } from "./JSForm";
import type { InputLikeProps } from "./Input";
import Label from "./Label";
import Flex from "../layout/Flex";
import HelperText from "../text/HelperText";
import { styleProps } from "../../util";

export type RadioButtonsOption = { label: string; value: string | number };

interface RadioButtonsProps extends StyleProps, Omit<InputLikeProps<string | number>, "noBorder"> {
    options: RadioButtonsOption[];
    onChange?: (e: React.ChangeEvent<HTMLInputElement>, value: string | number) => void;
    slotProps?: { label?: PropsOf<typeof Label>; main?: PropsOf<typeof Flex> };
    // TODO
    // customRadioButton: (active: boolean)=>React.ReactElement<{onClick?: ()=>void}>
    horizontal?: boolean;
}

export default function RadioButtons(props: RadioButtonsProps) {
    const { readOnly, disabled, error } = useFormInput(props, null);
    const isControlled = props.value !== undefined;
    const [value, setValue] = React.useState(() => props.value ?? props.defaultValue);

    React.useEffect(() => {
        if (props.value !== undefined) setValue(props.value);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.value]);

    function changeValue(e: React.ChangeEvent<HTMLInputElement>, value: string | number) {
        props.onChange?.(e, value);
        if (!isControlled) setValue(value);
    }

    return (
        <div {...styleProps({ className: "inline-flex flex-col" }, props)}>
            {props.label && (
                <Label variant={props.dense ? "caption" : "form_control"} {...props.slotProps?.label}>
                    {props.label}
                </Label>
            )}
            <Flex
                direction={props.horizontal ? "row" : "col"}
                {...props.slotProps?.main}
                className={[props.horizontal ? "space-x-0" : "space-y-0", props.slotProps?.main?.className]}
            >
                {props.options.map((option) => {
                    return (
                        <div key={option.value}>
                            <input
                                required={props.required}
                                onChange={(e) => changeValue(e, option.value)}
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
            </Flex>
            <HelperText error={error} errorMessage={props.errorMessage}>
                {props.helperText}
            </HelperText>
        </div>
    );
}
