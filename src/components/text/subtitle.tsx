// * SSR

import React from "react";
import Typography from "./typography";
import { PropsOf } from "@react-client/util";
import Styled from "@react-client/components/others/styled";
import clsx from "clsx";
import { collapse } from "@client-util/style-util";

interface IconTextProps {
    className?: string;
    style?: React.CSSProperties;
    icon?: React.ReactElement;
    children?: string;
    slotProps?: { text?: PropsOf<typeof Typography> };
    tag?: string;
    bold?: boolean;
    /** @default "subtitle1" */
    variant?: "subtitle1" | "subtitle2" | "subtitle3";
    noMargin?: boolean;
    /** Verringert den Abstand nach unten */
    dense?: boolean;
}

export default function Subtitle(props: IconTextProps) {
    const variant = props.variant || "subtitle1";
    const [textVariant, iconSize] = collapse(variant, { subtitle1: ["subtitle1", 19], subtitle2: ["subtitle2", 19], subtitle3: ["body1", 17] } as const);

    return (
        <Typography
            className={clsx(!props.noMargin && (props.dense ? "mb-1.5 mt-2" : "mb-3 mt-3.5"), props.className)}
            bold={props.bold ? "bold" : undefined}
            tag={props.tag || (variant === "subtitle3" ? "h6" : undefined)}
            alignCenter
            variant={textVariant}
            {...props.slotProps?.text}
        >
            {props.icon && (
                <Styled size={iconSize} className="mr-2.5 text-text-secondary">
                    {props.icon}
                </Styled>
            )}
            {props.children}
        </Typography>
    );
}
