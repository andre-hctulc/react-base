"use client";

import { tv } from "tailwind-variants";
import type { Choice, PropsOf, StyleProps, WithTVProps } from "../../types/index.js";
import clsx from "clsx";
import { RadioSwitch } from "../input/radio-switch.js";
import { useMemo, type FC, type ReactNode } from "react";
import { Tab } from "./tab.js";
import { collapse } from "@dre44/util/objects";
import { Chip } from "../data-display/chip.js";

export const tabs = tv({
    base: "",
    variants: {
        variant: {
            chips: "flex flex-wrap",
            default: "flex overflow-x-auto",
            switch: "flex flex-wrap",
            elevated: "flex flex-wrap",
        },
        size: {
            sm: "",
            md: "",
            lg: "",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "md",
    },
});

export interface TabItem< D = any> extends Choice<D> {
    label: ReactNode;
    icon?: ReactNode;
    href?: string;
    disabled?: boolean;
    visible?: boolean;
    active?: boolean;
}

type TabsProps<D = any> = WithTVProps<
    StyleProps & {
        /**
         * Must be a string if used with variant "switch".
         */
        activeTabs?: string | string[] | ((tab: TabItem<D>) => boolean);
        tabs?: TabItem[];
        chipProps?: Partial<PropsOf<typeof Chip>>;
        tabProps?: Partial<PropsOf<typeof Tab>>;
        LinkComponent?: any;
        /**
         * Only for `variant="default"`.
         */
        bg?: "1" | "2" | "3" | "4";
        elevated?: boolean;
        onTabClick?: (tab: TabItem<D>) => void;
        disabled?: boolean;
        children?: ReactNode;
    },
    typeof tabs
>;

export const Tabs: FC<TabsProps> = ({
    activeTabs,
    variant = "default",
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
    children,
    ...props
}) => {
    const switchValue = useMemo(() => {
        if (typeof activeTabs === "string") return [activeTabs];
        else if (Array.isArray(activeTabs)) return activeTabs;
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
    const gap =
        variant !== "default"
            ? collapse(size || "md", {
                  sm: "gap-2",
                  md: "gap-3",
                  lg: "gap-4",
              })
            : undefined;

    if (variant === "switch") {
        return (
            <RadioSwitch
                className={className}
                style={props.style}
                size={size}
                LinkComponent={LinkComponent}
                readOnly={disabled}
                onChange={({ options: [option] }) => onTabClick?.(option)}
                options={tabItems || []}
                value={switchValue}
            />
        );
    }

    return (
        <div {...props} className={tabs({ variant, size, className: [className, gap] })}>
            {tabItems?.map((t) => {
                if (t.visible === false) return null;

                const isActive = isTabActive(t);
                const _disabled = disabled || t.disabled;

                if (variant === "chips") {
                    const chip = (
                        <Chip<"button">
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
                        variant={variant === "elevated" ? "elevated" : "default"}
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
                        onClick={(e: any) => {
                            onTabClick?.(t);
                            tabProps?.onClick?.(e);
                        }}
                        className={clsx("!h-full", tabProps?.className)}
                    >
                        {t.label}
                    </Tab>
                );
            })}
            {children}
        </div>
    );
};
