import React, { ReactElement } from "react";
import type { LinkProps, StyleProps } from "../../types";
import { styleProps } from "../../util";

export interface LinkContainerProps extends LinkProps, StyleProps {
    href: string | undefined;
    disabled?: boolean;
    renderLink?: ReactElement<LinkProps>;
}

const LinkContainer = React.forwardRef<HTMLAnchorElement | HTMLDivElement, LinkContainerProps>(
    (props, ref) => {
        if (!props.href || props.disabled)
            return (
                <div ref={ref as any} {...styleProps(props)} onClick={props.onClick} role="link">
                    {props.children}
                </div>
            );

        if (props.renderLink) {
            const p = {
                ...props,
                ...props.renderLink.props,
                ...styleProps(props, props.renderLink.props as any),
                ref,
            };
            delete p.renderLink;
            return React.cloneElement(props.renderLink as any, p);
        }

        return (
            <a
                target={props.target}
                download={props.download}
                ref={ref as any}
                onClick={props.onClick}
                href={props.href}
                {...styleProps({ className: "inline no-underline color-unset pointer-events-auto" }, props)}
            >
                {props.children}
            </a>
        );
    }
);

LinkContainer.displayName = "LinkContainer";

export default LinkContainer;
