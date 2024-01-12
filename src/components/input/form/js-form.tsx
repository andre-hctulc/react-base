"use client";

import clsx from "clsx";
import React from "react";

const JSFormContext = React.createContext<JSFormContext<any> | null>(null);

type InputProps = { readOnly?: boolean; disabled?: boolean; required?: boolean };
type FormInputState = { error: boolean; errorMessage: string | undefined; defaultValue: any };

export type FormValidator<D extends {}> = { [K in keyof D]?: (value: D[K] | undefined, values: Partial<D>) => boolean | string };

export type JSFormContext<D extends Record<string, any>> = {
    value: Partial<D>;
    change: <K extends keyof D>(name: K, value: undefined | D[K]) => void;
    get: <K extends keyof D>(name: K) => D[K] | undefined;
    defaultValue: Partial<D>;
    validated?: { [K in keyof D]?: boolean | string };
    ok: boolean;
    getInputState: (name: string | undefined) => FormInputState | null;
    hint: boolean;
    inputProps: InputProps;
};

interface ForwardedJSFormProps {
    onChange: (data: any, ok: boolean) => void;
    hint: boolean;
}
export function useJSForm() {
    const context = React.useContext(JSFormContext);
    return context;
}

export function useFormData<D extends {}>(
    defaultValue?: D,
    defaultOk?: boolean
): { data: Partial<D>; formProps: ForwardedJSFormProps; hint: () => void; clear: () => void } & ({ ok: true; okData: D } | { ok: false; okData: null }) {
    const [data, setData] = React.useState<Partial<D>>(defaultValue || {});
    const [ok, setOk] = React.useState(typeof defaultOk === "boolean" ? defaultOk : false);
    const [hinting, setHinting] = React.useState(false);

    function onChange(data: any, ok: boolean) {
        setData(data);
        setOk(ok);
    }

    function hint() {
        setHinting(true);
    }

    function clear() {
        setHinting(false);
    }

    return { data, ok, formProps: { onChange, hint: hinting }, okData: ok ? (data as any) : null, hint, clear };
}

interface JSFormProps<D extends {}> {
    defaultValue?: Partial<D>;
    onChange?: (value: Partial<D>, ok: boolean) => void;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    validate?: FormValidator<D>;
    hint?: boolean;
    spacing?: boolean;
    inputProps?: InputProps;
    /** @default "form" */
    tag?: string;
}

function checkData(data: any, validate: FormValidator<any>): { ok: boolean; validated: any } {
    let validations: any = {};
    let ok = true;

    for (const name in validate) {
        const val = validate[name];
        if (!val) continue;
        const validated = val(data[name], data);
        ok = ok && (validated === undefined || validated === true);
        validations[name] = validated;
    }

    return { ok, validated: validations };
}

const JSForm = React.forwardRef<HTMLFormElement, JSFormProps<any>>((props, ref) => {
    // ref benutzen, da status nicht immer aktuell
    const valueRef = React.useRef<any>(props.defaultValue || {});
    const [value, setValue] = React.useState<any>(valueRef.current);
    const classes = clsx("flex flex-col", props.spacing && "space-y-3", props.className);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const { ok, validated } = React.useMemo(() => checkData(value, props.validate || {}), [value]);
    const Comp: any = props.tag || "form";

    function change(key: string, newValue: any) {
        if (newValue === undefined && !Object.hasOwn(valueRef.current, key)) return;

        if (newValue === undefined) delete valueRef.current[key];
        else valueRef.current[key] = newValue;

        const newValues = { ...valueRef.current };
        const { ok } = checkData(newValues, props.validate || {});

        props.onChange?.(newValues, ok);
        setValue(newValues);
    }

    function get(key: string): any {
        return value[key];
    }

    function getInputState(name: string | undefined): FormInputState | null {
        if (!name) return null;
        const val = validated[name];
        const state: FormInputState = {
            error: val === false || typeof val === "string",
            // Error nur anzeeigen falss hint true ist (Wird )
            errorMessage: props.hint ? (typeof val === "string" ? val : undefined) : undefined,
            defaultValue: props.defaultValue?.[name],
        };
        return state;
    }

    return (
        <JSFormContext.Provider
            value={{
                hint: !!props.hint,
                value,
                ok,
                change: change as any,
                validated,
                get: get as any,
                defaultValue: props.defaultValue as any,
                getInputState,
                inputProps: props.inputProps || {},
            }}
        >
            <Comp ref={ref} className={classes} style={props.style}>
                {props.children}
            </Comp>
        </JSFormContext.Provider>
    );
});

JSForm.displayName = "JSForm";

export default JSForm;
