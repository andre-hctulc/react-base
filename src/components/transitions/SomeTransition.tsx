import type React from "react";
import type { Falsy } from "../../types";

interface TransitionProps {
    in?: boolean;
    unmountOnExit?: boolean;
}

interface SomeTransitionProps<T extends TransitionProps> {
    transition: React.ComponentType<T> | Falsy;
    children?: React.ReactElement;
    in: boolean;
    transitionProps?: T;
}

export default function SomeTransition<T extends TransitionProps>(props: SomeTransitionProps<T>) {
    if (!props.transition || !props.children) return props.children;

    const Transition = props.transition;

    return (
        <Transition {...(props.transitionProps as any)} in={props.in}>
            {props.children}
        </Transition>
    );
}
