// * SSR

import clsx from "clsx";
import Spinner from "./spinner";
import Delayed from "@react-client/components/others/delayed";

interface LoadingProps {
    style?: React.CSSProperties;
    className?: string;
    /** @default "div" */
    tag?: string;
    py?: boolean;
    children?: React.ReactNode;
    delay?: number;
}

export default function Loading(props: LoadingProps) {
    const Comp: any = props.tag || "div";
    const loading = (
        <Comp className={clsx("flex flex-grow items-center justify-center", props.py && "py-4", props.className)} style={props.style}>
            <Spinner />
            {props.children}
        </Comp>
    );

    if (props.delay) return <Delayed delay={props.delay}>{loading}</Delayed>;
    else return loading;
}
