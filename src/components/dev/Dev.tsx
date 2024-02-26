"use client";

import { useDev } from "./DevProvider";

interface DevProps {
    children?: React.ReactNode;
    hidden?: boolean;
    highlight?: boolean;
}

export default function Dev(props: DevProps) {
    const { devMode } = useDev();

    if (!devMode || props.hidden) return null;

    if (props.highlight) return <span className={typeof props.children === "string" ? "text-common-violet" : "bg-common-yellow/50"}>{props.children}</span>;
    else return <>{props.children}</>;
}
