import { setProperty } from "dot-prop";
import type { JSFormValidation, InputState, JSFormSnapshot, JSFormValidateData } from "./types";

type InputElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

function getAllFormElements(form: HTMLFormElement): InputElement[] {
    return Array.from(form.elements).filter((element) =>
        ["INPUT", "TEXTAREA", "SELECT"].includes(element.tagName)
    ) as InputElement[];
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

/**
 * Parses FormData into a plain object.
 *
 * It considers the type of the input elements to parse the values correctly.
 */
function formDataToObject(formData: FormData, inputElements: InputElement[]) {
    const obj: Record<string, any> = {};
    const elementsMap = new Map(inputElements.filter((el) => !!el.name).map((el) => [el.name, el]));

    for (let [name, value] of formData.entries()) {
        let val: any = value;
        const element = elementsMap.get(name);

        // Parse checkboxes as boolean
        if (element?.type === "checkbox") {
            val = !!(element as HTMLInputElement).checked;
        }
        // Parse number inputs as numbers
        else if (element?.type === "number") {
            const num = parseFloat(value as string);
            val = isNaN(num) ? undefined : num;
        }
        // Parse date inputs as Date objects
        else if (element?.type.includes("date")) {
            val = value ? new Date(value as string) : undefined;
        }
        // else keep the value as string

        setProperty(obj, name, val);
    }

    return obj;
}

type SnapshotInit = {
    reportFormErrors: boolean;
    showErrors: boolean;
    validate: ((data: JSFormValidateData) => JSFormValidation | boolean | undefined | void) | undefined;
    onInvalid: ((snapshot: JSFormSnapshot) => void) | undefined;
};

export function createSnapshot(
    form: HTMLFormElement,
    { validate, reportFormErrors, showErrors, onInvalid }: SnapshotInit
) {
    let ok = true;
    const formData = new FormData(form);
    const elements = getAllFormElements(form);
    const values: any = formDataToObject(formData, elements);
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
            const vals = validation || {};

            for (const key in vals) {
                const fieldValidation = vals[key];

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
