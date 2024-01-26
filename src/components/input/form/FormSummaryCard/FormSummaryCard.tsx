import clsx from "clsx";
import React from "react";

interface FormDataSummaryCardProps {
    className?: string;
    style?: React.CSSProperties;
    children: React.ReactElement;
}

export default function FormDataSummaryCard(props: FormDataSummaryCardProps) {
    const classes = clsx("min-h-0 py-3 overflow-y-auto self-center px-3 border rounded", props.className);

    return (
        <div className={classes} style={props.style}>
            <div className="flex-shrink-0 flex flex-col items-center justify-center px-3 md:px-5 lg:px-7">{props.children}</div>
        </div>
    );
}
