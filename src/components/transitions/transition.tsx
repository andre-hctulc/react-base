"use client";

import React from "react";
import { CSSTransition } from "react-transition-group";
import { setRef } from "../../util";

interface TransitionProps {
    children: React.ReactElement;
    transitionName: string;
    in: boolean;
    timeout?: number;
    unmountOnExit?: boolean;
}

/**
 * The children must forward its ref
 * */
export default function Transition(props: TransitionProps) {
    const ref = React.useRef(null);
    const child = React.cloneElement(props.children, {
        ...props.children.props,
        ref: (r: any) => {
            setRef(r, ref, props.children.props.ref);
        },
    });

    return (
        <CSSTransition unmountOnExit={props.unmountOnExit} nodeRef={ref} timeout={props.timeout || 0} in={props.in} classNames={props.transitionName}>
            {child as any}
        </CSSTransition>
    );
}
