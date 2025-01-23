"use client";

import { tv, type ClassValue, type VariantProps } from "tailwind-variants";
import type { PropsOf } from "../../types";
import { ErrorText } from "../text";
import { setProperty } from "dot-prop";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

export interface InputState {
    ok: boolean;
    error: string;
    value: any;
}

export type JSFormValidateData<T extends object> = Pick<JSFormSnapshot<T>, "formData" | "values">;

export interface JSFormSnapshot<T extends object = any> {
    /**
     * FormData object of the form
     */
    formData: FormData;
    /**
     * Values of the form
     */
    values: T;
    /**
     * Maps input names to the input states
     */
    inputs: Record<string, InputState>;
    /**
     * Whether the form is valid
     */
    ok: boolean;
    /**
     * Reference to the form element
     */
    form: HTMLFormElement | null;
    /**
     * Reason for the form being invalid
     */
    invalidReason: { form: boolean; validate: boolean } | null;
    /**
     * Whether the form is currently reporting errors
     */
    reporting: boolean;
}

export interface JSFormChange<T extends object = any> extends JSFormSnapshot<T> {
    changedField: { name: string; newValue: any };
}

interface JSFormContext<T extends object = any> extends JSFormSnapshot<T> {
    reset: () => void;
}

const JSFormContext = createContext<JSFormContext | null>(null);

export function useJSForm<T extends object = any>(): JSFormContext<T> | null {
    const ctx = useContext(JSFormContext);
    if (!ctx) return null;
    return ctx;
}

/**
 * Maps input names to their validation result
 */
type FormErrors = Record<string, string | boolean>;

function getAllFormElements(
    form: HTMLFormElement
): (HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement)[] {
    return Array.from(form.elements).filter((element) =>
        ["INPUT", "TEXTAREA", "SELECT"].includes(element.tagName)
    ) as (HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement)[];
}

function checkValidity(el: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement) {
    // InputLike.checkValidity() always returns true for **hidden inputs**,
    // so we implement a custom check for them
    if (el.type === "hidden") {
        if (el.required && !el.value) return false;
        if (
            (el as HTMLInputElement).pattern &&
            el.value &&
            !new RegExp((el as HTMLInputElement).pattern).test(el.value)
        )
            return false;
        // @ts-ignore
        if (el.minLength !== undefined && el.minLength > 0 && el.value.length < el.minLength) return false;
        // @ts-ignore
        if (el.maxLength !== undefined && el.maxLength > 0 && el.value.length > el.maxLength) return false;
        if ((el as HTMLInputElement).min && parseFloat(el.value) < parseFloat((el as HTMLInputElement).min))
            return false;
        if ((el as HTMLInputElement).max && parseFloat(el.value) > parseFloat((el as HTMLInputElement).max))
            return false;
        return true;
    }

    // For other input types, we can use the built-in checkValidity()
    return el.checkValidity();
}

function formDataToObject(formData: FormData) {
    const obj: Record<string, any> = {};

    for (const [key, value] of formData.entries()) {
        setProperty(obj, key, value);
    }

    return obj;
}

const jsForm = tv({
    variants: {
        flex: {
            row: "flex flex-row",
            col: "flex flex-col",
            wrap: "flex flex-wrap",
        },
        gap: {
            sm: "gap-2",
            md: "gap-3.5",
            lg: "gap-6",
            none: "",
        },
    },
});

interface JSFormProps<T extends object = any> extends VariantProps<typeof jsForm> {
    id?: string;
    children?: React.ReactNode;
    onSubmit?: (snapshot: JSFormSnapshot<T>) => void;
    onChange?: (snapshot: JSFormChange<T> & { changedField: { name: string; newValue: any } }) => void;
    onInvalid?: (snapshot: JSFormSnapshot<T>) => void;
    validate?: (data: JSFormValidateData<T>) => FormErrors | boolean | undefined | void;
    className?: ClassValue;
    /**
     * Form target attribute
     */
    target?: string;
    /**
     * Whether to show validation errors on change
     * @default "on_submit"
     */
    reportStrategy?: "on_submit" | "on_change";
    defaultState?: Partial<JSFormSnapshot<T>>;
    onInit?: (snapshot: JSFormSnapshot<T>) => void;
}

/**
 * Input names are interpreted as dot prop paths
 */
