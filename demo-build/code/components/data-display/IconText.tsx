import React from "react";
import clsx from "clsx";
import { PropsOf } from "../../types";
import Stack from "../layout/Stack";
import Styled from "../others/Styled";
import Skeleton from "./feedback/Skeleton";
import Typography from "../text/Typography";

interface IconTextProps {
    className?: string;
    style?: React.CSSProperties;
    tag?: string;
    children?: React.ReactNode;
    icon?: React.ReactElement;
    avatar?: React.ReactNode;
    iconSize?: number;
    text?: string;
    slotProps?: { title?: PropsOf<typeof Typography>; icon?: Partial<PropsOf<typeof Styled>> };
    /** @default true */
    borderB?: boolean;
    contrast?: boolean;
    loading?: boolean;
    onClick?: React.MouseEventHandler;
    justify?: "end" | "start" | "center";
    textVariant?: PropsOf<typeof Typography>["variant"];
    secondary?: boolean;
    disabled?: boolean;
    reverse?: boolean;
}

const iconSize = 18;

export default function IconText(props: IconTextProps) {
    let main: React.ReactNode;

    if (props.loading) {
        main = (
            <>
                <Skeleton className="mx-2" variant="circular" height={props.iconSize || iconSize} />
                <Skeleton width={70} height={iconSize} />
            </>
        );
    } else
        main = (
            <>
                {props.avatar && <span className="mx-2">{props.avatar}</span>}
                {props.icon && (
                    <Styled size={props.iconSize || iconSize} {...props.slotProps?.icon} className={clsx("mx-2", props.slotProps?.icon?.className)}>
                        {props.icon}
                    </Styled>
                )}
                {props.text && (
                    <Typography truncate variant={props.textVariant} {...props.slotProps?.title}>
                        {props.text}
                    </Typography>
                )}
                {props.children}
            </>
        );

    return (
        <Stack
            direction="row"
            align="center"
            reverse={props.reverse}
            justify={props.justify}
            onClick={props.onClick}
            className={clsx(
                "p-0.5",
                props.secondary && "text-text-secondary",
                props.disabled && "text-text-disabled",
                props.borderB && "border-b",
                props.contrast && "bg-bg-paper/80",
                props.className
            )}
            style={props.style}
            tag={props.tag}
        >
            {main}
        </Stack>
    );
}