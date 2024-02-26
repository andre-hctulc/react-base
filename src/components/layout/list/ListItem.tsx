import clsx from "clsx";
import React from "react";
import type { LinkProps, PropsOf, Size } from "../../../types";
import { collapse } from "../../../util";
import IconButton from "../../input/buttons/IconButton";
import Flex from "../../layout/Flex";
import Styled from "../../others/Styled";
import Typography, { TextVariant } from "../../text/Typography";

interface ListItemProps {
    className?: string;
    style?: React.CSSProperties;
    /** Use _null_ to to immulate the space an icon would occupy */
    icon?: React.ReactElement | null;
    start?: React.ReactNode;
    children?: React.ReactNode;
    noPadding?: boolean;
    /** @default "li" */
    tag?: string;
    slotProps?: { text?: PropsOf<typeof Typography>; icon?: PropsOf<typeof Styled> };
    hoverEffect?: boolean;
    size?: Size;
    onClick?: React.MouseEventHandler;
    onAction?: React.MouseEventHandler;
    actionIcon?: React.ReactElement;
    href?: string;
    iconSize?: number;
    linkComponent?: React.ComponentType<LinkProps>;
    active?: boolean;
}

const ListItem = React.forwardRef<HTMLElement, ListItemProps>((props, ref) => {
    const [textVariant, height, iconSize] = collapse<Size, [TextVariant, number, number]>(
        props.size || "medium",
        {
            small: ["body2", 32, 15],
            medium: ["body2", 36, 17],
            large: ["body2", 40, 21],
        },
        ["body2", 36, 18]
    );
    const text =
        typeof props.children === "string" ? (
            <Typography
                tag="span"
                truncate
                variant={textVariant}
                {...props.slotProps?.text}
                className={clsx(props.active && "text-info", props.slotProps?.text?.className)}
            >
                {props.children}
            </Typography>
        ) : (
            props.children
        );
    const Link: any = props.linkComponent || "a";

    return (
        <Flex
            onClick={props.onClick}
            direction="row"
            align="center"
            tag={props.tag || "li"}
            className={clsx(
                "flex-shrink-0",
                !props.noPadding && "px-2",
                props.hoverEffect && "hover:bg-action-hover cursor-pointer active:bg-action-active",
                props.className
            )}
            style={{ height, ...props.style }}
            ref={ref}
        >
            {props.icon !== undefined && (
                <span style={{ width: iconSize + 7 }}>
                    {props.icon && (
                        <Styled onClick={e => e.stopPropagation()} size={props.iconSize || iconSize} {...props.slotProps?.icon}>
                            {props.icon}
                        </Styled>
                    )}
                </span>
            )}
            {props.start}
            {props.href ? <Link>{text}</Link> : text}
            {props.actionIcon && (
                <IconButton onClick={e => props.onAction?.(e)} size={props.size === "large" ? "medium" : "small"}>
                    {props.actionIcon}
                </IconButton>
            )}
        </Flex>
    );
});

ListItem.displayName = "ListItem";

export default ListItem;
