"use client";

import { cloneElement, isValidElement, useId, type FC, type ReactElement, type ReactNode } from "react";
import { cn } from "@/util/cn.js";
import { collapse } from "@dre44/util/objects";
import type { PartialPropsOf, RefProps, StyleProps } from "../../types/index.js";
import { ErrorText } from "../text/error-text.js";
import { withGap } from "../../util/style.js";
import { useJSForm } from "./js-form-context.js";
import { Label } from "@/components/cn/label.js";

type GapSize = keyof typeof withGap.gap;

export type FormControlProps = StyleProps &
    RefProps<HTMLDivElement> & {
        gap?: GapSize;
        horizontalGap?: GapSize;
        /**
         * Default value of the input
         */
        name?: string;
        children: ReactNode;
        controlled?: boolean;
        label?: string;
        labelProps?: PartialPropsOf<typeof Label>;
        errorText?: string;
        helperText?: string;
        helperTextProps?: PartialPropsOf<"p">;
        errorTextProps?: PartialPropsOf<typeof ErrorText>;
        labelWidth?: string | number;
        /**
         * Set to true, to prevent any error message from showing
         */
        noError?: boolean;
        /**
         * Indicates that the label is not labeling a valid input element (e.g. in combination with hidden inputs).
         *
         * In this case a span is used instead of a label element.
         */
        mimic?: boolean;
        horizontal?: boolean;
        requiredHint?: boolean;
    };

/**
 * Wraps an input element with a label, error message and helper text.
 *
 * Consumes {@link JSFormContext}, to handle {@link JSForm} default value state.
 */
export const FormControl: FC<FormControlProps> = (props) => {
    const {
        gap = "sm",
        horizontalGap = "md",
        noError,
        children,
        errorText,
        controlled,
        mimic,
        ref,
        name,
        label,
        helperText,
        helperTextProps,
        errorTextProps,
        requiredHint,
        labelProps,
        labelWidth,
        horizontal,
        ...rootProps
    } = props as any;
    const formCtx = useJSForm();
    const _name = name !== undefined ? `${formCtx?.namesPrefix ?? ""}${name}` : undefined;
    const hasName = _name !== undefined;
    const isErr = !noError && hasName && formCtx?.inputs[_name]?.ok === false;
    const errText = isErr && formCtx.reporting ? (errorText ?? (formCtx?.inputs[_name]?.error || "")) : "";
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

    const inp = childElement ? cloneElement(childElement, inpProps) : children;

    const rootClass = cn("flex flex-col", collapse(withGap.gap, gap), rootProps.className);
    const wrapperClass = cn("flex items-center", collapse(withGap.gap, horizontalGap));

    const helperTexts =
        !!helperText || !!errText ? (
            <div className="space-y-2">
                {helperText && (
                    <p
                        {...helperTextProps}
                        className={cn("text-sm text-t-3 mt-0", helperTextProps?.className)}
                    >
                        {helperText}
                    </p>
                )}
                {errText && <ErrorText {...errorTextProps}>{errText}</ErrorText>}
            </div>
        ) : null;

    const lbl = label ? (
        mimic ? (
            <span>
                {label}
                {requiredHint && " *"}
            </span>
        ) : (
            <Label
                htmlFor={id}
                {...labelProps}
                className={cn(labelWidth !== undefined ? "" : undefined, labelProps?.className)}
                style={labelWidth !== undefined ? { width: labelWidth } : undefined}
            >
                {label}
                {requiredHint && " *"}
            </Label>
        )
    ) : null;

    const { className: _cls, ...divProps } = rootProps;

    if (horizontal) {
        return (
            <div ref={ref} className={rootClass} {...divProps}>
                <div className={wrapperClass}>
                    {lbl}
                    {inp}
                </div>
                {helperTexts}
            </div>
        );
    } else {
        return (
            <div ref={ref} className={rootClass} {...divProps}>
                {lbl}
                {inp}
                {helperTexts}
            </div>
        );
    }
};
