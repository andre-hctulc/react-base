import clsx from "clsx";
import React from "react";
import { LinkComponentProps } from "../../../types";

export type LinkContainerProps<L extends LinkComponentProps = LinkComponentProps> = {
    /** @default "a" */
    linkComponent?: React.ComponentType<L>;
} & L;

// TODO Always render Link and disable if href undefined

const LinkContainer = React.forwardRef<HTMLAnchorElement | HTMLDivElement, LinkContainerProps>((props, ref) => {
    if (!props.href || props.disabled)
        return (
            <div
                className={clsx("no-underline color-unset pointer-events-auto", props.className)}
                ref={ref as any}
                style={props.style}
                onClick={props.onClick}
                role="link"
            >
                {props.children}
            </div>
        );

    const Link = props.linkComponent || "a";
    const p = { ...props };
    delete p.linkComponent;

    return <Link {...p}>{props.children}</Link>;
});

LinkContainer.displayName = "LinkContainer";

export default LinkContainer;
