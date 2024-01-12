"use client";

import LinkContainer from "@react-client/components/navigation/link-container";
import clsx from "clsx";
import Styled from "@react-client/components/others/styled";
import Chip from "@react-client/components/data-display/chip/chip";

interface TabProps {
    icon?: React.ReactElement;
    href?: string;
    children: string;
    style?: React.CSSProperties;
    active?: boolean;
    className?: string;
    variant?: "chips" | "default";
}

export default function Tab(props: TabProps) {
    const active = !!props.active;
    const variant = props.variant || "default";
    const classes = clsx(
        "cursor-pointer",
        variant === "chips"
            ? "Tab_chip rounded-full bg-bg"
            : [
                  "items-center hover:bg-action-selected p-1 rounded-tr rounded-tl text-text-secondary text-sm",
                  active ? "border-b-2 border-primary" : "border-b-2 !border-transparent hover:border-action-hover",
              ],

        props.className
    );
    const chipClasses = variant === "chips" ? clsx(active && "outline-divider outline !bg-bg-paper/40") : "";
    let children: React.ReactNode;

    if (variant === "chips") {
        // chips text co,or hover effect ist in css class Tab_chip
        children = (
            <Chip startIcon={props.icon} variant="pale" className={chipClasses}>
                {props.children}
            </Chip>
        );
    } else
        children = (
            <>
                {props.icon && <Styled className="mr-1.5">{props.icon}</Styled>}
                {props.children}
            </>
        );

    return (
        <LinkContainer href={props.href} style={props.style} className={classes}>
            {children}
        </LinkContainer>
    );
}
