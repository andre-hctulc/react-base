import React from "react";

export function useWindowEvent<E extends keyof WindowEventMap>(
    event: E,
    listener: (this: Window, ev: WindowEventMap[E]) => void,
    reactiveListener = false
) {
    const [active, setActive] = React.useState(true);

    React.useEffect(() => {
        if (!active) return;

        window.addEventListener(event, listener);

        return () => {
            window.removeEventListener(event, listener);
        };
    }, [reactiveListener ? listener : false, active]);

    const deactivateListener = () => {
        setActive(false);
    };

    const activateListener = () => {
        setActive(true);
    };

    return { deactivateListener, activateListener };
}
