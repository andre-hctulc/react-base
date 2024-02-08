import React from "react";
import clsx from "clsx";
import { XSize, ThemeColor } from "../../types";

interface StyledProps {
    className?: string;
    style?: React.CSSProperties;
    size?: XSize | number;
    children: React.ReactElement;
    color?: ThemeColor | "text_secondary" | "disabled";
    onClick?: React.MouseEventHandler;
    disabled?: boolean;
}

const Styled = React.forwardRef<SVGElement, StyledProps>((props, ref) => {
    const newProps: StyledProps = { ...props.children.props };
    if (props.size !== undefined) newProps.size = props.size;
    if (props.className) newProps.className = clsx(props.children.props.className, props.className);
    if (props.style) newProps.style = { ...props.children.props.style, ...props.style };
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
