"use client";

import { useRef, useState, type FC, type Ref } from "react";
import { InputList } from "./input-list.js";
import { Input } from "./input.js";
import type { PropsOf } from "../../types/index.js";
import { Textarea } from "./textarea.js";
import { IconButton } from "./icon-button.js";
import { PlusIcon } from "../icons/phosphor/plus.js";
import clsx from "clsx";
import { XIcon } from "../icons/phosphor/x.js";
import type { InputLikeProps } from "./types.js";

interface TextInputListProps extends InputLikeProps<string[]> {
    textarea?: boolean;
    listInputProps?: PropsOf<typeof Input | typeof Textarea>;
    inputProps?: PropsOf<typeof Input | typeof Textarea>;
    placeholder?: string;
    className?: string;
    ref?: Ref<any>;
    unique?: boolean;
}

export const TextInputList: FC<TextInputListProps> = ({
    textarea,
    name,
    value,
    defaultValue,
    listInputProps,
    readOnly,
    required,
    disabled,
    placeholder,
    inputProps,
    className,
    ref,
    unique,
}) => {
    const Inp = textarea ? Textarea : Input;
    const [newValue, setNewValue] = useState("");
    const inpRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

    return (
        <InputList<string>
            unique={unique}
            className={clsx("space-y-4", className)}
            ref={ref}
            value={value}
            defaultValue={defaultValue}
            renderInput={({ add }) => {
                const addValue = (val: string) => {
                    add(val);
                    if (inpRef.current) {
                        inpRef.current.focus();
                        inpRef.current.select();
                    }
                };

                return (
                    <div className="flex gap-2">
                        <Inp
                            readOnly={readOnly}
                            required={required}
                            disabled={disabled}
                            placeholder={placeholder}
                            {...(inputProps as any)}
                            ref={inpRef}
                            value={newValue}
                            onChange={(e) => setNewValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && newValue) {
                                    e.preventDefault();
                                    addValue(newValue);
                                }
                            }}
                        />
                        <IconButton
                            disabled={disabled || readOnly || !newValue}
                            onClick={() => {
                                addValue(newValue);
                            }}
                            color="neutral"
                        >
                            <PlusIcon />
                        </IconButton>
                    </div>
                );
            }}
            renderValues={({ values, change, inputProps, remove }) => (
                <ul className="space-y-2">
                    {values.map((value, i) => (
                        <li className="flex gap-2" key={i}>
                            <Inp
                                variant="outlined"
                                {...(inputProps as any)}
                                {...(listInputProps as any)}
                                className={clsx("grow", listInputProps?.className)}
                                name={name}
                                value={value}
                                onChange={(e) => {
                                    listInputProps?.onChange?.(e as any);
                                    change((items) => {
                                        const newItems = [...items];
                                        newItems.splice(i, 1, e.target.value);
                                        return newItems;
                                    });
                                }}
                            />
                            {!inputProps.readOnly && (
                                <IconButton disabled={inputProps.disabled} onClick={() => remove(value)}>
                                    <XIcon />
                                </IconButton>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        />
    );
};
