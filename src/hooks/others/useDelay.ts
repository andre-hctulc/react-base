import React from "react";
import useTimeout from "../document/useTimeout";

/**
 * @param delay Millisekunden
 * @returns Ready?
 */
export default function useDelay(delay: number) {
    const [ready, setReady] = React.useState(!delay);
    useTimeout(() => setReady(true), delay || 0);
    return ready;
}
