"use client";

import { type ElementType } from "react";
import { createTheme } from "flowbite-react/helpers/create-theme";
import type { BaseTheme, TProps, WithMargin } from "../../util/style.js";
import { withMargin } from "../../util/style.js";
import type { FlowbiteBoolean } from "flowbite-react/types";
import type { RichAsProps } from "../../types/index.js";
import { Icon, type IconLike, type IconProps } from "../icons/icon.js";
import { useResolveT } from "../../hooks/index.js";

declare module "flowbite-react/types" {
    interface FlowbiteTheme {
        title: TitleTheme;
    }

    interface FlowbiteProps {
        title: Partial<WithoutThemingProps<TitleProps>>;
    }
}

export interface TitleTheme extends BaseTheme, WithMargin {
    variant: Record<"h1" | "h2" | "h3" | "h4" | "h5", string>;
    underline: FlowbiteBoolean;
    truncate: FlowbiteBoolean;
    bold: FlowbiteBoolean;
    flex: FlowbiteBoolean;
}

const title = createTheme<TitleTheme>({
    base: "",
    variant: {
        h1: "text-2xl gap-4.5",
        h2: "text-xl gap-4",
        h3: "text-lg gap-3.5",
        h4: "text-base gap-3",
        h5: "text-sm gap-2.5",
    },
    underline: {
        on: "underline",
        off: "",
    },
    truncate: {
        on: "truncate",
        off: "",
    },
    bold: {
        on: "font-semibold",
        off: "font-medium",
    },
    flex: {
        on: "flex items-center",
        off: "",
    },
    ...withMargin,
    defaultVariants: {
        variant: "h1",
        bold: false,
    },
});

export type TitleProps<T extends ElementType = "h1"> = RichAsProps<T> &
    TProps<TitleTheme> & {
        icon?: IconLike;
        iconProps?: IconProps;
        variant?: "h1" | "h2" | "h3" | "h4" | "h5";
    };

/**
 * ### Props
 * - `variant`
 * - `underline`
 */
export const Title = <T extends ElementType = "h1">(props: TitleProps<T>) => {
    const { className, restProps, children } = useResolveT("title", title, {
        ...props,
        flex: !!props.icon,
    });
    const { as, variant, icon, iconProps, ...rootProps } = restProps;
    const Comp: any = as || variant || "h1";

    return (
        <Comp className={className} {...rootProps}>
            {icon && <Icon {...iconProps}>{icon}</Icon>}
            {children}
        </Comp>
    );
};
