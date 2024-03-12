"use client";

import Transition from "./Transition";
import React from "react";

interface FadeProps {
    in?: boolean;
    children: React.ReactElement;
    /** @default true */
    unmountOnExit?: boolean;
}

export default function Fade(props: FadeProps) {
    return (
        <Transition in={!!props.in} unmountOnExit={props.unmountOnExit ?? true} transitionName="T-Fade" timeout={130}>
            {props.children}
        </Transition>
    );
}
