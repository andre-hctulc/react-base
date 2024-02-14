import clsx from "clsx";
import React from "react";
import type { DragEventProps, MouseEventProps, ParentProps, StyleProps, ThemeColor } from "../../types";
import { eventProps, themeColor } from "../../util";

export type IconSize = number | "small" | "medium" | "large";

const getSizeClasses = (size: IconSize | undefined) => {
    if (typeof size === "number") return "";

    switch (size) {
        case "large":
            return "w-[26px] h-[26px]";
        case "medium":
            return "w-[22px] h-[22px]";
        case "small":
            return "w-[18px] h-[18px]";
    }
};

const getSizeStyle = (size: IconSize | undefined) => {
    if (typeof size === "number") return { height: size, width: size };
};

export interface IconProps extends StyleProps, ParentProps<React.ReactElement>, MouseEventProps<SVGElement>, DragEventProps<SVGElement> {
    size?: IconSize;
    color?: ThemeColor | "text_secondary" | "disabled";
    disabled?: boolean;
    inline?: boolean;
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
    const sizeStyle = getSizeStyle(props.size);

    return React.cloneElement(props.children, {
        ref,
        className: clsx(
            "flex-shrink-0 transition",
            props.inline && "inline",
            getSizeClasses(props.size || "small"),
            props.disabled ? "text-text-disabled" : text,
            props.className,
            props.children.props.className
        ),
        style: { ...sizeStyle, transform: props.rotate ? `rotate(${props.rotate}deg)` : undefined, ...props.style, ...props.children.props.style },
        // onClick: props.onClick || props.children.props.onClick,
        draggable: props.draggable,
        ...eventProps(props),
    });
});

Icon.displayName = "Icon";

export default Icon;
