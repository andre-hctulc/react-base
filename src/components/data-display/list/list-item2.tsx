"use client";

import Stack from "@react-client/components/layout/containers/stack";

export default function ListItem2(props: {
    style?: React.CSSProperties;
    className?: string;
    startIcon?: React.ReactNode;
    children: React.ReactNode;
    onClick?: () => void;
}) {
    return (
        <Stack
            style={{ ...props.style }}
            className={props.className + " px-1 py-2 items-center hover:cursor-pointer hover:bg-bg-paper3"}
            tag="li"
            direction="row"
            onClick={props.onClick}
        >
            {props.startIcon && <div className="mr-2">{props.startIcon}</div>}
            {props.children}
        </Stack>
    );
}
