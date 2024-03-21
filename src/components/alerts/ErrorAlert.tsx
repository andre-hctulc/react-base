import React from "react";
import Alert from "./Alert";
import AlertTitle from "./AlertTitle";
import Button from "../buttons/Button";
import Dev from "../dev/Dev";
import { StyleProps } from "../../types";
import { styleProps } from "../../util";

export type ErrorAltertProps = StyleProps & {
    active?: boolean;
    title?: string | false;
    margin?: boolean;
    fullWidth?: boolean;
    id?: string;
    /** Wird im dev mode angezeigt */
    err?: Error;
    hideErr?: boolean;
    /**
     * Reset Button Text. Der Button wird nur angezeigt wenn diese Option angegegebn ist
     * */
    reset?: string;
    onReset?: React.MouseEventHandler<HTMLButtonElement>;
} & ({ message: string | undefined } | { children: React.ReactNode });

export default function ErrorAlert(props: ErrorAltertProps) {
    if (props.active === false) return null;

    return (
        <Alert fullWidth={props.fullWidth} margin={props.margin} severity="error" {...styleProps(props)}>
            {props.title && <AlertTitle>{props.title}</AlertTitle>}
            {(props as any).message || (props as any).children}
            {props.reset && <Button onClick={props.onReset}></Button>}
            <Dev hidden={props.hideErr || !props.err}>
                {" "}
                -Dev- {props.id ? `"${props.id}" ` : ""}
                {props.err?.stack}
            </Dev>
        </Alert>
    );
}
