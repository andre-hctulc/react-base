import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { Icon } from "./icon";
import { withPrefix } from "../../util/system";
export const ChevronLeftIcon = React.forwardRef((props, ref) => {
    return (_jsx(Icon, { ref: ref, ...props, children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", fill: "currentColor", viewBox: "0 0 256 256", children: _jsx("path", { d: "M168.49,199.51a12,12,0,0,1-17,17l-80-80a12,12,0,0,1,0-17l80-80a12,12,0,0,1,17,17L97,128Z" }) }) }));
});
ChevronLeftIcon.displayName = withPrefix("ChevronLeftIcon");
