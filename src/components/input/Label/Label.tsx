// * SSR

import { collapse } from "@client-util/helpers";
import clsx from "clsx";
import { useJSForm } from "../form/JSForm/JSForm";

interface LabelProps {
    htmlFor?: string;
    className?: string;
    noMargin?: boolean;
    noMarginTop?: boolean;
    required?: boolean;
    children?: React.ReactNode;
    error?: boolean;
    /** @default "form_control" */
    variant?: "form_control" | "caption";
}

export default function Label(props: LabelProps) {
    const variantClasses = collapse(props.variant || "form_control", {
        form_control: [!props.noMargin && "mb-1", !props.noMargin && !props.noMarginTop && "mt-3"],
        caption: ["text-[12px] text-text-secondary", [!props.noMargin && !props.noMarginTop && "mt-2"]],
    });
    const form = useJSForm();
    const hintError = props.error || form?.hint;

    return (
        <label className={clsx("Label text-text-secondary", variantClasses, props.className)} htmlFor={props.htmlFor}>
            {props.children}
            {props.required && <span className={hintError ? "text-error" : ""}> *</span>}
        </label>
    );
}
