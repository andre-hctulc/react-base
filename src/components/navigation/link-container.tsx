import clsx from "clsx";
import Link from "next/link";
import React, { type AriaRole } from "react";

export interface LinkContainerProps {}

export interface LinkContainerProps {
    /** @default false */
    prefetch?: boolean;
    style?: React.CSSProperties;
    href: string | undefined | null;
    children?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLAnchorElement | HTMLDivElement>;
    download?: string;
    role?: AriaRole;
    className?: string;
    target?: React.HTMLAttributeAnchorTarget;
    disabled?: boolean;
}

// TODO Immer link rendern, diesen nur deaktivieren??

/** Renders an anchor element when href is not empty, a div otherwise.  */
const LinkContainer = React.forwardRef<HTMLAnchorElement | HTMLDivElement, LinkContainerProps>((props, ref) => {
    const classes = clsx("no-underline color-unset pointer-events-auto", props.className);

    if (!props.href || props.disabled)
        return (
            <div className={classes} ref={ref as any} style={props.style} onClick={props.onClick} role={props.role}>
                {props.children}
            </div>
        );

    return (
        <Link
            className={classes}
            target={props.target}
            download={props.download}
            prefetch={false}
            ref={ref as any}
            onClick={props.onClick}
            style={{ cursor: "pointer", ...props.style }}
            href={props.href || ""}
            role={props.role}
        >
            {props.children}
        </Link>
    );
});

LinkContainer.displayName = "LinkContainer";

export default LinkContainer;
