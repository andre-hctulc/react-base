import { collapse, styleProps } from "../../util";
import { StyleProps } from "../../types";

interface LabelProps extends StyleProps {
    htmlFor?: string;
    className?: string;
    required?: boolean;
    children?: React.ReactNode;
    error?: boolean;
    /** @default "form_control" */
    variant?: "form_control" | "caption";
}

export default function Label(props: LabelProps) {
    const variantClasses = collapse(props.variant || "form_control", {
        form_control: [],
        caption: ["text-[12px] text-text-secondary"],
    });
    const hintError = !!props.error;

    return (
        <label
            {...styleProps({ className: ["Label text-text-secondary", variantClasses] }, props)}
            htmlFor={props.htmlFor}
        >
            {props.children}
            {props.required && <span className={hintError ? "text-error" : ""}> *</span>}
        </label>
    );
}
