import { setProperty } from "dot-prop";
import type { FormErrors, InputState, JSFormSnapshot, JSFormValidateData } from "./types";

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

type SnapshotInit = {
    reportFormErrors: boolean;
    showErrors: boolean;
    validate: ((data: JSFormValidateData) => FormErrors | boolean | undefined | void) | undefined;
    onInvalid: ((snapshot: JSFormSnapshot) => void) | undefined;
};

export function createSnapshot(
    form: HTMLFormElement,
    { validate, reportFormErrors, showErrors, onInvalid }: SnapshotInit
) {
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

    const snapshot: JSFormSnapshot = {
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
}
