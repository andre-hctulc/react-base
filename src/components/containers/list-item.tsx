import { tv, type VariantProps } from "tailwind-variants";
import { Tool, type ToolItem } from "../input/tool.js";
import type { LinkComponent, PropsOf } from "../../types/index.js";
import { Icon } from "../icons/icon.js";
import { forwardRef } from "react";
import { Toolbar } from "./toolbar.js";
import { withPrefix } from "../../util/system.js";
import { Spinner } from "../data-display/spinner.js";

const listItem = tv({
    base: "w-full transition duration-75",
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
            danger: "",
            default: "",
            secondary: "",
        },
        effects: {
            true: "",
        },
    },
    compoundVariants: [
        {
            variant: "danger",
            effects: true,
            class: "text-error hover:bg-error/5 data-[active=true]:bg-error/10",
        },
        {
            variant: "default",
            effects: true,
            class: "hover:bg-transparent1 data-[active=true]:bg-transparent2",
        },
        {
            variant: "secondary",
            effects: true,
            class: "text-t2 hover:bg-neutral/5 data-[active=true]:bg-neutral/10",
        },
    ],
    defaultVariants: {
        variant: "default",
        effects: true,
        rounded: "md",
    },
});

const listItemInner = tv({
    base: "w-full flex box-border transition duration-100",
    variants: {
        size: {
            sm: "text-xs px-2 gap-2 py-1",
            md: "text-[15px] px-3 gap-3 py-1.5",
            lg: "text-[15px] px-4 gap-4 py-2",
            xl: "text-[15px] px-5 gap-4 py-3",
        },
    },
    defaultVariants: {
        size: "md",
    },
});
export interface ListItem {
    key: string;
    label: React.ReactNode;
    className?: string;
    data?: any;
    icon?: React.ReactNode;
    /**
     * Takes precedence over `activeKey` in `List`
     */
    active?: boolean;
    tools?: ToolItem[];
    color?: string;
    loading?: boolean;
    href?: string;
    variant?: "danger" | "default";
    disabled?: boolean;
    onClick?: React.MouseEventHandler<HTMLLIElement>;
    /**
     * @default !!onClick
     */
    clickable?: boolean;
}

interface ListItemProps extends VariantProps<typeof listItem>, VariantProps<typeof listItemInner> {
    children?: React.ReactNode;
    onClick?: React.MouseEventHandler<HTMLLIElement>;
    className?: string;
    style?: React.CSSProperties;
    active?: boolean;
    icon?: React.ReactNode;
    key?: string;
    tools?: ToolItem[];
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
}

export const ListItem = forwardRef<HTMLElement, ListItemProps>(
    (
        {
            children,
            onClick,
            className,
            active,
            style,
            tools,
            href,
            LinkComponent,
            loading,
            variant,
            size,
            innerProps,
            effects,
            disabled,
            iconProps,
            ...props
        },
        ref
    ) => {
        const Link = LinkComponent || "a";
        const icon = loading ? <Spinner color={variant === "danger" ? "error" : "neutral"} /> : props.icon;
        const clickHandler = loading ? undefined : onClick;
        const Comp: any = props.as || "div";
        const Inner: any = href ? Link : "div";
        const _innerProps = href ? { ...innerProps, href } : innerProps;
        const _disabled = loading || disabled;
        const interactive = _disabled ? false : props.clickable ?? (!!onClick || !!href);
        const iconSize = size === "sm" ? "sm" : size === "lg" || size === "xl" ? "xl" : "md";

        return (
            <Comp
                ref={ref}
                data-active={active}
                className={listItem({
                    effects,
                    variant,
                    className,
                    clickable: interactive,
                })}
                data-reactive={true}
                onClick={_disabled ? undefined : clickHandler}
                style={style}
            >
                <Inner className={listItemInner({ size })} {..._innerProps}>
                    {icon ? (
                        <Icon className="self-center" size={iconSize}>
                            {icon}
                        </Icon>
                    ) : null}
                    {typeof children === "string" ? (
                        <span className="grow truncate">{children}</span>
                    ) : (
                        children
                    )}
                    {tools?.length && (
                        <Toolbar justify="end" gap="sm">
                            {tools?.map(({ key, ...tool }) => (
                                <Tool variant="text" size="sm" color="neutral" key={key} {...tool} />
                            ))}
                        </Toolbar>
                    )}
                </Inner>
            </Comp>
        );
    }
);

ListItem.displayName = withPrefix("ListItem");
