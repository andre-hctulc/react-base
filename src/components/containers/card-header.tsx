"use client";

import { createTheme } from "flowbite-react";
import { twMerge } from "flowbite-react/helpers/tailwind-merge";
import {
    withBorder,
    withPadding,
    type BaseTheme,
    type TProps,
    type WithBorder,
    type WithPadding,
} from "../../util/style.js";
import type { PartialPropsOf, PropsOf } from "../../types/index.js";
import { type IconLike, type IconProps } from "../icons/icon.js";
import { Title } from "../text/title.js";
import type { ComponentProps, FC, ReactNode } from "react";
import { Subtitle } from "../text/subtitle.js";
import { useResolveT } from "../../hooks/index.js";

declare module "flowbite-react/types" {
    interface FlowbiteTheme {
        cardHeader: CardHeaderTheme;
    }

    interface FlowbiteProps {
        cardHeader: Partial<WithoutThemingProps<CardHeaderProps>>;
    }
}

export interface CardHeaderTheme extends BaseTheme, WithPadding, WithBorder {}

const cardHeader = createTheme<CardHeaderTheme>({
    base: "",
    ...withBorder,
    ...withPadding,
    defaultVariants: {
        border: false,
    },
});

interface CardHeaderProps extends TProps<CardHeaderTheme>, Omit<ComponentProps<"div">, "title"> {
    title?: ReactNode;
    titleProps?: PartialPropsOf<typeof Title>;
    subtitle?: ReactNode;
    subtitleProps?: PartialPropsOf<typeof Subtitle>;
    /**
     * Rendered after the title
     */
    after?: ReactNode;
    /**
     * Rendered before the title
     */
    start?: ReactNode;
    /**
     * Rendered after the title
     */
    end?: ReactNode;
    /**
     * Rendered at the top of the card header
     */
    pre?: ReactNode;
    innerProps?: PropsOf<"div">;
    icon?: IconLike;
    iconProps?: IconProps;
    as?: any;
}

/**
 * ### Props
 * - `title`: Title of the card
 * - `size`: Padding size
 * - `border`: Whether to show a border
 * - `after`: Content rendered after the title
 * - `start`: Rendered before the title
 * - `end`: Rendered after the title
 * - `pre`: Rendered at the top of the card header
 */
export const CardHeader: FC<CardHeaderProps> = (props) => {
    const { className, restProps, children } = useResolveT("cardHeader", cardHeader, props);
    const {
        title,
        after,
        end,
        innerProps,
        icon,
        start,
        titleProps,
        as,
        pre,
        subtitle,
        subtitleProps,
        iconProps,
        ...rootProps
    } = restProps;
    const renderMain = !!title || !!end || !!after || !!icon || !!start;

    return (
        <div className={className} {...rootProps}>
            {pre}
            {renderMain && (
                <div {...innerProps} className={twMerge("flex items-center gap-3 min-w-0", innerProps?.className)}>
                    {start}
                    {!!(title || icon) && (
                        <Title icon={icon} iconProps={iconProps} variant="h4" {...titleProps}>
                            {title}
                        </Title>
                    )}
                    {after}
                    {end && <div className="ml-auto min-w-0">{end}</div>}
                </div>
            )}
            {subtitle && (
                <Subtitle variant="h4" {...subtitleProps} className={twMerge(subtitleProps?.className)}>
                    {subtitle}
                </Subtitle>
            )}
            {children}
        </div>
    );
};
