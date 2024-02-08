

import Alert from "../data-display/alerts/Alert";
import AlertTitle from "../data-display/alerts/AlertTitle";
import Dev from "./Dev";

interface TodoProps {
    className?: string;
    children?: React.ReactNode;
}

/** Wird nur im dev mode gerendert. */
export default function Todo(props: TodoProps) {
    return (
        <Dev>
            <Alert className={props.className} severity="info">
                <AlertTitle>TODO</AlertTitle>
                {props.children}
            </Alert>
        </Dev>
    );
}
