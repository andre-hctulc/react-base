import Spinner from "./Spinner";
import Delayed from "../shadow/Delayed";
import type { StyleProps } from "../../types";
import clsx from "clsx";

interface LoadingProps extends StyleProps {
    /** @default "div" */
    tag?: string;
    py?: boolean;
    children?: React.ReactNode;
    delay?: number;
}

export default function Loading(props: LoadingProps) {
    const Comp: any = props.tag || "div";
    const loading = (
        <Comp
            style={props.style}
            className={clsx(
                "flex flex-grow items-center justify-center",
                props.py && "py-4",
                props.className
            )}
        >
            <Spinner />
            {props.children}
        </Comp>
    );

    if (props.delay) return <Delayed delay={props.delay}>{loading}</Delayed>;
    else return loading;
}
