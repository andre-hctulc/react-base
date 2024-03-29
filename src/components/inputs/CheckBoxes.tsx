"use client";

import React from "react";
import clsx from "clsx";
import type { InputLikeProps } from "./Input";
import type { PropsOf, StyleProps } from "../../types";
import Label from "./Label";
import { useFormInput } from "./JSForm";
import FormControl from "./FormControl";
import HelperText from "../text/HelperText";
import Typography from "../text/Typography";
import { styleProps } from "../../util";

export type CheckBoxesOptions = { label: React.ReactNode; value: string }[];

interface CheckBoxesProps extends StyleProps, Omit<InputLikeProps<string[]>, "noBorder"> {
    options: CheckBoxesOptions;
    onChange?: (values: string[], all: boolean) => void;
    slotProps?: { main?: PropsOf<"ol">; checkBoxes?: PropsOf<"input"> };
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
    const allValues = () => props.options.map((option) => option.value);
    const innerRef = React.useRef<HTMLInputElement>(null);
    const { error, readOnly, disabled } = useFormInput(props, innerRef.current);
    const [value, setValue] = React.useState<string[]>(() => {
        if (props.defaultValue === CheckBoxes.allValues) return allValues();
        else if (props.defaultValue) return props.defaultValue;
        else if (props.value) return props.value;
        else return [];
    });
    const valueSet = React.useMemo(() => new Set(value), [value]);
    const isControlled = props.value !== undefined;

    React.useEffect(() => {
        if (props.value !== undefined) setValue(props.value);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.value]);

    function toggleValue(v: string, checked: boolean) {
        let newValues: string[] | undefined;

        if (props.radio) {
            if (v.length && v[0] === v) newValues = [];
            else newValues = [v];
        } else {
            if (!checked) {
                if (v.includes(v)) newValues = value.filter((_value) => _value !== v);
            } else {
                if (!v.includes(v)) newValues = [...v, v];
            }
        }

        if (newValues) {
            if (!isControlled) setValue(newValues);
            props.onChange?.(newValues, newValues.length === props.options.length);
        }
    }

    return (
        <div
            {...styleProps(
                {
                    className: [
                        "inline-flex flex-col min-w-0 unstyled-list min-h-0",
                        !props.unstyled && "bg-bg rounded p-1.5",
                    ],
                },
                props
            )}
        >
            <FormControl
                ref={innerRef}
                required={props.required}
                name={props.name}
                type="json"
                value={value}
            />
            {props.label && <Label variant={props.dense ? "caption" : "form_control"}>{props.label}</Label>}
            <ol className="flex-grow min-h-0 flex flex-col">
                {props.options.map((option) => {
                    const label =
                        typeof option.label === "string" ? (
                            <Typography truncate>{option.label}</Typography>
                        ) : (
                            option.label
                        );

                    return (
                        <li key={option.value} className="flex flex-row space-x-3">
                            <input
                                {...props.slotProps?.checkBoxes}
                                readOnly={readOnly}
                                type="checkbox"
                                checked={valueSet.has(option.value)}
                                disabled={disabled}
                                onChange={(e) => {
                                    toggleValue(option.value, e.currentTarget.checked);
                                }}
                            />
                            {label}
                        </li>
                    );
                })}
            </ol>
            <HelperText errorMessage={props.errorMessage} error={error}>
                {props.helperText}
            </HelperText>
        </div>
    );
}
