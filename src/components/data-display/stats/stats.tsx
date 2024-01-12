// * SSR

import clsx from "clsx";
import React from "react";
import Divider from "@react-client/components/layout/divider";

interface StatsProps {
    children?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export default function Stats(props: StatsProps) {
    const classes = clsx("px-2 flex-shrink-0 border-y-[0.5px] py-3 flex space-x-5 items-center", props.className);
    const children: React.ReactNode[] = [];

    React.Children.forEach(props.children, child => {
        if (React.isValidElement(child)) children.push(child);
    });

    return (
        <div className={classes} style={props.style}>
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
