"use client";

import {
    cloneElement,
    isValidElement,
    useId,
    type ComponentProps,
    type CSSProperties,
    type FC,
    type ReactElement,
    type ReactNode,
    type Ref,
} from "react";
import { Field, FieldDescription, FieldError, FieldLabel, FieldTitle } from "@/components/ui/field.js";

export type FormControlProps = {
    ref?: Ref<HTMLDivElement>;
    className?: string;
    style?: CSSProperties;
    /**
     * Default value of the input
     */
    name?: string;
    children: ReactNode;
    controlled?: boolean;
    label?: string;
    labelProps?: Partial<ComponentProps<typeof FieldLabel>>;
    errorText?: string;
    helperText?: string;
    helperTextProps?: Partial<ComponentProps<typeof FieldDescription>>;
    errorTextProps?: Partial<ComponentProps<typeof FieldError>>;
    labelWidth?: string | number;
    /**
     * Set to true, to prevent any error message from showing
     */
    noError?: boolean;
    /**
     * Indicates that the label is not labeling a valid input element (e.g. in combination with hidden inputs).
     *
     * In this case a span is used instead of a label element.
     */
    mimic?: boolean;
    horizontal?: boolean;
    requiredHint?: boolean;
    title?: string;
};

/**
 * Wraps an input element with a label, error message and helper text.
 *
 * Consumes {@link JSFormContext}, to handle {@link JSForm} default value state.
 */
export const FormControl: FC<FormControlProps> = (props) => {
    const {
        noError,
        children,
        errorText,
        controlled,
        mimic,
        ref,
        name,
        label,
        helperText,
        helperTextProps,
        errorTextProps,
        requiredHint,
        labelProps,
        labelWidth,
        horizontal,
        title,
        ...rootProps
    } = props;

    const formCtx: any = {};
    const _name = name !== undefined ? `${formCtx?.namesPrefix ?? ""}${name}` : undefined;
    const hasName = _name !== undefined;
    const isErr = !noError && hasName && formCtx?.inputs[_name]?.ok === false;
    const errText = isErr && formCtx.reporting ? (errorText ?? (formCtx?.inputs[_name]?.error || "")) : "";
    const _controlled = controlled ?? formCtx?.controlled;
    const id = useId();
    const childElement: ReactElement<any> | null = isValidElement(children) ? children : null;

    const inpProps: any = {};

    if (childElement) {
        if (!mimic) inpProps.id = id;
        if (hasName) inpProps.name = _name;

        if (formCtx && _name) {
            if (_controlled) {
                const controlledValue = formCtx.value(_name);
                if (controlledValue !== undefined && childElement?.props.value === undefined) {
                    inpProps.value = controlledValue;
                }
            } else {
                const defaultValue = formCtx.default(_name);
                if (defaultValue !== undefined && childElement?.props.defaultValue === undefined) {
                    inpProps.defaultValue = defaultValue;
                }
            }
        }
    }

    const inp = childElement ? cloneElement(childElement, inpProps) : children;
    const labelStyle = labelWidth !== undefined ? { width: labelWidth } : undefined;
    const labelContent = (
        <>
            {label}
            {requiredHint && " *"}
        </>
    );

    return (
        <Field
            ref={ref}
            orientation={horizontal ? "horizontal" : "vertical"}
            data-invalid={isErr || undefined}
            {...rootProps}
        >
            {title && <FieldTitle>{title}</FieldTitle>}
            {label &&
                (mimic ? (
                    <FieldLabel asChild {...labelProps} style={labelStyle}>
                        <span>{labelContent}</span>
                    </FieldLabel>
                ) : (
                    <FieldLabel htmlFor={id} {...labelProps} style={labelStyle}>
                        {labelContent}
                    </FieldLabel>
                ))}
            {inp}
            {helperText && <FieldDescription {...helperTextProps}>{helperText}</FieldDescription>}
            {errText && <FieldError {...errorTextProps}>{errText}</FieldError>}
        </Field>
    );
};
