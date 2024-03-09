import clsx from "clsx";
import Flex from "../layout/Flex";
import Overlay from "../layout/Overlay";
import XIcon from "../icons/collection/X";
import IconButton from "../buttons/IconButton";
import Fade from "../transitions/Fade";
import Typography from "../text/Typography";

interface LargeDrawerProps {
    open: boolean;
    className?: string;
    children?: React.ReactNode;
    onClose?: () => void;
    heading?: React.ReactNode;
}

const maxWidth = 1500;
const maxHeight = 1000;

export default function LargeDrawer(props: LargeDrawerProps) {
    const mainClasses = clsx("rounded-tr-lg rounded-tl-lg shadow-lg bg-bg bottom-0 border-l shadow-lg p-5 min-h-0 h-full overflow-y-auto");
    const classes = clsx("flex flex-col pt-10 px-10", props.className);

    return (
        <Overlay invisible={!props.open} onClick={() => props.onClose?.()} className={classes} disablePointerEvents={!props.open}>
            <Fade in={props.open}>
                <Flex style={{ maxHeight, maxWidth, pointerEvents: "auto" }} onClick={e => e.stopPropagation()} className={mainClasses}>
                    <Flex direction="row" align="center" shrink={false} justify="end">
                        {typeof props.heading === "string" ? (
                            <Typography truncate variant="h3">
                                {props.heading}
                            </Typography>
                        ) : (
                            props.heading
                        )}
                        <div className="flex-grow" />
                        <IconButton className="-ml-1 -mt-1" onClick={() => props.onClose?.()}>
                            <XIcon />
                        </IconButton>
                    </Flex>
                    {/* Children nur rendern, wenn drawer auch offen */}
                    {props.open && props.children}
                </Flex>
            </Fade>
        </Overlay>
    );
}
