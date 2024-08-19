import Overlay from "../layout/Overlay";
import Spinner from "../icons/collection/Spinner";
import type { StyleProps } from "../../types";

interface LoadingOverlayProps extends StyleProps {
    open: boolean;
}

export default function LoadingOverlay(props: LoadingOverlayProps) {
    return (
        <Overlay
            className={["rounded-inherit flex flex-col items-center justify-center", props.className]}
            style={props.style}
            absolute
            open={props.open}
        >
            <Spinner />
        </Overlay>
    );
}
