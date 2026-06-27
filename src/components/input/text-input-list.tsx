"use client";

import { useRef, useState, type FC, type Ref, type RefObject } from "react";
import { InputList } from "./input-list.js";
import type { InputLikeProps } from "./types.js";
import { twMerge } from "flowbite-react/helpers/tailwind-merge";
import {
    Button,
    CloseIcon,
    TextInput,
    type TextInputProps,
    Textarea,
    type TextareaProps,
} from "flowbite-react";
import { IconButton } from "../button/icon-button.js";
import { PlusIcon } from "../icons/phosphor/plus.js";

export interface TextInputListProps extends InputLikeProps<string[]> {
    textarea?: boolean;
    listInputProps?: Partial<TextInputProps | TextareaProps>;
    inputProps?: Partial<TextInputProps | TextareaProps>;
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
    const Inp = textarea ? Textarea : TextInput;
    const [newValue, setNewValue] = useState("");
    const inpRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

    return (
        <InputList<string>
            unique={unique}
            className={twMerge("space-y-4", className)}
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
                            ref={inpRef as RefObject<any>}
                            value={newValue}
                            onChange={(e) => setNewValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && newValue) {
                                    e.preventDefault();
                                    addValue(newValue);
                                }
                            }}
                            className={twMerge("grow", inputProps?.className)}
                        />
                        <IconButton
                            disabled={disabled || readOnly || !newValue}
                            onClick={() => {
                                addValue(newValue);
                            }}
                            color="gray"
                        >
                            <PlusIcon />
                        </IconButton>
                    </div>
                );
            }}
            renderValues={({ values, change, inputProps, remove }) => {
                if (!values.length) {
                    return null;
                }

                return (
                    <ul className="space-y-2">
                        {values.map((value, i) => (
                            <li className="flex gap-2" key={i}>
                                <Inp
                                    {...(inputProps as any)}
                                    {...(listInputProps as any)}
                                    className={twMerge("grow", listInputProps?.className)}
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
                                        <CloseIcon />
                                    </IconButton>
                                )}
                            </li>
                        ))}
                    </ul>
                );
            }}
        />
    );
};
