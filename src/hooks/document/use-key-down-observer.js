import React from "react";
export function useKeyDownObserver(observe) {
    const [keysPressed, setKeysPressed] = React.useState(new Set());
    const observeRef = React.useRef(observe);
    React.useEffect(() => {
        observeRef.current = observe;
    }, [observe]);
    React.useEffect(() => {
        const observes = (key) => {
            return !observeRef.current || new Set(observeRef.current).has(key);
        };
        const keyDownListener = (e) => {
            if (!observes(e.key))
                return;
            setKeysPressed(new Set([...Array.from(keysPressed), e.key]));
        };
        const keyUpListener = (e) => {
            if (!observes(e.key))
                return;
            const newSet = new Set(keysPressed);
            newSet.delete(e.key);
            setKeysPressed(newSet);
        };
        addEventListener("keydown", keyDownListener);
        addEventListener("keyup", keyUpListener);
        return () => {
            removeEventListener("keydown", keyDownListener);
            removeEventListener("keyup", keyUpListener);
        };
    }, []);
    return keysPressed;
}
