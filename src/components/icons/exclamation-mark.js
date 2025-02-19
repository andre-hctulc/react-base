import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { Icon } from "./icon";
import { withPrefix } from "../../util/system";
export const ExclamationMarkIcon = React.forwardRef((props, ref) => {
    return (_jsx(Icon, { ref: ref, ...props, children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", fill: "currentColor", viewBox: "0 0 256 256", children: _jsx("path", { fill: "currentColor", d: "M148 200a20 20 0 1 1-20-20a20 20 0 0 1 20 20m-20-40a12 12 0 0 0 12-12V48a12 12 0 0 0-24 0v100a12 12 0 0 0 12 12" }) }) }));
});
ExclamationMarkIcon.displayName = withPrefix("ExclamationMarkIcon");
