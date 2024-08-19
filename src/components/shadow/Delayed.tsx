"use client";

import React from "react";
import type { ChildrenProps } from "../../types";

interface DelayedProps extends ChildrenProps {
    delay: number;
    in?: boolean;
    rederDelay?: React.ReactNode;
}

export default function Delayed(props: DelayedProps) {
    const [delayed, setDelayed] = React.useState(!!props.delay);

    React.useEffect(() => {
        if (!props.delay || props.in === false) return setDelayed(false);

        let interrupted = false;

        setDelayed(true);

        setTimeout(() => {
            if (!interrupted) setDelayed(false);
        }, props.delay);

        return () => {
            interrupted = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.in]);

    if (delayed) return props.rederDelay ?? null;
    else return props.children;
}
