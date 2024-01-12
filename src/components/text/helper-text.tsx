import LongText from "@react-client/components/text/long-text";
import clsx from "clsx";
import { PropsOf } from "@react-client/util";

interface HelperTextProps {
    error?: boolean;
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    /** @default "caption" */
    variant?: PropsOf<typeof LongText>["variant"];
}

export default function HelperText(props: HelperTextProps) {
    const classes = clsx("pt-1 pl-1", props.error ? "text-error-light" : "text-text-secondary", props.className);

    return (
        <LongText variant={props.variant || "caption"} className={classes} style={props.style}>
            {props.children}
        </LongText>
    );
}
