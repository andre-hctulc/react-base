"use client";

import { createTheme } from "flowbite-react/helpers/create-theme";
import type { BaseTheme, TProps, WithMargin } from "../../util/style.js";
import { withMargin } from "../../util/style.js";
import type { RichAsProps } from "../../types/index.js";
import { useResolveT } from "../../hooks/index.js";
import type { ElementType } from "react";

declare module "flowbite-react/types" {
    interface FlowbiteTheme {
        errorText: ErrorTextTheme;
    }

    interface FlowbiteProps {
        errorText: Partial<WithoutThemingProps<ErrorTextProps>>;
    }
}

export interface ErrorTextTheme extends BaseTheme, WithMargin {
    size: Record<"sm" | "base", string>;
}

const errorText = createTheme<ErrorTextTheme>({
    base: "text-error",
    size: {
        sm: "text-sm",
        base: "text-base",
    },
    ...withMargin,
    defaultVariants: {
        size: "sm",
    },
});

type ErrorTextProps<T extends ElementType = "p"> = RichAsProps<T> & TProps<ErrorTextTheme> & {};

/**
 * ### Props
 * - `name` - The name of the input field this error is for. If provided the error will be displayed only if the input field is invalid.
 */
export const ErrorText = <T extends ElementType = "p">(props: ErrorTextProps<T>) => {
    const { className, children, restProps } = useResolveT("errorText", errorText, props);
    const { name, as, ...rootProps } = restProps;
    const Comp: any = as || "p";

    return (
        <Comp className={className} {...rootProps}>
            {children}
        </Comp>
    );
};
