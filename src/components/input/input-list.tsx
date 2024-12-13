"use client";

import clsx from "clsx";
import React from "react";
import type { InputLikeProps } from "./input";
import type { StyleProps } from "../../types";

type InputListInputProps<T> = Omit<InputLikeProps<T>, "onChange" | "value">;

interface InputListProps<T = any> extends InputLikeProps<T[]>, StyleProps {
    renderInput: (
        params: {
            add: (newItem: T) => void;
            values: T[];
        } & InputListInputProps<T>
    ) => React.ReactNode;
    renderValues: (
        params: {
            values: T[];
            change: (mutator: (currentValues: T[]) => T[]) => void;
            remove: (item: T) => void;
        } & InputListInputProps<T[]>
    ) => React.ReactNode;
    /** Passed to `renderInput` as initial state */
    defaultItemValue?: T;
    addIcon?: React.ReactNode;
    as?: any;
}

export const InputList = <T,>({
    className,
    renderInput,
    renderValues,
    addIcon,
    style,
    defaultItemValue,
    as,
    ...inputProps
}: InputListProps<T>) => {
    const [values, setValues] = React.useState(inputProps.defaultValue || []);
    const Comp = as || "div";

    const change = (mutator: (currentValues: T[]) => T[]) => {
        setValues(mutator);
    };

    const add = (newItem: T) => {
        const newValues = [...values, newItem];
        setValues(newValues);
        inputProps.onChange?.({ value: newValues });
    };

    const remove = (item: T) => {
        const newValues = values.filter((v) => v !== item);
        setValues(newValues);
        inputProps.onChange?.({ value: newValues });
    };

    return (
        <Comp className={clsx("", className)} style={style}>
            {renderValues({ values, change, remove, ...inputProps, readOnly: true })}
            {!inputProps.readOnly &&
                renderInput({
                    values,
                    add,
                    ...inputProps,
                    defaultValue: defaultItemValue,
                })}
        </Comp>
    );
};
