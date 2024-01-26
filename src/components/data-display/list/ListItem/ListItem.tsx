// * SSR

import Styled from "@react-client/components/others/Styled";
import IconButton from "@react-client/components/input/buttons/IconButton/IconButton";
import Stack from "@react-client/components/layout/containers/Stack/Stack";
import ShortText from "@react-client/components/text/ShortText/ShortText";
import Typography, { TextVariant } from "@react-client/components/text/Typography/Typography";
import { PropsOf } from "@react-client/types";
import clsx from "clsx";
import React from "react";
import { Size } from "@react-client/types";
import { collapse } from "@client-util/helpers";

interface ListItemProps {
    className?: string;
    style?: React.CSSProperties;
    icon?: React.ReactElement;
    start?: React.ReactNode;
    children?: React.ReactNode;
    noPadding?: boolean;
    /** @default "li" */
    tag?: string;
    slotProps?: { text?: PropsOf<typeof Typography> };
    hoverEffect?: boolean;
    size?: Size;
    onClick?: React.MouseEventHandler;
    onAction?: React.MouseEventHandler;
    actionIcon?: React.ReactElement;
}

export const listItemIconSize = 22;

const ListItem = React.forwardRef<HTMLElement, ListItemProps>((props, ref) => {
    const [textVariant, height, iconSize] = collapse<Size, [TextVariant, number, number]>(props.size || "medium", {
        small: ["body2", 35, 17],
        medium: ["body2", 40, 20],
        large: ["body2", 45, 23],
    });

    return (
        <Stack
            onClick={props.onClick}
            direction="row"
            align="center"
            tag={props.tag || "li"}
            className={clsx(
                "space-x-2",
                !props.noPadding && "px-2",
                props.hoverEffect && "hover:bg-action-hover cursor-pointer active:bg-action-active",
                props.className
            )}
            style={{ height, ...props.style }}
            ref={ref}
        >
            {props.icon && (
                <Styled className="mr-2" size={iconSize}>
                    {props.icon}
                </Styled>
            )}
            {props.start}
            {typeof props.children === "string" ? (
                <ShortText variant={textVariant} {...props.slotProps?.text}>
                    {props.children}
                </ShortText>
            ) : (
                props.children
            )}
            {props.actionIcon && (
                <IconButton onClick={e => props.onAction?.(e)} size={props.size === "large" ? "medium" : "small"}>
                    {props.actionIcon}
                </IconButton>
            )}
        </Stack>
    );
});

ListItem.displayName = "ListItem";

export default ListItem;
