import clsx from "clsx";
import Overlay from "../layout/Overlay";
import XIcon from "../icons/collection/X";
import IconButton from "../buttons/IconButton";
import Flex from "../layout/Flex";
import type { StyleProps } from "../../types";

interface DrawerProps extends StyleProps {
    open: boolean;
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
    const mainClasses = clsx(
        "fixed bg-bg right-0 top-0 border-l shadow-lg p-5 min-h-0 h-full overflow-y-auto"
    );

    return (
        <Overlay
            zIndex={props.zIndex}
            invisible
            onClick={() => props.onClose?.()}
            style={props.style}
            className={props.className}
            disablePointerEvents={!props.open}
        >
            {props.open && (
                <Flex
                    tag="aside"
                    style={{ width, maxWidth: width, pointerEvents: "auto" }}
                    onClick={(e) => e.stopPropagation()}
                    className={mainClasses}
                >
                    <Flex direction="row" align="center" tag="nav">
                        <IconButton className="-ml-1 -mt-1" onClick={() => props.onClose?.()}>
                            <XIcon />
                        </IconButton>
                    </Flex>
                    {/* Children nur rendern, wenn drawer auch offen */}
                    {props.open && props.children}
                </Flex>
            )}
        </Overlay>
    );
}
