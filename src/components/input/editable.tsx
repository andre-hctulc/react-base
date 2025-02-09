"use client";

import React from "react";
import type { InputLikeProps, InputValue } from "./types";

interface EditableContext {
    editMode: boolean;
}

const EditableContext = React.createContext<EditableContext>({
    editMode: false,
});

export function useEditMode(): boolean {
    const { editMode } = React.useContext(EditableContext);
    return editMode;
}

interface EditableProps {
    children?: React.ReactNode;
    editMode: boolean;
}

export const Editable: React.FC<EditableProps> = ({ children, editMode }) => {
    return <EditableContext.Provider value={{ editMode }}>{children}</EditableContext.Provider>;
};

/**
 * @template I Input props (edit mode enabled)
 * @template D Display props (edit mode disabled)
 */
export interface EditEffectProps<T extends InputValue> extends InputLikeProps<T> {
    renderInput: (params: { value: T | undefined }) => React.ReactElement<InputLikeProps<T>>;
    renderValue: (params: { value: T | undefined }) => React.ReactNode;
    /**
     * @default useEditMode()
     */
    editMode?: boolean;
}

/**
 * A helper component that switches between edit and display mode by consuming the {@link Editable} context.
 *
 * The edit mode can also be handled manually with `useEditMode`.
 */
export const EditEffect = <T extends InputValue>({
    renderInput,
    renderValue,
    editMode,
    defaultValue,
    onChange,
    ...inputProps
}: EditEffectProps<T>) => {
    const [value, setValue] = React.useState(defaultValue);
    const defaultEditMode = useEditMode();
    const edit = editMode ?? defaultEditMode;

    if (!edit) {
        return renderValue({ value });
    }

    const inp = renderInput({ value });

    return React.cloneElement(inp, {
        ...inputProps,
        value,
        onChange: (e: any) => {
            setValue(value);
            if (inp.props.onChange) inp.props.onChange(e);
            if (onChange) onChange(e);
        },
    });
};
