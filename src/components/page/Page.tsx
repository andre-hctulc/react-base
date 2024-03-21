import React from "react";
import { StyleProps } from "../../types";
import { styleProps } from "../../util";

interface PageProps extends StyleProps {
    children?: React.ReactNode;
    scroll?: boolean;
}

/**
 * @css
 */
export default function Page(props: PageProps) {
    return (
        <div
            {...styleProps(
                {
                    className: [
                        "Page flex flex-col flex-grow min-w-0 overflow-x-hidden",
                        props.scroll && "min-h-0 overflow-y-auto",
                    ],
                },
                props
            )}
        >
            {props.children}
        </div>
    );
}
