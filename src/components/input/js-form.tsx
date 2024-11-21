"use client";

import React from "react";

interface InputState {
    ok: boolean;
    error: string | null;
    value: any;
}

type JSFormContext<T extends object = any> = {
    inputs: { [InputName in string]: InputState };
    formData: FormData;
    ok: boolean;
    values: T;
    form: HTMLFormElement | null;
    invalidReason: { form: boolean; validate: boolean } | null;
};

const JSFormContext = React.createContext<JSFormContext | null>(null);

export function useJSForm<T extends object = any>(): JSFormContext<T> {
    const ctx = React.useContext(JSFormContext);
    if (!ctx) throw new Error("`useJSForm` must be used within a `JSForm` component");
    return ctx;
}

type Errors<T extends object> = {
    [K in keyof T]?: string | boolean;
};

interface JSFormProps<T extends object = any> {
    id?: string;
    children?: React.ReactNode;
    onSubmit?: (params: JSFormContext<T>) => void;
    onChange?: (params: JSFormContext<T>) => void;
    onInvalid?: (params: JSFormContext<T>) => void;
    onStateChange?: (params: JSFormContext<T>) => void;
    validate?: (formData: FormData, values: T) => Errors<T> | boolean | undefined | void;
    className?: string;
    action?: any;
    target?: string;
    reportOnChange?: boolean;
    defaultState?: Partial<JSFormContext<T>>;
}

function getAllFormElements(
    form: HTMLFormElement
): (HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement)[] {
    return Array.from(form.elements).filter((element) =>
        ["INPUT", "TEXTAREA", "SELECT"].includes(element.tagName)
    ) as (HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement)[];
}

export const JSForm = <T extends object = any>({
    children,
    onSubmit,
    className,
    onInvalid,
    target,
    action,
    validate,
    id,
    defaultState,
    onStateChange,
    onChange,
}: JSFormProps<T>) => {
    const [ctx, setCtx] = React.useState<JSFormContext<T>>(() => {
        return {
            ok: true,
            form: null,
            formData: new FormData(),
            values: {} as T,
            inputs: {},
            invalidReason: null,
            ...defaultState,
        };
    });

    const getCtx = (form: HTMLFormElement, report: boolean) => {
        let ok = true;
        const formData = new FormData(form);
        const values: any = Object.fromEntries(formData);
        const elements = getAllFormElements(form);
        const inputs: { [InputName in string]: InputState } = {};
        const invalidReason: { form: boolean; validate: boolean } = { form: false, validate: false };

        elements.forEach((element) => {
            if (!element.name) return;
            const inpOk = element.checkValidity();
            if (!inpOk) {
                ok = false;
                invalidReason.form = true;
            }
            inputs[element.name] = { ok: !inpOk, error: "", value: element.value };
        });

        if (validate) {
            const validation = validate(formData, values);

            if (validation === false) {
                ok = false;
                invalidReason.validate = true;
            } else if (validation !== true) {
                for (const key in validation) {
                    const inpVal = validation[key];

                    if (inpVal === false || typeof inpVal === "string") {
                        ok = false;
                        invalidReason.validate = true;
                        inputs[key] = { error: inpVal || "", value: values[key], ok: false };
                    }
                }
            }
        }

        const ctx: JSFormContext = {
            ok,
            form,
            formData,
            values,
            inputs,
            invalidReason: ok ? null : invalidReason,
        };

        if (!ok) {
            onInvalid?.(ctx);
            if (report) form.reportValidity();
        }

        return ctx;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        // Prevents from routing and posting
        e.preventDefault();
        const ctx = getCtx(e.currentTarget, true);
        onSubmit?.(ctx);
    };

    const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
        const form = e.currentTarget;
        const ctx = getCtx(form, false);
        setCtx(ctx);
        onStateChange?.(ctx);
        onChange?.(ctx);
    };

    return (
        <form
            id={id}
            onSubmit={handleSubmit}
            className={className}
            action={action}
            target={target}
            onChange={handleChange}
        >
            <JSFormContext.Provider value={ctx}>{children}</JSFormContext.Provider>
        </form>
    );
};
