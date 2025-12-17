"use client";

import type { LinkComponent, LinkProps, PartialPropsOf, PropsOf } from "../../types/index.js";
import { Icon, type IconLike } from "../icons/icon.js";
import { useEffect, useId, useState, type FC, type ReactNode } from "react";
import { twMerge } from "flowbite-react/helpers/tailwind-merge";
import { Spinner } from "flowbite-react/components/Spinner";
import { createTheme } from "flowbite-react/helpers/create-theme";
import { type BaseTheme, type TProps } from "../../util/style.js";
import type {
    FlowbiteBoolean,
    FlowbiteColors,
    FlowbiteSizes,
    WithoutThemingProps,
} from "flowbite-react/types";
import { useResolveT } from "../../hooks/index.js";
import { ListItem, type ListItemProps } from "flowbite-react";

declare module "flowbite-react/types" {
    interface FlowbiteTheme {
        commonListItem: CommonListItemTheme;
    }

    interface FlowbiteProps {
        commonListItem: Partial<WithoutThemingProps<CommonListItemProps>>;
    }
}

export interface CommonListItemTheme {
    root: BaseTheme;
    inner: BaseTheme & {
        rounded: Record<"sm" | "md" | "lg" | "xl" | "full", string>;
        clickable: FlowbiteBoolean;
        disabled: FlowbiteBoolean;
        size: FlowbiteSizes;
        color: FlowbiteColors;
    };
}

const commonListItem = createTheme<CommonListItemTheme>({
    root: { base: "" },
    inner: {
        base: "transition duration-75 min-w-0 overflow-hidden flex items-center box-border data-[interactive=true]:cursor-pointer",
        rounded: {
            sm: "rounded-sm",
            md: "rounded-md",
            lg: "rounded-lg",
            xl: "rounded-xl",
            full: "rounded-full",
        },
        clickable: {
            on: "cursor-pointer active:brightness-75",
            off: "",
        },
        disabled: {
            on: "cursor-not-allowed opacity-50",
            off: "",
        },
        size: {
            xs: "text-xs px-2 gap-1.5 py-1",
            sm: "text-[14px] px-2 gap-2 py-1",
            md: "text-[15px] px-3 gap-2.5 py-1.5",
            lg: "text-[15px] px-4 gap-4 py-2",
            xl: "text-[15px] px-5 gap-4 py-3",
            "2xl": "text-base px-6 gap-5 py-4",
            "3xl": "text-lg px-7 gap-6 py-5",
            "4xl": "text-xl px-8 gap-7 py-6",
            "5xl": "text-2xl px-10 gap-8 py-8",
            "6xl": "text-3xl px-12 gap-10 py-10",
            "7xl": "text-4xl px-14 gap-12 py-12",
        },
        color: {
            // Standard Flowbite colors
            blue: "text-blue-600 bg-blue-50 data-[active=true]:bg-blue-200 data-[interactive=true]:hover:bg-blue-100",
            cyan: "text-cyan-600 bg-cyan-50 data-[active=true]:bg-cyan-200 data-[interactive=true]:hover:bg-cyan-100",
            dark: "text-gray-800 bg-gray-100 data-[active=true]:bg-gray-300 data-[interactive=true]:hover:bg-gray-200",
            failure:
                "text-red-600 bg-red-50 data-[active=true]:bg-red-200 data-[interactive=true]:hover:bg-red-100",
            gray: "text-gray-600 bg-gray-50 data-[active=true]:bg-gray-200 data-[interactive=true]:hover:bg-gray-100",
            green: "text-green-600 bg-green-50 data-[active=true]:bg-green-200 data-[interactive=true]:hover:bg-green-100",
            indigo: "text-indigo-600 bg-indigo-50 data-[active=true]:bg-indigo-200 data-[interactive=true]:hover:bg-indigo-100",
            light: "text-gray-300 bg-gray-50 data-[active=true]:bg-gray-200 data-[interactive=true]:hover:bg-gray-100",
            lime: "text-lime-600 bg-lime-50 data-[active=true]:bg-lime-200 data-[interactive=true]:hover:bg-lime-100",
            pink: "text-pink-600 bg-pink-50 data-[active=true]:bg-pink-200 data-[interactive=true]:hover:bg-pink-100",
            purple: "text-purple-600 bg-purple-50 data-[active=true]:bg-purple-200 data-[interactive=true]:hover:bg-purple-100",
            red: "text-red-600 bg-red-50 data-[active=true]:bg-red-200 data-[interactive=true]:hover:bg-red-100",
            teal: "text-teal-600 bg-teal-50 data-[active=true]:bg-teal-200 data-[interactive=true]:hover:bg-teal-100",
            yellow: "text-yellow-600 bg-yellow-50 data-[active=true]:bg-yellow-200 data-[interactive=true]:hover:bg-yellow-100",
            // Custom colors mapped to Flowbite standards
            default: "data-[active=true]:bg-gray-200 data-[interactive=true]:hover:bg-gray-100",
            neutral:
                "text-neutral bg-neutral-50 data-[active=true]:bg-neutral-200 data-[interactive=true]:hover:bg-neutral-100",
            black: "text-black bg-gray-900 data-[active=true]:bg-gray-700 data-[interactive=true]:hover:bg-gray-800",
            primary:
                "text-primary-600 bg-primary-50 data-[active=true]:bg-primary-200 data-[interactive=true]:hover:bg-primary-100",
            secondary:
                "text-secondary-600 bg-secondary-50 data-[active=true]:bg-secondary-200 data-[interactive=true]:hover:bg-secondary-100",
            error: "text-error-600 bg-error-50 data-[active=true]:bg-error-200 data-[interactive=true]:hover:bg-error-100",
            success:
                "text-success-600 bg-success-50 data-[active=true]:bg-success-200 data-[interactive=true]:hover:bg-success-100",
            warning:
                "text-warning-600 bg-warning-50 data-[active=true]:bg-warning-200 data-[interactive=true]:hover:bg-warning-100",
            info: "text-info-600 bg-info-50 data-[active=true]:bg-info-200 data-[interactive=true]:hover:bg-info-100",
            accent: "text-accent-600 bg-accent-50 data-[active=true]:bg-accent-200 data-[interactive=true]:hover:bg-accent-100",
        },
    },
});

