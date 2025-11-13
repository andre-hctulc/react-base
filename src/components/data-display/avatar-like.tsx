"use client";

import { type ElementType, type FC } from "react";
import type { RichAsProps } from "../../types/index.js";
import {
    shadow,
    shape,
    withBorder,
    withPadding,
    type BaseTheme,
    type WithBorder,
    type NoneOption,
    type WithPadding,
    type WithShadow,
    type WithShape,
    type TProps,
} from "../../util/style.js";
import type { FlowbiteBoolean, FlowbiteColors, FlowbiteSizes } from "flowbite-react/types";
import { createTheme } from "flowbite-react";
import { useResolveT } from "../../hooks/index.js";
declare module "flowbite-react/types" {
    interface FlowbiteTheme {
        avatarLike: AvatarLikeTheme;
    }

    interface FlowbiteProps {
        avatarLike: Partial<WithoutThemingProps<AvatarLikeProps>>;
    }
}

export interface AvatarLikeTheme extends BaseTheme, WithShape, WithBorder, WithPadding, WithShadow {
    bold: FlowbiteBoolean;
    color: FlowbiteColors;
    size: FlowbiteSizes & NoneOption;
}

const avatarLike = createTheme<AvatarLikeTheme>({
    base: "flex items-center justify-center overflow-hidden shrink-0 aspect-square transition",
    shape,
    color: {
        default: "bg-paper2 text-t2",
        dark: "bg-paper3 text-t3",
        primary: "bg-primary text-primary-contrast",
        secondary: "bg-secondary text-secondary-contrast",
        success: "bg-success text-success-contrast",
        warning: "bg-warning text-warning-contrast",
        error: "bg-error text-error-contrast",
        info: "bg-info text-info-contrast",
        neutral: "bg-neutral text-neutral-contrast",
        accent: "bg-accent text-accent-contrast",
        blue: "bg-blue-500 text-white",
        red: "bg-red-500 text-white",
        green: "bg-green-500 text-white",
        yellow: "bg-yellow-500 text-white",
        cyan: "bg-cyan-500 text-white",
        purple: "bg-purple-500 text-white",
        failure: "bg-failure text-failure-contrast",
        gray: "bg-gray-500 text-white",
        indigo: "bg-indigo-500 text-white",
        light: "bg-light text-light-contrast",
        lime: "bg-lime-500 text-white",
        pink: "bg-pink-500 text-white",
        teal: "bg-teal-500 text-white",
    },
    size: {
        xs: "size-6 text-sm",
        sm: "size-8 text-base",
        md: "size-10 text-lg",
        lg: "size-14 text-xl",
        xl: "size-16 text-2xl",
        "2xl": "size-20 text-3xl",
        "3xl": "size-24 text-4xl",
        "4xl": "size-32 text-5xl",
        "5xl": "size-40 text-6xl",
        "6xl": "size-48 text-7xl",
        "7xl": "size-56 text-7xl",
        none: "",
    },
    ...withBorder,
    ...withPadding,
    bold: {
        on: "font-medium",
        off: "",
    },
    shadow,
    defaultVariants: {
        shape: "circle",
        color: "default",
        size: "md",
    },
});

type AvatarLikeProps<T extends ElementType = "div"> = TProps<AvatarLikeTheme> &
    RichAsProps<T> & {
        alt?: string;
    };

/**
 * An avatar variant, that is more flexible than the flowbite `Avatar` component, allowing any content inside.
 */
export const AvatarLike: FC<AvatarLikeProps> = (props) => {
    const { className, children, restProps } = useResolveT("avatarLike", avatarLike, props);
    const { as, onClick, ...rootProps } = restProps;
    const Comp: any = as || "div";

    return (
        <Comp onClick={onClick} className={className} {...rootProps}>
            {children}
        </Comp>
    );
};
