"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { HiddenInput } from "./hidden-input";
export const CSRFInput = ({ token, name, active, debug, required }) => {
    const [value, setValue] = React.useState(token || "");
    React.useLayoutEffect(() => {
        if (token === undefined) {
            const csrfToken = document.cookie
                .split(";")
                .find((cookie) => cookie.trim().startsWith("XSRF-TOKEN="))
                ?.split("=")[1];
            if (csrfToken) {
                setValue(csrfToken);
            }
        }
        else {
            setValue(token);
        }
    }, [token, name, active]);
    if (active === false)
        return null;
    return (_jsxs(_Fragment, { children: [_jsx(HiddenInput, { required: required, name: name ?? "_csrf", value: value }), debug && _jsx("pre", { children: value })] }));
};
