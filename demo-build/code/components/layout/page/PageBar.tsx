"use client";

import React from "react";
import clsx from "clsx";
import Stack from "../Stack";
import useIsSticky from "../../../hooks/others/useIsSticky";
import ChevronRightIcon from "../../icons/collection/ChevronRight";
import LinkContainer from "../../navigation/links/LinkContainer";
import Typography from "../../text/Typography";

export const pageBarHeight = 30;

interface PageBarProps {
    style?: React.CSSProperties;
    location: { label: string; href?: string }[];
    className?: string;
    children?: React.ReactNode;
}

export default function PageBar(props: PageBarProps) {
    const isSticky = useIsSticky();
    const classes = clsx(
        "transition duration-120 pl-2 pr-3 bg-bg rounded-br self-start space-x-1 sticky flex-shrink-0 z-20 overflow-x-auto",
        isSticky && "border-b border-r shadow",
        props.className
    );

    return (
        <Stack
            direction="row"
            align="center"
            className={classes}
            tag={"nav"}
            style={{ height: pageBarHeight, top: 0, minHeight: pageBarHeight, maxHeight: pageBarHeight, ...props.style }}
        >
            {props.location.map((part, i) => {
                const isLastPart = i === props.location.length - 1;
                const textClasses = clsx("text-sm italic", part.href ? "text-info" : "text-text-secondary", isLastPart && "!not-italic", part.href && "hover:underline");

                return (
                    <React.Fragment key={i}>
                        <ChevronRightIcon color="text_secondary" size={12} />
                        <LinkContainer href={part.href}>
                            <Typography tag={"span"} className={textClasses} variant={"body2"}>
                                {part.label}
                            </Typography>
                        </LinkContainer>
                    </React.Fragment>
                );
            })}
            {props.children}
        </Stack>
    );
}
