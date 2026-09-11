"use client";

import { createFieldSetUtil, type FieldSetParams } from "@dre44/form-data-parser";
import { createContext, useContext, useMemo, type ComponentProps, type FC, type ReactNode } from "react";
import { FieldTemplate, type FieldParams } from "./field-template.js";

type FormUtil = ReturnType<typeof createFieldSetUtil>;

type FormOptions = Omit<FieldSetParams, "fieldName" | "formValues" | "defaultFormValues">;

export interface FormContext<V extends object = Record<string, unknown>> extends FormUtil {
    defaultFormValues: V | undefined;
    formValues: V | undefined;
    options: FormOptions;
}

const FormContextValue = createContext<FormContext | undefined>(undefined);

export function useFormContext() {
    const context = useContext(FormContextValue);
    if (!context) {
        throw new Error("useFormContext must be used within a FormContextProvider");
    }
    return context;
}

type ContextInput<V extends object = Record<string, unknown>> = Partial<
    Pick<FormContext<V>, "defaultFormValues" | "formValues">
>;

interface FormContextProviderProps<V extends object = Record<string, unknown>> extends ContextInput<V> {
    children?: ReactNode;
    options?: FormOptions;
}

export function FormContextProvider<V extends object = Record<string, unknown>>({
    children,
    options,
    formValues,
    defaultFormValues,
}: FormContextProviderProps<V>) {
    const util = createFieldSetUtil({ ...options, defaultFormValues, formValues });
    const context: FormContext<any> = { ...util, formValues, defaultFormValues, options: options ?? {} };
    return <FormContextValue.Provider value={context}>{children}</FormContextValue.Provider>;
}

export interface FieldInfo {
    params: FieldParams;
    isIncluded: boolean;
}

export function useField(fieldName?: string): FieldInfo {
    const { getFieldDefaultValue, getFieldName, getFieldValue, isFieldIncluded } = useFormContext();
    const info = useMemo<FieldInfo>(() => {
        return {
            params: {
                name: getFieldName(fieldName),
                value: getFieldValue(fieldName),
                defaultValue: getFieldDefaultValue(fieldName),
            },
            isIncluded: isFieldIncluded(fieldName),
        };
    }, [fieldName]);
    return info;
}

type FieldTemplateCtxProps = ComponentProps<typeof FieldTemplate<false>> & {};

export const FieldTemplateCtx: FC<FieldTemplateCtxProps> = ({ params, ...props }) => {
    const { params: ctxParams, isIncluded } = useField(params.name);

    if (!isIncluded) {
        return null;
    }

    const mergedParams = { ...ctxParams };
    for (const [pName, pValue] of Object.entries(params)) {
        if (pValue !== undefined) mergedParams[pName as keyof FieldParams] = pValue;
    }

    return <FieldTemplate {...props} params={mergedParams} />;
};
