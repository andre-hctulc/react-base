"use client";

import { createTheme } from "flowbite-react/helpers/create-theme";
import { withTextSize, type BaseTheme, type TProps, type WithTextSize } from "../../util/style.js";
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

export interface TypographyTheme extends BaseTheme, WithTextSize {
    center: FlowbiteBoolean;
    underline: FlowbiteBoolean;
    italic: FlowbiteBoolean;
    lineHeight: Record<"none" | "tight" | "snug" | "normal" | "relaxed" | "loose", string>;
}

const typography = createTheme<TypographyTheme>({
    base: "",
    ...withTextSize,
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
