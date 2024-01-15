// * SSR

import { collapse } from "@client-util/helpers";
import clsx from "clsx";

interface LabelProps {
    htmlFor?: string;
    className?: string;
    noMargin?: boolean;
    noMarginTop?: boolean;
    required?: boolean;
    hint?: boolean;
    children?: React.ReactNode;
    requiredError?: boolean;
    /** @default "form_control" */
    variant?: "form_control" | "caption";
}

export default function Label(props: LabelProps) {
    const variantClasses = collapse(props.variant || "form_control", {
        form_control: [!props.noMargin && "mb-1", !props.noMargin && !props.noMarginTop && "mt-3"],
        caption: ["text-[12px] text-text-secondary", [!props.noMargin && !props.noMarginTop && "mt-2"]],
    });
    const classes = clsx("Label text-text-secondary", variantClasses, props.className);

    return (
        <label className={classes} htmlFor={props.htmlFor}>
            {props.children}
            {props.required && <span className={props.required && props.requiredError && props.hint ? "text-error" : ""}> *</span>}
        </label>
    );
}
