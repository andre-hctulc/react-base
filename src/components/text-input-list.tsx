"use client";

import { useRef, useState, type ComponentProps, type FC, type Ref, type RefObject } from "react";
import { InputList } from "./input-list.js";
import { cn } from "@/lib/utils.js";
import { LucidePlus, LucideX } from "lucide-react";
import { Button } from "@/components/ui/button.js";
import { Input } from "@/components/ui/input.js";
import { Textarea } from "@/components/ui/textarea.js";

export interface TextInputListProps {
    id?: string;
    readOnly?: boolean;
    disabled?: boolean;
    name?: string;
    defaultValue?: string[];
    value?: string[];
    required?: boolean;
    onChange?: (params: { value: string[] }) => void;
    textarea?: boolean;
    listInputProps?: Partial<ComponentProps<"input"> | ComponentProps<"textarea">>;
    inputProps?: Partial<ComponentProps<"input"> | ComponentProps<"textarea">>;
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
    id,
}) => {
    const Inp: any = textarea ? Textarea : Input;
    const [newValue, setNewValue] = useState("");
    const inpRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

    return (
        <InputList<string>
            id={id}
            unique={unique}
            className={cn("space-y-4", className)}
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
                            type={textarea ? undefined : "text"}
                            readOnly={readOnly}
                            required={required}
                            disabled={disabled}
                            placeholder={placeholder}
                            {...(inputProps as any)}
                            ref={inpRef as RefObject<any>}
                            value={newValue}
                            onChange={(e: any) => setNewValue(e.target.value)}
                            onKeyDown={(e: any) => {
                                if (e.key === "Enter" && newValue) {
                                    e.preventDefault();
                                    addValue(newValue);
                                }
                            }}
                            className={cn("grow", inputProps?.className)}
                        />
                        <Button
                            disabled={disabled || readOnly || !newValue}
                            onClick={() => {
                                addValue(newValue);
                            }}
                            color="gray"
                            size="icon"
                            variant="ghost"
                            type="button"
                        >
                            <LucidePlus />
                        </Button>
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
                                    type={textarea ? undefined : "text"}
                                    {...(inputProps as any)}
                                    {...(listInputProps as any)}
                                    className={cn("grow", (listInputProps as any)?.className)}
                                    name={name}
                                    value={value}
                                    onChange={(e: any) => {
                                        (listInputProps as any)?.onChange?.(e);
                                        change((items) => {
                                            const newItems = [...items];
                                            newItems.splice(i, 1, e.target.value);
                                            return newItems;
                                        });
                                    }}
                                />
                                {!(inputProps as any)?.readOnly && (
                                    <Button
                                        disabled={(inputProps as any)?.disabled}
                                        onClick={() => remove(value)}
                                        size="icon"
                                        variant="ghost"
                                        type="button"
                                    >
                                        <LucideX />
                                    </Button>
                                )}
                            </li>
                        ))}
                    </ul>
                );
            }}
        />
    );
};
