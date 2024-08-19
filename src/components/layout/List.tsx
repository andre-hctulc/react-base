import React from "react";
import Flex from "./Flex";
import Placeholder from "../feedback/Placeholder";
import type { StyleProps } from "../../types";

interface ListProps<T = string> extends StyleProps {
    children?: React.ReactNode;
    /** @default "ol" */
    tag?: string;
    emptyText?: string;
}

export default function List<T = string>(props: ListProps<T>) {
    const isEmpty = !props.children;

    return (
        <Flex className={props.className} style={props.style} tag="ol">
            {isEmpty && props.emptyText && (
                <Placeholder tag="li" py>
                    {props.emptyText}
                </Placeholder>
            )}
            {props.children}
        </Flex>
    );
}
