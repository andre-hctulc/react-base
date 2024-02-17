import clsx from "clsx";
import React from "react";
import type { PropsOf } from "../../../types";
import Button from "../../input/buttons/Button";
import Flex from "../../layout/Flex";
import Delayed from "../../others/Delayed";
import EmptyText from "../../../../../../projects/webapp/src/components/text/EmptyText";

interface PlaceholderProps {
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
    align?: PropsOf<typeof Flex>["align"];
    justify?: PropsOf<typeof Flex>["justify"];
    tag?: string;
    /** Apply error styles */
    error?: boolean;
    delay?: number;
}

export default function Placeholder(props: PlaceholderProps) {
    const ph = (
        <Flex
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
        </Flex>
    );

    if (props.delay) return <Delayed delay={props.delay}>{ph}</Delayed>;
    else return ph;
}
