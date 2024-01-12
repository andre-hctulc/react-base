"use client";

import type { PropsOf } from "@react-client/util";
import React from "react";
import RestartIcon from "@react-client/components/icons/collection/restart";
import clsx from "clsx";
import IconButton from "../buttons/icon-button";
import Typography from "@react-client/components/text/typography";
import HelperText from "@react-client/components/text/helper-text";
import { forDateLikeInput, getInputSizeClasses } from "@client-util/input-helpers";
import { useJSForm } from "../form/js-form";
import Label from "../label";
import Stack from "@react-client/components/layout/containers/stack";
import { InputLikeProps, inputLikeProps } from "./input";
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
    const form = useJSForm();
    const { helperText, error, readOnly, required, disabled, defaultValue } = inputLikeProps(props, form);
    const [value, setValue] = React.useState<TimeRange>(defaultValue || [null, null]);
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

    React.useEffect(() => {
        if (props.name) form?.change(props.name, defaultValue);

        return () => {
            if (props.name) form?.change(props.name, undefined);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.name]);

    return (
        <div className={clsx("flex flex-col", props.className)} style={props.style}>
            {props.label && (
                <Label requiredError={error} required={required} hint={form?.hint}>
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
                    required={required}
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
                    required={required}
                />
                <IconButton {...iconButtonProps} onClick={() => changeValue(undefined, null)}>
                    <RestartIcon />
                </IconButton>
            </Stack>
            {helperText && <HelperText error={error}>{helperText}</HelperText>}
        </div>
    );
}
