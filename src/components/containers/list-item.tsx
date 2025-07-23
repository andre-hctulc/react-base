import { tv, type VariantProps } from "tailwind-variants";
import type { LinkComponent, LinkProps, PropsOf } from "../../types/index.js";
import { Icon } from "../icons/icon.js";
import { type FC, type ReactNode, type Ref } from "react";
import { Spinner } from "../data-display/spinner.js";
import clsx from "clsx";

const listItem = tv({
    base: "transition duration-75 min-w-0 overflow-hidden flex items-center box-border",
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
        disabled: {
            true: "cursor-not-allowed opacity-50",
        },
        size: {
            xs: "text-xs px-2 gap-1.5 py-1",
            sm: "text-[14px] px-2 gap-2 py-1",
            md: "text-[15px] px-3 gap-2.5 py-1.5",
            lg: "text-[15px] px-4 gap-4 py-2",
            xl: "text-[15px] px-5 gap-4 py-3",
        },
        color: {
            default: "",
            neutral: "text-neutral",
            black: "text-black",
            primary: "text-primary",
            secondary: "text-secondary",
            error: "text-error",
            success: "text-success",
            warning: "text-warning",
            info: "text-info",
            accent: "text-accent",
        },
        hoverBg: {
            none: "",
            default: "hover:bg-transparent1",
            neutral: "hover:bg-neutral/10",
            black: "hover:bg-black/10",
            primary: "hover:bg-primary/10",
            secondary: "hover:bg-secondary/10",
            error: "hover:bg-error/10",
            success: "hover:bg-success/10",
            warning: "hover:bg-warning/10",
            info: "hover:bg-info/10",
            accent: "hover:bg-accent/10",
        },
        bg: {
            none: "",
            default: "bg-transparent1",
            neutral: "bg-neutral/10",
            black: "bg-black/10",
            primary: "bg-primary/10",
            secondary: "bg-secondary/10",
            error: "bg-error/10",
            success: "bg-success/10",
            warning: "bg-warning/10",
            info: "bg-info/10",
            accent: "bg-accent/10",
        },
    },
    defaultVariants: {
        size: "md",
        color: "default",
        hoverBg: "default",
        bg: "none",
        variant: "default",
        rounded: "md",
    },
});

interface ListItemProps extends VariantProps<typeof listItem> {
    children?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLLIElement>;
    className?: string;
    style?: React.CSSProperties;
    active?: boolean;
    icon?: React.ReactNode;
    key?: string;
    href?: string;
    LinkComponent?: LinkComponent;
    linkProps?: LinkProps;
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
    hoverEffect?: boolean;
    innerProps?: PropsOf<"div">;
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
    size,
    disabled,
    iconProps,
    ref,
    start,
    hoverEffect,
    end,
    wrapperProps,
    color = "default",
    activeBg = true,
    linkProps,
    bg,
    as,
    hoverBg,
    innerProps,
    icon,
    clickable,
    ...props
}) => {
    const ico = loading ? <Spinner color={color} /> : icon;
    const InnerComp: any = href ? LinkComponent || "a" : "div";
    const _linkProps = href ? { ...linkProps, href } : {};
    const _disabled = loading || disabled;
    const interactive = _disabled ? false : (clickable ?? (!!onClick || !!href));
    const iconSize = size === "xs" ? "sm" : size === "lg" || size === "xl" ? "xl" : "md";
    const bgColor = bg || color;
    const _hoverEffect = !active && (interactive || !!hoverEffect);
    const Comp = as || "li";

    return (
        /* 
        Wrapper component is required, so we can have a consistent root element (e.g. li),
        even with href set.
        */
        <Comp className={className} style={style} ref={ref} {...props}>
            <InnerComp
                {...innerProps}
                data-active={active || undefined}
                className={listItem({
                    size,
                    className: innerProps?.className,
                    hoverBg: _hoverEffect ? (hoverBg ?? bgColor) : "none",
                    bg: bg ? bg : active ? bgColor : "none",
                    color,
                    clickable: interactive,
                    disabled: _disabled,
                })}
                onClick={_disabled ? undefined : (e: any) => onClick?.(e)}
                {..._linkProps}
            >
                {start}
                {ico ? (
                    <Icon
                        size={iconSize}
                        {...iconProps}
                        className={clsx("self-center", iconProps?.className)}
                    >
                        {ico}
                    </Icon>
                ) : null}
                {typeof children === "string" ? (
                    <span
                        {...(wrapperProps as any)}
                        className={clsx("grow truncate", wrapperProps?.className)}
                    >
                        {children}
                    </span>
                ) : (
                    <div {...(wrapperProps as any)} className={clsx("grow min-w-0", wrapperProps?.className)}>
                        {children}
                    </div>
                )}
                {end}
            </InnerComp>
        </Comp>
    );
};
