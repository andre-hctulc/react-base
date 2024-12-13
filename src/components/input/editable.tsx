"use client";

import React from "react";
import { Input, type InputLikeProps } from "./input";
import type { PropsOf, StyleProps } from "../../types";
import { Typography } from "../text";
import { Switch } from "./switch";
import { Checkbox } from "./checkbox";
import { Select, type SelectOption } from "./select";
import clsx from "clsx";
import { Textarea } from "./textarea";
import { InputList } from "./input-list";
import { JSONInput } from "./json-input";

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
export interface EditEffectProps<T> extends InputLikeProps<T> {
    renderInput: (params: { value: T | undefined }) => React.ReactElement<InputLikeProps<T>>;
    renderValue: (params: { value: T | undefined }) => React.ReactNode;
    /**
     * @default
     * useEditMode()
     */
    editMode?: boolean;
}

/**
 * A helper component that switches between edit and display mode.
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
        ...inp.props,
        value,
        onChange: (e: any) => {
            setValue(value);
            if (inp.props.onChange) inp.props.onChange(e);
            if (onChange) onChange(e);
        },
    });
};

interface DefaultEditProps<T, I, P>
    extends StyleProps,
        Omit<EditEffectProps<T>, "renderInput" | "renderValue"> {
    inputProps?: Partial<I>;
    displayProps?: Partial<P>;
    renderDisplay?: (params: { value: T | undefined }) => React.ReactNode;
}

interface InputEditProps extends DefaultEditProps<string | number, PropsOf<typeof Input>, PropsOf<"p">> {}

export const InputEdit: React.FC<InputEditProps> = ({
    inputProps,
    displayProps,
    className,
    style,
    ...editProps
}) => {
    return (
        <EditEffect<string | number>
            renderInput={({}) => (
                <Input
                    {...inputProps}
                    className={clsx(className, inputProps?.className as any)}
                    style={{ ...style, ...inputProps?.style }}
                />
            )}
            renderValue={({ value }) => (
                <Typography
                    variant="secondary"
                    {...displayProps}
                    className={clsx(className, displayProps?.className)}
                    style={{ ...style, ...displayProps?.style }}
                >
                    {value}
                </Typography>
            )}
            {...editProps}
        />
    );
};

interface SwitchEditProps extends DefaultEditProps<boolean, PropsOf<typeof Switch>, PropsOf<"p">> {}

export const SwitchEdit: React.FC<SwitchEditProps> = ({
    inputProps,
    displayProps,
    className,
    style,
    ...editProps
}) => {
    return (
        <EditEffect
            renderInput={({}) => (
                <Switch
                    {...inputProps}
                    className={clsx(className, inputProps?.className as any)}
                    style={{ ...style, ...inputProps?.style }}
                />
            )}
            renderValue={({ value }) => (
                <Typography
                    variant="secondary"
                    {...displayProps}
                    className={clsx(className, displayProps?.className)}
                    style={{ ...style, ...displayProps?.style }}
                >
                    {value ? "Yes" : "No"}
                </Typography>
            )}
            {...editProps}
        />
    );
};

interface CheckboxEditProps extends DefaultEditProps<boolean, PropsOf<typeof Checkbox>, PropsOf<"p">> {}

export const CheckboxEdit = ({
    inputProps,
    displayProps,
    className,
    style,
    ...editProps
}: CheckboxEditProps) => {
    return (
        <EditEffect
            renderInput={({}) => (
                <Checkbox
                    {...inputProps}
                    className={clsx(className, inputProps?.className as any)}
                    style={{ ...style, ...inputProps?.style }}
                />
            )}
            renderValue={({ value }) => (
                <Typography
                    variant="secondary"
                    {...displayProps}
                    className={clsx(className, displayProps?.className)}
                    style={{ ...style, ...displayProps?.style }}
                >
                    {value ? "Yes" : "No"}
                </Typography>
            )}
            {...editProps}
        />
    );
};

interface SelectEditProps<T>
    extends DefaultEditProps<SelectOption<T>, PropsOf<typeof Select<T>>, PropsOf<"p">> {
    options: SelectOption<T>[];
}

export const SelectEdit = <T,>({
    inputProps,
    displayProps,
    defaultValue,
    className,
    style,
    options,
    editMode,
}: SelectEditProps<T>) => {
    return (
        <EditEffect<SelectOption<T>>
            editMode={editMode}
            defaultValue={defaultValue}
            renderInput={({ value }) => (
                <Select<T>
                    {...inputProps}
                    className={clsx(className, inputProps?.className as any)}
                    style={{ ...style, ...inputProps?.style }}
                    options={options}
                />
            )}
            renderValue={({ value }) => (
                <Typography
                    variant="secondary"
                    {...displayProps}
                    className={clsx(className, displayProps?.className)}
                    style={{ ...style, ...displayProps?.style }}
                >
                    {value?.label ?? <i>None</i>}
                </Typography>
            )}
        />
    );
};

interface TextareaEditProps extends DefaultEditProps<string, PropsOf<typeof Textarea>, PropsOf<"p">> {}

export const TextareaEdit = ({
    inputProps,
    displayProps,
    defaultValue,
    className,
    style,
    editMode,
}: TextareaEditProps) => {
    return (
        <EditEffect<string>
            editMode={editMode}
            defaultValue={defaultValue}
            renderInput={({}) => (
                <Textarea
                    {...inputProps}
                    className={clsx(className, inputProps?.className as any)}
                    style={{ ...style, ...inputProps?.style }}
                />
            )}
            renderValue={({ value }) => (
                <Typography
                    variant="secondary"
                    {...displayProps}
                    className={clsx(className, displayProps?.className)}
                    style={{ ...style, ...displayProps?.style }}
                >
                    {value ? value : <i>None</i>}
                </Typography>
            )}
        />
    );
};

interface JSONInputEditProps extends DefaultEditProps<string, PropsOf<typeof JSONInput>, PropsOf<"p">> {
    jsonObject?: any;
}

export const JSONInputEdit = ({
    inputProps,
    displayProps,
    defaultValue,
    className,
    style,
    editMode,
    jsonObject,
}: JSONInputEditProps) => {
    const defaultJSON = React.useMemo(() => {
        if (defaultValue !== undefined) return defaultValue;
        if (jsonObject !== undefined) return JSON.stringify(jsonObject, null, 2);
        return undefined;
    }, [jsonObject, defaultValue]);

    return (
        <EditEffect<string>
            editMode={editMode}
            defaultValue={defaultJSON}
            renderInput={({}) => (
                <JSONInput
                    {...inputProps}
                    className={clsx(className, inputProps?.className as any)}
                    style={{ ...style, ...inputProps?.style }}
                />
            )}
            renderValue={({ value }) => (
                <Typography
                    variant="secondary"
                    {...displayProps}
                    className={clsx(className, displayProps?.className)}
                    style={{ ...style, ...displayProps?.style }}
                >
                    {value ? value : <i>None</i>}
                </Typography>
            )}
        />
    );
};

interface InputListEdit<T> extends DefaultEditProps<T[], PropsOf<typeof InputList<T>>, any> {
    renderValues: PropsOf<typeof InputList<T>>["renderValues"];
    renderInput: PropsOf<typeof InputList<T>>["renderInput"];
}

export const InputListEdit = <T,>({
    inputProps,
    displayProps,
    className,
    style,
    renderInput,
    renderValues,
    ...editProps
}: InputListEdit<T>) => {
    return (
        <EditEffect<T[]>
            renderInput={({}) => (
                <InputList<T>
                    renderValues={renderValues}
                    renderInput={renderInput}
                    {...inputProps}
                    className={clsx(className, inputProps?.className as any)}
                    style={{ ...style, ...inputProps?.style }}
                />
            )}
            renderValue={({ value }) =>
                renderValues({ values: value || [], change: () => {}, remove: () => {}, readOnly: true })
            }
            {...editProps}
        />
    );
};
