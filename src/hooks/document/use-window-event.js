import React from "react";
export function useWindowEvent(event, listener) {
    const [active, setActive] = React.useState(true);
    const savedListener = React.useRef(listener);
    React.useEffect(() => {
        if (!active)
            return;
        const l = savedListener.current;
        window.addEventListener(event, l);
        return () => {
            window.removeEventListener(event, l);
        };
    }, [active]);
    const deactivateListener = () => {
        setActive(false);
    };
    const activateListener = () => {
        setActive(true);
    };
    return { deactivateListener, activateListener };
}
