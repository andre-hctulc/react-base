import React from "react";

/**
 * @param element
 * @returns Ob das gegebene `element` sticky in dem "main"-Element ist. Falls kein Element gegeben ist (_undefined_) wird _true_ zurückgegeben, falls der Scroll-Wert größer 0 ist.
 */
export default function useIsSticky(element?: HTMLElement | null) {
    const preOffset = React.useRef<{ offsetTop: number; scrollTop: number }>();
    const [isSticky, setIsSticky] = React.useState(false);

    React.useEffect(() => {
        const [main] = document.getElementsByTagName("main");
        const mainScroll = main?.parentElement;

        if (!mainScroll) return setIsSticky(false);

        const listener: EventListener = (e: Event) => {
            if (element !== undefined) {
                if (!element) return setIsSticky(false);
                // HTMLElement.offsetTop ist der Abstand vond er oberen Kante des Elementes zu der oberen kante des Vaters
                // Sollte das elemtn also sticky sein ändert sich dieser Abstand. Ansonstent sollte er gleich bleiben
                if (preOffset.current !== undefined) {
                    /** Scroll-Delta zum vorherigen scroll-Wert */
                    const deltaScroll = Math.abs(preOffset.current.scrollTop - mainScroll.scrollTop);
                    /** >2, da für kleienere Abstände der offset unerwartet gleich bleiben kann */
                    if (deltaScroll > 2) setIsSticky(element.offsetTop !== preOffset.current.offsetTop);
                }
                preOffset.current = { offsetTop: element.offsetTop, scrollTop: mainScroll.scrollTop };
            } else setIsSticky(mainScroll.scrollTop > 0);
        };

        mainScroll.addEventListener("scroll", listener);

        return () => {
            mainScroll.removeEventListener("scroll", listener);
        };
    }, [element]);

    return isSticky;
}
