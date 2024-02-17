"use client";

import clsx from "clsx";
import React from "react";
import { collapse, setRef } from "../../../util";
import type { InputLikeProps } from "../base/Input";
import useId from "../../../hooks/others/useId";

const JSFormContext = React.createContext<JSFormContext | null>(null);

type InputLike = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

export type JSFormContext<D extends Record<string, any> = any> = {
    hint: boolean;
    parsedData: D | null;
    readOnly: boolean;
    diabled: boolean;
    valid: boolean;
    form: HTMLFormElement | null;
    /** JS-Validator */
    validate: FormValidator<D> | null;
    /** This should only be used in `FormControl` */
    change: (target: HTMLInputElement, value: any) => void;
};

export function useFormObserver<D extends Record<string, any> = any>(options?: { defaultValid?: true }) {
    const id = useId();
    const [data, setData] = React.useState<Partial<D>>({});
    const [valid, setValid] = React.useState<boolean>(options?.defaultValid ?? true);
    const [form, setForm] = React.useState<HTMLFormElement | null>(null);
    const [hint, setHint] = React.useState(false);
    const formProps: Partial<JSFormProps> = {
        onChange: ({ data, valid, form }) => {
            setData(data);
            setValid(valid);
            setForm(form);
        },
        id,
        hint,
    };
    return { formProps, data, valid, form, id: id, setHint };
}

export function useFormInput(
    props: Pick<InputLikeProps, "readOnly" | "name" | "disabled" | "error">,
    ref: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null
) {
    const context = React.useContext(JSFormContext);
    // Wird als dependency in `valid` verwendet, um den neuen Wert zu validieren
    const jsValidateValue = props.name && context?.validate && context ? context.parsedData[props.name] : undefined;
    const valid = React.useMemo(() => {
        if (props.name && context) {
            const val = context.validate?.[props.name];
            if (val) {
                const value = context.parsedData[props.name];
                return !!ref?.checkValidity() && val(value, context.parsedData);
            } else return !!ref?.checkValidity();
        }
        return !!ref?.checkValidity();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.name, ref, jsValidateValue]);
    if (!props.name || !context) return { readOnly: !!props.readOnly, disabled: !!props.disabled, error: !!props.error };
    const error = props.error || (context.hint && !valid);
    return { error, readOnly: props.readOnly ?? context.readOnly, disabled: props.disabled ?? context.diabled };
}

export function useJSForm() {
    const context = React.useContext(JSFormContext);
    return context;
}

export type FormValidator<D extends object> = { [K in keyof D]?: (value: D[K] | undefined, values: Partial<D>) => boolean };

type FormState<D = any> = { valid: boolean; data: Partial<D>; form: HTMLFormElement };

interface JSFormProps<D extends {} = any> {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    /** JS validate */
    validate?: FormValidator<D>;
    onInvalid?: (e: React.FormEvent<HTMLFormElement> | null) => void;
    onChange?: (formState: FormState<D>) => void;
    onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
    /** Wird aufgerufen, wenn das Formukar _valid_ ist */
    action?: ((formData: FormData, parsedData: D) => void) | undefined | "string";
    readOnly?: boolean;
    disabled?: boolean;
    id?: string;
    hint?: boolean;
    /** @default "col" */
    flex?: "col" | "row" | "no_flex";
    flexWrap?: boolean;
    /** @default "none" */
    gap?: "none" | "small" | "medium" | "large";
}

const JSForm = React.forwardRef<HTMLFormElement, JSFormProps>((props, ref) => {
    const form = React.useRef<HTMLFormElement>(null);
    const dataRef = React.useRef<Record<string, any>>({});
    const [parsedData, setParsedData] = React.useState<Record<string, any>>({});
    const [valid, setValid] = React.useState<boolean>(false);
    const [forceHint, setForceHint] = React.useState(false);
    const flex = collapse(props.flex || "col", { col: "flex flex-col", row: "flex flex-row", no_flex: "" });
    const gap = collapse(props.gap || "none", { none: "", small: "gap-1.5", medium: "gap-3", large: "gap-5" });

    // initialize State
    React.useEffect(() => {
        handleChange(null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function handleChange(target: Element | null, value?: { value: any }, callOnChange?: boolean) {
        const formState = getState(target, value);
        if (!formState) return;
        setParsedData(formState.data);
        setValid(formState.valid);
        props.onChange?.(formState);
        return formState;
    }

    function getState(target: Element | null, value?: { value: any }): FormState | null {
        const f = form.current;

        if (!f) return null;

        let val = valid;
        let newData = dataRef.current;

        // If triggerd by Input-Element set data
        if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName) && !!(target as any).name && (target as any).type !== "submit") {
            // valid aktualisieren
            val = f.checkValidity();

            // New Value

            const inp: InputLike = target as any;
            const name = inp.name;
            let newValue: any;

            if (value) newValue = value.value;
            else {
                if (!(inp instanceof HTMLInputElement)) newValue = inp.value;
                else {
                    switch (inp.type) {
                        case "checkbox":
                            newValue = (inp as HTMLInputElement).checked;
                            break;
                        case "range":
                        case "number":
                            newValue = parseInt(inp.value) ?? undefined;
                            break;
                        case "file":
                            newValue = inp.files;
                            break;
                        default:
                            newValue = inp.value;
                            break;
                    }
                }
            }

            dataRef.current[name] = newValue;
            // Update object reference for state change
            newData = { ...dataRef.current };
        }

        // JS validate
        if (props.validate && val) {
            for (const name in props.validate) {
                try {
                    const result = props.validate[name]?.(name, newData);
                    if (!result) {
                        val = false;
                        continue;
                    }
                } catch (err) {}
            }
        }

        if (val) setForceHint(false);

        const state = { valid: val, data: newData, form: f };

        return state;
    }

    return (
        <JSFormContext.Provider
            value={{
                hint: !!props.hint || forceHint,
                readOnly: !!props.readOnly,
                valid,
                diabled: !!props.disabled,
                parsedData,
                form: form.current,
                validate: props.validate || null,
                change: (target, value) => handleChange(target, { value }),
            }}
        >
            <form
                action={
                    (typeof props.action === "function"
                        ? (formData: FormData) => {
                              if (valid) {
                                  if (!props.readOnly && !props.disabled) (props.action as any)?.(formData, parsedData);
                              } else setForceHint(!valid);
                          }
                        : props.action) as any
                }
                id={props.id}
                ref={formElement => {
                    setRef(ref, formElement as any);
                    setRef(form, formElement);
                }}
                onInvalid={props.onInvalid}
                onChange={e => handleChange((e as any).target || null)}
                onSubmit={props.onSubmit}
                className={clsx(flex, gap, props.flexWrap && "flex flex-wrap", props.className)}
                style={props.style}
            >
                {props.children}
            </form>
        </JSFormContext.Provider>
    );
});

JSForm.displayName = "JSForm";

export default JSForm;
