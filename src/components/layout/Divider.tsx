import clsx from "clsx";
import type { StyleProps } from "../../types";

interface DividerProps extends StyleProps {
    children?: React.ReactNode;
    vertical?: boolean;
    section?: boolean;
    thin?: boolean;
}

export default function Divider(props: DividerProps) {
    const lineClasses = clsx(
        "flex-grow flex-shrink-0",
        props.vertical
            ? props.thin
                ? "border-l-[0.5px]"
                : "border-l"
            : props.thin
            ? "border-b-[0.5px]"
            : "border-b"
    );

    return (
        <div
            style={props.style}
            className={clsx([
                "flex items-center flex-shrink-0",
                props.vertical ? "flex-col" : "flex-row",
                props.section && props.vertical && "mx-7",
                props.section && !props.vertical && "my-7",
            ])}
        >
            <div className={lineClasses} />
            {typeof props.children === "string" ? (
                <span className="whitespace-nowrap text-ellipsis text-xs font-medium mx-3">
                    {props.children}
                </span>
            ) : (
                props.children
            )}
            <div className={lineClasses} />
        </div>
    );
}
