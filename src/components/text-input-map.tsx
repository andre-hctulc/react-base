"use client";

import { type ComponentProps } from "react";
import { cn } from "@/lib/utils.js";
import { Input } from "@/components/ui/input.js";
import { Textarea } from "@/components/ui/textarea.js";
import { InputMap, type InputMapProps } from "./input-map.js";

interface TextInputMapBaseProps extends Omit<InputMapProps<string>, "renderInput" | "defaultInputValue"> {
    placeholder?: string;
}

export type TextInputMapProps = TextInputMapBaseProps &
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

/** Text value inputs for InputMap's built-in key/value rows. */
export function TextInputMap(props: TextInputMapProps) {
    const { textarea, inputProps, listInputProps, placeholder = "Value", ...mapProps } = props;

    return (
        <InputMap<string>
            {...mapProps}
            renderInput={({ key, candidate, inputProps: { onChange, ...valueProps } }) => {
                const commonProps = {
                    ...valueProps,
                    value: valueProps.value ?? "",
                    placeholder,
                    "aria-label": candidate ? placeholder : `Value for ${key}`,
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
