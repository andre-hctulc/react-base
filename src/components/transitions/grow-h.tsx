"use client";

import Transition from "./transition";

interface GrowHProps {
    in?: boolean;
    children: React.ReactElement;
    /** @default true */
    unmountOnExit?: boolean;
}

function GrowH(props: GrowHProps & { transitionName: string; timeout: number }) {
    return (
        <Transition
            in={!!props.in}
            unmountOnExit={props.unmountOnExit === undefined ? true : props.unmountOnExit}
            transitionName={props.transitionName}
            timeout={props.timeout}
        >
            {props.children}
        </Transition>
    );
}

export function GrowH250(props: GrowHProps) {
    return (
        <GrowH {...props} transitionName="T-GrowH250" timeout={160}>
            {props.children}
        </GrowH>
    );
}

export function GrowH500(props: GrowHProps) {
    return (
        <GrowH {...props} transitionName="T-GrowH500" timeout={240}>
            {props.children}
        </GrowH>
    );
}
