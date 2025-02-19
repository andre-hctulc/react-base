"use client";
import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useDev } from "./dev-provider";
export function Dev(props) {
    const { devMode } = useDev();
    if (!devMode || props.hidden)
        return null;
    if (props.highlight)
        return (_jsx("span", { className: typeof props.children === "string" ? "text-common-violet" : "bg-common-yellow/50", children: props.children }));
    else
        return _jsx(_Fragment, { children: props.children });
}
