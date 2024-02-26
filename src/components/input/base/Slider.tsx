"use client";

import clsx from "clsx";
import Label from "../Label";
import React from "react";
import { useFormInput } from "../form/JSForm";
import { getInputSizeClasses } from "../../../input-helpers";
import type { PropsOf, Size } from "../../../types";
import { setRef } from "../../../util";
import HelperText from "../../text/HelperText";
import type { InputLikeProps } from "./Input";

interface SliderProps extends InputLikeProps {
    slotProps?: { input?: PropsOf<"input">; helperText?: PropsOf<typeof HelperText> };
    inputRef?: any;
    // * Restrictions
    /** @default 0 */
    min?: number;
    /** @default 100 */
    max?: number;
    // * Style
    size?: Size;
    fullWidth?: boolean;
    className?: string;
    style?: React.CSSProperties;
    // * Events
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onClick?: React.MouseEventHandler<HTMLInputElement>;
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>((props, ref) => {
    const sizeClasses = getInputSizeClasses(props.size || "medium");
    const innerRef = React.useRef<HTMLInputElement>(null);
    const { readOnly, disabled, error } = useFormInput(props, innerRef.current);

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = e => {
        props.onChange?.(e);
    };

    return (
        <div className={clsx("inline-flex flex-col flex-shrink-0", props.fullWidth && "w-full", props.className)} style={props.style} ref={ref}>
            {props.label && (
                <Label variant={props.dense ? "caption" : "form_control"} error={error} required={props.required}>
                    {props.label}
                </Label>
            )}
            <input
                {...props.slotProps?.input}
                ref={inp => setRef(inp, props.inputRef, innerRef)}
                type={"range"}
                onChange={handleChange}
                onFocus={props.onFocus}
                onBlur={props.onBlur}
                value={props.value}
                defaultValue={props.defaultValue}
                disabled={disabled}
                readOnly={readOnly}
                required={props.required}
                min={props.min || 0}
                max={props.max || 100}
                name={props.name}
                className={clsx("max-h-full transition duration-90 min-h-0", props.noBorder && "!border-0", sizeClasses, props.slotProps?.input?.className)}
                onClick={props.onClick}
            />
            <HelperText errorMessage={props.errorMessage} error={error} {...props.slotProps?.helperText}>
                {props.helperText}
            </HelperText>
        </div>
    );
});

Slider.displayName = "Slider";

export default Slider;
