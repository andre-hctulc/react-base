"use client";

import type { FC } from "react";
import { Card, createTheme, type CardProps } from "flowbite-react";
import { type BaseTheme, type TProps, type WithBorder, withBorder } from "../../util/style.js";
import { useResolveT } from "../../hooks/index.js";

declare module "flowbite-react/types" {
    interface FlowbiteTheme {
        cardOutline: CardOutlineTheme;
    }

    interface FlowbiteProps {
        cardOutline: Partial<WithoutThemingProps<CardOutlineProps>>;
    }
}

export interface CardOutlineTheme extends BaseTheme, WithBorder {}

const cardOutline = createTheme<CardOutlineTheme>({
    ...withBorder,
    base: "shadow-none",
});

export type CardOutlineProps = CardProps & TProps<CardOutlineTheme> & {};

/**
 * ### Props
 * - `embedded` - Controls vertical padding. Use it in combination with card header and footer
 */
export const CardOutline: FC<CardOutlineProps> = (props) => {
    const { className, restProps, children } = useResolveT("cardBody", cardOutline, props);

    return (
        <Card className={className} {...(restProps as CardProps)}>
            {children}
        </Card>
    );
};
