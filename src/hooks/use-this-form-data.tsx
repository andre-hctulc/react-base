import { useEffect, useRef, useState, type ReactNode, type Ref } from "react";
import { useRefOf } from "./use-ref-of.js";
import { formDataFromObject, parseFormData } from "@/lib/form.util.js";

function findForm(anchor: HTMLElement | null) {
    let current = anchor;
    while (current && current.tagName !== "FORM") {
        current = current.parentElement;
    }
    return current as HTMLFormElement | null;
}

export interface UseThisFormDataResult {
    anchor: ReactNode;
    formData: FormData;
    parsedFormData: Record<string, any>;
}

type FormDataParser = (form: HTMLFormElement | FormData) => Record<string, any>;

export interface UseThisFormDataOptions {
    formRef?: Ref<HTMLFormElement>;
    formDataParser?: FormDataParser;
    defaultFormData?: FormData | Record<string, any>;
}

export function useThisFormData({
    formRef,
    formDataParser,
    defaultFormData,
}: UseThisFormDataOptions): UseThisFormDataResult {
    const innerFormRef = useRef<HTMLFormElement | null>(
        typeof formRef === "function" || !formRef || !("current" in formRef)
            ? null
            : (formRef.current ?? null),
    );
    const anchorRef = useRef<HTMLDivElement | null>(null);
    const parserRef = useRefOf(formDataParser);

    const toFormState = (source: HTMLFormElement | FormData | Record<string, any>) => {
        if (source instanceof HTMLFormElement) {
            const result = parseFormData(source);
            return {
                formData: result.formData,
                parsedFormData: parserRef.current ? parserRef.current(source) : result.parsedFormData,
            };
        }

        if (source instanceof FormData) {
            const result = parseFormData(source);
            return {
                formData: result.formData,
                parsedFormData: parserRef.current ? parserRef.current(source) : result.parsedFormData,
            };
        }

        const formData = formDataFromObject(source);
        const result = parseFormData(formData);
        return {
            formData: result.formData,
            parsedFormData: parserRef.current ? parserRef.current(formData) : result.parsedFormData,
        };
    };

    const syncDataFrom = (form: HTMLFormElement | null) => {
        if (!form) {
            return;
        }

        const nextState = toFormState(form);
        setData(nextState);
    };

    const [data, setData] = useState(() => {
        if (!defaultFormData) {
            return {
                formData: new FormData(),
                parsedFormData: {},
            };
        }

        return toFormState(defaultFormData);
    });

    useEffect(() => {
        if (typeof formRef !== "function" && formRef && "current" in formRef) {
            innerFormRef.current = formRef.current ?? innerFormRef.current;
        }

        const resolvedForm = innerFormRef.current ?? (anchorRef.current ? findForm(anchorRef.current) : null);

        if (resolvedForm) {
            innerFormRef.current = resolvedForm;
            if (typeof formRef !== "function" && formRef && "current" in formRef) {
                formRef.current = resolvedForm;
            }
        }

        const form = resolvedForm ?? innerFormRef.current;
        if (!form) {
            return;
        }

        const handleChange = () => {
            syncDataFrom(form);
        };

        form.addEventListener("input", handleChange);
        form.addEventListener("change", handleChange);

        return () => {
            form.removeEventListener("input", handleChange);
            form.removeEventListener("change", handleChange);
        };
    }, [formRef, formDataParser]);

    useEffect(() => {
        if (!defaultFormData) {
            return;
        }

        setData(toFormState(defaultFormData));
    }, [defaultFormData, formDataParser]);

    const anchor = <div className="hidden" ref={anchorRef} />;

    return {
        anchor,
        formData: data.formData,
        parsedFormData: data.parsedFormData,
    };
}
