import type { PartialPropsOf, PropsOf } from "../../types/index.js";
import type { FC, MouseEvent } from "react";
import { CardHeader } from "../containers/card-header.js";
import { Toolbar } from "../containers/toolbar.js";
import { IconButton } from "../input/icon-button.js";
import { XIcon } from "../icons/phosphor/x.js";
import { CardBody } from "../containers/card-body.js";
import { CardFooter } from "../containers/card-footer.js";

interface DrawerHeaderProps extends PropsOf<typeof CardHeader> {
    onClose?: (e: MouseEvent) => void;
    closeable?: boolean;
    closeBtnProps?: PartialPropsOf<typeof IconButton>;
    closeBtnPosition?: "start" | "end";
}

/**
 * ### Props
 * - `onClose` - Callback when the close button is clicked.
 * - `closeable` - Whether to show the close button. Default is `true`.
 * - `closeBtnProps` - Additional props for the close button.
 * - `closeBtnPosition` - Position of the close button, either `"start"` or `"end"`. Default is `"end"`.
 */
export const DrawerHeader: FC<DrawerHeaderProps> = ({
    closeable,
    onClose,
    end,
    closeBtnProps,
    closeBtnPosition,
    start,
    ...props
}) => {
    const closeBtn = closeable && (
        <IconButton {...closeBtnProps} onClick={onClose}>
            <XIcon />
        </IconButton>
    );

    const isStart = closeBtnPosition === "start";

    return (
        <CardHeader
            {...props}
            start={
                isStart && closeable ? (
                    <Toolbar>
                        {closeBtn}
                        {start}
                    </Toolbar>
                ) : (
                    start
                )
            }
            end={
                !isStart && closeable ? (
                    <Toolbar>
                        {end}
                        {closeBtn}
                    </Toolbar>
                ) : (
                    end
                )
            }
        />
    );
};

export const DrawerBody: FC<PropsOf<typeof CardBody>> = (props) => {
    return <CardBody size="lg" {...props} />;
};

export const DrawerFooter: FC<PropsOf<typeof CardFooter>> = (props) => {
    return <CardFooter size="lg" {...props} />;
};
