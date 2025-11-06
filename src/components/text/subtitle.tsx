"use client";

import { type ElementType, type ReactNode } from "react";
import { createTheme } from "flowbite-react/helpers/create-theme";
import type { PropsOf, RichAsProps } from "../../types/index.js";
import { Icon, type IconLike, type IconProps } from "../icons/icon.js";
import { twMerge } from "flowbite-react/helpers/tailwind-merge";
import { type BaseTheme, type TProps } from "../../util/style.js";
import type { FlowbiteBoolean } from "flowbite-react/types";
import { useResolveT } from "../../hooks/index.js";

declare module "flowbite-react/types" {
    interface FlowbiteTheme {
        subtitle: SubtitleTheme;
    }
}

export interface SubtitleTheme extends BaseTheme {
    variant: Record<"h2" | "h3" | "h4" | "h5", string>;
    underline: FlowbiteBoolean;
    my: Record<"none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl", string>;
    mt: Record<"none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl", string>;
    mb: Record<"none" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl", string>;
    bold: FlowbiteBoolean;
}

const subtitle = createTheme<SubtitleTheme>({
    base: "text-t2",
    variant: {
        h2: "text-xl",
        h3: "text-lg",
        h4: "text-base",
        h5: "text-sm",
    },
    underline: {
        on: "underline",
        off: "",
    },
    my: {
        none: "",
        xs: "my-1",
        sm: "my-2",
        md: "my-4",
        lg: "my-7",
        xl: "my-12",
        "2xl": "my-16",
        "3xl": "my-22",
    },
    mt: {
        none: "",
        xs: "mt-1",
        sm: "mt-2",
        md: "mt-4",
        lg: "mt-7",
        xl: "mt-12",
        "2xl": "mt-16",
        "3xl": "mt-22",
    },
    mb: {
        none: "",
        xs: "mb-1",
        sm: "mb-2",
        md: "mb-4",
        lg: "mb-7",
        xl: "mb-12",
        "2xl": "mb-16",
        "3xl": "mb-22",
    },
    bold: {
        on: "font-semibold",
        off: "font-medium",
    },
    defaultVariants: {
        variant: "h2",
        bold: false,
    },
});

type SubtitleProps<T extends ElementType = "h2"> = TProps<SubtitleTheme> &
    RichAsProps<T> & {
        icon?: IconLike;
        iconProps?: IconProps;
    };

/**
 * ### Props
 * - `variant` - Heading variant (h2, h3, h4, h5)
 * - `underline` - Add underline decoration
 * - `my`, `mt`, `mb` - Margin utilities
 * - `bold` - Font weight control
 */
export const Subtitle = <T extends ElementType = "h2">(props: SubtitleProps<T>) => {
    const { className, children, restProps } = useResolveT("subtitle", subtitle, props);
    const { as, icon, iconProps, ...rootProps } = restProps;
    const Comp: any = as || props.variant || "h2";

    return (
        <Comp className={twMerge(className, icon && "flex items-center")} {...rootProps}>
            {icon && (
                <Icon size="inherit" inline {...iconProps} className={twMerge("mr-2", iconProps?.className)}>
                    {icon}
                </Icon>
            )}
            {children}
        </Comp>
    );
};
