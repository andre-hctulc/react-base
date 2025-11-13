"use client";

import { type ComponentProps, type FC } from "react";
import { createTheme } from "flowbite-react";
import {
    flexDirection,
    alignItems,
    type BaseTheme,
    type WithAlignItems,
    type WithFlex,
    type WithGrow,
    type WithHeight,
    type TProps,
    withHeight,
    withPadding,
    type WithPadding,
    type WithScroll,
    withScroll,
    flexGrow,
} from "../../util/style.js";
import { useResolveT } from "../../hooks/index.js";

declare module "flowbite-react/types" {
    interface FlowbiteTheme {
        cardBody: CardBodyTheme;
    }

    interface FlowbiteProps {
        cardBody: Partial<WithoutThemingProps<CardBodyProps>>;
    }
}

export interface CardBodyTheme
    extends BaseTheme,
        WithFlex,
        WithPadding,
        WithAlignItems,
        WithHeight,
        WithGrow,
        WithScroll {}

const cardBody = createTheme<CardBodyTheme>({
    base: "grow max-h-full min-h-0 overflow-auto not-first:pt-0 not-last:pb-0",
    flex: flexDirection,
    ...withScroll,
    grow: flexGrow,
    ...withHeight,
    alignItems: alignItems,
    ...withPadding,
    defaultVariants: {
    },
});

interface CardBodyProps extends ComponentProps<"div">, TProps<CardBodyTheme> {}

/**
 * ### Props
 * - `embedded` - Controls vertical padding. Use it in combination with card header and footer
 */
export const CardBody: FC<CardBodyProps> = (props) => {
    const { className, restProps, children } = useResolveT("cardBody", cardBody, props);

    return (
        <div className={className} {...restProps}>
            {children}
        </div>
    );
};
