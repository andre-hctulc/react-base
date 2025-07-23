"use client";

import { tv, type ClassValue, type VariantProps } from "tailwind-variants";
import { useCallback, useEffect, useMemo, useRef, useState, type Ref } from "react";
import type { JSFormValidation, JSFormChange, JSFormSnapshot, JSFormValidateData } from "./types.js";
import { type JSFormContext, JSFormCtx, useJSForm } from "./js-form-context.js";
import { createSnapshot } from "./helpers.js";
import { getProperty } from "dot-prop";
import { useRefOf } from "../../../hooks/index.js";
import type { PropsOf } from "../../../types/index.js";

const jsForm = tv({
    variants: {
        flex: {
            row: "flex flex-row",
            col: "flex flex-col",
            wrap: "flex flex-wrap",
        },
        gap: {
            sm: "gap-2",
            md: "gap-3.5",
            lg: "gap-6",
            none: "",
        },
    },
});

export interface JSFormProps<T extends object = any> extends VariantProps<typeof jsForm> {
    id?: string;
    children?: React.ReactNode;
    onSubmit?: (snapshot: JSFormSnapshot<T>) => void;
    onChange?: (snapshot: JSFormChange<T> & { changedField: { name: string; newValue: any } }) => void;
    onInvalid?: (snapshot: JSFormSnapshot<T>) => void;
    validate?: (data: JSFormValidateData<T>) => JSFormValidation<T> | boolean | undefined | void;
    className?: ClassValue;
    /**
     * Form target attribute
     */
    target?: string;
    /**
     * Whether to show validation errors on change
     * @default "on_submit"
     */
    reportStrategy?: "on_submit" | "on_change";
    /**
     * Default value of the form.
     *
     * Consumed by {@link FormControl}s.
     */
    defaultValues?: Partial<T>;
    /**
     * Value of the form.
     *
     * Consumed by {@link FormControl}s.
     */
    values?: Partial<T>;
    /**
     * Callback when the form is initialized
     */
    onInit?: (snapshot: JSFormSnapshot<T>) => void;
    /**
     * ### nested: true
     * - Renders div instead of form
     * - bubbles up manually triggered change events
     * - Uses default values from parent form if not provided in this form
     */
    nested?: boolean;
    /**
     * Consumed by {@link FormControl}s
     */
    prefixNames?: string;
    onContextChange?: (ctx: JSFormContext<T>) => void;
    ref?: Ref<HTMLFormElement>;
}

/**
 * Input names are interpreted as dot prop paths
 *
 * ### Props
 * - `nested`
 * - `prefixNames`
 */
export const JSForm = <T extends object = any>({
    children,
    onSubmit,
    className,
    onInvalid,
    target,
    validate,
    id,
    defaultValues,
    values,
    onChange,
    flex,
    gap,
    reportStrategy,
    onInit,
    nested,
    prefixNames,
    ref,
    onContextChange,
}: JSFormProps<T>) => {
    const form = useRef<HTMLFormElement>(null);
    const parentFormCtx = useJSForm();
    const def = useCallback(
        (name: string) => {
            if (defaultValues) {
                return getProperty(defaultValues, name);
            } else if (nested && parentFormCtx) {
                return parentFormCtx.default(name);
            }
            return undefined;
        },
        [defaultValues, parentFormCtx, nested]
    );
    const val = useCallback(
        (name: string) => {
            if (values) {
                return getProperty(values, name);
            } else if (nested && parentFormCtx) {
                return parentFormCtx.value(name);
            }
            return undefined;
        },
        [values, parentFormCtx, nested]
    );
    const [snapshot, setSnapshot] = useState<JSFormSnapshot<T>>(() => {
        return {
            ok: true,
            form: null,
            formData: new FormData(),
            values: {} as T,
            inputs: {},
            invalidReason: null,
            reporting: false,
        };
    });
    /**
     * Keep track of whether the form is reporting errors for the _on\_submit_ strategy
     */
    const reporting = useRef(false);
    const inited = useRef(false);
    const Comp: any = nested ? "div" : "form";

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        // Prevents form routing and posting
        e.preventDefault();

        const snapshot = createSnapshot(e.currentTarget, {
            reportFormErrors: true,
            showErrors: !reportStrategy || reportStrategy === "on_submit",
            validate,
            onInvalid,
        });

        setSnapshot(snapshot);

        if (snapshot.ok) {
            onSubmit?.(snapshot);
            reporting.current = false;
        } else {
            reporting.current = true;
        }
    };
    const validateRef = useRefOf(validate);
    const onInvalidRef = useRefOf(onInvalid);
    const onChangeRef = useRefOf(onChange);

    /**
     * Manually trigger change event
     * Used by hidden inputs
     */
    const handleChange = useCallback((e: { currentTarget: HTMLFormElement; target: any }) => {
        const form = e.currentTarget;

        const { name, value } = e.target || ({} as any);

        const snapshot = createSnapshot(
            form,
            // Set reportFormErrors to false,
            // because the first invalid input gets focused on Form.reportValidity()
            {
                reportFormErrors: false,
                showErrors: reportStrategy === "on_change" || reporting.current,
                validate: (...args) => validateRef.current?.(...args),
                onInvalid: (...args) => onInvalidRef.current?.(...args),
            }
        );
        setSnapshot(snapshot);

        onChangeRef.current?.({
            ...snapshot,
            changedField:
                typeof name === "string" ? { name, newValue: value } : { name: "", newValue: undefined },
        });
    }, []);

    const [resetSignal, setResetSignal] = useState(0);
    const reset = useCallback(() => {
        if (form.current) form.current.reset();
        reporting.current = false;
        setResetSignal((s) => {
            if (s > 1000) {
                return 1;
            }
            return s + 1;
        });
    }, []);

    const triggerChange = useCallback(
        (target?: { name: string | undefined; value: any }) => {
            // For nested forms the form ref is not present!
            // We bubble the change event to the parent form
            if (nested) {
                parentFormCtx?.triggerChange(target);
                return;
            }

            const _form = form.current;
            if (!_form) return;
            handleChange({ currentTarget: _form, target });
        },
        [handleChange, nested, parentFormCtx]
    );
    const ctx = useMemo<JSFormContext>(
        () => ({
            ...snapshot,
            reset,
            triggerChange,
            defaultValues: defaultValues,
            default: def,
            value: val,
            controlled: values !== undefined,
            prefixNames,
            resetSignal,
        }),
        [snapshot, triggerChange, reset, def, val, values, prefixNames, resetSignal]
    );
    const onContextChangeRef = useRefOf(onContextChange);

    useEffect(() => {
        if (!inited.current && snapshot.form) {
            inited.current = true;
            onInit?.(snapshot);
        }
    }, [snapshot]);

    useEffect(() => {
        onContextChangeRef.current?.(ctx);
    }, [ctx]);

    let formProps: PropsOf<"form"> = {};

    if (!nested) {
        formProps.onSubmit = handleSubmit;
        formProps.target = target;
        formProps.onChange = handleChange;
        formProps.ref = form;
    }

    return (
        <Comp
            id={id}
            key={resetSignal}
            ref={(f: any) => {
                form.current = f;

                if (typeof ref === "function") {
                    ref(f);
                } else if (ref) {
                    ref.current = f;
                }
            }}
            className={jsForm({ flex, gap, className })}
            {...formProps}
        >
            <JSFormCtx.Provider value={ctx}>{children}</JSFormCtx.Provider>
        </Comp>
    );
};
