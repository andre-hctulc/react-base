import { tv, type VariantProps } from "tailwind-variants";
import type { LinkComponent, PropsOf } from "../../types/index.js";
import { Icon } from "../icons/icon.js";
import { type FC, type ReactNode, type Ref } from "react";
import { Spinner } from "../data-display/spinner.js";
import clsx from "clsx";
import { themeColor } from "../../util/style.js";

const listItem = tv({
    base: "transition duration-75 min-w-0",
    variants: {
        rounded: {
            sm: "rounded-sm",
            md: "rounded-md",
            lg: "rounded-lg",
            xl: "rounded-xl",
            full: "rounded-full",
        },
        clickable: {
            true: "cursor-pointer active:brightness-75",
        },
        variant: {
            danger: "text-error",
            warning: "text-warning",
            default: "",
            secondary: "text-t2",
        },
        color: {
            neutral: "",
            black: "",
            primary: "",
            secondary: "",
            error: "",
            success: "",
            warning: "",
            info: "",
            accent: "",
        },
        hoverEffect: {
            true: "",
            false: "",
        },
        disabled: {
            true: "cursor-not-allowed opacity-50",
        },
    },
    compoundVariants: [
        {
            variant: "danger",
            hoverEffect: true,
            class: "hover:bg-error/5",
        },
        {
            variant: "warning",
            hoverEffect: true,
            class: "hover:bg-warning/5",
        },
        {
            variant: "default",
            hoverEffect: true,
            class: "hover:bg-transparent1",
        },
        {
            variant: "secondary",
            hoverEffect: true,
            class: "hover:bg-neutral/5",
        },
    ],
    defaultVariants: {
        variant: "default",
        rounded: "md",
        color: "neutral",
    },
});

const listItemInner = tv({
    base: "w-full flex items-center box-border transition duration-100",
    variants: {
        size: {
            xs: "text-xs px-2 gap-1.5 py-1",
            sm: "text-[14px] px-2 gap-2 py-1",
            md: "text-[15px] px-3 gap-2.5 py-1.5",
            lg: "text-[15px] px-4 gap-4 py-2",
            xl: "text-[15px] px-5 gap-4 py-3",
        },
    },
    defaultVariants: {
        size: "md",
    },
});

interface ListItemProps extends VariantProps<typeof listItem>, VariantProps<typeof listItemInner> {
    children?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLLIElement>;
    className?: string;
    style?: React.CSSProperties;
    active?: boolean;
    icon?: React.ReactNode;
    key?: string;
    href?: string;
    LinkComponent?: LinkComponent;
    innerProps?: any;
    loading?: boolean;
    /**
     * @default "div"
     */
    as?: any;
    disabled?: boolean;
    /**
     * Apply clickable styles? Defaults to true when {@link onClick} or {@link href} is provided.
     */
    clickable?: boolean;
    iconProps?: PropsOf<typeof Icon>;
    ref?: Ref<HTMLElement>;
    start?: ReactNode;
    end?: ReactNode;
    wrapperProps?: PropsOf<"div" | "span">;
    /**
     * Show color background when active
     * @default true
     */
    activeBg?: boolean;
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
export const ListItem: FC<ListItemProps> = ({
    children,
    onClick,
    className,
    active,
    style,
    href,
    LinkComponent,
    loading,
    variant,
    size,
    innerProps,
    disabled,
    iconProps,
    ref,
    start,
    hoverEffect,
    end,
    wrapperProps,
    color,
    activeBg = true,
    ...props
}) => {
    const Link = LinkComponent || "a";
    const icon = loading ? <Spinner color={variant === "danger" ? "error" : "neutral"} /> : props.icon;
    const Comp: any = props.as || "li";
    const Inner: any = href ? Link : "div";
    const _innerProps = href ? { ...innerProps, href } : innerProps;
    const _disabled = loading || disabled;
    const interactive = _disabled ? false : props.clickable ?? (!!onClick || !!href);
    const iconSize = size === "xs" ? "sm" : size === "lg" || size === "xl" ? "xl" : "md";
    const { bgA, text } = themeColor(
        variant === "warning" ? "warning" : variant === "danger" ? "error" : color || "neutral"
    );
    const activeClasses = active && [activeBg && bgA(15), text];

    return (
        <Comp
            ref={ref}
            data-active={active}
            className={listItem({
                hoverEffect: !active && (interactive || !!hoverEffect),
                variant,
                className: clsx(activeClasses, className),
                clickable: interactive,
                disabled: _disabled,
            })}
            data-reactive={true}
            onClick={_disabled ? undefined : onClick}
            style={style}
        >
            <Inner className={listItemInner({ size })} {..._innerProps}>
                {start}
                {icon ? (
                    <Icon className="self-center" size={iconSize}>
                        {icon}
                    </Icon>
                ) : null}
                {typeof children === "string" ? (
                    <span {...(wrapperProps as any)} className={clsx("truncate", wrapperProps?.className)}>
                        {children}
                    </span>
                ) : (
                    <div {...(wrapperProps as any)} className={clsx("grow min-w-0", wrapperProps?.className)}>
                        {children}
                    </div>
                )}
                {end}
            </Inner>
        </Comp>
    );
};
