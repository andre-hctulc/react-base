"use client";

import { StyleProps } from "../../types";
import { styleProps } from "../../util";
import Alert from "../alerts/Alert";
import AlertTitle from "../alerts/AlertTitle";
import Dev from "./Dev";

interface TodoProps extends StyleProps {
    children?: React.ReactNode;
}

/** Wird nur im dev mode gerendert. */
export default function Todo(props: TodoProps) {
    return (
        <Dev>
            <Alert {...styleProps(props)} severity="info">
                <AlertTitle>Todo</AlertTitle>
                {props.children}
            </Alert>
        </Dev>
    );
}
