import { useEffect, useRef, useState, type ReactNode, type Ref } from "react";
import { useRefOf } from "@/hooks/use-ref-of.js";
import { formDataFromObject, parseFormData, type ParseFormDataOptions } from "@dre44/form-data-parser";

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
    parseFormDataOptions?: ParseFormDataOptions;
}

export function useFormData<T extends object = Record<string, any>>({
    formRef,
    formDataParser,
    defaultFormData,
    parseFormDataOptions,
}: UseFormDataOptions<T> = {}): UseFormDataResult<T> {
    const innerFormRef = useRef<HTMLFormElement | null>(
        typeof formRef === "function" || !formRef || !("current" in formRef)
            ? null
            : (formRef.current ?? null),
    );
    const [anchor, setAnchor] = useState<HTMLDivElement | null>(null);
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
            const result = parseFormData(source, parseFormDataOptions);
            return {
                formData: result.formData,
                parsedFormData: parserRef.current ? parserRef.current(source) : result.parsedFormData,
            };
        }

        if (source instanceof FormData) {
            const result = parseFormData(source, parseFormDataOptions);
            return {
                formData: result.formData,
                parsedFormData: parserRef.current ? parserRef.current(source) : result.parsedFormData,
            };
        }

        const formData = formDataFromObject(source, parseFormDataOptions);
        const result = parseFormData(formData, parseFormDataOptions);
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

        const resolvedForm = anchor ? findForm(anchor) : innerFormRef.current;

        if (resolvedForm) {
            setFormRef(resolvedForm);
        }

        if (!resolvedForm) {
            return;
        }

        const handleChange = () => {
            syncDataFrom(resolvedForm);
        };

        syncDataFrom(resolvedForm);
        resolvedForm.addEventListener("input", handleChange);
        resolvedForm.addEventListener("change", handleChange);

        const observer = new MutationObserver(handleChange);
        observer.observe(resolvedForm, {
            attributes: true,
            attributeFilter: ["value"],
            subtree: true,
        });

        return () => {
            resolvedForm.removeEventListener("input", handleChange);
            resolvedForm.removeEventListener("change", handleChange);
            observer.disconnect();
        };
    }, [anchor, formRef, formDataParser, parseFormDataOptions]);

    useEffect(() => {
        if (!defaultFormData) {
            return;
        }

        setData(toFormState(defaultFormData));
    }, [defaultFormData, formDataParser]);

    const formAnchor = <div className="hidden" ref={setAnchor} />;

    return {
        formAnchor,
        formData: data.formData,
        parsedFormData: data.parsedFormData as T,
    };
}
