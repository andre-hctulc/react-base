import React from "react";

export function useKeyDownObserver(observe?: Iterable<string>) {
    const [keysPressed, setKeysPressed] = React.useState<Set<string>>(new Set());

    React.useEffect(() => {
        const observes = (key: string) => {
            return !observe || new Set(observe).has(key);
        };

        const keyDownListener = (e: KeyboardEvent) => {
            if (!observes(e.key)) return;
            setKeysPressed(new Set([...Array.from(keysPressed), e.key]));
        };

        const keyUpListener = (e: KeyboardEvent) => {
            if (!observes(e.key)) return;
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return keysPressed;
}
