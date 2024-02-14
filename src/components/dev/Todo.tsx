"use client";

import Alert from "../data-display/alerts/Alert";
import AlertTitle from "../data-display/alerts/AlertTitle";
import Dev from "./Dev";

interface TodoProps {
    className?: string;
    style?: React.CSSProperties
    children?: React.ReactNode;
}

/** Wird nur im dev mode gerendert. */
export default function Todo(props: TodoProps) {
    return (
        <Dev>
            <Alert style={props.style} className={props.className} severity="info">
                <AlertTitle>Todo</AlertTitle>
                {props.children}
            </Alert>
        </Dev>
    );
}
