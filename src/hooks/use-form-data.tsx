import { useEffect, useRef, useState, type ReactNode, type Ref } from "react";
import { useRefOf } from "@/hooks/use-ref-of.js";
import { formDataFromObject, parseFormData } from "@/lib/form.util.js";

function findForm(anchor: HTMLElement | null) {
    let current = anchor;
    while (current && current.tagName !== "FORM") {
        current = current.parentElement;
    }
    return current as HTMLFormElement | null;
}

export interface UseFormDataResult<T extends object = Record<string, any>> {
    formAnchor: ReactNode;
    formData: FormData;
    parsedFormData: T;
}

type FormDataParser<T extends object = Record<string, any>> = (form: HTMLFormElement | FormData) => T;

export interface UseFormDataOptions<T extends object = Record<string, any>> {
    formRef?: Ref<HTMLFormElement>;
    formDataParser?: FormDataParser<T>;
    defaultFormData?: FormData | T;
}

export function useFormData<T extends object = Record<string, any>>({
    formRef,
    formDataParser,
    defaultFormData,
}: UseFormDataOptions<T> = {}): UseFormDataResult<T> {
    const innerFormRef = useRef<HTMLFormElement | null>(
        typeof formRef === "function" || !formRef || !("current" in formRef)
            ? null
            : (formRef.current ?? null),
    );
    const anchorRef = useRef<HTMLDivElement | null>(null);
    const parserRef = useRefOf(formDataParser);

    const setFormRef = (node: HTMLFormElement | null) => {
        innerFormRef.current = node;

        if (typeof formRef === "function") {
            formRef(node);
            return;
        }

        if (formRef && "current" in formRef) {
            formRef.current = node;
        }
    };

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
            setFormRef(resolvedForm);
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

    const formAnchor = <div className="hidden" ref={anchorRef} />;

    return {
        formAnchor,
        formData: data.formData,
        parsedFormData: data.parsedFormData as T,
    };
}
