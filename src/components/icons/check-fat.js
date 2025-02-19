import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { Icon } from "./icon";
import { withPrefix } from "../../util/system";
export const CheckFactIcon = React.forwardRef((props, ref) => {
    return (_jsx(Icon, { ref: ref, ...props, children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", fill: "currentColor", viewBox: "0 0 256 256", children: _jsx("path", { fill: "currentColor", d: "m243.31 90.91l-128.4 128.4a16 16 0 0 1-22.62 0l-71.62-72a16 16 0 0 1 0-22.61l20-20a16 16 0 0 1 22.58 0L104 144.22l96.76-95.57a16 16 0 0 1 22.59 0l19.95 19.54a16 16 0 0 1 .01 22.72" }) }) }));
});
CheckFactIcon.displayName = withPrefix("CheckFactIcon");
