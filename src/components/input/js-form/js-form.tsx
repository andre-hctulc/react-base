"use client";

import { tv, type ClassValue, type VariantProps } from "tailwind-variants";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { JSFormValidation, JSFormChange, JSFormSnapshot, JSFormValidateData } from "./types.js";
import { type JSFormContext, JSFormCtx } from "./js-form-context.js";
import { createSnapshot } from "./helpers.js";
import { getProperty } from "dot-prop";
import { useRefOf } from "../../../hooks/index.js";

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
     * The default value of the form. This is consumed by form controls.
     *
     * Use {@link controlled} to interpret this as a controlled value.
     */
    defaultValue?: Partial<T>;
    /**
     * Callback when the form is initialized
     */
    onInit?: (snapshot: JSFormSnapshot<T>) => void;
    /**
     * Default controlled state for form controls
     */
    controlled?: boolean;
}

/**
 * Input names are interpreted as dot prop paths
 */
export const JSForm = <T extends object = any>({
    children,
    onSubmit,
    className,
    onInvalid,
    target,
    validate,
    id,
    defaultValue,
    onChange,
    flex,
    gap,
    reportStrategy,
    onInit,
    controlled,
}: JSFormProps<T>) => {
    const form = useRef<HTMLFormElement>(null);
    const defValue = useMemo<Partial<T>>(() => defaultValue || {}, [defaultValue]);
    const def = useCallback(
        (name: string) => {
            return getProperty(defValue, name);
        },
        [defValue]
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

    const reset = useCallback(() => {
        if (form.current) form.current.reset();
        reporting.current = false;
    }, []);

    const triggerChange = useCallback(
        (target?: { name: string | undefined; value: any }) => {
            const _form = form.current;
            if (!_form) return;

            handleChange({ currentTarget: _form, target });
        },
        [handleChange]
    );

    const ctx = useMemo<JSFormContext>(
        () => ({
            ...snapshot,
            reset,
            triggerChange,
            defaultValue: defValue,
            default: def,
            controlled: controlled ?? false,
        }),
        [snapshot, triggerChange, reset, def, defaultValue, controlled]
    );

    useEffect(() => {
        if (!inited.current && snapshot.form) {
            inited.current = true;
            onInit?.(snapshot);
        }
    }, [snapshot]);

    return (
        <form
            id={id}
            onSubmit={handleSubmit}
            className={jsForm({ flex, gap, className })}
            target={target}
            onChange={handleChange}
            ref={form}
        >
            <JSFormCtx.Provider value={ctx}>{children}</JSFormCtx.Provider>
        </form>
    );
};
