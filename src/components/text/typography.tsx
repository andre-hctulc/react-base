"use client";

import { createTheme } from "flowbite-react/helpers/create-theme";
import type { BaseTheme, TProps } from "../../util/style.js";
import type { FlowbiteBoolean, FlowbiteSizes } from "flowbite-react/types";
import type { RichAsProps } from "../../types/index.js";
import { useResolveT } from "../../hooks/index.js";
import type { ElementType } from "react";

declare module "flowbite-react/types" {
    interface FlowbiteTheme {
        typography: TypographyTheme;
    }

    interface FlowbiteProps {
        typography: Partial<WithoutThemingProps<TypographyProps>>;
    }
}

export interface TypographyTheme extends BaseTheme {
    variant: Record<"primary" | "secondary" | "tertiary" | "quaternary", string>;
    size: FlowbiteSizes & { base: string };
    center: FlowbiteBoolean;
    underline: FlowbiteBoolean;
    italic: FlowbiteBoolean;
    lineHeight: Record<"none" | "tight" | "snug" | "normal" | "relaxed" | "loose", string>;
}

const typography = createTheme<TypographyTheme>({
    base: "",
    variant: {
        primary: "text-base text-t1",
        secondary: "text-sm text-t2",
        tertiary: "text-sm text-t3",
        quaternary: "text-xs text-t4",
    },
    size: {
        xs: "text-xs",
        sm: "text-sm",
        base: "text-base",
        md: "text-md",
        lg: "text-lg",
        xl: "text-xl",
        "2xl": "text-2xl",
        "3xl": "text-3xl",
        "4xl": "text-4xl",
        "5xl": "text-5xl",
        "6xl": "text-6xl",
        "7xl": "text-7xl",
    },
    center: {
        on: "text-center",
        off: "",
    },
    underline: {
        on: "underline",
        off: "",
    },
    italic: {
        on: "italic",
        off: "",
    },
    lineHeight: {
        none: "",
        tight: "leading-tight",
        snug: "leading-snug",
        normal: "leading-normal",
        relaxed: "leading-relaxed",
        loose: "leading-loose",
    },
});

export type TypographyProps<T extends ElementType = "p"> = RichAsProps<T> & TProps<TypographyTheme> & {};

/**
 * Text. Used across components to consistently style text.
 */
export const Typography = <T extends ElementType = "p">(props: TypographyProps<T>) => {
    const { className, children, restProps } = useResolveT("typography", typography, props);
    const { as, ...rootProps } = restProps;
    const Comp: any = as || "p";

    return (
        <Comp className={className} {...rootProps}>
            {children}
        </Comp>
    );
};
