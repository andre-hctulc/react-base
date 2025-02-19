"use client";
import React from "react";
export function Delayed(props) {
    const [delayed, setDelayed] = React.useState(!!props.delay);
    React.useEffect(() => {
        if (!props.delay || props.in === false)
            return setDelayed(false);
        let interrupted = false;
        setDelayed(true);
        setTimeout(() => {
            if (!interrupted)
                setDelayed(false);
        }, props.delay);
        return () => {
            interrupted = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.in]);
    if (delayed)
        return props.renderDelay ?? null;
    else
        return props.children;
}
