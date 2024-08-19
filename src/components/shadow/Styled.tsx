import React, { Children } from "react";
import type { StyleProps } from "../../types";
import clsx from "clsx";

interface StyledProps extends StyleProps {
    size?: number;
    children: React.ReactElement;
    color?: "text_secondary" | "disabled";
    onClick?: React.MouseEventHandler;
    disabled?: boolean;
}

const Styled = React.forwardRef<SVGElement, StyledProps>((props, ref) => {
    const { style, className } = {
        style: { ...props.children.props.style, ...props.style },
        className: clsx(props.children.props.className, props.className),
    };
    const newProps: StyledProps = { ...props.children.props };
    if (props.size !== undefined) newProps.size = props.size;
    if (props.className) newProps.className = className;
    if (props.style) newProps.style = style;
    if (props.color) newProps.color = props.color;
    if (props.onClick)
        newProps.onClick = (e, ...args) => {
            props.children.props.onClick?.(e, ...args);
            props.onClick?.(e);
        };
    if (props.disabled !== undefined) newProps.disabled = props.disabled;
    const cloned = React.cloneElement(props.children, { ...newProps, ref });
    return cloned;
});

Styled.displayName = "Styled";

export default Styled;
