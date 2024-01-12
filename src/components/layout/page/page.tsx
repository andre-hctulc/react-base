// * SSR

import clsx from "clsx";
import React from "react";

interface PageProps {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    scroll?: boolean;
}

/**
 * @css
 */
export default function Page(props: PageProps) {
    return (
        <div
            className={clsx(
                "Page flex flex-col flex-grow min-w-0 overflow-x-hidden",
                props.scroll && "min-h-0 overflow-y-auto",
                props.className
            )}
        >
            {props.children}
        </div>
    );
}
