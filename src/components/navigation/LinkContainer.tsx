import React from "react";
import type { ChildrenProps, EventProps, StyleProps } from "../../types";
import clsx from "clsx";

export interface LinkContainerProps extends StyleProps, EventProps, ChildrenProps {
    href: string | undefined;
    disabled?: boolean;
    target?: string;
    download?: string;
}

const LinkContainer = React.forwardRef<HTMLAnchorElement | HTMLDivElement, LinkContainerProps>(
    (props, ref) => {
        if (!props.href || props.disabled)
            return (
                <div
                    ref={ref as any}
                    className={clsx(props.className)}
                    style={props.style}
                    onClick={props.onClick}
                    role="link"
                >
                    {props.children}
                </div>
            );

        return (
            <a
                target={props.target}
                download={props.download}
                ref={ref as any}
                onClick={props.onClick}
                href={props.href}
                className={clsx("inline no-underline color-unset pointer-events-auto", props.className)}
                style={props.style}
            >
                {props.children}
            </a>
        );
    }
);

LinkContainer.displayName = "LinkContainer";

export default LinkContainer;
