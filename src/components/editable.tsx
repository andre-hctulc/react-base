"use client";

import React, { type ReactElement, type ReactNode } from "react";

export interface EditInputProps<T = any> {
    id?: string;
    name?: string;
    defaultValue?: T;
    value?: T;
    onChange?: (params: { value: any }) => void;
    readOnly?: boolean;
    disabled?: boolean;
    required?: boolean;
}

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

export interface EditableProps {
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
export interface EditEffectProps<T> {
    name?: string;
    defaultValue?: T;
    value?: T;
    onChange?: (params: { value: T }) => void;
    disabled?: boolean;
    readOnly?: boolean;
    required?: boolean;
    renderInput: (params: { value: T | undefined }) => ReactElement<EditInputProps<T>>;
    renderValue: (params: { value: T | undefined }) => ReactNode;
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
export const EditEffect = <T,>({
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
