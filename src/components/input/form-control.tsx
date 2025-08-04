"use client";

import { cloneElement, isValidElement, useId, type FC, type ReactElement, type ReactNode } from "react";
import { useJSForm } from "./js-form/js-form-context.js";
import type { PartialPropsOf, RefProps, RichAsProps, StyleProps, WithTVProps } from "../../types/index.js";
import { HelperText } from "./helper-text.js";
import { tv } from "tailwind-variants";
import { Label } from "../text/label.js";
import { ErrorText } from "../text/error-text.js";

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
            xs: "gap-0.5",
            sm: "gap-1",
            md: "gap-2",
            lg: "gap-3",
            xl: "gap-4.5",
        },
    },
    defaultVariants: {
        gap: "sm",
    },
});

type FormControlProps = WithTVProps<
    StyleProps &
        RefProps<HTMLDivElement> & {
            /**
             * Default value of the input
             */
            name?: string;
            children: ReactNode;
            /**
             * Whether the input is controlled or not.
             * By default, this is derived from the {@link JSFormContext}.
             */
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
            /**
             * Indicates that the label is not labeling a valid input element (e.g. in combination with hidden inputs).
             *
             * In this case a span is used instead of a label element.
             */
            mimic?: boolean;
            requiredHint?: boolean;
        },
    typeof formControl
>;

/**
 * Wraps an input element with a label, error message and helper text.
 *
 * Consumes {@link JSFormContext}, to handle {@link JSForm} default value state.
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
    mimic,
    ref,
    requiredHint,
}) => {
    const formCtx = useJSForm();
    const _name = name !== undefined ? `${formCtx?.prefixNames ?? ""}${name}` : undefined;
    const hasName = _name !== undefined;
    const isErr = !noError && hasName && formCtx?.inputs[_name]?.ok === false;
    const errText = isErr && formCtx.reporting ? errorText ?? (formCtx?.inputs[_name]?.error || "") : "";
    const _controlled = controlled ?? formCtx?.controlled;
    const id = useId();
    const childElement: ReactElement<any> | null = isValidElement(children) ? children : null;

    // input props
    const inpProps: any = {};

    // If the child is an input element (optimistic), we pass some props to it
    if (childElement) {
        if (!mimic) {
            inpProps.id = id;
        }

        if (hasName) {
            inpProps.name = _name;
        }

        // ## Handle JSForm support here
        if (formCtx && _name) {
            if (_controlled) {
                const controlledValue = formCtx.value(_name);

                if (controlledValue !== undefined && childElement?.props.value === undefined) {
                    inpProps.value = controlledValue;
                }
            } else {
                const defaultValue = formCtx.default(_name);

                // handle js form default value
                if (defaultValue !== undefined && childElement?.props.defaultValue === undefined) {
                    inpProps.defaultValue = defaultValue;
                }
            }
        }
    }

    const body = (
        <>
            {helperText && helperTextTop && <HelperText {...helperTextProps}>{helperText}</HelperText>}
            {childElement ? cloneElement(childElement, inpProps) : children}
            {helperText && !helperTextTop && <HelperText {...helperTextProps}>{helperText}</HelperText>}
            {errText && <ErrorText {...errorTextProps}>{errText}</ErrorText>}
        </>
    );
    const lbl = label && (
        <Label
            requiredHint={requiredHint}
            htmlFor={id}
            {...labelProps}
            /* default to span if hidden */
            as={labelProps?.as ?? (mimic ? "span" : undefined)}
            style={{ width: labelWidth, ...labelProps?.style }}
        >
            {label}
        </Label>
    );

    return (
        <div ref={ref} className={formControl({ horizontal, gap, className })} style={style}>
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
