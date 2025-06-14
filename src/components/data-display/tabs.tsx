"use client";

import { tv } from "tailwind-variants";
import type { Choice, PropsOf, TVCProps } from "../../types/index.js";
import { Chip } from "./chip.js";
import clsx from "clsx";
import { RadioSwitch } from "../input/radio-switch.js";
import { useMemo, type FC, type ReactNode } from "react";
import { Tab } from "./tab.js";

export const tabs = tv({
    base: "flex flex-wrap",
    variants: {
        variant: {
            chips: "",
            default: "",
            switch: "",
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
    active?: boolean;
}

interface TabsProps<V = string, D = any> extends Omit<TVCProps<typeof tabs, "div">, "children"> {
    /**
     * Must be a string if used with variant "switch".
     */
    activeTabs?: string | string[] | ((tab: TabItem<V, D>) => boolean);
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
    activeTabs,
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
    const switchValue = useMemo(() => {
        if (typeof activeTabs === "string") return [activeTabs];
        return [];
    }, [activeTabs, tabItems]);

    const isTabActive = (item: TabItem) => {
        return (
            item?.active ??
            (typeof activeTabs === "function"
                ? activeTabs(item)
                : Array.isArray(activeTabs)
                ? activeTabs.includes(item.value)
                : item.value === activeTabs)
        );
    };

    if (variant === "switch") {
        return (
            <RadioSwitch
                className={className}
                style={props.style}
                size={size}
                LinkComponent={LinkComponent}
                readOnly={disabled}
                onChange={({ options: [option] }) => onTabClick?.(option)}
                options={tabItems}
                value={switchValue}
            />
        );
    }

    return (
        <div {...props} className={tabs({ variant, size, className })}>
            {tabItems.map((t) => {
                if (t.visible === false) return null;

                const isActive = isTabActive(t);
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
