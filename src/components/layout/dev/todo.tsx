// * SSR

import Alert from "@react-client/components/data-display/alerts/alert";
import Dev from "./Dev";
import AlertTitle from "@react-client/components/data-display/alerts/alert-title";

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
