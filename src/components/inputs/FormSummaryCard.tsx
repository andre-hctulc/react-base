import React from "react";
import { StyleProps } from "../../types";
import { styleProps } from "../../util";

interface FormDataSummaryCardProps extends StyleProps {
    children: React.ReactElement;
}

export default function FormDataSummaryCard(props: FormDataSummaryCardProps) {
    return (
        <div
            {...styleProps(
                { className: "min-h-0 py-3 overflow-y-auto self-center px-3 border rounded" },
                props
            )}
        >
            <div className="flex-shrink-0 flex flex-col items-center justify-center px-3 md:px-5 lg:px-7">
                {props.children}
            </div>
        </div>
    );
}
