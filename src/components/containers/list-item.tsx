import { tv, type VariantProps } from "tailwind-variants";
import { Tool, type ToolItem } from "../input/tool.js";
import type { LinkComponent, PropsOf } from "../../types/index.js";
import { Icon } from "../icons/icon.js";
import { type FC, type Ref } from "react";
import { Toolbar } from "./toolbar.js";
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
            danger: "text-error",
            default: "",
            secondary: "text-t2",
        },
        effects: {
            true: "",
        },
        disabled: {
            true: "cursor-not-allowed opacity-50",
        }
    },
    compoundVariants: [
        {
            variant: "danger",
            effects: true,
            class: "hover:bg-error/5 data-[active=true]:bg-error/10",
        },
        {
            variant: "default",
            effects: true,
            class: "hover:bg-transparent1 data-[active=true]:bg-transparent2",
        },
        {
            variant: "secondary",
            effects: true,
            class: "hover:bg-neutral/5 data-[active=true]:bg-neutral/10",
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
    ref?: Ref<HTMLElement>;
}

export const ListItem: FC<ListItemProps> = ({
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
    ref,
    ...props
}) => {
    const Link = LinkComponent || "a";
    const icon = loading ? <Spinner color={variant === "danger" ? "error" : "neutral"} /> : props.icon;
    const clickHandler = loading ? undefined : onClick;
    const Comp: any = props.as || "div";
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
                effects: interactive && effects,
                variant,
                className,
                clickable: interactive,
                disabled: _disabled,
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
                {typeof children === "string" ? <span className="grow truncate">{children}</span> : children}
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
};
