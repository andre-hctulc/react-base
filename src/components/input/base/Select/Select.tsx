"use client";

import Popover from "@react-client/components/dialogs/popover/Popover/Popover";
import clsx from "clsx";
import React from "react";
import { useFormInput } from "../../form/js-form";
import HelperText from "@react-client/components/text/helper-text";
import Label from "../../label";
import { getInputSizeClasses } from "@client-util/input-helpers";
import Stack from "@react-client/components/layout/containers/Stack/Stack";
import ChevronDownIcon from "@react-client/components/icons/collection/chevron-down";
import { iterableToMap } from "@client-util/iterables";
import { PropsOf } from "@react-client/util";
import Typography from "@react-client/components/text/typography";
import { InputLikeProps } from "../Input/Input";
import List from "@react-client/components/data-display/list/list";
import ListItem from "@react-client/components/data-display/list/list-item";
import { Size } from "@react-client/types";
import FormControl from "../../form/form-control";

export type SelectOption<T = string> = {
    value: T;
    label: React.ReactNode;
    data?: any;
    icon?: React.ReactElement;
    style?: React.CSSProperties;
    className?: string;
    actionIcon?: React.ReactElement;
};

interface SelectProps<T = string> extends InputLikeProps<T> {
    className?: string;
    options: SelectOption<T>[];
    renderCurrent?: (option: SelectOption<T>) => React.ReactNode;
    style?: React.CSSProperties;
    onChange?: (value: T | undefined, option: SelectOption<T> | undefined) => void;
    size?: Size;
    placeholder?: string;
    /** @default { value: "", label: "Leer" } */
    emptyOption?: { value: T; label: string } | null;
    slotProps?: { currentWrapper?: Omit<PropsOf<typeof Stack>, "onClick"> };
    fullWidth?: boolean;
    emptyValue?: T;
}

const maxCardHeight = 400;

export default function Select<T = string>(props: SelectProps<T>) {
    const valueOptionMap = iterableToMap(props.options, opt => opt.value);
    const sizeClasses = getInputSizeClasses(props.size || "medium");
    const anchor = React.useRef<HTMLDivElement>(null);
    const [open, setOpen] = React.useState(false);
    const { readOnly, disabled, error } = useFormInput(props);
    const [activeOption, setActiveOption] = React.useState<SelectOption<T> | undefined>(() => {
        let value: any;
        if (props.value !== undefined) value = props.value;
        else if (props.defaultValue !== undefined) value = props.defaultValue;
        else value = undefined;
        return valueOptionMap.get(value);
    });
    const isControlled = typeof props.value === "string";
    const hasValue = !!activeOption;
    const emptyOption: SelectOption<any> | null =
        props.emptyOption === undefined
            ? { value: props.emptyValue !== undefined ? props.emptyValue : "", label: "Leer", className: "text-text-disabled" }
            : props.emptyOption;

    React.useEffect(() => {
        if (props.value !== undefined) {
            const option = valueOptionMap.get(props.value);
            setActiveOption(option);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.value]);

    function changeValue(value: T | undefined) {
        if (disabled || readOnly) return;

        const option = valueOptionMap.get(value as any);

        props.onChange?.(value, option);
        if (!isControlled) setActiveOption(option);

        setOpen(false);
    }

    function onOpen() {
        if (disabled || readOnly) return;

        setOpen(true);
        anchor.current?.focus();
    }

    function onClose() {
        setOpen(false);
        anchor.current?.blur();
    }

    return (
        <div className={clsx("flex flex-col flex-shrink-0 min", props.fullWidth && "w-full", props.className)} style={props.style}>
            <FormControl required={props.required} name={props.name} disabled={disabled} readOnly={readOnly} type="json" value={activeOption?.value} />
            {props.label && (
                <Label variant={props.dense ? "caption" : "form_control"} required={props.required} error={error}>
                    {props.label}
                </Label>
            )}{" "}
            <Stack
                style={{ outlineWidth: 2 }}
                direction="row"
                minH0
                align="center"
                ref={anchor}
                {...props.slotProps?.currentWrapper}
                onClick={onOpen}
                className={clsx(
                    "p-2 w-full max-h-full rounded transition",
                    !props.noBorder && "border",
                    open && "outline outline-primary",
                    !disabled && !readOnly && "cursor-pointer",
                    sizeClasses,
                    props.slotProps?.currentWrapper?.className
                )}
            >
                <div className="flex-grow min-w-0 overflow-x-hidden whitespace-nowrap text-ellipsis min-h-0">
                    {hasValue ? (
                        props.renderCurrent ? (
                            props.renderCurrent(activeOption)
                        ) : (
                            <Typography className="min-h-0" tag="span">
                                {activeOption.label}
                            </Typography>
                        )
                    ) : (
                        <Typography disabled>{props.placeholder || "Leer"}</Typography>
                    )}
                </div>
                <ChevronDownIcon color={readOnly || disabled ? "disabled" : "text_secondary"} className="ml-1 self-center flex-shrink-0" />
            </Stack>
            <HelperText error={error} errorMessage={props.errorMessage}>
                {props.helperText}
            </HelperText>
            <Popover
                buffer={0}
                matchAnchorMinWidth
                open={open}
                onClose={onClose}
                anchor={anchor.current}
                position={{ horizontal: "left", vertical: "bottom" }}
                slotProps={{ card: { className: "!p-0 shadow-lg !bg-bg overflow-y-auto", style: { maxHeight: maxCardHeight } } }}
            >
                <List onActivateOption={(e, opt) => changeValue(opt.value)} options={props.options}>
                    {emptyOption && (
                        <ListItem icon={emptyOption.icon} className={emptyOption.className} hoverEffect onClick={e => changeValue(emptyOption.value)}>
                            {emptyOption.label}
                        </ListItem>
                    )}
                </List>
            </Popover>
        </div>
    );
}
