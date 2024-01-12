import type { PropsOf } from "@react-client/util";
import Typography from "./typography";
import clsx from "clsx";
import React from "react";

/**
 * @deprecated Benutze `Typography.long`
 */
const LongText = React.forwardRef<HTMLElement, PropsOf<typeof Typography>>((props, ref) => {
    const classes = clsx("break-words overflow-auto scrollbar-hidden whitespace-normal max-w-full", props.className);

    return (
        <Typography {...props} className={classes} truncate ref={ref}>
            {props.children}
        </Typography>
    );
});

LongText.displayName = "LongText";

export default LongText;
