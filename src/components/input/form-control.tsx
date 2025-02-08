import { cloneElement, useId, type FC, type ReactElement, type ReactNode } from "react";
import type { InputLikeProps } from "./input";
import { useJSForm } from "./js-form/context";
import { ErrorText, Label } from "../text";
import type { PartialPropsOf, TVCProps } from "../../types";
import { HelperText } from "./helper-text";
import type { JSFormContext, JSForm } from "./js-form";
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

interface FormControlProps<T = any> extends TVCProps<typeof formControl, "div"> {
    /**
     * Default value of the input
     */
    name: string;
    children: ReactElement<InputLikeProps<T>>;
    controlled?: boolean;
    label?: string;
    labelProps?: PartialPropsOf<typeof Label>;
    errorText?: string;
    helperText?: string;
    helperTextProps?: PartialPropsOf<typeof HelperText>;
    errorTextProps?: PartialPropsOf<typeof ErrorText>;
    horizontal?: boolean;
    labelWidth?: string | number;
    /**
     * Set to true, to prevent any error message from showing
     */
    noError?: boolean;
    helperTextTop?: boolean;
}

/**
 * Wraps an input element with a label, error message and helper text.
 *
 * Consumes {@link JSFormContext} for handling {@link JSForm} default value state.
 */
export const FormControl: FC<FormControlProps> = ({
    children,
    label,
    name,
    controlled,
    className,
    style,
    errorText,
    errorTextProps,
    helperText,
    helperTextProps,
    labelProps,
    horizontal,
    gap,
    labelWidth,
    noError,
    helperTextTop,
}) => {
    const formCtx = useJSForm();
    const isErr = formCtx?.inputs[name]?.ok === false;
    const errText = isErr && !noError ? errorText ?? (formCtx?.inputs[name]?.error || "") : "";
    const _controlled = controlled ?? formCtx?.controlled;
    const id = useId();
    const jsFormValue = formCtx?.default(name);

    // input props
    const inpProps: any = { id, name };

    // handle js form default value
    if (jsFormValue !== undefined) {
        if (_controlled) {
            inpProps.value = children.props.value ?? jsFormValue;
        } else {
            inpProps.defaultValue = children.props.defaultValue ?? jsFormValue;
        }
    }

    const body = (
        <>
            {helperText && helperTextTop && <HelperText {...helperTextProps}>{helperText}</HelperText>}
            {cloneElement(children, inpProps)}
            {helperText && !helperTextTop && <HelperText {...helperTextProps}>{helperText}</HelperText>}
            {errText && <ErrorText {...errorTextProps}>{errText}</ErrorText>}
        </>
    );
    const lbl = label && (
        <Label htmlFor={id} {...labelProps} style={{ width: labelWidth, ...labelProps?.style }}>
            {label}
        </Label>
    );

    return (
        <div className={formControl({ horizontal, gap, className })} style={style}>
            {horizontal ? (
                <>
                    {lbl}
                    <div className={formControlBody({ gap })}>{body}</div>
                </>
            ) : (
                <>
                    {lbl}
                    {body}
                </>
            )}
        </div>
    );
};
