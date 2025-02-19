import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { Icon } from "./icon";
import { withPrefix } from "../../util/system";
export const CheckIcon = React.forwardRef((props, ref) => {
    return (_jsx(Icon, { ref: ref, ...props, children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", fill: "currentColor", viewBox: "0 0 256 256", children: _jsx("path", { fill: "currentColor", d: "m232.49 80.49l-128 128a12 12 0 0 1-17 0l-56-56a12 12 0 1 1 17-17L96 183L215.51 63.51a12 12 0 0 1 17 17Z" }) }) }));
});
CheckIcon.displayName = withPrefix("CheckIcon");
