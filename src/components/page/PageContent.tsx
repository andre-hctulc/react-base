import { collapse, styleProps } from "../../util";
import type { Size, StyleProps } from "../../types";

interface PageContentProps extends StyleProps {
    children?: React.ReactNode;
    py?: boolean;
    px?: boolean;
    pb?: boolean;
    pt?: boolean;
    grow?: boolean;
    noShrink?: boolean;
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
            {...styleProps(
                {
                    className: [
                        "min-w-0 flex flex-col max-w-full w-full xl:self-center",
                        sizeClass,
                        props.grow && "flex-grow",
                        props.noShrink && "flex-shrink-0",
                        props.scroll && "min-h-0 overflow-y-auto",
                        props.px && "px-5",
                        props.py && "py-5",
                        props.pb && "pb-5",
                        props.pt && "pt-5",
                    ],
                },
                props
            )}
        >
            {props.children}
        </main>
    );
}
