import { tv, type VariantProps } from "tailwind-variants";
import type { LinkComponent, PropsOf } from "../../types/index.js";
import { Icon } from "../icons/icon.js";
import { type FC, type ReactNode, type Ref } from "react";
import { Spinner } from "../data-display/spinner.js";
import clsx from "clsx";

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
            true: "cursor-pointer active:brightness-50",
        },
        variant: {
            danger: "text-error",
            default: "",
            secondary: "text-t2",
            warning: "text-warning",
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
            class: "hover:bg-error/5 data-[active=true]:bg-error/10",
        },
        {
            variant: "warning",
            hoverEffect: true,
            class: "hover:bg-warning/5 data-[active=true]:bg-warning/10",
        },
        {
            variant: "default",
            hoverEffect: true,
            class: "hover:bg-transparent1 data-[active=true]:bg-transparent2",
        },
        {
            variant: "secondary",
            hoverEffect: true,
            class: "hover:bg-neutral/5 data-[active=true]:bg-neutral/10",
        },
    ],
    defaultVariants: {
        variant: "default",
        rounded: "md",
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
}

/**
 * ### Props
 * - `icon`
 * - `onClick`
 * - `hoverEffect` - Enforce hover effect even if not clickable
 * - `start` - Prepend content
 * - `end` - Append content
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

    return (
        <Comp
            ref={ref}
            data-active={active}
            className={listItem({
                hoverEffect: interactive || !!hoverEffect,
                variant,
                className,
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
