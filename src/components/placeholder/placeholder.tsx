"use client";

import { createTheme } from "flowbite-react";
import {
    flexGrow,
    withGap,
    withMargin,
    withPadding,
    withWidthAndHeight,
    type BaseTheme,
    type TProps,
    type WithGap,
    type WithGrow,
    type WithMargin,
    type WithPadding,
    type WithWidthAndHeight,
} from "../../util/style.js";
import type { PropsOf, RichAsProps } from "../../types/index.js";
import { Icon, type IconLike, type IconProps } from "../icons/icon.js";
import { type ReactNode, type ElementType } from "react";
import { useResolveT } from "../../hooks/index.js";
import { PlaceholderText } from "../text/placeholder-text.js";

declare module "flowbite-react/types" {
    interface FlowbiteTheme {
        placeholder: PlaceholderTheme;
    }

    interface FlowbiteProps {
        placeholder: Partial<WithoutThemingProps<PlaceholderProps>>;
    }
}

export interface PlaceholderTheme
    extends BaseTheme,
        WithGap,
        WithPadding,
        WithGrow,
        WithWidthAndHeight,
        WithMargin {}

const placeholder = createTheme<PlaceholderTheme>({
    base: "flex flex-col items-center justify-center",
    ...withGap,
    ...withPadding,
    grow: flexGrow,
    ...withWidthAndHeight,
    ...withMargin,
    defaultVariants: {
        gap: "md",
    },
});

export type PlaceholderProps<A extends ElementType = "div"> = RichAsProps<A> &
    TProps<PlaceholderTheme> & {
        children?: ReactNode;
        icon?: IconLike;
        iconProps?: IconProps;
        helperText?: string;
        helperTextProps?: PropsOf<typeof PlaceholderText>;
        textProps?: PropsOf<typeof PlaceholderText>;
        italic?: boolean;
        disabled?: boolean;
    };

/**
 * ### Props
 * - `gap`
 * - `padding`
 * - `icon`
 * - `helperText`
 * - `grow`
 * - `fullHeight`
 * - `fullWidth`
 * - `py`
 * - `my`
 */
export const Placeholder = <A extends ElementType = "div">(props: PlaceholderProps<A>) => {
    const { className, children, restProps } = useResolveT("placeholder", placeholder, props);
    const { icon, iconProps, helperText, helperTextProps, textProps, italic, disabled, as, ...rootProps } =
        restProps;
    const Comp: any = as || "div";

    return (
        <Comp className={className} {...rootProps}>
            {icon && (
                <span className={disabled ? "text-t3" : "text-t2"}>
                    <Icon size="4xl" {...iconProps}>
                        {icon}
                    </Icon>
                </span>
            )}
            {typeof children === "string" ? (
                <PlaceholderText italic={italic} variant={disabled ? "tertiary" : "secondary"} {...textProps}>
                    {children}
                </PlaceholderText>
            ) : (
                children
            )}
            {helperText && (
                <PlaceholderText variant="tertiary" {...helperTextProps}>
                    {helperText}
                </PlaceholderText>
            )}
        </Comp>
    );
};
