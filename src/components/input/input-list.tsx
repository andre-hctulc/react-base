import clsx from "clsx";
import React from "react";
import { Menu, MenuItem } from "../containers";
import { IconButton } from "./button";
import type { InputLikeProps } from "./input";

interface InputListProps<T = any> extends InputLikeProps<T[]> {
    className?: string;
    renderInput: (params: {
        change: (value: T, previousValue: T) => void;
        initialValue: T;
        del: (value: T) => void;
    }) => React.ReactNode;
    renderValues: ((values: T[]) => React.ReactNode) | { menuItems: (value: T) => MenuItem };
    /** Passed to `renderInput` as initial state */
    suggestedValue?: T;
    checkInput?: (value: T) => boolean;
    /**
     * Default is strict equality
     */
    compareValues?: (a: T, b: T) => boolean;
    addIcon?: React.ReactNode;
}

export const InputList: React.FC<InputListProps> = ({
    className,
    renderInput,
    renderValues,
    addIcon,
    ...props
}) => {
    const [values, setValues] = React.useState(props.defaultValue || []);
    const [inputOk, setInputOk] = React.useState(true);
    const [input, setInput] = React.useState<any>(props.suggestedValue);
    const compare = props.compareValues || ((a, b) => a === b);

    function handleInputChange(value: any) {
        const ok = props.checkInput ? props.checkInput(value) : true;
        setInputOk(ok);
        setInput(value);
    }

    function handleDelete(value: any) {
        setValues(values.filter((v) => compare(v, value)));
    }

    function handleAdd() {
        const newValues = [...values, input];
        setValues(newValues);
        props.onChange?.(newValues);
    }

    return (
        <div className={clsx("space-y-2", className)}>
            {"menuItems" in renderValues ? (
                <Menu items={values.map((val) => renderValues.menuItems(val))} />
            ) : (
                renderValues(values)
            )}
            <div className="flex">
                <div className="flex-grow">
                    {renderInput({
                        change: handleInputChange,
                        initialValue: props.suggestedValue,
                        del: handleDelete,
                    })}
                </div>
                <IconButton disabled={!inputOk} className="float-end ml-2" onClick={() => handleAdd()}>
                    {addIcon || "+"}
                </IconButton>
            </div>
        </div>
    );
};
