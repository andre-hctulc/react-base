"use client";

import Transition from "./Transition";

interface GrowVProps {
    in?: boolean;
    children: React.ReactElement;
    /** @default true */
    unmountOnExit?: boolean;
}

export function GrowV(props: GrowVProps & { transitionName: string; timeout: number }) {
    return (
        <Transition in={!!props.in} unmountOnExit={props.unmountOnExit ?? true} transitionName={props.transitionName} timeout={props.timeout}>
            {props.children}
        </Transition>
    );
}

export function GrowV100(props: GrowVProps) {
    return (
        <GrowV {...props} transitionName="T-GrowV100" timeout={120}>
            {props.children}
        </GrowV>
    );
}

export function GrowV200(props: GrowVProps) {
    return (
        <GrowV {...props} transitionName="T-GrowV200" timeout={135}>
            {props.children}
        </GrowV>
    );
}

export function GrowV350(props: GrowVProps) {
    return (
        <GrowV {...props} transitionName="T-GrowV350" timeout={155}>
            {props.children}
        </GrowV>
    );
}

export function GrowV50(props: GrowVProps) {
    return (
        <GrowV {...props} transitionName="T-GrowV50" timeout={120}>
            {props.children}
        </GrowV>
    );
}
