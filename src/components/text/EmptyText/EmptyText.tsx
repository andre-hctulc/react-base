import React from "react";
import Typography from "../Typography/Typography";
import { PropsOf } from "@react-client/types";

interface EmptyTextProps {
    className?: string;
    style?: React.CSSProperties;
    /** @default "body2" */
    variant?: PropsOf<typeof Typography>["variant"];
    children?: string;
    /** @default "i" */
    tag?: string;
    center?: boolean;
    alignCenter?: boolean;
    italic?: boolean;
}

const EmptyText = React.forwardRef<HTMLElement, EmptyTextProps>((props, ref) => {
    return (
        <Typography
            ref={ref}
            alignCenter={props.alignCenter}
            center={props.center}
            variant={props.variant || "body2"}
            tag={props.tag || "i"}
            disabled
            className={props.className}
            style={props.style}
            italic={props.italic}
        >
            {props.children}
        </Typography>
    );
});

EmptyText.displayName = "EmptyText";

export default EmptyText;
