"use client";

import type { ElementType } from "react";
import { createTheme } from "flowbite-react";
import {
    alignItems,
    flexDirection,
    flexWrap,
    flexGrow,
    justifyContent,
    noShrink,
    withWidthAndHeight,
    type BaseTheme,
    type TProps,
    type WithAlignItems,
    type WithFlexDirection,
    type WithFlexWrap,
    type WithGrow,
    type WithJustifyContent,
    type WithNoShrink,
    type WithWidthAndHeight,
} from "../../util/style.js";
import { withPrefix } from "../../util/system.js";
import type { PropsOf, RichAsProps } from "../../types/index.js";
import { useResolveT } from "../../hooks/index.js";

declare module "flowbite-react/types" {
    interface FlowbiteTheme {
        flex: FlexTheme;
    }

    interface FlowbiteProps {
        flex: Partial<WithoutThemingProps<FlexProps>>;
    }
}

export interface FlexTheme
    extends BaseTheme,
        WithAlignItems,
        WithFlexDirection,
        WithJustifyContent,
        WithWidthAndHeight,
        WithFlexWrap,
        WithGrow,
        WithNoShrink {}

const flex = createTheme<FlexTheme>({
    base: "flex",
    direction: flexDirection,
    alignItems,
    justifyContent,
    wrap: flexWrap,
    grow: flexGrow,
    noShrink: noShrink,
    ...withWidthAndHeight,
});

type FlexProps<T extends ElementType = "div"> = PropsOf<"div"> & TProps<FlexTheme> & RichAsProps<T>;

export const Flex = <T extends ElementType = "div">(props: FlexProps<T>) => {
    const { className, children, restProps } = useResolveT("flex", flex, props);
    const Comp: any = props.as || "div";

    return (
        <Comp className={className} {...restProps}>
            {children}
        </Comp>
    );
};

Flex.displayName = withPrefix("Flex");
