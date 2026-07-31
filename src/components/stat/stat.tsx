"use client";

import { cn } from "@/util/cn.js";
import { collapse } from "@dre44/util/objects";
import { useMemo, type ElementType } from "react";
import { shadow, withBorder } from "../../util/style.js";
import { useRefOf } from "../../hooks/index.js";
import type { PropsOf, LinkComponent, LinkProps, RichAsProps } from "../../types/index.js";
import { Icon, type IconLike } from "../icons/icon.js";
import { Skeleton } from "../skeleton/skeleton.js";

const sizeMap = {
    xs: "text-xs p-1",
    sm: "text-sm p-2",
    md: "text-base p-2.5",
    lg: "text-lg p-3",
    xl: "text-xl p-4",
    "2xl": "text-2xl p-5",
} as const;

/** Simplified semantic color map */
const colorMap = {
    default: "",
    primary: "bg-primary-50 text-primary-700",
    secondary: "bg-secondary-50 text-secondary-700",
    success: "bg-success-50 text-success-700",
    error: "bg-error-50 text-error-700",
    danger: "bg-danger-50 text-danger-700",
    warning: "bg-warning-50 text-warning-700",
    info: "bg-info-50 text-info-700",
    blue: "bg-blue-50 text-blue-700",
    green: "bg-green-50 text-green-700",
    red: "bg-red-50 text-red-700",
    gray: "bg-gray-50 text-gray-700",
} as const;

export type StatColor = keyof typeof colorMap;
export type StatSize = keyof typeof sizeMap;

type StatProps<T extends ElementType = "div"> = RichAsProps<T> & {
    size?: StatSize;
    color?: StatColor;
    shadow?: keyof typeof shadow;
    border?: boolean | keyof typeof withBorder.border;
    fitWidth?: boolean;
    fitHeight?: boolean;
    valueParser?: (value: any) => string;
    value: any;
    description?: string;
    descriptionProps?: PropsOf<"p">;
    textProps?: PropsOf<"p">;
    icon?: IconLike;
    loading?: boolean;
    LinkComponent?: LinkComponent;
    linkProps?: LinkProps;
    href?: string;
    skeletonProps?: PropsOf<typeof Skeleton>;
    unit?: string;
    iconProps?: PropsOf<typeof Icon>;
    unitProps?: PropsOf<"span">;
};

/**
 * ### Props
 * - `value`
 * - `description`
 * - `valueParser`
 * - `loading`
 * - `as`
 * - `href`
 * - `LinkComponent`
 */
export const Stat = <T extends ElementType = "div">(props: StatProps<T>) => {
    const {
        size = "md",
        color,
        shadow: sh,
        border = true,
        fitWidth = true,
        fitHeight,
        valueParser,
        value,
        description,
        descriptionProps,
        textProps,
        icon,
        loading,
        linkProps,
        children,
        href,
        LinkComponent,
        as,
        skeletonProps,
        unit,
        unitProps,
        iconProps,
        className,
        ...rootProps
    } = props as any;

    const Comp: any = as || "div";
    const MainComp: any = as || (href ? LinkComponent || "a" : "div");
    const valueParserRef = useRefOf(valueParser);
    const val = useMemo(() => {
        return valueParserRef.current ? valueParserRef.current(value) : String(value);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);
    const isDefaultColor = !color || color === "default";
    const mainProps: any = { ...textProps };

    if (href) {
        Object.assign(mainProps, linkProps);
        mainProps.href = href;
    }

    return (
        <Comp
            className={cn(
                "bg-paper-2 rounded-lg",
                collapse(sizeMap, size),
                color && collapse(colorMap, color!),
                sh && collapse(shadow, sh!),
                border === true
                    ? withBorder.border.on
                    : border && typeof border === "string"
                      ? (withBorder.border as any)[border]
                      : undefined,
                fitWidth && "w-fit",
                fitHeight && "h-fit",
                className,
            )}
            {...rootProps}
        >
            <MainComp {...mainProps} className={cn("font-medium text-[1em]", textProps?.className)}>
                {icon && (
                    <Icon
                        color={isDefaultColor ? "neutral" : "inherit"}
                        inline
                        {...iconProps}
                        className={cn("mr-2", iconProps?.className)}
                    >
                        {icon}
                    </Icon>
                )}
                {loading ? (
                    <Skeleton as="span" {...skeletonProps}>
                        <span className="text-[1.8em]">...</span>
                    </Skeleton>
                ) : (
                    <span className="text-[1.8em]">{val}</span>
                )}
                {unit && (
                    <span {...unitProps} className={cn("ml-1 text-[1.2em]", unitProps?.className)}>
                        {unit}
                    </span>
                )}
            </MainComp>
            {description && (
                <p
                    {...descriptionProps}
                    className={cn(
                        "text-[0.9em]",
                        isDefaultColor && "text-t-2",
                        descriptionProps?.className,
                    )}
                >
                    {description}
                </p>
            )}
            {children}
        </Comp>
    );
};
