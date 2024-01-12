// * SSR

import clsx from "clsx";

interface PageContentProps {
    children?: React.ReactNode;
    style?: React.CSSProperties;
    py?: boolean;
    px?: boolean;
    pb?: boolean;
    pt?: boolean;
    grow?: boolean;
    noShrink?: boolean;
    className?: string;
    large?: boolean;
    scroll?: boolean;
}

/**
 * Zentriert den Content bei großem Fenster. Paddings und Margins könenn einheitlich gesetzt werden.
 * @tag main
 */
export default function PageContent(props: PageContentProps) {
    const classes = clsx(
        "min-w-0 flex flex-col max-w-full w-full xl:self-center",
        props.large ? "xl:max-w-[1700px]" : "xl:max-w-[1500px]",
        props.grow && "flex-grow",
        props.noShrink && "flex-shrink-0",
        props.scroll && "min-h-0 overflow-y-auto",
        props.px && "px-5",
        props.py && "py-5",
        props.pb && "pb-5",
        props.pt && "pt-5",
        props.className
    );

    return (
        <main className={classes} style={props.style}>
            {props.children}
        </main>
    );
}
