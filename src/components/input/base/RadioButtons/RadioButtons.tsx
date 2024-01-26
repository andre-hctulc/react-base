"use client";

import clsx from "clsx";
import React from "react";
<<<<<<< HEAD:src/components/input/base/radio-buttons.tsx
import Label from "../label";
import type { PropsOf } from "@react-client/types";
=======
import Label from "../../label";
import type { PropsOf } from "@react-client/util";
>>>>>>> 9141326d02a4250083ce3e61d74598fc4dcb439c:src/components/input/base/RadioButtons/RadioButtons.tsx
import HelperText from "@react-client/components/text/HelperText/HelperText";
import { useFormInput } from "../../form/JSForm/JSForm";
import Stack from "@react-client/components/layout/containers/Stack/Stack";
import { InputLikeProps } from "../Input/Input";
import { first, firstString } from "@client-util/iterables";

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
