"use client";

import { collapse } from "@dre44/util";
import clsx from "clsx";
import { useMemo, type FC, type ReactNode } from "react";
import { tv } from "tailwind-variants";
import { useRefOf } from "../../hooks/index.js";
import type { TVCProps, PropsOf, LinkComponent } from "../../types/index.js";
import { Icon } from "../icons/icon.js";
import { HelperText } from "../input/helper-text.js";
import { Skeleton } from "./skeleton.js";

const stat = tv({
    base: "",
    variants: {
        size: {
            "2xs": "rounded p-3 text-xl",
            xs: "rounded p-4 text-3xl",
            sm: "rounded p-5 text-4xl",
            md: "rounded-lg p-6 text-5xl",
            lg: "rounded-xl p-8 text-6xl",
            xl: "rounded-2xl p-12 text-7xl",
        },
        variant: {
            outlined: "border",
            elevated: "shadow",
            contrast: "bg-paper",
        },
        shadow: {
            sm: "shadow-sm",
            md: "shadow-md",
            lg: "shadow-lg",
        },
    },
    defaultVariants: {
        size: "md",
        variant: "outlined",
    },
});

interface StatProps extends TVCProps<typeof stat, "div"> {
    as?: any;
    valueParser?: (value: any) => string;
    value: any;
    description?: string;
    descriptionProps?: PropsOf<typeof HelperText>;
    textProps?: PropsOf<"p">;
    icon?: ReactNode;
    loading?: boolean;
    LinkComponent?: LinkComponent;
    href?: string;
}

export const Stat: FC<StatProps> = ({
    valueParser,
    value,
    as,
    className,
    size,
    variant,
    shadow,
    description,
    descriptionProps,
    textProps,
    icon,
    loading,
    children,
    href,
    LinkComponent,
    ...props
}) => {
    const MainComp: any = href ? LinkComponent || "a" : "div";
    const Comp = as || "div";
    const valueParserRef = useRefOf(valueParser);
    const val = useMemo(() => {
        return valueParserRef.current ? valueParserRef.current(value) : String(value);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);
    const [gap, iconGap, iconSize, helperTextSize] = collapse(size || "md", {
        "2xs": ["mt-1", "mr-1", "text-lg", "text-sm"],
        xs: ["mt-2", "mr-1.5", "text-xl", "text-base"],
        sm: ["mt-4", "mr-2", "text-2xl", "text-base"],
        md: ["mt-6", "mr-3", "text-3xl", "text-xl"],
        lg: ["mt-8", "mr-4", "text-4xl", "text-xl"],
        xl: ["mt-10", "mr-5", "text-5xl", "text-xl"],
    });

    const mainProps: any = { ...textProps };

    if (href) {
        mainProps.href = href;
    }

    return (
        <Comp className={stat({ className, size, variant, shadow })} {...props}>
            <MainComp {...mainProps} className={clsx("font-medium", textProps?.className)}>
                {icon && (
                    <Icon inline className={clsx(iconGap, iconSize)}>
                        {icon}
                    </Icon>
                )}
                {loading ? <Skeleton as="span">{<span>{val}</span>}</Skeleton> : val}
            </MainComp>
            {description && (
                <HelperText
                    {...descriptionProps}
                    className={clsx("font-normal", gap, helperTextSize, descriptionProps?.className)}
                >
                    {description}
                </HelperText>
            )}
            {children}
        </Comp>
    );
};
