"use client";

import {
    Fragment,
    useCallback,
    useEffect,
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
import { Render, type RenderProps } from "./render.js";

export interface ListInputProps<T = string> {
    name?: string;
    value?: T;
    onChange: (params: { value: T }) => void;
    readOnly?: boolean;
    disabled?: boolean;
    required?: boolean;
}

export interface InputListProps<T = string>
    extends Omit<ComponentProps<"div">, "children" | "defaultValue" | "onChange">, RenderProps {
    name?: string;
    readOnly?: boolean;
    disabled?: boolean;
    required?: boolean;
    defaultValue?: T[];
    value?: T[];
    onChange?: (params: { value: T[] }) => void;
    defaultInputValue?: T;
    /** Render only the value input; rows and add/remove controls are provided by InputList. */
    renderInput: (params: {
        index: number;
        candidate: boolean;
        inputProps: ListInputProps<T>;
    }) => ReactNode;
    addIcon?: ReactNode;
    /** Render the new-item input after the existing values. @default false */
    reverse?: boolean;
    unique?: boolean;
    sort?: (a: T, b: T) => number;
    compareValues?: (a: T, b: T) => boolean;
}

export function InputList<T = string>({
    value,
    defaultValue,
    onChange,
    defaultInputValue,
    name,
    readOnly,
    disabled,
    required,
    reverse = false,
    unique,
    sort,
    compareValues = (a, b) => a === b,
    addIcon,
    renderInput,
    render,
    className,
    ...props
}: InputListProps<T>) {
    const [internalValue, setInternalValue] = useState<T[]>(() => defaultValue ?? []);
    const [candidate, setCandidate] = useState<T | undefined>(defaultInputValue);
    const [draftId, setDraftId] = useState(0);
    const draftRef = useRef<HTMLDivElement | null>(null);
    const values = value ?? internalValue;
    const valuesRef = useRefOf(values);

    useEffect(() => {
        if (draftId > 0) {
            draftRef.current?.querySelector<HTMLElement>("input, textarea, [tabindex='0']")?.focus();
        }
    }, [draftId]);

    const change = useCallback(
        (mutator: (current: T[]) => T[]) => {
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

    const canAdd = candidate !== undefined && !disabled && !readOnly;
    const add = () => {
        if (!canAdd || candidate === undefined) return;
        change((current) => {
            const nextValue = unique ? current.filter((item) => !compareValues(item, candidate)) : [...current];
            nextValue.push(candidate);
            return sort ? nextValue.sort(sort) : nextValue;
        });
        setCandidate(defaultInputValue);
        setDraftId((current) => current + 1);
    };
    const onDraftKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
        if (event.defaultPrevented || event.key !== "Enter" || event.nativeEvent.isComposing) return;
        if (event.target instanceof HTMLTextAreaElement && !event.ctrlKey && !event.metaKey) return;
        if (event.target instanceof HTMLButtonElement) return;
        event.preventDefault();
        add();
    };

    const entries = values.map((item, index) => ({ item, index }));
    if (sort) entries.sort((a, b) => sort(a.item, b.item));
    const inputProps = { readOnly, disabled, required };
    const valuesEl = entries.length > 0 && (
        <ul className="space-y-2">
            {entries.map(({ item, index }) => (
                <li className="flex gap-2" key={index}>
                    {renderInput({
                        index,
                        candidate: false,
                        inputProps: {
                            ...inputProps,
                            name,
                            value: item,
                            onChange: ({ value: nextValue }) =>
                                change((current) => current.map((entry, i) => (i === index ? nextValue : entry))),
                        },
                    })}
                    {!readOnly && (
                        <Button
                            aria-label={`Remove item ${index + 1}`}
                            disabled={disabled}
                            onClick={() => change((current) => current.filter((_, i) => i !== index))}
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
        <div className="flex gap-2" ref={draftRef} onKeyDown={onDraftKeyDown}>
            <Fragment key={draftId}>
                {renderInput({
                    index: values.length,
                    candidate: true,
                    inputProps: {
                        ...inputProps,
                        required: required && values.length === 0,
                        value: candidate,
                        onChange: ({ value: nextValue }) => {
                            if (!readOnly && !disabled) setCandidate(nextValue);
                        },
                    },
                })}
            </Fragment>
            <Button
                aria-label="Add item"
                disabled={!canAdd}
                onClick={add}
                size="icon"
                variant="ghost"
                type="button"
            >
                {addIcon ?? <LucidePlus />}
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
