"use client";

import { type ElementType, type ReactNode } from "react";
import { createTheme } from "flowbite-react/helpers/create-theme";
import type { PropsOf, RichAsProps } from "../../types/index.js";
import { Icon, type IconLike, type IconProps } from "../icons/icon.js";
import { twMerge } from "flowbite-react/helpers/tailwind-merge";
import {
    withLineClamp,
    withMargin,
    type BaseTheme,
    type TProps,
    type WithLineClamp,
    type WithMargin,
} from "../../util/style.js";
import type { FlowbiteBoolean } from "flowbite-react/types";
import { useResolveT } from "../../hooks/index.js";

declare module "flowbite-react/types" {
    interface FlowbiteTheme {
        subtitle: SubtitleTheme;
    }

    interface FlowbiteProps {
        subtitle: Partial<WithoutThemingProps<SubtitleProps>>;
    }
}

export interface SubtitleTheme extends BaseTheme, WithMargin, WithLineClamp {
    variant: Record<"h2" | "h3" | "h4" | "h5", string>;
    underline: FlowbiteBoolean;
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
    ...withMargin,
    bold: {
        on: "font-semibold",
        off: "font-medium",
    },
    defaultVariants: {
        variant: "h2",
        bold: false,
    },
    ...withLineClamp,
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
                <Icon noShrink inline {...iconProps} className={twMerge("mr-2", iconProps?.className)}>
                    {icon}
                </Icon>
            )}
            {children}
        </Comp>
    );
};
