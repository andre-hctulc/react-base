import clsx from "clsx";
import Overlay from "../../layout/overlays/Overlay";
import { Transition } from "react-transition-group";
import XIcon from "../../icons/collection/X";
import IconButton from "../../input/buttons/IconButton";
import Stack from "../../layout/Stack";

interface DrawerProps {
    open: boolean;
    className?: string;
    children?: React.ReactNode;
    onClose?: () => void;
    zIndex?: number;
}

const width = 300;

/**
 *
 * @tagTag aside
 */
export default function Drawer(props: DrawerProps) {
    const mainClasses = clsx("fixed bg-bg right-0 top-0 border-l shadow-lg p-5 min-h-0 h-full overflow-y-auto");

    return (
        <Overlay zIndex={props.zIndex} invisible onClick={() => props.onClose?.()} className={props.className} disablePointerEvents={!props.open}>
            {/* @ts-ignore */}
            <Transition timeout={300} unmountOnExit transitionName="T-Drawer" in={props.open}>
                <Stack tag="aside" style={{ width, maxWidth: width, pointerEvents: "auto" }} onClick={e => e.stopPropagation()} className={mainClasses}>
                    <Stack direction="row" align="center" tag="nav">
                        <IconButton className="-ml-1 -mt-1" onClick={() => props.onClose?.()}>
                            <XIcon />
                        </IconButton>
                    </Stack>
                    {/* Children nur rendern, wenn drawer auch offen */}
                    {props.open && props.children}
                </Stack>
            </Transition>
        </Overlay>
    );
}
