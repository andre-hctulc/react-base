"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { usePromise } from "../../hooks";
import { IconButton } from "./button";
import React from "react";
export const Tool = ({ icon, action, tooltip, disabled, ...props }) => {
    const { isPending, promise } = usePromise();
    function act(e) {
        e.stopPropagation();
        // transform to promise
        const prom = async () => action(e);
        promise(prom());
    }
    return (_jsx(IconButton, { disabled: disabled || isPending, onClick: act, ...props, children: icon }));
};
