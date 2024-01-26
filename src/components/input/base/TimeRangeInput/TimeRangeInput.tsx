"use client";

import type { PropsOf } from "@react-client/types";
import React from "react";
import RestartIcon from "@react-client/components/icons/collection/restart";
import clsx from "clsx";
import IconButton from "../../buttons/IconButton/IconButton";
import Typography from "@react-client/components/text/Typography/Typography";
import HelperText from "@react-client/components/text/HelperText/HelperText";
<<<<<<< HEAD:src/components/input/base/time-range-input.tsx
import { forDateLikeInput, getInputSizeClasses } from "@react-client/input-helpers";
import { useFormInput } from "../form/js-form";
import Label from "../label";
import Stack from "@react-client/components/layout/containers/stack";
import { InputLikeProps } from "./input";
=======
import { forDateLikeInput, getInputSizeClasses } from "@client-util/input-helpers";
import { useFormInput } from "../../form/js-form";
import Label from "../../label";
import Stack from "@react-client/components/layout/containers/Stack/Stack";
import { InputLikeProps } from "../Input/Input";
>>>>>>> 9141326d02a4250083ce3e61d74598fc4dcb439c:src/components/input/base/TimeRangeInput/TimeRangeInput.tsx
import { Size } from "@react-client/types";

export type TimeRange = [Date | null, Date | null];

export interface TimeRangeInputProps extends InputLikeProps<TimeRange> {
    className?: string;
    style?: React.CSSProperties;
    onChange?: (range: TimeRange) => void;
    defaultValue?: TimeRange;
    time?: boolean;
    size?: Size;
}

export default function TimeRangeInput(props: TimeRangeInputProps) {
    const { readOnly, disabled, error } = useFormInput(props, null);
    const [value, setValue] = React.useState<TimeRange>(props.value || props.defaultValue || [null, null]);
    const formValue = React.useMemo(() => JSON.stringify(value), [value]);
    const [from, to] = value;
    const iconButtonProps: Omit<PropsOf<typeof IconButton>, "children"> = {};
    const inpType = props.time ? "datetime-local" : "date";
    const sizeClasses = getInputSizeClasses(props.size || "medium");
    const datePickerProps: PropsOf<"input"> = { type: inpType, className: clsx("transition duration-90 min-h-0", props.noBorder && "!border-0", sizeClasses) };
    const [fromStr, toStr] = React.useMemo(() => [forDateLikeInput(from, inpType), forDateLikeInput(to, inpType)], [from, to, inpType]);

    function changeValue(newFrom: Date | null | undefined, newTo: Date | null | undefined) {
        let newValue: TimeRange;

        if (newFrom !== undefined) newValue = [newFrom, to];
        else if (newTo !== undefined) newValue = [from, newTo];
        else return;

        setValue(newValue);
        props.onChange?.(newValue);
    }

    return (
        <div className={clsx("flex flex-col", props.className)} style={props.style}>
            {/* Form Control */}
            {props.name && <input type="hidden" value={formValue} required={props.required} disabled={disabled} readOnly={readOnly} name={props.name} />}
            {props.label && (
                <Label required={props.required} error={error}>
                    {props.label}
                </Label>
            )}
            <Stack direction="row" align="center" className="p-1">
                <input
                    {...datePickerProps}
                    value={fromStr}
                    onChange={e => {
                        changeValue(e.target.valueAsDate, undefined);
                    }}
                    max={toStr}
                    disabled={disabled}
                    readOnly={readOnly}
                    required={props.required}
                />
                <IconButton {...iconButtonProps} onClick={() => changeValue(null, undefined)}>
                    <RestartIcon />
                </IconButton>
                <Typography variant="body2" secondary>
                    bis
                </Typography>
                <input
                    {...datePickerProps}
                    value={toStr}
                    onChange={e => {
                        changeValue(undefined, e.target.valueAsDate);
                    }}
                    min={fromStr}
                    required={props.required}
                />
                <IconButton {...iconButtonProps} onClick={() => changeValue(undefined, null)}>
                    <RestartIcon />
                </IconButton>
            </Stack>
            <HelperText errorMessage={props.errorMessage} error={error}>
                {props.helperText}
            </HelperText>
        </div>
    );
}
