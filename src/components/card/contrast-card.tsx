"use client";

import type { FC } from "react";
import { Card, createTheme, type CardProps } from "flowbite-react";
import { type BaseTheme, type TProps } from "../../util/style.js";
import { useResolveT } from "../../hooks/index.js";

declare module "flowbite-react/types" {
    interface FlowbiteTheme {
        contrastCard: ContrastCardTheme;
    }

    interface FlowbiteProps {
        contrastCard: Partial<WithoutThemingProps<ContrastCardProps>>;
    }
}

export interface ContrastCardTheme extends BaseTheme {
    contrast: {
        light: string;
        dark: string;
        darkest: string;
    };
}

const contrastCard = createTheme<ContrastCardTheme>({
    base: "shadow-none border-none",
    contrast: {
        light: "bg-paper2",
        dark: "bg-paper3",
        darkest: "bg-paper4",
    },
    defaultVariants: {
        contrast: "light",
    },
});

export type ContrastCardProps = CardProps & TProps<ContrastCardTheme> & {};

/**
 * ### Props
 * - `embedded` - Controls vertical padding. Use it in combination with card header and footer
 */
export const ContrastCard: FC<ContrastCardProps> = (props) => {
    const { className, restProps, children } = useResolveT("cardBody", contrastCard, props);

    return (
        <Card className={className} {...(restProps as CardProps)}>
            {children}
        </Card>
    );
};
