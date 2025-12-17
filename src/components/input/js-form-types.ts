export interface InputState {
    ok: boolean;
    error: string;
    value: any;
}

export type JSFormValidateData<T extends object = any> = Pick<JSFormSnapshot<T>, "formData" | "values">;

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

/**
 * Maps input names to their validation result:
 * `true` for valid, `false` for invalid, and a string for an error message
 */
export type JSFormValidation<T extends object = any> = { [K in keyof T]?: string | boolean };
