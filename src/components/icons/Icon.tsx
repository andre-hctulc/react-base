import React from "react";
import type { DragEventProps, MouseEventProps, ParentProps, StyleProps, ThemeColor } from "../../types";
import { eventProps, getSize, styleProps, themeColor } from "../../util";

export type IconSize = number | "small" | "medium" | "large";

export const iconSizeMap = { small: 18, medium: 22, large: 26 };

export interface IconProps
    extends StyleProps,
        ParentProps<React.ReactElement>,
        MouseEventProps<Element>,
        DragEventProps<Element> {
    size?: IconSize;
    color?: ThemeColor | "text_secondary" | "disabled";
    disabled?: boolean;
    block?: boolean;
    /** degrees (0-360) */
    rotate?: number;
}

const Icon = React.forwardRef<SVGElement, IconProps & { children: React.ReactElement }>((props, ref) => {
    const { text } = props.color
        ? props.color === "text_secondary"
            ? { text: "text-text-secondary" }
            : props.color === "disabled"
            ? { text: "text-text-disabled" }
            : themeColor(props.color)
        : { text: null };
    const size = getSize(props.size || "medium", iconSizeMap);

    return React.cloneElement(props.children, {
        ref,
        draggable: props.draggable,
        ...eventProps(props),
        ...styleProps({
            className: [
                "flex-shrink-0 transition-all",
                props.block ? "block" : "inline-block",
                props.disabled ? "text-text-disabled" : text,
                props.className,
                props.children.props.className,
            ],
            style: {
                width: size,
                height: size,
                rotate: props.rotate !== undefined ? props.rotate + "deg" : undefined,
                ...props.style,
                ...props.children.props.style,
            },
        }),
    });
});

Icon.displayName = "Icon";

export default Icon;
