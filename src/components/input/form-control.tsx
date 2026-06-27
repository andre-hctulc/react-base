"use client";

import { cloneElement, isValidElement, useId, type FC, type ReactElement, type ReactNode } from "react";
import type { PartialPropsOf, RefProps, StyleProps } from "../../types/index.js";
import { ErrorText } from "../text/error-text.js";
import { createTheme, HelperText, Label } from "flowbite-react";
import { withGap, type BaseTheme, type TProps, type WithGap } from "../../util/style.js";
import { useResolveT } from "../../hooks/index.js";
import type { FlowbiteBoolean } from "flowbite-react/types";
import { useJSForm } from "./js-form-context.js";

declare module "flowbite-react/types" {
    interface FlowbiteTheme {
        formControl: FormControlTheme;
    }

    interface FlowbiteProps {
        formControl: Partial<WithoutThemingProps<FormControlProps>>;
    }
}

export interface FormControlTheme {
    root: BaseTheme &
        WithGap & {
            horizontal: FlowbiteBoolean;
        };
    body: BaseTheme & WithGap & {};
}

const formControl = createTheme<FormControlTheme>({
    root: {
        base: "flex",
        horizontal: {
            on: "",
            off: "flex-col",
        },
        ...withGap,
        defaultVariants: {
            gap: "sm",
            horizontal: "off",
        },
    },
    body: {
        base: "flex flex-col",
        ...withGap,
        defaultVariants: {
            gap: "md",
            horizontal: "off",
        },
    },
});

export type FormControlProps = TProps<FormControlTheme> &
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
    };

/**
 * Wraps an input element with a label, error message and helper text.
 *
 * Consumes {@link JSFormContext}, to handle {@link JSForm} default value state.
 */
export const FormControl: FC<FormControlProps> = (props) => {
    const { classNames, restProps, children } = useResolveT("formControl", formControl, props);
    const {
        noError,
        errorText,
        controlled,
        mimic,
        ref,
        name,
        label,
        helperText,
        helperTextProps,
        helperTextTop,
        errorTextProps,
        requiredHint,
        labelProps,
        ...rootProps
    } = restProps;
    const formCtx = useJSForm();
    const _name = name !== undefined ? `${formCtx?.namesPrefix ?? ""}${name}` : undefined;
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
        <div className={classNames.body}>
            {helperText && helperTextTop && <HelperText {...helperTextProps}>{helperText}</HelperText>}
            {childElement ? cloneElement(childElement, inpProps) : children}
            {helperText && !helperTextTop && <HelperText {...helperTextProps}>{helperText}</HelperText>}
            {errText && <ErrorText {...errorTextProps}>{errText}</ErrorText>}
        </div>
    );
    const lbl =
        label &&
        (mimic ? (
            <span>
                {label}
                {requiredHint && ` *`}
            </span>
        ) : (
            <Label htmlFor={id} {...labelProps}>
                {label}
                {requiredHint && ` *`}
            </Label>
        ));

    return (
        <div ref={ref} className={classNames.root} {...rootProps}>
            {lbl}
            {body}
        </div>
    );
};
