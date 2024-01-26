"use client";

import { setRef } from "@react-client/util";
import clsx from "clsx";
import React from "react";
import type { InputLikeProps } from "../../base/Input/Input";
import { firstBool } from "@client-util/iterables";
import useId from "@react-client/hooks/others/useId";

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
};

export function useFormObserver<D extends Record<string, any> = any>(options?: { defaultValid?: true }) {
    const id = useId();
    const [data, setData] = React.useState<Partial<D>>({});
    const [valid, setValid] = React.useState<boolean>(firstBool(options?.defaultValid, true));
    const [form, setForm] = React.useState<HTMLFormElement | null>(null);
    const formProps: Partial<JSFormProps> = {
        onChange: (e, { parsedData, valid }) => {
            setData(parsedData);
            setValid(valid);
            setForm(e.currentTarget);
        },
        id,
    };
    return { formProps, data, valid, form, id: id };
}

export function useFormInput(
    props: Pick<InputLikeProps, "readOnly" | "name" | "disabled" | "errorMessage" | "error">,
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
    const error = !!props.errorMessage && (props.error || context.hint || !valid);
    return { error, readOnly: firstBool(props.readOnly, context.readOnly), disabled: firstBool(props.disabled, context.diabled) };
}

export function useJSForm() {
    const context = React.useContext(JSFormContext);
    return context;
}

export type FormValidator<D extends {}> = { [K in keyof D]?: (value: D[K] | undefined, values: Partial<D>) => boolean };

export const formControlTypeAttrName = "data-inptype";

interface JSFormProps<D extends {} = any> {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    /**
     * JS-Validator
     *
     * Falls nicht validiert werden konnte wird keine `action` ausgeführt!
     * */
    validate?: FormValidator<D>;
    spacing?: boolean;
    onInvalid?: (e: React.FormEvent<HTMLFormElement> | null) => void;
    onChange?: (e: React.FormEvent<HTMLFormElement>, formState: { valid: boolean; parsedData: Partial<D> }) => void;
    action?: ((formData: FormData, parsedData: D) => void) | undefined;
    readOnly?: boolean;
    disabled?: boolean;
    id?: string;
    noHints?: boolean;
}

const JSForm = React.forwardRef<HTMLFormElement, JSFormProps>((props, ref) => {
    const form = React.useRef<HTMLFormElement>(null);
    const [parsedData, setParsedData] = React.useState<Record<string, any>>({});
    const [valid, setValid] = React.useState<boolean>(false);
    const [hint, setHint] = React.useState(false);

    // value + ok initialisieren
    React.useEffect(() => {
        if (form.current) {
            const state = getState(form.current, null);
            setParsedData(state.parsedData);
            setValid(state.valid);
        }
        // TODO wenn disabled oder readOnly submit button disabled dynamisch?
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function getState(form: HTMLFormElement, target: Element | null) {
        let val = valid;
        let parsed = parsedData;

        // Falls von Input-Element getriggert (Etwa `React.FormEvent.target`), dann Daten anpassen!
        if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName) && !!(target as any).name) {
            val = form.checkValidity();
            parsed = { ...parsedData };

            const inp: InputLike = target as any;
            const name = inp.name;

            // Siehe `FormControl`
            if (inp.hasAttribute(formControlTypeAttrName)) {
                const isJson = inp.getAttribute(formControlTypeAttrName) === "json";

                if (isJson) {
                    try {
                        parsed[name] = inp.value ? JSON.stringify(inp.value) : undefined;
                    } catch (err) {}
                } else parsed[name] = inp.value;
            } else parsed[name] = inp.value;
        }

        for (const name in props.validate) {
            try {
                const result = props.validate[name]?.(name, parsed);
                if (!result) {
                    val = false;
                    continue;
                }
            } catch (err) {}
        }

        // JS validate
        if (props.validate && val) {
            for (const name in props.validate) {
                try {
                    const result = props.validate[name]?.(name, parsed);
                    if (!result) {
                        val = false;
                        continue;
                    }
                } catch (err) {}
            }
        }

        return { valid: val, parsedData: parsed };
    }

    function handleInvalid(e: React.FormEvent<HTMLFormElement> | null) {
        props.onInvalid?.(e);
        setHint(true);
    }

    return (
        <JSFormContext.Provider
            value={{
                hint: hint && !props.noHints,
                readOnly: !!props.readOnly,
                valid,
                diabled: !!props.disabled,
                parsedData,
                form: form.current,
                validate: props.validate || null,
            }}
        >
            <form
                id={props.id}
                ref={formElement => {
                    setRef(ref, formElement as any);
                    setRef(form, formElement);
                }}
                onInvalid={e => {
                    handleInvalid(e);
                }}
                onChange={e => {
                    const formState = getState(e.currentTarget, e.target as Element);
                    setParsedData(formState.parsedData);
                    setValid(formState.valid);
                    props.onChange?.(e, formState);
                }}
                action={formData => {
                    if (!form.current) return;
                    const { parsedData, valid } = getState(form.current, null);
                    if (valid) {
                        setHint(false);
                        props.action?.(formData, parsedData);
                    } else {
                        handleInvalid(null);
                    }
                }}
                className={clsx("flex flex-col", props.spacing && "space-y-3", props.className)}
                style={props.style}
            >
                {props.children}
            </form>
        </JSFormContext.Provider>
    );
});

JSForm.displayName = "JSForm";

export default JSForm;
