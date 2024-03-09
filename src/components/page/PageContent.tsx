import clsx from "clsx";
import { collapse } from "../../util";
import type { Size } from "../../types";

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
    /** @default "medium" */
    size?: Size | "full_width";
}

/**
 * Zentriert den Content bei großem Fenster. Paddings und Margins könenn einheitlich gesetzt werden.
 * @tag main
 */
export default function PageContent(props: PageContentProps) {
    const sizeClass = collapse(props.size || "medium", {
        small: "xmax-w-[1300px]",
        medium: "xmax-w-[1500px]",
        large: "max-w-[1700px]",
        full_width: "",
    });

    return (
        <main
            className={clsx(
                "min-w-0 flex flex-col max-w-full w-full xl:self-center",
                sizeClass,
                props.grow && "flex-grow",
                props.noShrink && "flex-shrink-0",
                props.scroll && "min-h-0 overflow-y-auto",
                props.px && "px-5",
                props.py && "py-5",
                props.pb && "pb-5",
                props.pt && "pt-5",
                props.className
            )}
            style={props.style}
        >
            {props.children}
        </main>
    );
}
