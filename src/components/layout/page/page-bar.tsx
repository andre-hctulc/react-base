"use client";

import LinkContainer from "@react-client/components/navigation/link-container";
import React from "react";
import Typography from "@react-client/components/text/typography";
import clsx from "clsx";
import ChevronRightIcon from "@react-client/components/icons/collection/chevron-right";
import useIsSticky from "@react-client/hooks/others/use-is-sticky";
import Stack from "../containers/stack";

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
                        <LinkContainer href={part.href} role={!part.href ? "contentinfo" : undefined}>
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
