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

export interface FieldParams {
    name?: string;
    label?: string;
    id?: string;
    description?: string;
    error?: string;
}
export type FieldInputProps = Pick<FieldParams, "name" | "id">;

type FieldRenderer = (params: FieldParams) => ReactNode;

export type FieldTemplateProps<S extends boolean> = (S extends true
    ? Omit<ComponentProps<typeof FieldSet>, "children">
    : Omit<ComponentProps<typeof Field>, "children">) & {
    children: FieldRenderer | ReactElement<FieldInputProps>;
    params: FieldParams;
    /** Render {@link FieldSet} instead of {@link Field} */
    asSet?: S;
    /** @default !asSet */
    injectInputProps?: boolean;
};

export function FieldTemplate<S extends boolean>({
    children,
    params,
    asSet,
    injectInputProps,
    ...fieldProps
}: FieldTemplateProps<S>): ReactNode {
    const childProps = isValidElement(children) ? children.props : {};

    const generatedId = useId();
    const id = childProps.id ?? params.id ?? generatedId;

    const name = childProps.name ?? params.name ?? id;

    const p: FieldParams = {
        name,
        id,
        label: params.label ?? name,
        description: params.description,
        error: params.error,
    };
    const inputProps: FieldInputProps = {
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
