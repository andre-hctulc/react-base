import type { FC, ReactNode } from "react";
import type { TVCProps } from "../../types/index.js";
import { tv } from "tailwind-variants";
import { Icon } from "../icons/icon.js";

const tab = tv({
    base: [
        "transition flex gap-2 items-center rounded-sm bg-paper2 h-min",
        "data-[disabled=false]:hover:text-primary/80",
    ],
    variants: {
        disabled: {
            true: "text-t3",
        },
        active: {
            true: "text-primary",
            false: "text-t2",
        },
        clickable: {
            true: "cursor-pointer",
            false: "cursor-not-allowed",
        },
        size: {
            sm: "text-sm py-1 px-2",
            md: "text-base py-1.5 px-3",
            lg: "text-lg py-2 px-4",
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
    defaultVariants: {
        size: "md",
    },
});

interface TabProps extends TVCProps<typeof tab, "button"> {
    LinkComponent?: any;
    href?: string;
    icon?: ReactNode;
    clickable?: boolean;
}

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
            {children}
        </Comp>
    );
};
