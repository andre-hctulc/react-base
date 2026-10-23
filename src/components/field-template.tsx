import {
    cloneElement,
    isValidElement,
    useId,
    type ComponentProps,
    type ReactElement,
    type ReactNode,
} from "react";
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from "@/components/ui/field.js";

export interface FieldParams {
    name?: string;
    label?: string;
    id?: string;
    description?: string;
    error?: string;
    defaultValue?: any;
    value?: any;
    readOnly?: boolean;
    disabled?: boolean;
}

interface ComputedFieldParams {
    defaultValue?: any;
    value?: any;
}

export type FieldInputProps = Omit<FieldParams, "label" | "error" | "description">;

export type FieldRenderer = (params: FieldParams & ComputedFieldParams) => ReactNode;

export type FieldTemplateProps<S extends boolean> = (S extends true
    ? Omit<ComponentProps<typeof FieldSet>, "children">
    : Omit<ComponentProps<typeof Field>, "children">) & {
    children: FieldRenderer | ReactElement<FieldInputProps>;
    params: FieldParams;
    /** Render {@link FieldSet} instead of {@link Field} */
    asSet?: S;
};

export function FieldTemplate<S extends boolean>({
    children,
    params,
    asSet,
    ...fieldProps
}: FieldTemplateProps<S>): ReactNode {
    const childProps = isValidElement(children) ? children.props : {};

    const generatedId = useId();
    const id = childProps.id ?? params.id ?? generatedId;

    const name = childProps.name ?? params.name;

    const p: FieldParams & ComputedFieldParams = {
        name,
        id,
        label: params.label ?? name,
        description: params.description,
        error: params.error,
        defaultValue: childProps.defaultValue ?? params.defaultValue,
        value: childProps.value ?? params.value,
        readOnly: childProps.readOnly ?? params.readOnly,
        disabled: childProps.disabled ?? params.disabled,
    };

    const inputProps: FieldInputProps = {
        name: p.name,
        id: p.id,
        defaultValue: p.defaultValue,
        value: p.value,
        readOnly: p.readOnly,
        disabled: p.disabled,
    };
    // remove undefined values from inputProps
    for (const [key, value] of Object.entries(inputProps)) {
        if (value === undefined) {
            delete inputProps[key as keyof FieldInputProps];
        }
    }

    const isHorizontal = !asSet && "orientation" in fieldProps && fieldProps.orientation === "horizontal";

    if (asSet) {
        return (
            <FieldSet {...(fieldProps as ComponentProps<typeof FieldSet>)}>
                {isValidElement(children) ? (
                    <>
                        {p.label && <FieldLegend variant="label">{p.label}</FieldLegend>}
                        {p.description && <FieldDescription>{p.description}</FieldDescription>}
                        {cloneElement(children, inputProps)}
                        {p.error && <FieldError>{p.error}</FieldError>}
                    </>
                ) : (
                    children(p)
                )}
            </FieldSet>
        );
    }

    return (
        <Field {...(fieldProps as ComponentProps<typeof Field>)}>
            {isValidElement(children) ? (
                isHorizontal ? (
                    <>
                        {p.label && <FieldLabel htmlFor={id}>{p.label}</FieldLabel>}
                        <FieldContent>
                            {cloneElement(children, inputProps)}
                            {p.description && <FieldDescription>{p.description}</FieldDescription>}
                            {p.error && <FieldError>{p.error}</FieldError>}
                        </FieldContent>
                    </>
                ) : (
                    <>
                        {p.label && <FieldLabel htmlFor={id}>{p.label}</FieldLabel>}
                        {cloneElement(children, inputProps)}
                        {p.description && <FieldDescription>{p.description}</FieldDescription>}
                        {p.error && <FieldError>{p.error}</FieldError>}
                    </>
                )
            ) : (
                children(p)
            )}
        </Field>
    );
}