interface CommonListItemProps
    extends TProps<CommonListItemTheme>,
        Omit<WithoutThemingProps<ListItemProps>, "color" | "icon"> {
    active?: boolean;
    icon?: IconLike;
    href?: string;
    LinkComponent?: LinkComponent;
    linkProps?: LinkProps;
    loading?: boolean;
    /**
     * Apply clickable styles? Defaults to true when {@link onClick} or {@link href} is provided.
     */
    clickable?: boolean;
    iconProps?: PartialPropsOf<typeof Icon>;
    start?: ReactNode;
    end?: ReactNode;
    wrapperProps?: PropsOf<"div" | "span">;
    /**
     * Show color background when active
     * @default true
     */
    activeBg?: boolean;
    hoverEffect?: boolean;
    innerProps?: PropsOf<"div">;
    selectable?: boolean;
    onSelectionChange?: (selected: boolean, value: string) => void;
    selected?: boolean | string[];
    value?: string;
    // checkboxProps?: PartialPropsOf<typeof Checkbox>; // Commented out until Checkbox is available
}

/**
 * ### Props
 * - `icon`
 * - `onClick`
 * - `hoverEffect`
 * - `start`
 * - `end`
 * - `activeBg`
 * - `active`
 */
export const CommonListItem: FC<CommonListItemProps> = (props) => {
    const { classNames, restProps, children } = useResolveT("listItem", commonListItem, props);
    const {
        onClick,
        active,
        style,
        href,
        LinkComponent,
        loading,
        iconProps,
        ref,
        start,
        hoverEffect,
        end,
        wrapperProps,
        activeBg = true,
        linkProps,
        innerProps,
        icon,
        selectable,
        selected,
        onSelectionChange,
        value,
        ...rootProps
    } = restProps;

    const ico = loading ? <Spinner color={(props.color as string) || "default"} /> : icon;
    const InnerComp: any = href ? LinkComponent || "a" : "div";
    const _linkProps = href ? { ...linkProps, href } : {};
    const _disabled = loading || props.disabled;
    const iconSize = props.size === "xs" ? "sm" : props.size === "lg" || props.size === "xl" ? "xl" : "md";
    const fallbackValue = useId();
    const _value = value ?? fallbackValue;
    const [isSelected, setIsSelected] = useState(() => {
        if (typeof selected === "boolean") return selected;
        if (Array.isArray(selected)) return selected.includes(_value);
        return false;
    });
    const selectedControlled = selected !== undefined;

    useEffect(() => {
        if (typeof selected === "boolean") {
            setIsSelected(selected);
        } else if (Array.isArray(selected) && _value !== undefined) {
            setIsSelected(selected.includes(_value));
        }
    }, [selected]);

    return (
        /* 
        Wrapper component is required, so we can have a consistent root element (e.g. li),
        even with href set.
        */
        <ListItem className={classNames.root} style={style} ref={ref} {...rootProps}>
            <InnerComp
                {...innerProps}
                data-active={active || undefined}
                data-interactive={!!onClick || !!href || undefined}
                className={twMerge(classNames.inner, innerProps?.className)}
                onClick={_disabled ? undefined : (e: any) => onClick?.(e)}
                {..._linkProps}
            >
                {selectable && (
                    <div className="flex items-center">
                        {/* Placeholder for checkbox - would use <Checkbox> when available */}
                        <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={(e) => {
                                const selected = e.target.checked;
                                if (!selectedControlled) {
                                    setIsSelected(selected);
                                }
                                onSelectionChange?.(selected, _value);
                            }}
                            className="mr-2"
                        />
                    </div>
                )}
                {start}
                {ico ? (
                    <Icon
                        size={iconSize}
                        {...iconProps}
                        className={twMerge("self-center", iconProps?.className)}
                    >
                        {ico}
                    </Icon>
                ) : null}
                {typeof children === "string" ? (
                    <span
                        {...(wrapperProps as any)}
                        className={twMerge("grow truncate", wrapperProps?.className)}
                    >
                        {children}
                    </span>
                ) : (
                    <div
                        {...(wrapperProps as any)}
                        className={twMerge("grow min-w-0", wrapperProps?.className)}
                    >
                        {children}
                    </div>
                )}
                {end}
            </InnerComp>
        </ListItem>
    );
};
