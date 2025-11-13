"use client";

import { createTheme } from "flowbite-react";
import {
    type WithPadding,
    withPadding,
    type BaseTheme,
    type TProps,
    type WithBorder,
    withBorder,
} from "../../util/style.js";
import type { FC, ComponentProps } from "react";
import { useResolveT } from "../../hooks/index.js";

declare module "flowbite-react/types" {
    interface FlowbiteTheme {
        cardFooter: CardFooterTheme;
    }

    interface FlowbiteProps {
        cardFooter: Partial<WithoutThemingProps<CardFooterProps>>;
    }
}

export interface CardFooterTheme extends BaseTheme, WithPadding, WithBorder {
    variant: Record<"flex" | "default" | "actions", string>;
}

const cardFooter = createTheme<CardFooterTheme>({
    base: "",
    variant: {
        flex: "flex",
        default: "",
        actions: "flex justify-end",
    },
    ...withBorder,
    ...withPadding,
    defaultVariants: {
        variant: "default",
        border: false,
    },
});

interface CardFooterProps extends TProps<CardFooterTheme>, ComponentProps<"div"> {}

export const CardFooter: FC<CardFooterProps> = (props) => {
    const { className, children, restProps } = useResolveT("cardFooter", cardFooter, props);

    return (
        <div className={className} {...restProps}>
            {children}
        </div>
    );
};
