"use client";

import React from "react";
import { HiddenInput } from "./hidden-input";

interface CSRFInputProps {
    /**
     * Defaults to the value of the "XSRF-TOKEN" cookie.
     */
    token?: string;
    name?: string;
    /** @default true */
    active?: boolean;
    debug?: boolean;
    required?: boolean;
}

export const CSRFInput: React.FC<CSRFInputProps> = ({ token, name, active, debug, required }) => {
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
        } else {
            setValue(token);
        }
    }, [token, name, active]);

    if (active === false) return null;

    return (
        <>
            <HiddenInput required={required} name={name ?? "_csrf"} value={value} />
            {debug && <pre>{value}</pre>}
        </>
    );
};
