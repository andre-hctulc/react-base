"use client";

import clsx from "clsx";
import Label from "../Label";
import { InputLikeProps } from "./Input";
import React from "react";
import { useFormInput } from "../form/JSForm";
import { getInputSizeClasses, forDateLikeInput } from "../../../input-helpers";
import { PropsOf, Size } from "../../../types";
import { setRef } from "../../../util";
import HelperText from "../../text/HelperText";

export interface InputProps extends InputLikeProps<Date> {
    className?: string;
    style?: React.CSSProperties;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>, date: Date | null) => void;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    slotProps?: { input?: PropsOf<"input">; helperText?: PropsOf<typeof HelperText> };
    placeholder?: string;
    inputRef?: any;
    onEnterKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    datetime?: boolean;
    size?: Size;
    min?: Date;
    max?: Date;
}

function formatDate(date: Date, datetime?: boolean) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    if (datetime) return `${year}-${month}-${day}T${hours}:${minutes}`;
    else return `${year}-${month}-${day}`;
}

const TimeInput = React.forwardRef<HTMLDivElement, InputProps>((props, ref) => {
    const sizeClasses = getInputSizeClasses(props.size || "medium");
    const inpType = props.datetime ? "datetime-local" : "date";
    const innerRef = React.useRef<HTMLInputElement>(null);
    const { readOnly, disabled, error } = useFormInput(props, innerRef.current);
    const min = React.useMemo(() => props.min && formatDate(props.min, !!props.datetime), [props.min, props.datetime]);
    const max = React.useMemo(() => props.max && formatDate(props.max, !!props.datetime), [props.max, props.datetime]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const defaultValue = React.useMemo(() => (props.defaultValue ? formatDate(props.defaultValue) : undefined), []);

    const keyDownHandler: React.KeyboardEventHandler<HTMLInputElement> = e => {
        if (e.key === "Enter") props.onEnterKeyDown?.(e);
    };

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
        // e.target.valueAsDate ist null - e.target.valueAsNumber ist date value in Millisekunden
        const newDate = new Date(e.currentTarget.valueAsNumber);
        props.onChange?.(e, newDate);
    };

    return (
        <div className={clsx("flex flex-col flex-shrink-0", props.className)} style={props.style} ref={ref}>
            {props.label && (
                <Label variant={props.dense ? "caption" : "form_control"} error={error} required={props.required}>
                    {props.label}
                </Label>
            )}
            <input
                {...props.slotProps?.input}
                ref={inp => {
                    setRef(innerRef, inp);
                    setRef(ref, inp as any);
                }}
                placeholder={props.placeholder}
                className={clsx("transition duration-90 min-h-0", props.noBorder && "!border-0", sizeClasses, props.slotProps?.input?.className)}
                type={inpType}
                onChange={handleChange}
                onFocus={props.onFocus}
                onBlur={props.onBlur}
                onKeyDown={keyDownHandler}
                value={forDateLikeInput(props.value, inpType)}
                defaultValue={defaultValue}
                readOnly={readOnly}
                disabled={disabled}
                required={props.required}
                min={min}
                max={max}
            />
            <HelperText error={error} errorMessage={props.errorMessage} {...props.slotProps?.helperText}>
                {props.helperText}
            </HelperText>
        </div>
    );
});

TimeInput.displayName = "TimeInput";

export default TimeInput;
