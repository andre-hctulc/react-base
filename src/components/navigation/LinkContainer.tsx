import clsx from "clsx";
import React, { ReactElement } from "react";
import type { LinkProps } from "../../types";

export type LinkContainerProps = LinkProps & {
    href: string | undefined;
    style?: React.CSSProperties;
    disabled?: boolean;
    renderLink?: ReactElement<LinkProps>;
};

const LinkContainer = React.forwardRef<HTMLAnchorElement | HTMLDivElement, LinkContainerProps>((props, ref) => {
    if (!props.href || props.disabled)
        return (
            <div
                className={clsx("inline no-underline color-unset pointer-events-auto", props.className)}
                ref={ref as any}
                style={props.style}
                onClick={props.onClick}
                role="link"
            >
                {props.children}
            </div>
        );

    if (props.renderLink) {
        const p = { ...props, ...props.renderLink.props, ref };
        delete p.renderLink;
        return React.cloneElement(props.renderLink as any, p);
    }

    return (
        <a target={props.target} download={props.download} ref={ref as any} onClick={props.onClick} href={props.href} style={props.style} className={props.className}>
            {props.children}
        </a>
    );
});

LinkContainer.displayName = "LinkContainer";

export default LinkContainer;
