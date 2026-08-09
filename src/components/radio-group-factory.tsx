import type { ComponentProps, FC } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group.js";
import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from "@/components/ui/field.js";

export interface RadioGroupOption {
    title: string;
    value: string;
    name?: string;
    id?: string;
    description?: string;
    disabled?: boolean;
}

interface RadioGroupFactoryProps extends ComponentProps<typeof RadioGroup> {
    options: RadioGroupOption[];
    /**
     * Render choice cards instead of plain options
     */
    cards?: boolean;
    readOnly?: boolean;
}

export const RadioGroupFactory: FC<RadioGroupFactoryProps> = ({
    options,
    cards,
    readOnly,
    onValueChange,
    ...props
}) => {
    const radioGroupProps: ComponentProps<typeof RadioGroup> = {
        ...props,
        "aria-readonly": readOnly || undefined,
        onValueChange: readOnly ? undefined : onValueChange,
    };

    if (cards) {
        return (
            <RadioGroup {...radioGroupProps}>
                {options.map((option) => {
                    const id = option.id || option.value;
                    return (
                        <FieldLabel key={option.value} htmlFor={id}>
                            <Field orientation="horizontal">
                                <FieldContent>
                                    <FieldTitle>{option.title}</FieldTitle>
                                    {option.description && (
                                        <FieldDescription>{option.description}</FieldDescription>
                                    )}
                                </FieldContent>
                                <RadioGroupItem
                                    value={option.value}
                                    id={id}
                                    disabled={readOnly || option.disabled}
                                />
                            </Field>
                        </FieldLabel>
                    );
                })}
            </RadioGroup>
        );
    }

    return (
        <RadioGroup {...radioGroupProps}>
            {options.map((option) => {
                const id = option.id || option.value;
                return (
                    <Field key={option.value} orientation="horizontal">
                        <RadioGroupItem value={option.value} id={id} disabled={readOnly || option.disabled} />
                        <FieldContent>
                            <FieldLabel htmlFor={id}>{option.title}</FieldLabel>
                            {option.description && <FieldDescription>{option.description}</FieldDescription>}
                        </FieldContent>
                    </Field>
                );
            })}
        </RadioGroup>
    );
};
