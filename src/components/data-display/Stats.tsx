import React from "react";
import Divider from "../layout/Divider";
import type { StyleProps } from "../../types";

interface StatsProps extends StyleProps {
    children?: React.ReactNode;
}

export default function Stats(props: StatsProps) {
    const children: React.ReactNode[] = [];

    React.Children.forEach(props.children, (child) => {
        if (React.isValidElement(child)) children.push(child);
    });

    return (
        <div
            className="px-2 flex-shrink-0 border-y-[0.5px] py-3 flex space-x-5 items-center"
            style={props.style}
        >
            {children.map((child, i) => {
                const isLastChild = i === children.length - 1;
                return (
                    <React.Fragment key={i}>
                        {child}
                        {!isLastChild && <Divider style={{ maxHeight: 40 }} vertical />}
                    </React.Fragment>
                );
            })}
        </div>
    );
}
