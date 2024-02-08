import clsx from "clsx";
import React from "react";
import { ThemeColor } from "../../types";
import { themeColor } from "../../util";

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

export interface IconProps {
    className?: string;
    style?: React.CSSProperties;
    size?: IconSize;
    color?: ThemeColor | "text_secondary" | "disabled";
    onClick?: React.MouseEventHandler<SVGSVGElement>;
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
    const classes = clsx(
        "flex-shrink-0 transition",
        props.inline && "inline",
        getSizeClasses(props.size || "small"),
        props.disabled ? "text-text-disabled" : text,
        props.className,
        props.children.props.className
    );

    return React.cloneElement(props.children, {
        ref,
        className: classes,
        style: { ...sizeStyle, transform: props.rotate ? `rotate(${props.rotate}deg)` : undefined, ...props.style, ...props.children.props.style },
        onClick: props.onClick || props.children.props.onClick,
    });
});

Icon.displayName = "Icon";

export default Icon;
