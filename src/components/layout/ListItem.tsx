import clsx from "clsx";
import React from "react";
import type { PropsOf, StyleProps } from "../../types";
import IconButton from "../buttons/IconButton";
import Flex from "./Flex";
import Styled from "../shadow/Styled";
import { Typography } from "../text";

interface ListItemProps extends StyleProps {
    /** Use _null_ to to immulate the space an icon would occupy */
    icon?: React.ReactElement | null;
    start?: React.ReactNode;
    children?: React.ReactNode;
    noPadding?: boolean;
    /** @default "li" */
    tag?: string;
    slotProps?: { text?: PropsOf<typeof Typography>; icon?: PropsOf<typeof Styled> };
    hoverEffect?: boolean;
    onClick?: React.MouseEventHandler;
    onAction?: React.MouseEventHandler;
    actionIcon?: React.ReactElement;
    href?: string;
    iconSize?: number;
    active?: boolean;
}

const ListItem = React.forwardRef<HTMLElement, ListItemProps>((props, ref) => {
    const [height, iconSize] = [36, 17];

    const text =
        typeof props.children === "string" ? (
            <Typography
                tag="span"
                truncate
                variant="body2"
                {...props.slotProps?.text}
                className={clsx(props.active && "text-info", props.slotProps?.text?.className)}
            >
                {props.children}
            </Typography>
        ) : (
            props.children
        );

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
                        <Styled
                            onClick={(e) => e.stopPropagation()}
                            size={props.iconSize || iconSize}
                            {...props.slotProps?.icon}
                        >
                            {props.icon}
                        </Styled>
                    )}
                </span>
            )}
            {props.start}
            {props.href ? <a>{text}</a> : text}
            {props.actionIcon && (
                <IconButton onClick={(e) => props.onAction?.(e)} size="small">
                    {props.actionIcon}
                </IconButton>
            )}
        </Flex>
    );
});

ListItem.displayName = "ListItem";

export default ListItem;
