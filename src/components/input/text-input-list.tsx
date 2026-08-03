"use client";

import { useRef, useState, type ComponentProps, type FC, type Ref, type RefObject } from "react";
import { InputList } from "./input-list.js";
import type { InputLikeProps } from "./types.js";
import { cn } from "@/lib/cn.util.js";
import { LucidePlus, LucideX } from "lucide-react";
import { Button } from "@/ui/button.js";

const inputBaseClass =
    "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:ring-primary focus:border-primary dark:border-gray-600 dark:bg-gray-700 dark:text-white";

export interface TextInputListProps extends InputLikeProps<string[]> {
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
}) => {
    const Inp: any = textarea ? "textarea" : "input";
    const [newValue, setNewValue] = useState("");
    const inpRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

    return (
        <InputList<string>
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
                            className={cn(inputBaseClass, "grow", inputProps?.className)}
                        />
                        <Button
                            disabled={disabled || readOnly || !newValue}
                            onClick={() => {
                                addValue(newValue);
                            }}
                            color="gray"
                            size="icon"
                            variant="ghost"
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
                                    className={cn(inputBaseClass, "grow", (listInputProps as any)?.className)}
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
