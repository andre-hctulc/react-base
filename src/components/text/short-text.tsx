import type { PropsOf } from "@react-client/util";
import Typography from "./typography";
import clsx from "clsx";
import React from "react";

// max-w-1?
// export const shortTextClasses = "whitespace-nowrap text-ellipsis max-w-1 overflow-hidden";

export const shortTextClasses = "whitespace-nowrap text-ellipsis overflow-hidden";

/**
 * @deprecated Benutze `Typography.truncate`
 */
const ShortText = React.forwardRef<Element, PropsOf<typeof Typography>>((props, ref) => {
    const classes = clsx(shortTextClasses, props.className);

    return (
        <Typography ref={ref} {...props} className={classes}>
            {props.children}
        </Typography>
    );
});

ShortText.displayName = "ShortText";

export default ShortText;
