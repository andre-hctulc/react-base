"use client";

import clsx from "clsx";
import React from "react";
import type { InputLikeProps } from "./input";
import type { StyleProps } from "../../types";

type InputListInputProps<T> = Omit<InputLikeProps<T>, "onChange" | "value">;

interface InputListProps<T = any> extends InputLikeProps<T[]>, StyleProps {
    renderInput: (params: {
        add: (newItem: T) => void;
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
}

/**
 * ### Props
 * - `reverse`- Render the input at the top
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
    ...inputProps
}: InputListProps<T>) => {
    const [values, setValues] = React.useState(inputProps.defaultValue || []);
    const Comp = as || "div";

    const change = (mutator: (currentValues: T[]) => T[]) => {
        setValues(mutator);
    };

    React.useEffect(() => {
        if (value) {
            setValues(value);
        }
    }, [value]);

    const add = (newItem: T) => {
        const newValues = [...values, newItem];
        setValues(newValues);
        onChange?.({ value: newValues });
    };

    const remove = (item: T) => {
        const newValues = values.filter((v) => v !== item);
        setValues(newValues);
        onChange?.({ value: newValues });
    };

    const valuesEl = renderValues({ values, change, remove, inputProps: inputProps });
    const inpEl = renderInput({
        values,
        add,
        inputProps: { ...inputProps, defaultValue: defaultItemValue },
    });

    return (
        <Comp className={clsx("", className)} style={style}>
            {reverse ? inpEl : valuesEl}
            {reverse ? valuesEl : inpEl}
        </Comp>
    );
};
