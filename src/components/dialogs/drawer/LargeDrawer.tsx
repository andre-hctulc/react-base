import clsx from "clsx";
import Stack from "../../layout/Stack";
import Overlay from "../../layout/overlays/Overlay";
import XIcon from "../../icons/collection/X";
import IconButton from "../../input/buttons/IconButton";
import Fade from "../../transitions/Fade";
import Typography from "../../text/Typography";

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
                <Stack style={{ maxHeight, maxWidth, pointerEvents: "auto" }} onClick={e => e.stopPropagation()} className={mainClasses}>
                    <Stack direction="row" align="center" noShrink justify="end">
                        {typeof props.heading === "string" ? <Typography truncate variant="h3">{props.heading}</Typography> : props.heading}
                        <div className="flex-grow" />
                        <IconButton className="-ml-1 -mt-1" onClick={() => props.onClose?.()}>
                            <XIcon />
                        </IconButton>
                    </Stack>
                    {/* Children nur rendern, wenn drawer auch offen */}
                    {props.open && props.children}
                </Stack>
            </Fade>
        </Overlay>
    );
}
