"use client";
import { jsxs as _jsxs } from "react/jsx-runtime";
import clsx from "clsx";
import React, { useCallback, useMemo, useRef } from "react";
/**
 * ### Props
 * - `reverse`- Render the input at the top
 * - `compareValues` - Function to compare values. Default is `===`
 * - `unique` - Only allow unique values
 * - `sort` - Sort function for the values
 */
export const InputList = ({ className, renderInput, renderValues, addIcon, style, as, onChange, value, reverse, unique, sort, defaultValue, readOnly, items, defaultInputValue, ...inputProps }) => {
    const findItems = useCallback((values) => {
        const activeSet = new Set(values);
        return items.filter((v) => activeSet.has(v.value));
    }, [items]);
    const [values, setValues] = React.useState(() => {
        return findItems(value || defaultValue || []);
    });
    const Comp = as || "div";
    const [candidate, setCandidate] = React.useState();
    const change = (mutator) => {
        setValues(mutator);
    };
    React.useEffect(() => {
        if (value) {
            setValues(findItems(value));
        }
    }, [value, findItems]);
    const add = (newItem) => {
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
        if (value === undefined)
            setValues(newItems);
        onChange?.({ value: newItems.map((v) => v.value), items: newItems });
        setCandidate(undefined);
    };
    const remove = () => (item, index) => {
        const newItems = values.filter((it, i) => it.value !== item.value && (index === undefined || index === i));
        if (value === undefined)
            setValues(newItems);
        onChange?.({ value: newItems.map(({ value }) => value), items: newItems });
    };
    const changeCandidate = useCallback((neItem) => {
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
        items: sortedValues,
        change,
        remove,
        inputProps: { ...inputProps, defaultValue: undefined },
    });
    const inpEl = !readOnly &&
        renderInput({
            items: sortedValues,
            add,
            candidate: changeCandidate,
            inputProps: { ...inputProps, defaultValue: defaultInputValue },
        });
    return (_jsxs(Comp, { className: clsx("", className), style: style, children: [reverse ? inpEl : valuesEl, reverse ? valuesEl : inpEl] }));
};
