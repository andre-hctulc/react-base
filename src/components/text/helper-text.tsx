// * SSR

import LongText from "@react-client/components/text/long-text";
import clsx from "clsx";
import { PropsOf } from "@react-client/types";

interface HelperTextProps {
    error?: boolean;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    errorMessage?: string;
    /** @default "caption" */
    variant?: PropsOf<typeof LongText>["variant"];
}

// TODO HTMLElement legend?

export default function HelperText(props: HelperTextProps) {
    if (!props.children && !props.errorMessage) return null;

    return (
        <LongText
            variant={props.variant || "caption"}
            className={clsx("pt-1 pl-1", props.error ? "text-error-light" : "text-text-secondary", props.className)}
            style={props.style}
        >
            {props.error ? props.errorMessage || props.children : props.children}
        </LongText>
    );
}
