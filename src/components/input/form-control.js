import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { cloneElement, isValidElement, useId } from "react";
import { useJSForm } from "./js-form/js-form-context";
import { ErrorText, Label } from "../text";
import { HelperText } from "./helper-text";
import { tv } from "tailwind-variants";
const formControl = tv({
    base: "flex",
    variants: {
        horizontal: {
            true: "",
            false: "flex-col",
        },
        gap: {
            none: "none",
            sm: "gap-1",
            md: "gap-2",
            lg: "gap-3",
            xl: "gap-4.5",
        },
    },
    defaultVariants: {
        gap: "md",
        horizontal: false,
    },
});
const formControlBody = tv({
    base: "flex flex-col",
    variants: {
        gap: {
            none: "none",
            sm: "gap-1",
            md: "gap-2",
            lg: "gap-3",
            xl: "gap-4.5",
        },
    },
    defaultVariants: {
        gap: "md",
    },
});
/**
 * Wraps an input element with a label, error message and helper text.
 *
 * Consumes {@link JSFormContext} for handling {@link JSForm} default value state.
 */
export const FormControl = ({ children, label, name, controlled, className, style, errorText, errorTextProps, helperText, helperTextProps, labelProps, horizontal, gap, labelWidth, noError, helperTextTop, mimic: hidden, }) => {
    const hasName = name !== undefined;
    const formCtx = useJSForm();
    const isErr = !noError && hasName && formCtx?.inputs[name]?.ok === false;
    const errText = isErr && formCtx.reporting ? errorText ?? (formCtx?.inputs[name]?.error || "") : "";
    const _controlled = controlled ?? formCtx?.controlled;
    const id = useId();
    const jsFormValue = hasName ? formCtx?.default(name) : undefined;
    const childElement = isValidElement(children) ? children : null;
    // input props
    const inpProps = {};
    // If the child is an input element (optimistic), we pass some props to it
    if (childElement) {
        if (!hidden) {
            inpProps.id = id;
        }
        if (hasName) {
            inpProps.name = name;
        }
        // handle js form default value
        if (jsFormValue !== undefined) {
            if (_controlled) {
                inpProps.value =
                    childElement?.props.value === undefined ? jsFormValue : childElement.props.value;
            }
            else {
                inpProps.defaultValue =
                    childElement?.props.defaultValue === undefined
                        ? jsFormValue
                        : childElement.props.defaultValue;
            }
        }
    }
    const body = (_jsxs(_Fragment, { children: [helperText && helperTextTop && _jsx(HelperText, { ...helperTextProps, children: helperText }), childElement ? cloneElement(childElement, inpProps) : children, helperText && !helperTextTop && _jsx(HelperText, { ...helperTextProps, children: helperText }), errText && _jsx(ErrorText, { ...errorTextProps, children: errText })] }));
    const lbl = label && (_jsx(Label, { htmlFor: id, ...labelProps, 
        /* default to span if hidden */
        as: labelProps?.as ?? (hidden ? "span" : undefined), style: { width: labelWidth, ...labelProps?.style }, children: label }));
    return (_jsx("div", { className: formControl({ horizontal, gap, className }), style: style, children: horizontal ? (_jsxs(_Fragment, { children: [lbl, _jsx("div", { className: formControlBody({ gap }), children: body })] })) : (_jsxs(_Fragment, { children: [lbl, body] })) }));
};
