import clsx from "clsx";
import Overlay from "../layout/Overlay";
import Spinner from "../icons/collection/Spinner";
import Fade from "../transitions/Fade";

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
