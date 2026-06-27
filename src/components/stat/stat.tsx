"use client";

import { twMerge } from "flowbite-react/helpers/tailwind-merge";
import { useMemo, type ElementType } from "react";
import { createTheme } from "flowbite-react";
import {
    shadow,
    shape,
    withBorder,
    withFit,
    type BaseTheme,
    type TProps,
    type WithBorder,
    type WithColor,
    type WithFit,
    type WithShadow,
    type WithShape,
    type WithSize,
} from "../../util/style.js";
import { useRefOf, useResolveT } from "../../hooks/index.js";
import type { PropsOf, LinkComponent, LinkProps, RichAsProps } from "../../types/index.js";
import { Icon, type IconLike } from "../icons/icon.js";
import { Skeleton } from "../skeleton/skeleton.js";

declare module "flowbite-react/types" {
    interface FlowbiteTheme {
        stat: StatTheme;
    }

    interface FlowbiteProps {
        stat: Partial<WithoutThemingProps<StatProps>>;
    }
}

export interface StatTheme
    extends BaseTheme,
        WithShape,
        WithShadow,
        WithBorder,
        WithFit,
        WithSize,
        WithColor {}

const stat = createTheme<StatTheme>({
    base: "bg-paper2 rounded-lg",
    shadow,
    shape,
    ...withBorder,
    ...withFit,
    size: {
        xs: "text-xs p-1",
        sm: "text-sm p-2",
        md: "text-base p-2.5",
        lg: "text-lg p-3",
        xl: "text-xl p-4",
        "2xl": "text-2xl p-5",
        "3xl": "text-3xl p-6",
        "4xl": "text-4xl p-7",
        "5xl": "text-5xl p-8",
        "6xl": "text-6xl p-9",
        "7xl": "text-7xl p-20",
    },
    color: {
        default: "",
        blue: "bg-blue-50 text-blue-700",
        red: "bg-red-50 text-red-700",
        green: "bg-green-50 text-green-700",
        yellow: "bg-yellow-50 text-yellow-700",
        purple: "bg-purple-50 text-purple-700",
        pink: "bg-pink-50 text-pink-700",
        gray: "bg-gray-50 text-gray-700",
        primary: "bg-primary-50 text-primary-700",
        secondary: "bg-secondary-50 text-secondary-700",
        success: "bg-success-50 text-success-700",
        danger: "bg-danger-50 text-danger-700",
        error: "bg-error-50 text-error-700",
        warning: "bg-warning-50 text-warning-700",
        info: "bg-info-50 text-info-700",
        light: "bg-light-50 text-light-700",
        dark: "bg-dark-50 text-dark-700",
        cyan: "bg-cyan-50 text-cyan-700",
        teal: "bg-teal-50 text-teal-700",
        indigo: "bg-indigo-50 text-indigo-700",
        failure: "bg-failure-50 text-failure-700",
        lime: "bg-lime-50 text-lime-700",
    },
    defaultVariants: {
        fitWidth: true,
        border: true,
        size: "md",
    },
});

type StatProps<T extends ElementType = "div"> = RichAsProps<T> &
    TProps<StatTheme> & {
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
    const { className, restProps } = useResolveT("stat", stat, props);
    const {
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
        ...rootProps
    } = restProps;

    const MainComp: any = as || (href ? LinkComponent || "a" : "div");
    const Comp: any = restProps.as || "div";
    const valueParserRef = useRefOf(valueParser);
    const val = useMemo(() => {
        return valueParserRef.current ? valueParserRef.current(value) : String(value);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);
    const isDefaultColor = !props.color || props.color === "default";
    const mainProps: any = { ...textProps };

    if (href) {
        Object.assign(mainProps, linkProps);
        mainProps.href = href;
    }

    return (
        <Comp className={className} {...rootProps}>
            <MainComp {...mainProps} className={twMerge("font-medium text-[1em]", textProps?.className)}>
                {icon && (
                    <Icon
                        color={isDefaultColor ? "neutral" : "inherit"}
                        inline
                        {...iconProps}
                        className={twMerge("mr-2", iconProps?.className)}
                    >
                        {icon}
                    </Icon>
                )}
                {loading ? (
                    <Skeleton as="span" {...skeletonProps}>
                        {<span className="text-[1.8em]">...</span>}
                    </Skeleton>
                ) : (
                    <span className="text-[1.8em]">{val}</span>
                )}
                {unit && (
                    <span {...unitProps} className={twMerge("ml-1 text-[1.2em]", unitProps?.className)}>
                        {unit}
                    </span>
                )}
            </MainComp>
            {description && (
                <p
                    {...descriptionProps}
                    className={twMerge(
                        "text-[0.9em]",
                        isDefaultColor && "text-t2",
                        descriptionProps?.className
                    )}
                >
                    {description}
                </p>
            )}
            {children}
        </Comp>
    );
};
