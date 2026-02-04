"use client";

import { createTheme } from "flowbite-react/helpers/create-theme";
import type { BaseTheme, TProps, WithLineClamp, WithMargin } from "../../util/style.js";
import { withLineClamp, withMargin } from "../../util/style.js";
import type { RichAsProps } from "../../types/index.js";
import { useResolveT } from "../../hooks/index.js";
import type { ElementType } from "react";

declare module "flowbite-react/types" {
    interface FlowbiteTheme {
        colorText: ColorTextTheme;
    }

    interface FlowbiteProps {
        colorText: Partial<WithoutThemingProps<ColorTextProps>>;
    }
}

export interface ColorTextTheme extends BaseTheme, WithMargin, WithLineClamp {
    size: Record<"sm" | "base", string>;
    color: Record<"error" | "success" | "warning" | "info", string>;
}

const colorText = createTheme<ColorTextTheme>({
    base: "",
    size: {
        sm: "text-sm",
        base: "text-base",
    },
    color: {
        error: "text-error",
        success: "text-success",
        warning: "text-warning",
        info: "text-info",
    },
    ...withMargin,
    ...withLineClamp,
    defaultVariants: {
        size: "sm",
        color: "info",
    },
});

export type ColorTextProps<T extends ElementType = "p"> = RichAsProps<T> & TProps<ColorTextTheme> & {};

export const ColorText = <T extends ElementType = "p">(props: ColorTextProps<T>) => {
    const { className, children, restProps } = useResolveT("colorText", colorText, props);
    const { name, as, ...rootProps } = restProps;
    const Comp: any = as || "p";

    return (
        <Comp className={className} {...rootProps}>
            {children}
        </Comp>
    );
};