export const JSForm = <T extends object = any>({
    children,
    onSubmit,
    className,
    onInvalid,
    target,
    validate,
    id,
    defaultState,
    onChange,
    flex,
    gap,
    reportStrategy,
    onInit,
}: JSFormProps<T>) => {
    const form = useRef<HTMLFormElement>(null);
    const [snapshot, setSnapshot] = useState<JSFormSnapshot<T>>(() => {
        return {
            ok: true,
            form: null,
            formData: new FormData(),
            values: {} as T,
            inputs: {},
            invalidReason: null,
            reporting: false,
            ...defaultState,
        };
    });
    /**
     * Keep track of whether the form is reporting errors for the _on\_submit_ strategy
     */
    const reporting = useRef(false);
    const reset = useCallback(() => {
        if (form.current) form.current.reset();
        reporting.current = false;
    }, []);
    const ctx = useMemo(() => ({ ...snapshot, reset }), [snapshot, reset]);
    const inited = useRef(false);

    const createSnapshot = (form: HTMLFormElement, reportFormErrors: boolean, showErrors: boolean) => {
        let ok = true;
        const formData = new FormData(form);
        const values: any = formDataToObject(formData);
        const elements = getAllFormElements(form);
        const inputs: { [InputName in string]: InputState } = {};
        const invalidReason: { form: boolean; validate: boolean } = { form: false, validate: false };

        elements.forEach((element) => {
            if (!element.name) return;
            const inpOk = checkValidity(element);
            if (!inpOk) {
                ok = false;
                invalidReason.form = true;
            }
            inputs[element.name] = { ok: inpOk, error: "", value: element.value };
        });

        if (validate) {
            const validation = validate({ values, formData });

            if (validation === false) {
                ok = false;
                invalidReason.validate = true;
            } else if (validation !== true) {
                for (const key in validation) {
                    const fieldValidation = validation[key];

                    if (fieldValidation === false || typeof fieldValidation === "string") {
                        ok = false;
                        invalidReason.validate = true;
                        inputs[key] = {
                            error: fieldValidation || "",
                            value: values[key],
                            ok: false,
                        };
                    }
                }
            }
        }

        const snapshot: JSFormSnapshot<T> = {
            ok,
            form,
            formData,
            values,
            inputs,
            invalidReason: ok ? null : invalidReason,
            reporting: showErrors,
        };

        if (!ok) {
            onInvalid?.(snapshot);
            if (reportFormErrors) form.reportValidity();
        }

        return snapshot;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        // Prevents form routing and posting
        e.preventDefault();

        const snapshot = createSnapshot(
            e.currentTarget,
            true,
            !reportStrategy || reportStrategy === "on_submit"
        );
        setSnapshot(snapshot);

        if (snapshot.ok) {
            onSubmit?.(snapshot);
            reporting.current = false;
        } else {
            reporting.current = true;
        }
    };

    const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
        const form = e.currentTarget;

        const { name, value } = e.target as any;

        const snapshot = createSnapshot(
            form,
            // Set reportFormErrors to false,
            // because the first invalid input gets focused on Form.reportValidity()
            false,
            reportStrategy === "on_change" || reporting.current
        );
        setSnapshot(snapshot);

        onChange?.({
            ...snapshot,
            changedField:
                typeof name === "string" ? { name, newValue: value } : { name: "", newValue: undefined },
        });
    };

    useEffect(() => {
        if (!inited.current && snapshot.form) {
            inited.current = true;
            onInit?.(snapshot);
        }
    }, [snapshot, onInit]);

    return (
        <form
            id={id}
            onSubmit={handleSubmit}
            className={jsForm({ flex, gap, className })}
            target={target}
            onChange={handleChange}
            ref={form}
        >
            <JSFormContext.Provider value={ctx}>{children}</JSFormContext.Provider>
        </form>
    );
};

interface JSFormError extends PropsOf<typeof ErrorText> {
    /**
     * Name of the input field this error is for
     */
    name: string;
}

/**
 * ### Props
 * - `name` - The name of the input field this error is for. If provided the error will be displayed only if the input field is invalid.
 */
export const JSFormError: React.FC<JSFormError> = ({ name, children, ...props }) => {
    const form = useJSForm();
    const isErr = form?.inputs[name]?.ok === false;
    const errText = form?.inputs[name]?.error || "";

    if (!isErr || !form.reporting) return null;

    return <ErrorText {...props}>{errText || children}</ErrorText>;
};
