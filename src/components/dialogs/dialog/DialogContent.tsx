import clsx from "clsx";

interface DialogContentProps {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

export default function DialogContent(props: DialogContentProps) {
    return (
        <section className={clsx("flex flex-col px-3 pb-2 pt-1", props.className)} style={props.style}>
            {props.children}
        </section>
    );
}
