import { collapse } from "u/src/helpers";
import clsx from "clsx";

interface LabelProps {
    htmlFor?: string;
    className?: string;
    required?: boolean;
    children?: React.ReactNode;
    error?: boolean;
    /** @default "form_control" */
    variant?: "form_control" | "caption";
}

/**
 * @css
 */
export default function Label(props: LabelProps) {
    const variantClasses = collapse(props.variant || "form_control", {
        form_control: [],
        caption: ["text-[12px] text-text-secondary"],
    });
    const hintError = !!props.error;

    return (
        <label className={clsx("Label text-text-secondary", variantClasses, props.className)} htmlFor={props.htmlFor}>
            {props.children}
            {props.required && <span className={hintError ? "text-error" : ""}> *</span>}
        </label>
    );
}
