"use client";

import type { FC, ReactNode } from "react";
import { tv } from "tailwind-variants";
import { Icon } from "../icons/icon.js";
import type { PropsOf, WithTVProps } from "../../types/index.js";

const tab = tv({
    base: "transition flex items-center shrink-0",
    variants: {
        variant: {
            elevated: "rounded-sm bg-paper2 h-min data-[disabled=false]:hover:text-primary/80",
            default:
                "border-y-2 border-transparent data-[disabled=false]:hover:bg-paper2 data-[disabled=false]:active:bg-paper3",
        },
        disabled: {
            true: "text-t3 cursor-not-allowed",
        },
        size: {
            xs: "h-5 text-xs px-2 gap-1.5",
            sm: "h-7 text-sm px-3 gap-2",
            md: "h-9 text-base px-3.5 gap-2.5",
            lg: "h-[42px] text-lg px-3 gap-3",
            xl: "h-12 text-xl px-4 gap-3",
        },
        active: {
            true: "text-primary border-b-primary",
            false: "text-t2",
        },
        clickable: {
            true: "cursor-pointer",
        },
        bg: {
            "1": "bg-paper1",
            "2": "bg-paper2",
            "3": "bg-paper3",
            "4": "bg-paper4",
        },
        elevated: {
            true: "shadow-xs",
        },
    },
    compoundVariants: [
        {
            variant: "default",
            active: true,
            className: "rounded-t-sm",
        },
        {
            variant: "default",
            active: false,
            className: "rounded-sm",
        },
    ],
    defaultVariants: {
        size: "md",
        variant: "default",
    },
});

type TabProps = WithTVProps<
    (PropsOf<"a"> | PropsOf<"button">) & {
        LinkComponent?: any;
        href?: string;
        icon?: ReactNode;
        clickable?: boolean;
    },
    typeof tab
>;

export const Tab: FC<TabProps> = ({
    children,
    className,
    size,
    active,
    LinkComponent,
    href,
    icon,
    disabled,
    onClick,
    clickable,
    bg,
    elevated,
    ...props
}) => {
    const Comp = href && !disabled ? LinkComponent || "a" : "button";
    const p = { ...props, href };
    const canClick = !disabled && (clickable ?? (!!onClick || !!href));

    if (!href) delete p.href;

    return (
        <Comp
            {...p}
            data-disabled={!!disabled}
            onClick={disabled ? undefined : onClick}
            className={tab({
                className,
                size,
                active,
                elevated,
                clickable: canClick,
                disabled,
                bg,
            })}
        >
            {icon && <Icon>{icon}</Icon>}
            <span className="truncate">{children}</span>
        </Comp>
    );
};
