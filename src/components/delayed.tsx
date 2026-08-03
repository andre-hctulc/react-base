"use client";

import { useEffect, useState, type ReactNode } from "react";

interface DelayedProps {
    delay: number;
    in?: boolean;
    children?: ReactNode;
    renderDelay?: ReactNode;
}

export function Delayed(props: DelayedProps) {
    const [delayed, setDelayed] = useState(!!props.delay);

    useEffect(() => {
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

    if (delayed) return props.renderDelay ?? null;
    else return props.children;
}
