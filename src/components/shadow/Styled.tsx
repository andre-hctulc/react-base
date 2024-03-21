import React from "react";
import type { XSize, ThemeColor, StyleProps } from "../../types";
import { styleProps } from "../../util";

interface StyledProps extends StyleProps {
    size?: XSize | number;
    children: React.ReactElement;
    color?: ThemeColor | "text_secondary" | "disabled";
    onClick?: React.MouseEventHandler;
    disabled?: boolean;
}

const Styled = React.forwardRef<SVGElement, StyledProps>((props, ref) => {
    const { style, className } = styleProps(props.children.props, props);
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
