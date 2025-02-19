import { jsx as _jsx } from "react/jsx-runtime";
import React from "react";
import { Icon } from "./icon";
import { withPrefix } from "../../util/system";
export const MoreVertIcon = React.forwardRef((props, ref) => {
    return (_jsx(Icon, { ref: ref, ...props, children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "1em", height: "1em", fill: "currentColor", viewBox: "0 0 256 256", children: _jsx("path", { d: "M112,60a16,16,0,1,1,16,16A16,16,0,0,1,112,60Zm16,52a16,16,0,1,0,16,16A16,16,0,0,0,128,112Zm0,68a16,16,0,1,0,16,16A16,16,0,0,0,128,180Z" }) }) }));
});
MoreVertIcon.displayName = withPrefix("MoreVert");
