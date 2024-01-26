"use client";

import ShortText from "@react-client/components/text/ShortText/ShortText";
import clsx from "clsx";
import React from "react";
import Styled from "@react-client/components/others/Styled";
import Popover from "@react-client/components/dialogs/Popover/Popover";

export interface FilterInputProps<T = any, E = T> {
    className?: string;
    style?: React.CSSProperties;
    label: string;
    icon?: React.ReactElement;
    input: React.ReactElement<{ onChange?: (value: E, ...args: any) => void; defaultValue?: T; value?: T }>;
    /** Extrahiert den Wert aus dem `input` onChange event. */
    eventToValue?: (event: E) => T;
    error?: boolean;
    /** Wird aufgerufen, wenn sich das Popover schließt und sich der neue Wert vom Alten unterscheidet. */
    onChange?: (event: T) => void;
    value?: T;
    preview: ((value: T | undefined) => React.ReactNode) | "input_is_preview";
    defaultValue: T;
    disabled?: boolean;
    closeOnChange?: boolean;
    /** `onChange` wird nur getriggert, falls sich der neue Wert vom Alten unterscheidet. Um nicht primitive Datentypen zu vergleichen, kann man diese Funktion angeben, die den alten und den neuen Wert vergleicht. */
    compareValues?: (newVlaue: T | undefined, oldValue: T | undefined) => boolean;
    centerLabel?: boolean;
}

export default function FilterInput<T = any, E = T>(props: FilterInputProps<T, E>) {
    const root = React.useRef<HTMLDivElement>();
    const lastValue = React.useRef<any>();
    const isControlled = props.value !== undefined;
    const [value, setValue] = React.useState(isControlled ? (props.value as T) : props.defaultValue);
    const input = React.cloneElement(props.input, {
        ...props.input.props,
        onChange: (e: any, ...args: any) => {
            props.input.props.onChange?.(e, ...args);

            if (!isControlled) {
                const newValue = props.eventToValue ? props.eventToValue(e) : e;
                setValue(newValue);
            }

            if (props.closeOnChange) setOpen(false);
        },
        // `defaultValue` nicht weitergeben, falls das input `controlled` ist
        ...(isControlled ? { value: props.value } : { defaultValue: props.defaultValue }),
    });
    const wasOpen = React.useRef(false);
    const [open, setOpen] = React.useState(false);
    const labelClasses = clsx("font-bold text-17", props.error ? "error.light" : "text.primary");
    const classes = clsx("flex border rounded px-2 py-1 hover:bg-action-hover bg-bg", !props.disabled && "cursor-pointer", props.className);
    const inputisPreview = props.preview === "input_is_preview";

    React.useEffect(() => {
        if (!isControlled) return;
        setValue(props.value as T);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.value]);

    React.useEffect(() => {
        if (open) {
            wasOpen.current = true;
            lastValue.current = value;
        } else {
            // onChange nur triggern, falls sich neuer value vom alten unterscheidet. Dazu kann man auch `compareValues` prop angeben, um nicht primitive Typen auf Gleichheit zu prüfen.
            if (wasOpen.current && lastValue.current !== value && !props.compareValues?.(value, lastValue.current)) props.onChange?.(value);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [open]);

    return (
        <span
            className={classes}
            ref={root as any}
            style={props.style}
            onClick={() => {
                if (!open && !props.disabled && !inputisPreview) setOpen(true);
            }}
        >
            {props.icon && (
                <Styled className="self-start mr-2" disabled>
                    {props.icon}
                </Styled>
            )}
            <ShortText alignCenter={props.centerLabel} className={labelClasses}>
                {props.label}
            </ShortText>
            <div className="flex flex-col">{props.preview === "input_is_preview" ? input : props.preview(value)}</div>
            <Popover
                position={{ vertical: "bottom", horizontal: "left" }}
                anchor={root.current}
                onClose={e => setOpen(false)}
                open={open}
                slotProps={{ card: { className: "mt-1 max-h-[400px]" } }}
            >
                {input}
            </Popover>
        </span>
    );
}
