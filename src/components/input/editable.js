"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
const EditableContext = React.createContext({
    editMode: false,
});
export function useEditMode() {
    const { editMode } = React.useContext(EditableContext);
    return editMode;
}
export const Editable = ({ children, editMode }) => {
    return _jsx(EditableContext.Provider, { value: { editMode }, children: children });
};
/**
 * A helper component that switches between edit and display mode by consuming the {@link Editable} context.
 *
 * The edit mode can also be handled manually with `useEditMode`.
 */
export const EditEffect = ({ renderInput, renderValue, editMode, defaultValue, onChange, ...inputProps }) => {
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
        onChange: (e) => {
            setValue(value);
            if (inp.props.onChange)
                inp.props.onChange(e);
            if (onChange)
                onChange(e);
        },
    });
};
