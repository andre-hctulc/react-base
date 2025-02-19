"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { tv } from "tailwind-variants";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { JSFormCtx } from "./js-form-context";
import { createSnapshot } from "./helpers";
import { useRefOf } from "../../../hooks";
import { getProperty } from "dot-prop";
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
/**
 * Input names are interpreted as dot prop paths
 */
export const JSForm = ({ children, onSubmit, className, onInvalid, target, validate, id, defaultValue, onChange, flex, gap, reportStrategy, onInit, controlled, }) => {
    const form = useRef(null);
    const defValue = useMemo(() => defaultValue || {}, [defaultValue]);
    const def = useCallback((name) => {
        return getProperty(defValue, name);
    }, [defValue]);
    const [snapshot, setSnapshot] = useState(() => {
        return {
            ok: true,
            form: null,
            formData: new FormData(),
            values: {},
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
    const handleSubmit = (e) => {
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
        }
        else {
            reporting.current = true;
        }
    };
    const validateRef = useRefOf(validate);
    const onInvalidRef = useRefOf(onInvalid);
    const onChangeRef = useRefOf(onChange);
    const handleChange = useCallback((e) => {
        const form = e.currentTarget;
        const { name, value } = e.target || {};
        const snapshot = createSnapshot(form, 
        // Set reportFormErrors to false,
        // because the first invalid input gets focused on Form.reportValidity()
        {
            reportFormErrors: false,
            showErrors: reportStrategy === "on_change" || reporting.current,
            validate: (...args) => validateRef.current?.(...args),
            onInvalid: (...args) => onInvalidRef.current?.(...args),
        });
        setSnapshot(snapshot);
        onChangeRef.current?.({
            ...snapshot,
            changedField: typeof name === "string" ? { name, newValue: value } : { name: "", newValue: undefined },
        });
    }, []);
    const reset = useCallback(() => {
        if (form.current)
            form.current.reset();
        reporting.current = false;
    }, []);
    const triggerChange = useCallback((target) => {
        const _form = form.current;
        if (!_form)
            return;
        handleChange({ currentTarget: _form, target });
    }, [handleChange]);
    const ctx = useMemo(() => ({
        ...snapshot,
        reset,
        triggerChange,
        defaultValue: defValue,
        default: def,
        controlled: controlled ?? false,
    }), [snapshot, triggerChange, reset, def, defaultValue, controlled]);
    useEffect(() => {
        if (!inited.current && snapshot.form) {
            inited.current = true;
            onInit?.(snapshot);
        }
    }, [snapshot]);
    return (_jsx("form", { id: id, onSubmit: handleSubmit, className: jsForm({ flex, gap, className }), target: target, onChange: handleChange, ref: form, children: _jsx(JSFormCtx.Provider, { value: ctx, children: children }) }));
};
