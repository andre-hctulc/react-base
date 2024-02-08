import { Falsy } from "u/src/utility-types";
import React from "react";
import { useTimeout } from "usehooks-ts";

/**
 * @param delay Millisekunden
 * @returns Ready?
 */
export default function useDelay(delay: number | Falsy) {
    const [ready, setReady] = React.useState(!delay);
    useTimeout(() => setReady(true), delay || 0);
    return ready;
}
