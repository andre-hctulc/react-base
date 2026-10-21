"use client";

import { type ComponentProps } from "react";
import { cn } from "@/lib/utils.js";
import { Input } from "@/components/ui/input.js";
import { Textarea } from "@/components/ui/textarea.js";
import { InputList, type InputListProps } from "./input-list.js";

interface TextInputListBaseProps extends Omit<InputListProps<string>, "renderInput" | "defaultInputValue"> {
    placeholder?: string;
}

export type TextInputListProps = TextInputListBaseProps &
    (
        | {
              textarea?: false;
              inputProps?: ComponentProps<typeof Input>;
              listInputProps?: ComponentProps<typeof Input>;
          }
        | {
              textarea: true;
              inputProps?: ComponentProps<typeof Textarea>;
              listInputProps?: ComponentProps<typeof Textarea>;
          }
    );

export function TextInputList(props: TextInputListProps) {
    const { textarea, inputProps, listInputProps, placeholder = "Value", ...listProps } = props;

    return (
        <InputList<string>
            {...listProps}
            renderInput={({ index, candidate, inputProps: { onChange, ...valueProps } }) => {
                const commonProps = {
                    ...valueProps,
                    value: valueProps.value ?? "",
                    placeholder,
                    "aria-label": candidate ? placeholder : `Item ${index + 1}`,
                };

                if (props.textarea) {
                    const fieldProps = candidate ? props.inputProps : props.listInputProps;
                    return (
                        <Textarea
                            {...fieldProps}
                            {...commonProps}
                            aria-label={fieldProps?.["aria-label"] ?? commonProps["aria-label"]}
                            className={cn("grow", fieldProps?.className)}
                            onChange={(event) => {
                                fieldProps?.onChange?.(event);
                                if (!event.defaultPrevented) onChange({ value: event.target.value });
                            }}
                        />
                    );
                }

                const fieldProps = candidate ? props.inputProps : props.listInputProps;
                return (
                    <Input
                        type="text"
                        {...fieldProps}
                        {...commonProps}
                        aria-label={fieldProps?.["aria-label"] ?? commonProps["aria-label"]}
                        className={cn("grow", fieldProps?.className)}
                        onChange={(event) => {
                            fieldProps?.onChange?.(event);
                            if (!event.defaultPrevented) onChange({ value: event.target.value });
                        }}
                    />
                );
            }}
        />
    );
}
