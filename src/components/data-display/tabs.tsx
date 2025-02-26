"use client";

import { tv } from "tailwind-variants";
import type { Choice, PropsOf, TVCProps } from "../../types";
import { Chip } from "./chip";
import { Icon } from "../icons";
import clsx from "clsx";

export const tabs = tv({
    base: "flex flex-wrap",
    variants: {
        variant: {
            chips: "",
            default: "",
        },
        size: {
            sm: "gap-2",
            md: "gap-3",
            lg: "gap-4",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "md",
    },
});

export interface TabItem extends Choice {
    label: string;
    icon?: React.ReactNode;
    href?: string;
    disabled?: boolean;
    visible?: boolean;
}

interface TabsProps extends Omit<TVCProps<typeof tabs, "div">, "children"> {
    activeTab?: string | ((tab: TabItem) => boolean);
    tabs: TabItem[];
    chipProps?: Partial<PropsOf<typeof Chip>>;
    tabProps?: Partial<PropsOf<typeof Tab>>;
    LinkComponent?: any;
    bg?: "1" | "2" | "3" | "4";
    elevated?: boolean;
    onTabClick?: (tab: TabItem) => void;
}

export const Tabs: React.FC<TabsProps> = ({
    activeTab,
    variant,
    size,
    className,
    tabs: tabItems,
    chipProps,
    tabProps,
    onTabClick,
    LinkComponent,
    bg,
    elevated,
    ...props
}) => {
    return (
        <div {...props} className={tabs({ variant, size, className })}>
            {tabItems.map((t) => {
                if (t.visible === false) return null;

                const isActive = typeof activeTab === "function" ? activeTab(t) : activeTab === t.value;

                if (variant === "chips") {
                    const chip = (
                        <Chip
                            icon={t.icon}
                            as="button"
                            key={t.value}
                            size={size}
                            variant={isActive ? "pale" : "outlined"}
                            {...chipProps}
                            onClick={(e) => {
                                onTabClick?.(t);
                                chipProps?.onClick?.(e);
                            }}
                            className={clsx(elevated && "shadow-xs", chipProps?.className as any)}
                        >
                            {t.label}
                        </Chip>
                    );

                    if (t.href) {
                        const Link = LinkComponent || "a";
                        return (
                            <Link key={t.value} href={t.href}>
                                {chip}
                            </Link>
                        );
                    }

                    return chip;
                }

                return (
                    <Tab
                        bg={bg}
                        elevated={elevated}
                        key={t.value}
                        size={size}
                        active={isActive}
                        icon={t.icon}
                        href={t.href}
                        disabled={t.disabled}
                        LinkComponent={LinkComponent}
                        {...tabProps}
                        clickable={!!onTabClick || !!tabProps?.onClick || !!t.href}
                        onClick={(e) => {
                            onTabClick?.(t);
                            tabProps?.onClick?.(e);
                        }}
                    >
                        {t.label}
                    </Tab>
                );
            })}
        </div>
    );
};

const tab = tv({
    base: [
        "transition flex gap-2 items-center rounded-sm bg-paper2",
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
    icon?: React.ReactNode;
    clickable?: boolean;
}

const Tab: React.FC<TabProps> = ({
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
            className={tab({ className, size, active, elevated, clickable: canClick, disabled, bg })}
        >
            {icon && <Icon>{icon}</Icon>}
            {children}
        </Comp>
    );
};
