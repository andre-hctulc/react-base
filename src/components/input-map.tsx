"use client";

import {
    Fragment,
    useCallback,
    useRef,
    useState,
    type ComponentProps,
    type KeyboardEventHandler,
    type ReactNode,
} from "react";
import { LucidePlus, LucideX } from "lucide-react";
import { useRefOf } from "@/hooks/use-ref-of.js";
import { cn } from "@/lib/utils.js";
import { Button } from "@/components/ui/button.js";
import { Input } from "@/components/ui/input.js";
import { Render, type RenderProps } from "./render.js";

export interface MapInputProps<T = string> {
    name?: string;
    value?: T;
    onChange: (params: { value: T }) => void;
    readOnly?: boolean;
    disabled?: boolean;
    required?: boolean;
}

export interface InputMapProps<T = string>
    extends Omit<ComponentProps<"div">, "children" | "defaultValue" | "onChange">, RenderProps {
    name?: string;
    readOnly?: boolean;
    disabled?: boolean;
    required?: boolean;
    defaultValue?: Record<string, T>;
    value?: Record<string, T>;
    onChange?: (params: { value: Record<string, T> }) => void;
    defaultInputValue?: T;
    keyPlaceholder?: string;
    keyInputProps?: Omit<ComponentProps<typeof Input>, "ref">;
    /** Render the new-item input after the existing values. Set false to place it first. @default true */
    reverse?: boolean;
    /** Render only the value input; key inputs and row controls are provided by InputMap. */
    renderInput: (params: { key: string; candidate: boolean; inputProps: MapInputProps<T> }) => ReactNode;
}

export function InputMap<T = string>({
    value,
    defaultValue,
    onChange,
    defaultInputValue,
    name,
    readOnly,
    disabled,
    required,
    reverse = true,
    keyPlaceholder = "Key",
    keyInputProps,
    renderInput,
    render,
    className,
    ...props
}: InputMapProps<T>) {
    const [internalValue, setInternalValue] = useState<Record<string, T>>(() => defaultValue ?? {});
    const [keyInput, setKeyInput] = useState("");
    const [candidate, setCandidate] = useState<T | undefined>(defaultInputValue);
    const [draftId, setDraftId] = useState(0);
    const keyRef = useRef<HTMLInputElement | null>(null);
    const values = value ?? internalValue;
    const valuesRef = useRefOf(values);

    const change = useCallback(
        (mutator: (current: Record<string, T>) => Record<string, T>) => {
            if (readOnly || disabled) return;
            const nextValue = mutator(valuesRef.current);
            if (value === undefined) {
                valuesRef.current = nextValue;
                setInternalValue(nextValue);
            }
            onChange?.({ value: nextValue });
        },
        [valuesRef, value, onChange, readOnly, disabled],
    );

    const duplicate = Object.hasOwn(values, keyInput);
    const canAdd = !!keyInput && candidate !== undefined && !duplicate && !disabled && !readOnly;
    const add = () => {
        if (!canAdd || candidate === undefined) return;
        change((current) => ({ ...current, [keyInput]: candidate }));
        setKeyInput("");
        setCandidate(defaultInputValue);
        setDraftId((current) => current + 1);
        keyRef.current?.focus();
    };
    const onDraftKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
        if (event.defaultPrevented || event.key !== "Enter" || event.nativeEvent.isComposing) return;
        if (event.target instanceof HTMLTextAreaElement && !event.ctrlKey && !event.metaKey) return;
        if (event.target instanceof HTMLButtonElement) return;
        event.preventDefault();
        add();
    };

    const inputProps = { readOnly, disabled, required };
    const createName = (key: string) => {
        if (name === undefined) {
            return undefined;
        }
        let pre: string;
        if (name === "." || name === "") {
            pre = "";
        } else if (name.endsWith(".")) {
            pre = name;
        } else {
            pre = `${name}.`;
        }
        return `${pre}${key}`;
    };
    const valuesEl = Object.entries(values).length > 0 && (
        <ul className="space-y-2">
            {Object.entries(values).map(([key, item]) => (
                <li className="flex gap-2" key={key}>
                    <Input aria-label="Key" readOnly disabled={disabled} value={key} />
                    {renderInput({
                        key,
                        candidate: false,
                        inputProps: {
                            ...inputProps,
                            name: createName(key),
                            value: item,
                            onChange: ({ value: nextValue }) => {
                                change((current) => ({ ...current, [key]: nextValue }));
                            },
                        },
                    })}
                    {!readOnly && (
                        <Button
                            aria-label={`Remove ${key}`}
                            disabled={disabled}
                            onClick={() => {
                                change((current) => {
                                    return Object.fromEntries(
                                        Object.entries(current).filter(([entryKey]) => entryKey !== key),
                                    );
                                });
                            }}
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
    const inputEl = !readOnly && (
        <div className="flex gap-2" onKeyDown={onDraftKeyDown}>
            <Input
                type="text"
                {...keyInputProps}
                ref={keyRef}
                className={cn("grow", keyInputProps?.className)}
                aria-label={keyInputProps?.["aria-label"] ?? keyPlaceholder}
                aria-invalid={duplicate || keyInputProps?.["aria-invalid"]}
                placeholder={keyPlaceholder}
                disabled={disabled}
                required={required && Object.keys(values).length === 0}
                value={keyInput}
                onChange={(event) => {
                    keyInputProps?.onChange?.(event);
                    if (!event.defaultPrevented) setKeyInput(event.target.value);
                }}
            />
            <Fragment key={draftId}>
                {renderInput({
                    key: keyInput,
                    candidate: true,
                    inputProps: {
                        ...inputProps,
                        required: required && Object.keys(values).length === 0,
                        value: candidate,
                        onChange: ({ value: nextValue }) => {
                            if (!readOnly && !disabled) setCandidate(nextValue);
                        },
                    },
                })}
            </Fragment>
            <Button
                aria-label="Add entry"
                disabled={!canAdd}
                onClick={add}
                size="icon"
                variant="ghost"
                type="button"
            >
                <LucidePlus />
            </Button>
        </div>
    );

    return (
        <Render render={render}>
            <div {...props} className={cn("space-y-4", className)}>
                {reverse ? valuesEl : inputEl}
                {reverse ? inputEl : valuesEl}
            </div>
        </Render>
    );
}
