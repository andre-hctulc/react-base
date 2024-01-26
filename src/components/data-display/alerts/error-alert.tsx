import React from "react";
import Alert from "./alert";
import AlertTitle from "./alert-title";
import Dev from "@react-client/components/layout/dev/Dev";
import Button from "@react-client/components/input/buttons/Button/Button";

export type ErrorAltertProps = {
    active?: boolean;
    title?: string | false;
    className?: string;
    style?: React.CSSProperties;
    margin?: boolean;
    fullWidth?: boolean;
    id?: string;
    /** Wird im dev mode angezeigt */
    err?: Error;
    hideErr?: boolean;
<<<<<<< HEAD
} & ({ message: string | undefined } | { children: React.ReactNode });
=======
    /**
     * Reset Button Text. Der Button wird nur angezeigt wenn diese Option angegegebn ist
     * */
    reset?: string;
    onReset?: React.MouseEventHandler<HTMLButtonElement>;
} & ({ message: string | undefined } | { children: string });
>>>>>>> 9141326d02a4250083ce3e61d74598fc4dcb439c

export default function ErrorAlert(props: ErrorAltertProps) {
    if (props.active === false) return null;

    return (
        <Alert fullWidth={props.fullWidth} margin={props.margin} severity="error" className={props.className} style={props.style}>
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
