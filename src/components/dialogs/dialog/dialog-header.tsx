import clsx from "clsx";

interface DialogHeaderProps {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    /** @default "row" */
    direction?: "row" | "col";
}

export default function DialogHeader(props: DialogHeaderProps) {
    return (
        <header className={clsx("flex p-3", props.direction === "col" ? "flex-col" : "flex-row items-center", props.className)} style={props.style}>
            {props.children}
        </header>
    );
}
