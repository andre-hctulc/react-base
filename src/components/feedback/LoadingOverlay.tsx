import Overlay from "../layout/Overlay";
import Spinner from "../icons/collection/Spinner";
import Fade from "../transitions/Fade";
import { StyleProps } from "../../types";

interface LoadingOverlayProps extends StyleProps {
    open: boolean;
}

export default function LoadingOverlay(props: LoadingOverlayProps) {
    return (
        <Fade in={props.open}>
            <Overlay
                className={["rounded-inherit flex flex-col items-center justify-center", props.className]}
                style={props.style}
                absolute
            >
                <Spinner />
            </Overlay>
        </Fade>
    );
}
