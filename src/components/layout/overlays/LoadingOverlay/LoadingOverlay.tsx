import clsx from "clsx";
import Overlay from "../Overlay/Overlay";
import Fade from "@react-client/components/transitions/Fade";
import Spinner from "@react-client/components/data-display/loading/Spinner/Spinner";

interface LoadingOverlayProps {
    open: boolean;
    className?: string;
    style?: React.CSSProperties;
}

export default function LoadingOverlay(props: LoadingOverlayProps) {
    const classes = clsx("rounded-inherit flex flex-col items-center justify-center", props.className);

    return (
        <Fade in={props.open}>
            <Overlay className={classes} style={props.style} absolute>
                <Spinner />
            </Overlay>
        </Fade>
    );
}
