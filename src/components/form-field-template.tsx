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
    FieldDescription,
    FieldError,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from "@/components/ui/field.js";

export interface FormFieldParams {
    name?: string;
    label?: string;
    id?: string;
    description?: string;
    error?: string;
}
export type FormFieldInputProps = Pick<FormFieldParams, "name" | "id">;

type FormFieldRenderer = (params: FormFieldParams) => ReactNode;

type FormFieldTemplateProps<S extends boolean> = (S extends true
    ? Omit<ComponentProps<typeof FieldSet>, "children">
    : Omit<ComponentProps<typeof Field>, "children">) & {
    children: FormFieldRenderer | ReactElement<FormFieldInputProps>;
    params: FormFieldParams;
    /** Render {@link FieldSet} instead of {@link Field} */
    asSet?: S;
    /** @default !asSet */
    injectInputProps?: boolean;
};

export function FormFieldTemplate<S extends boolean>({
    children,
    params,
    asSet,
    injectInputProps,
    ...fieldProps
}: FormFieldTemplateProps<S>): ReactNode {
    const childProps = isValidElement(children) ? children.props : {};

    const generatedId = useId();
    const id = childProps.id ?? params.id ?? generatedId;

    const name = childProps.name ?? params.name ?? id;

    const p: FormFieldParams = {
        name,
        id,
        label: params.label ?? name,
        description: params.description,
        error: params.error,
    };
    const inputProps: FormFieldInputProps = {
        name: p.name,
        id: p.id,
    };

    if (asSet) {
        return (
            <FieldSet {...(fieldProps as ComponentProps<typeof FieldSet>)}>
                {isValidElement(children) ? (
                    <>
                        {p.label && <FieldLegend variant="label">{p.label}</FieldLegend>}
                        {p.description && <FieldDescription>{p.description}</FieldDescription>}
                        {cloneElement(children, { name })}
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
                <>
                    {p.label && <FieldLabel htmlFor={id}>{p.label}</FieldLabel>}
                    {cloneElement(children, injectInputProps === false ? {} : inputProps)}
                    {p.description && <FieldDescription>{p.description}</FieldDescription>}
                    {p.error && <FieldError>{p.error}</FieldError>}
                </>
            ) : (
                children(p)
            )}
        </Field>
    );
}
