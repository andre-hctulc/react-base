"use client";

import ShortText from "@react-client/components/text/short-text";
import type { PropsOf } from "@react-client/util";
import React from "react";
import clsx from "clsx";
import Label from "../label";
import HelperText from "@react-client/components/text/helper-text";
import { useJSForm } from "../form/js-form";
import { InputLikeProps, inputLikeProps } from "./input";

export type CheckBoxesOptions = { label: React.ReactNode; value: string }[];

interface CheckBoxesProps extends Omit<InputLikeProps<string[]>, "required" | "noBorder"> {
    options: CheckBoxesOptions;
    onChange?: (values: string[], all: boolean) => void;
    className?: string;
    style?: React.CSSProperties;
    slotProps?: { root?: PropsOf<"div">; main?: PropsOf<"ol">; checkBoxes?: PropsOf<"input"> };
    switches?: boolean;
    row?: boolean;
    /** controlled */
    unstyled?: boolean;
    disableIconMapping?: boolean;
    /** @default "left" */
    iconPosition?: "left" | "right";
    radio?: boolean;
}

CheckBoxes.allValues = [] as any[];

/** Benutze `CheckBoxes.allValues` als `defaultValue`, um alle Optionen standardmäßig zu aktivieren. */
export default function CheckBoxes(props: CheckBoxesProps) {
    const allValues = () => props.options.map(option => option.value);
    const form = useJSForm();
    const { helperText, error, readOnly, disabled, defaultValue } = inputLikeProps(props, form);
    const [values, setValues] = React.useState<string[]>(() => {
        if (props.defaultValue === CheckBoxes.allValues) return allValues();
        else if (props.defaultValue) return props.defaultValue;
        else if (props.value) return props.value;
        else if (props.name && defaultValue) return defaultValue;
        else return [];
    });
    const isControlled = props.value !== undefined;

    React.useEffect(() => {
        if (props.value !== undefined) setValues(props.value);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.value]);

    React.useEffect(() => {
        if (props.name) form?.change(props.name, values);

        return () => {
            if (props.name) form?.change(props.name, undefined);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.name]);

    function toggleValue(value: string, checked: boolean) {
        let newValues: string[] | undefined;

        if (props.radio) {
            if (values.length && values[0] === value) newValues = [];
            else newValues = [value];
        } else {
            if (!checked) {
                if (values.includes(value)) newValues = values.filter(_value => _value !== value);
            } else {
                if (!values.includes(value)) newValues = [...values, value];
            }
        }

        if (newValues) {
            if (!isControlled) setValues(newValues);
            props.onChange?.(newValues, newValues.length === props.options.length);
            if (props.name) form?.change(props.name, newValues);
        }
    }

    return (
        <div
            {...props.slotProps?.root}
            className={clsx("flex flex-col min-w-0 unstyled-list min-h-0", !props.unstyled && "bg-bg rounded p-1.5", props.className, props.slotProps?.root?.className)}
            style={{ ...props.slotProps?.root?.style, ...props.style }}
        >
            {props.label && <Label variant={props.dense ? "caption" : "form_control"}>{props.label}</Label>}
            <ol className="flex-grow min-h-0 flex flex-col">
                {props.options.map(option => {
                    const label = typeof option.label === "string" ? <ShortText>{option.label}</ShortText> : option.label;

                    return (
                        <li key={option.value} className="flex flex-row space-x-3">
                            <input
                                {...props.slotProps?.checkBoxes}
                                readOnly={readOnly}
                                type="checkbox"
                                checked={values.includes(option.value)}
                                disabled={disabled}
                                onChange={e => {
                                    toggleValue(option.value, e.currentTarget.checked);
                                }}
                            />
                            {label}
                        </li>
                    );
                })}
            </ol>
            {helperText && <HelperText error={error}>{helperText}</HelperText>}
        </div>
    );
}
