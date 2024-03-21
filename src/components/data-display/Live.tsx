import React from "react";
import { StyleProps } from "../../types";
import { styleProps } from "../../util";

interface LiveProps extends StyleProps {
    /** @default 13 */
    size?: number;
}

const size = 13;

export default function Live(props: LiveProps) {
    const _size = props.size || size;

    return (
        <div
            {...styleProps(
                {
                    className: "inline-block Live relative flex-shrink-0 rounded-full",
                    style: { width: _size, height: _size },
                },
                props
            )}
        />
    );
}
