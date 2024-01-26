// * SSR

import clsx from "clsx";
import React from "react";
import Button from "@react-client/components/input/buttons/button";
import Stack from "@react-client/components/layout/containers/stack";
import { PropsOf } from "@react-client/types";
import EmptyText from "../../text/empty-text";
import Delayed from "@react-client/components/others/delayed";

interface PlaceholderProps {
    /** Falls _string_, dann wird Dieser als Inhalt für ein `EmptyText` verwendet, ansonsten bleibt `children` unverändert.  */
    children: React.ReactNode;
    actionText?: string;
    action?: (event: React.MouseEvent) => void;
    className?: string;
    style?: React.CSSProperties;
    buttonIcon?: React.ReactElement;
    component?: string;
    padding?: boolean;
    py?: boolean;
    /** @default "center" */
    align?: PropsOf<typeof Stack>["align"];
    justify?: PropsOf<typeof Stack>["justify"];
    tag?: string;
    error?: boolean;
    delay?: number;
}

export default function Placeholder(props: PlaceholderProps) {
    const ph = (
        <Stack
            tag={props.tag}
            align={props.align || "center"}
            justify={props.justify || "center"}
            className={clsx("flex-grow px-2", props.padding && "p-4", props.py && "py-4", props.className)}
            style={props.style}
        >
            {typeof props.children === "string" ? (
                <EmptyText className={clsx(props.error && "!text-error")} variant="caption" center>
                    {props.children}
                </EmptyText>
            ) : (
                props.children
            )}
            {props.actionText && (
                <Button startIcon={props.buttonIcon} onClick={props.action}>
                    {props.actionText}
                </Button>
            )}
        </Stack>
    );

    if (props.delay) return <Delayed delay={props.delay}>{ph}</Delayed>;
    else return ph;
}
