"use client";

import Toolbar from "@react-client/components/layout/containers/toolbar";
import { PropsOf, mapChildren } from "@react-client/util";
import React from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import type Tab from "./tab";

interface TabsProps {
    children?: React.ReactNode;
    persistActiveTab?: string;
    className?: string;
    style?: React.CSSProperties;
    variant?: PropsOf<typeof Tab>["variant"];
}

export default function Tabs(props: TabsProps) {
    const pathname = usePathname();
    const children = mapChildren(props.children, child => ({
        props: {
            ...child.props,
            active: child.props.href === pathname,
            variant: child.props.variant || props.variant,
        },
    }));
    const classes = clsx("pointer-events-auto items-end flex-shrink-0", props.variant === "chips" ? "space-x-3" : "space-x-5", props.className);

    return (
        <Toolbar tag={"nav"} className={classes} style={props.style}>
            {children}
        </Toolbar>
    );
}
