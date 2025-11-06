"use client";

import { collapse } from "@dre44/util/objects";
import { twMerge } from "flowbite-react/helpers/tailwind-merge";
import { useMemo, type ReactNode, type ElementType } from "react";
import { createTheme, HelperText } from "flowbite-react";
import {
    shadow,
    shape,
    type BaseTheme,
    type TProps,
    type WithShadow,
    type WithShape,
} from "../../util/style.js";
import { useRefOf, useResolveT } from "../../hooks/index.js";
import type { PropsOf, LinkComponent, LinkProps, RichAsProps } from "../../types/index.js";
import { Icon, type IconLike } from "../icons/icon.js";
import { Skeleton } from "./skeleton.js";

declare module "flowbite-react/types" {
    interface FlowbiteTheme {
        stat: StatTheme;
    }

    interface FlowbiteProps {
        stat: Partial<WithoutThemingProps<StatProps>>;
    }
}

export interface StatTheme extends BaseTheme, WithShape, WithShadow {
    variant: Record<"outlined" | "elevated" | "contrast", string>;
}

const stat = createTheme<StatTheme>({
    base: "",
    variant: {
        outlined: "border",
        elevated: "shadow",
        contrast: "bg-paper",
    },
    shadow,
    shape,
});

type StatProps<T extends ElementType = "div"> = RichAsProps<T> &
    TProps<StatTheme> & {
        valueParser?: (value: any) => string;
        value: any;
        description?: string;
        descriptionProps?: PropsOf<typeof HelperText>;
        textProps?: PropsOf<"p">;
        icon?: IconLike;
        loading?: boolean;
        LinkComponent?: LinkComponent;
        linkProps?: LinkProps;
        href?: string;
    };

/**
 * ### Props
 * - `value`
 * - `description`
 * - `valueParser`
 * - `loading`
 * - `as`
 * - `href`
 * - `LinkComponent`
 */
export const Stat = <T extends ElementType = "div">(props: StatProps<T>) => {
    const { className, restProps } = useResolveT("stat", stat, props);
    const {
        valueParser,
        value,
        description,
        descriptionProps,
        textProps,
        icon,
        loading,
        linkProps,
        children,
        href,
        LinkComponent,
        as,
        ...rootProps
    } = restProps;

    const MainComp: any = as || (href ? LinkComponent || "a" : "div");
    const Comp: any = restProps.as || "div";
    const valueParserRef = useRefOf(valueParser);
    const val = useMemo(() => {
        return valueParserRef.current ? valueParserRef.current(value) : String(value);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);
    const [gap, iconGap, iconSize, helperTextSize] = collapse(props.size || "md", {
        "2xs": ["mt-1", "mr-1", "text-lg", "text-sm"],
        xs: ["mt-2", "mr-1.5", "text-xl", "text-base"],
        sm: ["mt-4", "mr-2", "text-2xl", "text-base"],
        md: ["mt-6", "mr-3", "text-3xl", "text-xl"],
        lg: ["mt-8", "mr-4", "text-4xl", "text-xl"],
        xl: ["mt-10", "mr-5", "text-5xl", "text-xl"],
    });

    const mainProps: any = { ...textProps };

    if (href) {
        Object.assign(mainProps, linkProps);
        mainProps.href = href;
    }

    return (
        <Comp className={className} {...rootProps}>
            <MainComp {...mainProps} className={twMerge("font-medium", textProps?.className)}>
                {icon && (
                    <Icon inline className={twMerge(iconGap, iconSize)}>
                        {icon}
                    </Icon>
                )}
                {loading ? <Skeleton as="span">{<span>{val}</span>}</Skeleton> : val}
            </MainComp>
            {description && (
                <HelperText
                    {...descriptionProps}
                    className={twMerge("font-normal", gap, helperTextSize, descriptionProps?.className)}
                >
                    {description}
                </HelperText>
            )}
            {children}
        </Comp>
    );
};
