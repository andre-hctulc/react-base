import React from "react";
import type { StyleProps } from "../../types";
import clsx from "clsx";

interface LiveProps extends StyleProps {
    /** @default 13 */
    size?: number;
}

const size = 13;

export default function Live(props: LiveProps) {
    const _size = props.size || size;

    return (
        <div
            className={clsx("inline-block Live relative flex-shrink-0 rounded-full", props.className)}
            style={{ width: _size, height: _size, ...props.style }}
        />
    );
}
