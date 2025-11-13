"use client";

import { createTheme } from "flowbite-react";
import {
    flexWrap,
    withGap,
    type BaseTheme,
    type TProps,
    type WithFlexWrap,
    type WithGap,
} from "../../util/style.js";
import { useResolveT } from "../../hooks/index.js";
import type { ElementType } from "react";
import type { RichAsProps } from "../../types/index.js";

declare module "flowbite-react/types" {
    interface FlowbiteTheme {
        spacer: SpacerTheme;
    }

    interface FlowbiteProps {
        spacer: Partial<WithoutThemingProps<SpacerProps>>;
    }
}

export interface SpacerTheme extends BaseTheme, WithGap, WithFlexWrap {
    variant: Record<"row" | "col", string>;
}

const spacer = createTheme<SpacerTheme>({
    base: "flex",
    variant: {
        row: "",
        col: "flex-col",
    },
    wrap: flexWrap,
    ...withGap,
    defaultVariants: {
        gap: "md",
        align: "center",
        direction: "row",
    },
});

type SpacerProps<T extends ElementType = "div"> = RichAsProps<T> & TProps<SpacerTheme> & {};

/**
 * Flex container. Creates gap between elements.
 *
 * ### Props
 * - `wrap`
 * - `spacing`
 * - `variant`
 * - `as`
 * - `dynSpacing`
 */
export const Spacer = <T extends ElementType>(props: SpacerProps<T>) => {
    const { className, restProps } = useResolveT("spacer", spacer, props);
    const Comp: any = restProps.as || "div";
    return <Comp className={className} {...restProps} />;
};
