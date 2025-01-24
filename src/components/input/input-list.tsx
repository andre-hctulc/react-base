"use client";

import clsx from "clsx";
import React, { useCallback, useMemo, useRef } from "react";
import type { InputLikeProps } from "./input";
import type { StyleProps } from "../../types";

type InputListInputProps<T> = Pick<InputLikeProps<T>, "readOnly" | "disabled" | "name" | "defaultValue">;

interface InputListProps<T = any> extends InputLikeProps<T[]>, StyleProps {
    renderInput: (params: {
        /**
         * @param newItem - The value of the new item. Id not provided the current candidate is used
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
        change: (mutator: (currentValues: T[]) => T[]) => void;
        remove: (item: T) => void;
        inputProps: InputListInputProps<T[]>;
    }) => React.ReactNode;
    /** Passed to `renderInput` as initial state */
    defaultItemValue?: T;
    addIcon?: React.ReactNode;
    as?: any;
    reverse?: boolean;
    compareValues?: (a: T, b: T) => boolean;
    unique?: boolean;
    sort?: (a: T, b: T) => number;
}

/**
 * ### Props
 * - `reverse`- Render the input at the top
 * - `compareValues` - Function to compare values. Default is `===`
 * - `unique` - Only allow unique values
 * - `sort` - Sort function for the values
 */
export const InputList = <T,>({
    className,
    renderInput,
    renderValues,
    addIcon,
    style,
    defaultItemValue,
    as,
    onChange,
    value,
    reverse,
    compareValues,
    unique,
    sort,
    defaultValue,
    readOnly,
    ...inputProps
}: InputListProps<T>) => {
    const [values, setValues] = React.useState(() => value || defaultValue || []);
    const Comp = as || "div";
    const [candidate, setCandidate] = React.useState<T>();
    const compare = compareValues || ((a: T, b: T) => a === b);
    const change = (mutator: (currentValues: T[]) => T[]) => {
        setValues(mutator);
    };

    React.useEffect(() => {
        if (value) {
            setValues(value);
        }
    }, [value]);

    const add = (newItem?: T) => {
        if (newItem === undefined) {
            if (candidate === undefined) {
                return;
            }
            newItem = candidate;
        }
        let newValues = [...values];
        if (unique) {
            newValues = newValues.filter((v) => !compare(v, newItem!));
        }
        newValues.push(newItem);
        if (value === undefined) setValues(newValues);
        onChange?.({ value: newValues });
        setCandidate(undefined);
    };

    const remove = () => (item: T, index?: number) => {
        const newValues = values.filter((v, i) => !compare(v, item) && (index === undefined || index === i));
        if (value === undefined) setValues(newValues);
        onChange?.({ value: newValues });
    };

    const changeCandidate = useCallback((neItem: T) => {
        setCandidate(neItem);
    }, []);

    const sorter = useRef(sort);
    const sortedValues = useMemo(() => {
        if (sorter.current) {
            return values.sort(sorter.current);
        }
        return values;
    }, [values]);

    React.useEffect(() => {
        sorter.current = sort;
    }, [sort]);

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
            inputProps: { ...inputProps, defaultValue: defaultItemValue },
        });

    return (
        <Comp className={clsx("", className)} style={style}>
            {reverse ? inpEl : valuesEl}
            {reverse ? valuesEl : inpEl}
        </Comp>
    );
};
