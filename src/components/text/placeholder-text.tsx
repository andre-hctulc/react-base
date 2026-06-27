"use client";

import { createTheme } from "flowbite-react/helpers/create-theme";
import type { BaseTheme, TProps, WithLineClamp, WithMargin, WithTextSize } from "../../util/style.js";
import { withLineClamp, withMargin, withTextSize } from "../../util/style.js";
import type { RichAsProps } from "../../types/index.js";
import { useResolveT } from "../../hooks/index.js";
import type { ElementType } from "react";
import type { FlowbiteBoolean } from "flowbite-react/types";

declare module "flowbite-react/types" {
    interface FlowbiteTheme {
        placeholderText: PlaceholderTextTheme;
    }

    interface FlowbiteProps {
        placeholderText: Partial<WithoutThemingProps<PlaceholderTextProps>>;
    }
}

export interface PlaceholderTextTheme extends BaseTheme, WithMargin, WithLineClamp, WithTextSize {
    variant: Record<"primary" | "secondary" | "tertiary", string>;
    italic: FlowbiteBoolean;
}

const placeholderText = createTheme<PlaceholderTextTheme>({
    base: "text-center",
    ...withTextSize,
    ...withMargin,
    ...withLineClamp,
    variant: {
        primary: "text-t2",
        secondary: "text-t3 text-sm",
        tertiary: "text-t4 text-xs",
    },
    italic: {
        on: "italic",
        off: "",
    },
    defaultVariants: {
        size: "sm",
        variant: "primary",
    },
});

export type PlaceholderTextProps<T extends ElementType = "p"> = RichAsProps<T> &
    TProps<PlaceholderTextTheme> & {};

export const PlaceholderText = <T extends ElementType = "p">(props: PlaceholderTextProps<T>) => {
    const { className, children, restProps } = useResolveT("placeholderText", placeholderText, props);
    const { name, as, ...rootProps } = restProps;
    const Comp: any = as || "p";

    return (
        <Comp className={className} {...rootProps}>
            {children}
        </Comp>
    );
};
