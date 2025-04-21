"use client";

import { tv } from "tailwind-variants";
import type { Choice, PropsOf, TVCProps } from "../../types/index.js";
import { Chip } from "./chip.js";
import { Icon } from "../icons/icon.js";
import clsx from "clsx";
import { RadioSwitch } from "../input/radio-switch.js";
import type { FC, ReactNode } from "react";

export const tabs = tv({
    base: "flex flex-wrap",
    variants: {
        variant: {
            chips: "",
            default: "",
            radio: "",
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

export interface TabItem<V = string, D = any> extends Choice<V, D> {
    label: ReactNode;
    icon?: ReactNode;
    href?: string;
    disabled?: boolean;
    visible?: boolean;
}

interface TabsProps<V = string, D = any> extends Omit<TVCProps<typeof tabs, "div">, "children"> {
    /**
     * The active tab value. Must be of type _string_ or _undefined_ when used with `variant="radio"`.
     */
    activeTab?: string | ((tab: TabItem<V, D>) => boolean);
    tabs: TabItem[];
    chipProps?: Partial<PropsOf<typeof Chip>>;
    tabProps?: Partial<PropsOf<typeof Tab>>;
    LinkComponent?: any;
    /**
     * Only for `variant="default"`.
     */
    bg?: "1" | "2" | "3" | "4";
    elevated?: boolean;
    onTabClick?: (tab: TabItem<V, D>) => void;
    disabled?: boolean;
}

export const Tabs: FC<TabsProps> = ({
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
    disabled,
    ...props
}) => {
    if (variant === "radio") {
        return (
            <RadioSwitch
                className={className}
                style={props.style}
                size={size}
                LinkComponent={LinkComponent}
                readOnly={disabled}
                onChange={({ options: option }) => onTabClick?.(option)}
                options={tabItems}
                value={typeof activeTab === "function" ? "" : activeTab}
            />
        );
    }

    return (
        <div {...props} className={tabs({ variant, size, className })}>
            {tabItems.map((t) => {
                if (t.visible === false) return null;

                const isActive = typeof activeTab === "function" ? activeTab(t) : activeTab === t.value;
                const _disabled = disabled || t.disabled;

                if (variant === "chips") {
                    const chip = (
                        <Chip
                            icon={t.icon}
                            as="button"
                            key={t.value}
                            size={size}
                            variant={isActive ? "pale" : "outlined"}
                            {...chipProps}
                            onClick={
                                _disabled
                                    ? undefined
                                    : (e) => {
                                          onTabClick?.(t);
                                          chipProps?.onClick?.(e);
                                      }
                            }
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
                        disabled={_disabled}
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
    icon?: ReactNode;
    clickable?: boolean;
}

const Tab: FC<TabProps> = ({
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
