"use client";

import clsx from "clsx";
import React, { useCallback, useMemo, useRef } from "react";
import type { InputLikeProps, InputValueArray, SingleInputValue } from "./types.js";
import type { Choice, StyleProps } from "../../types/index.js";

type InputListInputProps<T extends SingleInputValue = SingleInputValue> = Pick<
    InputLikeProps<T>,
    "readOnly" | "disabled" | "name" | "defaultValue"
>;

export interface InputListItem<D = any> extends Choice<D> {}

interface InputListProps<D = any>
    extends InputLikeProps<InputValueArray, { items: InputListItem<D>[] }>,
        StyleProps {
    items: InputListItem[];
    /**
     * Passed to {@link renderInput} as default value for the input
     */
    defaultInputValue?: any;
    renderInput: (params: {
        /**
         * @param newItem - The value of the new item. Id not provided the current candidate is used
         */
        add: (newItem?: InputListItem<D>) => void;
        /**
         * Sets the given item as the candidate for the next `add`
         */
        candidate: (item: InputListItem<D>) => void;
        items: InputListItem<D>[];
        inputProps: InputListInputProps<SingleInputValue>;
    }) => React.ReactNode;
    renderValues: (params: {
        items: InputListItem<D>[];
        change: (mutator: (items: InputListItem<D>[]) => InputListItem<D>[]) => void;
        remove: (item: InputListItem<D>) => void;
        inputProps: InputListInputProps<SingleInputValue>;
    }) => React.ReactNode;
    addIcon?: React.ReactNode;
    as?: any;
    reverse?: boolean;
    unique?: boolean;
    sort?: (a: InputListItem<D>, b: InputListItem<D>) => number;
}

/**
 * ### Props
 * - `reverse`- Render the input at the top
 * - `compareValues` - Function to compare values. Default is `===`
 * - `unique` - Only allow unique values
 * - `sort` - Sort function for the values
 */
export const InputList = <D = any,>({
    className,
    renderInput,
    renderValues,
    addIcon,
    style,
    as,
    onChange,
    value,
    reverse,
    unique,
    sort,
    defaultValue,
    readOnly,
    items,
    defaultInputValue,
    ...inputProps
}: InputListProps<D>) => {
    const findItems = useCallback(
        (values: any[]) => {
            const activeSet = new Set<any>(values);
            return items.filter((v) => activeSet.has(v.value));
        },
        [items]
    );
    const [values, setValues] = React.useState<InputListItem<D>[]>(() => {
        return findItems(value || defaultValue || []);
    });
    const Comp = as || "div";
    const [candidate, setCandidate] = React.useState<InputListItem<D>>();
    const change = (mutator: (currentValues: InputListItem<D>[]) => InputListItem<D>[]) => {
        setValues(mutator as any);
    };

    React.useEffect(() => {
        if (value) {
            setValues(findItems(value));
        }
    }, [value, findItems]);

    const add = (newItem?: InputListItem<D>) => {
        if (newItem === undefined) {
            if (candidate === undefined) {
                return;
            }
            newItem = candidate;
        }
        let newItems = [...values];
        if (unique) {
            newItems = newItems.filter((item) => item.value !== newItem?.value);
        }
        newItems.push(newItem);
        if (value === undefined) setValues(newItems);
        onChange?.({ value: newItems.map((v) => v.value), items: newItems });
        setCandidate(undefined);
    };

    const remove = () => (item: InputListItem<D>, index?: number) => {
        const newItems = values.filter(
            (it, i) => it.value !== item.value && (index === undefined || index === i)
        );
        if (value === undefined) setValues(newItems);
        onChange?.({ value: newItems.map(({ value }) => value), items: newItems });
    };

    const changeCandidate = useCallback((neItem: InputListItem<D>) => {
        setCandidate(neItem);
    }, []);

    const sorter = useRef(sort);
    const sortedValues = useMemo(() => {
        if (sorter.current) {
            return (values as any[]).sort(sorter.current);
        }
        return values;
    }, [values]);

    React.useEffect(() => {
        sorter.current = sort;
    }, [sort]);

    const valuesEl = renderValues({
        items: sortedValues,
        change,
        remove,
        inputProps: { ...inputProps, defaultValue: undefined },
    });
    const inpEl =
        !readOnly &&
        renderInput({
            items: sortedValues,
            add,
            candidate: changeCandidate,
            inputProps: { ...inputProps, defaultValue: defaultInputValue },
        });

    return (
        <Comp className={clsx("", className)} style={style}>
            {reverse ? inpEl : valuesEl}
            {reverse ? valuesEl : inpEl}
        </Comp>
    );
};
