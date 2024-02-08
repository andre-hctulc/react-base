import clsx from "clsx";
import { PropsOf } from "../../types";
import Typography from "./Typography";

interface HelperTextProps {
    error?: boolean;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    errorMessage?: string;
    /** @default "caption" */
    variant?: PropsOf<typeof Typography>["variant"];
}

// TODO HTMLElement legend?

export default function HelperText(props: HelperTextProps) {
    if (!props.children && !props.errorMessage) return null;

    return (
        <Typography
            long
            variant={props.variant || "caption"}
            className={clsx("pt-1 pl-1", props.error ? "text-error-light" : "text-text-secondary", props.className)}
            style={props.style}
        >
            {props.error ? props.errorMessage || props.children : props.children}
        </Typography>
    );
}
