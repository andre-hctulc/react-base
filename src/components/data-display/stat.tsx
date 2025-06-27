"use client";

import { collapse } from "@dre44/util";
import clsx from "clsx";
import { useMemo, type FC, type ReactNode } from "react";
import { tv } from "tailwind-variants";
import { useRefOf } from "../../hooks/index.js";
import type { TVCProps, PropsOf } from "../../types/index.js";
import { Icon } from "../icons/icon.js";
import { HelperText } from "../input/helper-text.js";
import { Skeleton } from "./skeleton.js";

const stat = tv({
    base: "",
    variants: {
        size: {
            xs: "rounded p-1 text-base",
            sm: "rounded p-3 text-lg",
            md: "rounded-lg p-5 text-2xl",
            lg: "rounded-xl p-8 text-3xl",
            xl: "rounded-2xl p-12 text-4xl",
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
    children?: any;
    description?: string;
    descriptionProps?: PropsOf<typeof HelperText>;
    textProps?: PropsOf<"p">;
    icon?: ReactNode;
    loading?: boolean;
}

export const Stat: FC<StatProps> = ({
    valueParser,
    children,
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
    ...props
}) => {
    const Comp = as || "div";
    const valueParserRef = useRefOf(valueParser);
    const val = useMemo(() => {
        return valueParserRef.current ? valueParserRef.current(children) : String(children);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [children]);
    const [gap, iconGap] = collapse(size || "md", {
        xs: ["mt-2", "mr-1"],
        sm: ["mt-4", "mr-2"],
        md: ["mt-6", "mr-3"],
        lg: ["mt-8", "mr-4"],
        xl: ["mt-10", "mr-5"],
    });

    return (
        <Comp className={stat({ className, size, variant, shadow })} {...props}>
            <p {...textProps} className={clsx("font-medium", textProps?.className)}>
                {icon && (
                    <Icon inline className={clsx(iconGap)}>
                        {icon}
                    </Icon>
                )}
                {loading ? <Skeleton as="span">{val}</Skeleton> : val}
            </p>
            {description && (
                <HelperText
                    {...descriptionProps}
                    className={clsx("font-normal", gap, descriptionProps?.className)}
                >
                    {description}
                </HelperText>
            )}
        </Comp>
    );
};
