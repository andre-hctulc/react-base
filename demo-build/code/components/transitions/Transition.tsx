import React from "react";
import { CSSTransition } from "react-transition-group";

interface TransitionProps {
    children: React.ReactElement;
    transitionName: string;
    in: boolean;
    timeout?: number;
    unmountOnExit?: boolean;
}

/**
 * Das child element muss seine ref weitergeben.
 *
 * Der `timeout` sollte in der Regel mit der transition duration in den CSS transition classes übereinstimmen.
 * */
export default function Transition(props: TransitionProps) {
    const ref = React.useRef(null);
    const child = React.cloneElement(props.children, { ...props.children.props, ref: ref });

    return (
        // @ts-ignore
        <CSSTransition unmountOnExit={props.unmountOnExit} nodeRef={ref} timeout={props.timeout || 0} in={props.in} classNames={props.transitionName}>
            {child as any}
        </CSSTransition>
    );
}
