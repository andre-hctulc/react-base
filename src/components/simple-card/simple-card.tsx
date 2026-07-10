"use client";

import { createTheme } from "flowbite-react";
import type { PropsOf } from "../../types/index.js";
import {
    alignItems,
    flexDirection,
    flexGrow,
    withBorder,
    withHeight,
    withPadding,
    withScroll,
    type BaseTheme,
    type CompoundThemingProps,
    type ThemeProps,
    type TProps,
    type WithAlignItems,
    type WithBorder,
    type WithDefaultVariants,
    type WithFlexDirection,
    type WithGrow,
    type WithHeight,
    type WithPadding,
    type WithScroll,
    type WithSize,
} from "../../util/style.js";
import type { FC } from "react";
import { useResolveT } from "../../hooks/index.js";

declare module "flowbite-react/types" {
    interface FlowbiteTheme {
        simpleCard: SimpleCardTheme;
    }

    interface FlowbiteProps {
        simpleCard: Partial<WithoutThemingProps<SimpleCardProps>>;
    }
}

export interface SimpleCardTheme extends WithDefaultVariants {
    root: BaseTheme &
        WithBorder &
        WithPadding &
        WithAlignItems &
        WithHeight &
        WithGrow &
        WithScroll &
        WithFlexDirection &
        WithPadding &
        WithSize;
    paragraph: BaseTheme & WithSize;
    title: BaseTheme & WithSize;
}

const simpleCard = createTheme<SimpleCardTheme>({
    root: {
        base: "border border-divider bg-paper3",
        size: {
            xs: "px-2 py-1 gap-0.5",
            sm: "px-3 py-2 gap-0.5",
            md: "px-3.5 py-2.5 gap-1",
            lg: "px-4 py-3 gap-1",
            xl: "px-5 py-4 gap-1.5",
            "2xl": "px-7 py-6 gap-2",
            "3xl": "px-8 py-7 gap-2",
            "4xl": "px-9 py-8 gap-3",
            "5xl": "px-10 py-9 gap-3",
            "6xl": "px-11 py-10 gap-3",
            "7xl": "px-12 py-11 gap-3",
        },
        direction: flexDirection,
        ...withScroll,
        grow: flexGrow,
        ...withHeight,
        alignItems: alignItems,
        ...withPadding,
        ...withBorder,
        ...withPadding,
    },
    paragraph: {
        base: "text-t3 mt-1",
        size: {
            xs: "text-xs",
            sm: "text-xs",
            md: "text-sm",
            lg: "text-base",
            xl: "text-lg",
            "2xl": "text-xl",
            "3xl": "text-2xl",
            "4xl": "text-3xl",
            "5xl": "text-4xl",
            "6xl": "text-5xl",
            "7xl": "text-6xl",
        },
    },
    title: {
        base: "text-t2 font-medium",
        size: {
            xs: "text-xs",
            sm: "text-sm",
            md: "text-base",
            lg: "text-lg",
            xl: "text-xl",
            "2xl": "text-2xl",
            "3xl": "text-3xl",
            "4xl": "text-4xl",
            "5xl": "text-5xl",
            "6xl": "text-6xl",
            "7xl": "text-7xl",
        },
    },
    defaultVariants: {
        size: "md",
        shape: "rounded-md",
    },
});

interface SimpleCardProps extends PropsOf<"div">, TProps<SimpleCardTheme> {
    title?: string;
    text?: boolean;
}

/**
 * ### Props
 * - `embedded` - Controls vertical padding. Use it in combination with card header and footer
 */
export const SimpleCard: FC<SimpleCardProps> = (props) => {
    const { classNames, restProps, children } = useResolveT("simpleCard", simpleCard, props);
    const { title, text, ...rootProps } = restProps;

    return (
        <div className={classNames.root} {...rootProps}>
            {title && <h6 className={classNames.title}>{title}</h6>}
            {typeof children === "string" || text ? (
                <p className={classNames.paragraph}>{children}</p>
            ) : (
                children
            )}
        </div>
    );
};
