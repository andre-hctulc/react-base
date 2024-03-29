import React from "react";

interface ObservedElement extends ResizeObserverEntry {
    rect: () => DOMRect;
}

/**
 * Uses `ResizeObserver`, to observe `element`.
 * */
export default function useElement(element: Element | null | undefined): ObservedElement | null {
    const [observed, setObserved] = React.useState<ObservedElement | null>(null);

    React.useEffect(() => {
        if (!element) return setObserved(null);

        const resizeObserver = new ResizeObserver(entries => {
            // Man kann mehrere Elemente observen, deswegen entries-Array
            const [entry] = entries;
            if (!entry) return setObserved(null);
            const o: ObservedElement = { target: entry.target, rect: () => entry.target.getBoundingClientRect() } as any;
            // Die Eigensschaften von `entry: ResizeObserverEntry` sind getter props. Somit sind diese nicht spreadable ({...entry}).
            // Da diese props evtl. Berechnungen durchführen dient ObservedElement als proxy der dann die getter vom entry ausführt, anstatt sie mit = zuzuweisen, was die Berechnungen hier schon triggern würde!
            Object.defineProperty(o, "contentRect", { get: () => entry.contentRect });
            Object.defineProperty(o, "borderBoxSize", { get: () => entry.borderBoxSize });
            Object.defineProperty(o, "contentBoxSize", { get: () => entry.contentBoxSize });
            Object.defineProperty(o, "devicePixelContentBoxSize", { get: () => entry.devicePixelContentBoxSize });
            setObserved(o);
        });

        resizeObserver.observe(element);

        return () => {
            resizeObserver.unobserve(element);
        };
    }, [element]);

    return observed;
}
