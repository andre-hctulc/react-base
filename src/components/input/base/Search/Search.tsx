"use client";

import Popover from "@react-client/components/dialogs/Popover/Popover";
import React from "react";
import { useFormInput } from "../../form/JSForm/JSForm";
import Stack from "@react-client/components/layout/containers/Stack/Stack";
import HelperText from "@react-client/components/text/HelperText/HelperText";
import { PropsOf } from "@react-client/types";
import ShortText from "@react-client/components/text/ShortText/ShortText";
import { SelectOption } from "../Select/Select";
import List from "@react-client/components/data-display/list/List/List";
import { first, firstString } from "@client-util/iterables";
import Loading from "@react-client/components/data-display/loading/Loading/Loading";
import { Size } from "@react-client/types";
import FormControl from "../../form/FormControl/FormControl";
import { getInputSizeClasses } from "@react-client/input-helpers";
import clsx from "clsx";
import Label from "../../Label/Label";
import { InputLikeProps } from "../Input/Input";

interface SearchProps<T = string> extends InputLikeProps<T> {
    className?: string;
    style?: React.CSSProperties;
    options: SelectOption<T>[];
    renderCurrent?: (value: T) => React.ReactNode;
    /**
     * Der _Return Value_ gibt an, ob das `Popover` nach dem Aktivieren einer Option geschlossen wird (was der Standard ist)
     * */
    onChange?: (newValue: T) => boolean | void;
    onInputChange?: (newValue: string) => void;
    emptyText?: string;
    name?: string;
    placeholder?: string;
    slotProps?: { input?: Omit<PropsOf<"input">, "onChange" | "onFocus" | "onBlur">; optionWrapper?: PropsOf<"div">; popover?: Partial<PropsOf<typeof Popover>> };
    maxLength?: number;
    onOpen?: () => void;
    onClose?: () => void;
    size?: Size;
    loading?: boolean;
}

export default function Search<T = string>(props: SearchProps<T>) {
    const [open, setOpen] = React.useState(false);
    const innerRef = React.useRef<HTMLInputElement>(null);
    const { readOnly, disabled, error } = useFormInput(props, innerRef.current);
    const inp = React.useRef<HTMLSpanElement>(null);
    const sizeClasses = getInputSizeClasses(props.size || "medium");
    const [inpValue, setInpValue] = React.useState<string>(inp.current?.textContent || "");
    const isControlled = props.value !== undefined;
    const [value, setValue] = React.useState<T | undefined>(() => first(props.value, props.defaultValue) as T);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const customCurrent = (() => (value && props.renderCurrent ? props.renderCurrent(value) : undefined))();
    const current = (() => {
        if (customCurrent) return customCurrent;
        else if (!value && !inpValue) return <ShortText disabled>{props.placeholder || "Leer"}</ShortText>;
    })();

    React.useEffect(() => {
        if (isControlled) setValue(props.value);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.value]);

    function _setOpen(open: boolean) {
        if (open) props.onOpen?.();
        else props.onClose?.();
        setOpen(open);
    }

    function changeValue(newValue: T) {
        const close = props.onChange?.(newValue);
        if (close !== false) setOpen(false);
    }

    return (
        <Stack className={clsx("relative", props.className)} style={props.style}>
            <FormControl ref={innerRef} required={props.required} name={props.name} disabled={disabled} readOnly={readOnly} type="string" value={value} />
            {props.label && (
                <Label variant={props.dense ? "caption" : "form_control"} error={error} required={props.required}>
                    {props.label}
                </Label>
            )}
            {!open && current && <span className="flex absolute flex-row items-center p-2 w-full max-h-full rounded pointer-events-none">{current}</span>}
            <span
                ref={inp}
                onFocus={() => {
                    if (!open) _setOpen(true);
                }}
                contentEditable={!props.readOnly && !props.disabled}
                onInput={e => {
                    const v = e.currentTarget.textContent || "";
                    props.onInputChange?.(v);
                    setInpValue(v);
                }}
                onKeyDown={e => {
                    // New line abfangen und verhindern
                    if (e.keyCode === 13) {
                        e.preventDefault();
                        return false;
                    }

                    if (e.key === "Escape" || e.keyCode === 27) {
                        _setOpen(false);
                        inp.current?.blur();
                    }
                }}
                {...props.slotProps?.input}
                className={clsx(
                    "flex flex-row items-center p-2 w-full max-h-full rounded min-h-0 overflow-hidden",
                    // placeholder
                    !inpValue && !value && "text-text-disabled",
                    !props.noBorder && "border",
                    open && "outline-2 outline-primary",
                    !disabled && !readOnly && "cursor-pointer",
                    sizeClasses,
                    customCurrent && !open && "opacity-0",
                    props.slotProps?.input?.className
                )}
                // z index 40 wie der von popover, damit input clicks nicht das popover schließen
                style={{ zIndex: open ? 60 : undefined, ...props.slotProps?.input?.style }}
            />
            <HelperText error={error} errorMessage={props.errorMessage}>
                {props.helperText}
            </HelperText>
            <Popover
                buffer={0}
                cardShadow
                noCardPadding
                matchAnchorWidth
                position={{ vertical: "bottom", horizontal: "left" }}
                anchor={inp.current}
                open={open}
                onClose={() => _setOpen(false)}
                {...props.slotProps?.popover}
                slotProps={{
                    card: {
                        className: clsx("!bg-bg", props.slotProps?.popover?.slotProps?.card?.className),
                        ...props.slotProps?.popover?.slotProps?.card,
                    },
                    ...props.slotProps?.popover?.slotProps,
                }}
            >
                {props.loading ? (
                    <Loading py />
                ) : (
                    <List
                        onActivateOption={(e, opt) => changeValue(opt.value)}
                        options={props.options}
                        emptyText={firstString(props.emptyText, "Keine Ergebnisse gefunden")}
                    />
                )}
            </Popover>
        </Stack>
    );
}
