"use client";

import clsx from "clsx";
import React from "react";
import type { PropsOf, Size } from "../../../types";
import { useFormInput } from "../form/JSForm";
import { SelectOption } from "./Select";
import FormControl from "../form/FormControl";
import Label from "../Label";
import { InputLikeProps } from "./Input";
import { getInputSizeClasses } from "../../../input-helpers";
import Loading from "../../feedback/Loading";
import Popover from "../../dialogs/popover/Popover";
import Flex from "../../layout/Flex";
import HelperText from "../../text/HelperText";
import List from "../../layout/list/List";
import Typography from "../../text/Typography";

interface SearchProps<T = string> extends InputLikeProps<T> {
    className?: string;
    style?: React.CSSProperties;
    options: ((inpValue: string) => SelectOption<T>[]) | SelectOption<T>[];
    renderCurrent?: (activeOption: SelectOption<T>) => React.ReactNode;
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
    /**
     * Is used to determine the options for _default values_ or _controlled values_, since the options are not neccessarily initilized at that point,
     * because they are inferred by the input value.
     * */
    defaultOptions?: SelectOption<T>[];
}

export default function Search<T = string>(props: SearchProps<T>) {
    const [open, setOpen] = React.useState(false);
    const innerRef = React.useRef<HTMLInputElement>(null);
    const { readOnly, disabled, error } = useFormInput(props, innerRef.current);
    const inp = React.useRef<HTMLInputElement>(null);
    const sizeClasses = getInputSizeClasses(props.size || "medium");
    const [inpValue, setInpValue] = React.useState<string>("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const options = React.useMemo(
        () => (Array.isArray(props.options) ? props.options : props.options(inpValue)),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [Array.isArray(props.options) ? props.options : inpValue, open]
    );
    const [activeOption, setActiveOption] = React.useState<SelectOption<T> | undefined>(() => {
        const defaultValue = props.value === undefined ? props.defaultValue : props.value;
        if (defaultValue === undefined) return undefined;
        const activeOption = findOption(defaultValue);
        return activeOption;
    });
    const showOpen = open || !activeOption;

    React.useEffect(() => {
        // controlled
        if (props.value !== undefined) {
            const activeOption = findOption(props.value);
            if (activeOption) activateOption(activeOption);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.value]);

    function findOption(value: T) {
        return props.defaultOptions?.find(opt => opt.value === value) || options.find(opt => opt.value === value);
    }

    function _setOpen(open: boolean) {
        if (open) props.onOpen?.();
        else props.onClose?.();
        setOpen(open);
    }

    function activateOption(option: SelectOption<T>) {
        setActiveOption(option);
        const close = props.onChange?.(option.value);
        if (close !== false) _setOpen(false);
    }

    return (
        <Flex inline className={clsx("relative min-w-0", props.className)} style={props.style}>
            <FormControl ref={innerRef} required={props.required} name={props.name} type="string" value={activeOption} />
            {props.label && (
                <Label variant={props.dense ? "caption" : "form_control"} error={error} required={props.required}>
                    {props.label}
                </Label>
            )}
            {/* Current (CLOSED) */}
            {!showOpen && (
                <div
                    onClick={() => {
                        _setOpen(true);
                        setTimeout(() => {
                            if (!inp.current) return;
                            inp.current.select();
                            // Set cursor to end of input
                            //inp.current.selectionStart = inp.current.selectionEnd = inp.current.value.length;
                        }, 0);
                    }}
                >
                    {props.renderCurrent ? (
                        props.renderCurrent(activeOption!)
                    ) : (
                        <Typography secondary alignCenter className={clsx("border rounded cursor-text px-2", sizeClasses)} truncate>
                            {activeOption!.label}
                        </Typography>
                    )}
                </div>
            )}
            <input
                value={inpValue}
                placeholder={props.placeholder}
                ref={inp}
                /* TODO type: "search"? */
                type={showOpen ? "text" : "hidden"}
                onFocus={() => _setOpen(true)}
                onChange={e => setInpValue(e.currentTarget.value)}
                readOnly={readOnly}
                disabled={disabled}
                onKeyDown={e => {
                    // New line abfangen und verhindern
                    if (e.keyCode === 13) {
                        e.preventDefault();
                        return false;
                    }

                    if (e.key === "Escape" || e.keyCode === 27) {
                        _setOpen(false);
                        if (!inp.current) return;
                        inp.current.blur();
                    }
                }}
                {...props.slotProps?.input}
                className={clsx(
                    "flex flex-row items-center p-2 w-full max-h-full rounded min-h-0 overflow-hidden",
                    !props.noBorder && "border",
                    sizeClasses,
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
                noCardPadding
                adjustMaxHeight
                matchAnchorWidth
                position={{ vertical: "bottom", horizontal: "start" }}
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
                    <List onActivateOption={(e, opt) => activateOption(opt)} options={options} emptyText={props.emptyText ?? "No results found"} />
                )}
            </Popover>
        </Flex>
    );
}
