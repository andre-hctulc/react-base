import type { Size } from "./types";
import { collapse } from "./util";

// * Input type="date|datetime"

/** Konvertiert ein Datum zu einem value für html `input` type _date_ */
export function forInputDate(date: any): string | undefined {
    if (!(date instanceof Date)) return undefined;

    // Convert the date to a string in the format YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
    const day = String(date.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
}

/** Konvertiert ein Datum zu einem value für html `input` type _datetime-local_ */
export function forInputDatetimeLocal(date: any): string | undefined {
    if (!(date instanceof Date)) return undefined;

    // Convert the date to a string in the format YYYY-MM-DDTHH:MM
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    const formattedDatetime = `${year}-${month}-${day}T${hours}:${minutes}`;

    return formattedDatetime;
}

export function forDateLikeInput(date: any, inputType: "date" | "datetime-local") {
    if (inputType === "date") return forInputDate(date);
    else return forInputDatetimeLocal(date);
}

export function getInputSizeClasses(size: Size): string {
    return collapse(size, { small: "h-7", medium: "h-10", large: "h-12" });
}

// * Events

export function getEventValue(e: any) {
    if (e && typeof e === "object" && Object.hasOwn(e, "target") && Object.hasOwn(e, "currentTarget")) return e.target.value;
    else return e;
}

// * Form

type FormDataExpectType = "string" | "number" | "boolean" | "object" | "blob" | "blob-array" | "any";

export function convertFormData<T extends Record<string, any> = any>(
    formData: FormData,
    expect: Record<keyof T, { pattern?: string; required?: boolean; parse: FormDataExpectType }>
): T | null {
    const parsed: any = {};

    for (const key in expect) {
        const rawValue = formData.get(key);
        let exp = expect[key];

        if (exp.pattern) {
            try {
                const patternRegex = new RegExp(exp.pattern);
                if (typeof rawValue !== "string" || !patternRegex.test(rawValue)) return null;
            } catch (err) {
                return null;
            }
        }
        if (typeof exp !== "object" || !exp.parse) continue;

        if (rawValue === null && exp.required) return null;

        let parsedValue: any;

        const parse = (v: any) => {
            try {
                return JSON.parse(v);
            } catch (err) {
                return undefined;
            }
        };

        if (rawValue === null) parsedValue = undefined;
        else {
            switch (exp.parse) {
                case "string":
                    if (typeof rawValue !== "string") return null;
                    parsedValue = rawValue;
                    break;
                case "number":
                    const value = parseInt(rawValue as any);
                    if (isNaN(value)) return null;
                    parsedValue = value;
                    break;
                case "any":
                case "object":
                    const parsedJson = parse(rawValue);
                    if (parsedJson === undefined) return null;
                    parsedValue = parsedJson;
                    break;
                case "boolean":
                    if (typeof rawValue !== "string") return null;
                    const normalized = rawValue.toLowerCase();
                    if (normalized !== "false" && normalized !== "true") return null;
                    parsedValue = rawValue === "true";
                    break;
                case "blob":
                    if (!(rawValue instanceof Blob)) return null;
                    parsedValue = rawValue;
                    break;
                case "blob-array":
                    if (!Array.isArray(rawValue) || rawValue.some(item => !(item instanceof Blob))) return null;
                    parsedValue = rawValue;
                    break;
                default:
                    return null;
            }
        }

        parsed[key] = parsedValue;
    }

    return parsed;
}

export const InputPattern = {
    email: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
    url: "^(ftp|http|https):\\/\\/[a-zA-Z0-9-]+(\\.[a-zA-Z]{2,})+(\\/[^\\s]*)?$",
    date: "\\d{4}-\\d{2}-\\d{2}",
    time: "\\d{2}:\\d{2}",
    datetime: "\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}",
    month: "\\d{4}-\\d{2}",
    week: "\\d{4}-W\\d{2}",
    tel: "[0-9\\-\\+\\s\\(\\)]+",
    number: "[0-9]+",
    text: "[a-zA-Z0-9]+",
    /** Ein generischer Name. Dieser darf nicht zu lang und nicht leer sein (50 Zeichen) */
    name: "^(?=.{1,50}$).+",
    /**
     * Ein Passwort. Es muss mindestens 8 Zeichen lang sein und mindestens einen Kleinbuchstaben,
     * einen Großbuchstaben, eine Zahl und ein Sonderzeichen enthalten.
     */ password: "^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\\W).*$",
};
