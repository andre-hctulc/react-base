import { Button } from "@/components/ui/button.js";
import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet,
} from "@/components/ui/field.js";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.js";
import { cn } from "@/lib/utils.js";
import { useId, useRef, type ComponentProps, type FC, type SubmitEvent } from "react";
import { Input } from "@/components/ui/input.js";
import { Textarea } from "@/components/ui/textarea.js";

interface FieldFilterFormData {
    equals?: string;
    gt?: string;
    lt?: string;
    gte?: string;
    lte?: string;
    startsWith?: string;
    endsWith?: string;
    regex?: string;
    includes?: string;
}

export type FieldFilterValueType =
    | "infer"
    | "string"
    | "int"
    | "float"
    | "date"
    | "boolean"
    | "object"
    | "string-list"
    | "float-list"
    | "int-list"
    | "date-list"
    | "boolean-list"
    | "object-list"
    | "array";

function normalizeType(type: FieldFilterValueType, value: unknown): FieldFilterValueType {
    if (type !== "infer") {
        return type;
    }

    if (Array.isArray(value)) {
        if (value.every((v) => typeof v === "string")) {
            return "string-list";
        }
        if (value.every((v) => typeof v === "number")) {
            return "float-list";
        }
        if (value.every((v) => typeof v === "bigint")) {
            return "int-list";
        }
        if (value.every((v) => v instanceof Date)) {
            return "date-list";
        }
        if (value.every((v) => typeof v === "boolean")) {
            return "boolean-list";
        }
        if (value.every((v) => typeof v === "object")) {
            return "object-list";
        }
        return "array";
    }

    const t = typeof value;
    if (t === "symbol" || t === "object" || t === "undefined") {
        return "string";
    }
    if (t === "function") {
        return "string";
    }
    if (t === "bigint" || t === "number") {
        return "float";
    }
    return t;
}

function getInputComponent(
    type: FieldFilterValueType,
    long?: boolean,
): [component: FC<any>, inputType?: string] {
    const t = normalizeType(type, undefined);
    if (t === "object" || t.endsWith("-list") || t === "array") {
        return [Textarea];
    }
    if (t === "string") {
        if (long) {
            return [Textarea];
        }
        return [Input, "text"];
    }
    if (t === "int" || t === "float" || t === "date" || t === "boolean") {
        return [Input, "number"];
    }
    return [Input, "text"];
}

interface RenderConditions {
    isIn?: FieldFilterValueType[];
    isNotIn?: FieldFilterValueType[];
    isList?: boolean;
    isNotList?: boolean;
}

function shouldRender(type: FieldFilterValueType, conditions: RenderConditions): boolean {
    if (conditions.isIn && !conditions.isIn.includes(type)) {
        return false;
    }
    if (conditions.isNotIn && conditions.isNotIn.includes(type)) {
        return false;
    }
    if (conditions.isList && !type.endsWith("-list") && type !== "array") {
        return false;
    }
    if (conditions.isNotList && (type.endsWith("-list") || type === "array")) {
        return false;
    }
    return true;
}

interface FieldFilterProps extends ComponentProps<"div"> {
    label: string;
    type: FieldFilterValueType;
    value?: unknown;
    placeholder?: string;
    showTypeSelector?: boolean;
    onFilterChange?: (fieldFilter: FieldFilterFormData) => void;
    onTypeChange?: (nextType: string) => void;
    onValueChange?: (nextValue: string) => void;
    /** Render text areas instead of input */
    long?: boolean;
}

export const FieldFilter: FC<FieldFilterProps> = ({
    label,
    type,
    value,
    placeholder,
    showTypeSelector,
    onFilterChange,
    onTypeChange,
    onValueChange,
    className,
    long,
    ...props
}) => {
    const formId = useId();
    const formRef = useRef<HTMLFormElement>(null);
    const t = normalizeType(type, value);
    const [Inp, inputType] = getInputComponent(t, long);
    const inpProps = { ...(inputType ? { type: inputType } : {}) };

    const inputPlaceholder = placeholder ?? (showTypeSelector ? "Value" : "Filter");

    function handleSubmit(ev: SubmitEvent<HTMLFormElement>) {
        ev.preventDefault();

        const data = new FormData(ev.currentTarget);
        const filterData: FieldFilterFormData = {};
        for (const [key, value] of data.entries()) {
            (filterData as any)[key] = value;
        }
        
        onFilterChange?.(filterData);
    }

    function handleOpenChange(open: boolean) {
        if (open) {
            formRef.current?.submit();
        }
    }

    const renderFieldCondition = (
        fieldName: keyof FieldFilterFormData,
        label: string,
        conditions: RenderConditions,
    ) => {
        if (!shouldRender(t, conditions)) {
            return null;
        }

        return (
            <Field key={fieldName}>
                <FieldLabel htmlFor={`${formId}-${String(fieldName)}`}>{label}</FieldLabel>
                <Inp
                    id={`${formId}-${String(fieldName)}`}
                    name={String(fieldName)}
                    placeholder={inputPlaceholder}
                    onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                        onValueChange?.(event.target.value)
                    }
                    {...inpProps}
                />
            </Field>
        );
    };

    return (
        <div className={cn("grid min-w-48 flex-1 gap-1.5 text-sm font-medium", className)} {...props}>
            <Popover onOpenChange={handleOpenChange}>
                <PopoverTrigger asChild>
                    <Button type="button" variant="outline" size="sm">
                        {label}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-4" align="start">
                    <form onSubmit={handleSubmit} ref={formRef}>
                        <FieldSet>
                            <FieldLegend>{label ?? "Filter"}</FieldLegend>
                            <FieldDescription>
                                Set the matching rule and value for this column.
                            </FieldDescription>
                            <FieldGroup>
                                {renderFieldCondition("equals", "Equals", {
                                    isIn: ["string", "float", "int", "date", "boolean"],
                                })}
                                {renderFieldCondition("gt", "Greater than", {
                                    isIn: ["float", "int", "date"],
                                })}
                                {renderFieldCondition("lt", "Less than", {
                                    isIn: ["float", "int", "date"],
                                })}
                                {renderFieldCondition("gte", "Greater than or equal", {
                                    isIn: ["float", "int", "date"],
                                })}
                                {renderFieldCondition("lte", "Less than or equal", {
                                    isIn: ["float", "int", "date"],
                                })}
                                {renderFieldCondition("startsWith", "Starts with", {
                                    isIn: ["string"],
                                })}
                                {renderFieldCondition("endsWith", "Ends with", {
                                    isIn: ["string"],
                                })}
                                {renderFieldCondition("includes", "Includes", {
                                    isIn: ["string"],
                                })}
                                {renderFieldCondition("regex", "Matches regex", {
                                    isIn: ["string"],
                                })}
                            </FieldGroup>
                        </FieldSet>
                    </form>
                </PopoverContent>
            </Popover>
        </div>
    );
};
