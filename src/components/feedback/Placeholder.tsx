import clsx from "clsx";
import React from "react";
import type { PropsOf, StyleProps } from "../../types";
import Button from "../buttons/Button";
import Flex from "../layout/Flex";
import Delayed from "../shadow/Delayed";
import Typography from "../text/Typography";

interface PlaceholderProps extends StyleProps {
    children: React.ReactNode;
    actionText?: string;
    action?: (event: React.MouseEvent) => void;
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
            className={["flex-grow px-2", props.padding && "p-4", props.py && "py-4", props.className]}
            style={props.style}
        >
            {typeof props.children === "string" ? (
                <Typography
                    secondary
                    italic
                    className={clsx(props.error && "!text-error")}
                    variant="caption"
                    textCenter
                >
                    {props.children}
                </Typography>
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
