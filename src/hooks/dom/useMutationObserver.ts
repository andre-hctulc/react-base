import React from "react";

export default function useMutationObserver(element: HTMLElement | undefined | null, callback: MutationCallback) {
    React.useEffect(() => {
        if (!element) return;

        const obserever = new MutationObserver(callback);

        return () => {
            obserever.disconnect();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [element]);
}
