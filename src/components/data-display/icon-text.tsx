// * SSR

import React from "react";
import Styled from "@react-client/components/others/Styled";
import ShortText from "@react-client/components/text/short-text";
import { PropsOf } from "@react-client/util";
import clsx from "clsx";
import Skeleton from "@react-client/components/data-display/loading/skeleton";
import Stack from "@react-client/components/layout/containers/Stack/Stack";

interface IconTextProps {
    className?: string;
    style?: React.CSSProperties;
    tag?: string;
    children?: React.ReactNode;
    icon?: React.ReactElement;
    avatar?: React.ReactNode;
    iconSize?: number;
    text?: string;
    slotProps?: { title?: PropsOf<typeof ShortText>; icon?: Partial<PropsOf<typeof Styled>> };
    /** @default true */
    borderB?: boolean;
    contrast?: boolean;
    loading?: boolean;
    onClick?: React.MouseEventHandler;
    justify?: "end" | "start" | "center";
    textVariant?: PropsOf<typeof ShortText>["variant"];
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
                    <ShortText variant={props.textVariant} {...props.slotProps?.title}>
                        {props.text}
                    </ShortText>
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
