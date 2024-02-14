"use client";

import clsx from "clsx";
import React from "react";
import Label from "../Label";
import IconButton from "../buttons/IconButton";
import { useFormInput } from "../form/JSForm";
import type { InputLikeProps } from "./Input";
import { getInputSizeClasses, forDateLikeInput } from "../../../input-helpers";
import type { Size, PropsOf } from "../../../types";
import RestartIcon from "../../icons/collection/Restart";
import Flex from "../../layout/Flex";
import HelperText from "../../text/HelperText";
import Typography from "../../text/Typography";

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
            <Flex direction="row" align="center" className="p-1">
                <input
                    {...datePickerProps}
                    value={fromStr}
                    onChange={e => {
                        changeValue(e.currentTarget.valueAsDate, undefined);
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
                        changeValue(undefined, e.currentTarget.valueAsDate);
                    }}
                    min={fromStr}
                    required={props.required}
                />
                <IconButton {...iconButtonProps} onClick={() => changeValue(undefined, null)}>
                    <RestartIcon />
                </IconButton>
            </Flex>
            <HelperText errorMessage={props.errorMessage} error={error}>
                {props.helperText}
            </HelperText>
        </div>
    );
}
