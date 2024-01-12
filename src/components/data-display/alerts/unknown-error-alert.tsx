import Dev from "@react-client/components/layout/dev/dev";
import Alert from "./alert";
import AlertTitle from "./alert-title";

interface UnknownErrorAlertProps {
    className?: string;
    style?: React.CSSProperties;
    title?: string | false;
    reloadPageHint?: boolean;
    fullWidth?: boolean;
    margin?: boolean;
    id?: string;
    err?: Error;
}

export default function UnknownErrorAlert(props: UnknownErrorAlertProps) {
    return (
        <Alert severity="error" className={props.className} style={props.style} fullWidth={props.fullWidth} margin={props.margin}>
            {props.title && <AlertTitle>{props.title}</AlertTitle>}
            Ein unbekannter Fehler ist aufgetreten. {props.reloadPageHint && "Bitte lade die Seite neu."}
            <Dev>
                {" "}
                -Dev- {props.id ? `"${props.id}" ` : ""}
                {props.err?.stack}
            </Dev>
        </Alert>
    );
}
