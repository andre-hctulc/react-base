"use client";

import { useCallback, useMemo, useState, type CSSProperties, type ElementType, type Ref } from "react";
import type { InputLikeProps } from "./types.js";
import { useRefOf } from "@/hooks/use-ref-of.js";
import { cn as twMerge } from "@/lib/utils.js";
import { Slot } from "radix-ui";

type InputListInputProps<V = string> = Pick<
    InputLikeProps<V>,
    "readOnly" | "disabled" | "name" | "defaultValue"
>;

export interface InputListProps<T = string, A extends ElementType = "div"> extends InputLikeProps<T[]> {
    className?: string;
    style?: CSSProperties;
    ref?: Ref<any>;
    asChild?: boolean;
    /**
     * Passed to {@link renderInput} as default value for the input
     */
    defaultInputValue?: any;
    renderInput: (params: {
        /**
         * @param newItem - The value of the new item. If not provided the current candidate is used
         */
        add: (newItem?: T) => void;
        /**
         * Sets the given item as the candidate for the next `add`
         */
        candidate: (item: T) => void;
        values: T[];
        inputProps: InputListInputProps<T>;
    }) => React.ReactNode;
    renderValues: (params: {
        values: T[];
        change: (newItems: ((items: T[]) => T[]) | T[]) => void;
        remove: (item: T) => void;
        inputProps: InputListInputProps<T>;
    }) => React.ReactNode;
    addIcon?: React.ReactNode;
    as?: any;
    reverse?: boolean;
    unique?: boolean;
    sort?: (a: T, b: T) => number;
    compareValues?: (a: T, b: T) => boolean;
}

const compare = (a: any, b: any) => a === b;

/**
 * ### Props
 * - `reverse`- Render the input at the top
 * - `compareValues` - Function to compare values. Default is `===`
 * - `unique` - Only allow unique values
 * - `sort` - Sort function for the values
 */
export const InputList = <T = string, A extends ElementType = "div">({
    className,
    renderInput,
    renderValues,
    addIcon,
    style,
    asChild,
    onChange,
    value,
    reverse,
    unique,
    sort,
    defaultValue,
    readOnly,
    defaultInputValue,
    compareValues,
    ...inputProps
}: InputListProps<T, A>) => {
    const sortRef = useRefOf(sort);
    const compareRef = useRefOf(compareValues || compare);
    const onChangeRef = useRefOf(onChange);
    const [values, setValues] = useState<T[]>(value || defaultValue || []);
    const Comp: any = asChild ? Slot : "div";
    const [candidate, setCandidate] = useState<T>();
    const change = (mutator: ((currentValues: T[]) => T[]) | T[]) => {
        setValues(mutator);
    };

    const add = useCallback(
        (newItem?: T) => {
            if (newItem === undefined) {
                if (candidate === undefined) {
                    return;
                }
                newItem = candidate;
            }
            let newItems = [...values];
            if (unique) {
                newItems = newItems.filter((item) => !compareRef.current(item, newItem as any));
            }
            newItems.push(newItem);
            if (value === undefined) setValues(newItems);
            onChangeRef.current?.({ value: newItems });
            setCandidate(undefined);
        },
        [values, unique, candidate],
    );

    const remove = useCallback(
        (item: T, index?: number) => {
            const newItems = values.filter(
                (it, i) => !compareRef.current(it, item) && (index === undefined || index === i),
            );
            if (value === undefined) setValues(newItems);
            onChangeRef.current?.({ value: newItems });
        },
        [value, values],
    );

    const changeCandidate = useCallback((neItem: T) => {
        setCandidate(neItem);
    }, []);

    const sortedValues = useMemo(() => {
        if (sortRef.current) {
            return (values as any[]).sort(sortRef.current);
        }
        return values;
    }, [values]);

    const valuesEl = renderValues({
        values: sortedValues,
        change,
        remove,
        inputProps: { ...inputProps, defaultValue: undefined },
    });
    const inpEl =
        !readOnly &&
        renderInput({
            values: sortedValues,
            add,
            candidate: changeCandidate,
            inputProps: { ...inputProps, defaultValue: defaultInputValue },
        });

    return (
        <Comp className={twMerge("", className)} style={style}>
            {reverse ? valuesEl : inpEl}
            {reverse ? inpEl : valuesEl}
        </Comp>
    );
};
