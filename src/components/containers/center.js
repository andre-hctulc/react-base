import { jsx as _jsx } from "react/jsx-runtime";
import clsx from "clsx";
import React from "react";
import { withPrefix } from "../../util/system";
/**
 * A container that centers its children both horizontally and vertically.
 */
export const Center = React.forwardRef(({ className, ...props }, ref) => {
    return (_jsx("div", { ref: ref, className: clsx("flex items-center justify-center", className), ...props, children: props.children }));
});
Center.displayName = withPrefix("Center");
/**
 * A container that centers its children horizontally.
 */
export const CenterH = React.forwardRef(({ className, ...props }, ref) => {
    return (_jsx("div", { ref: ref, className: clsx("flex justify-center", className), ...props, children: props.children }));
});
CenterH.displayName = withPrefix("CenterH");
/**
 * A container that centers its children vertically.
 */
export const CenterV = React.forwardRef(({ className, ...props }, ref) => {
    return (_jsx("div", { ref: ref, className: clsx("flex items-center", className), ...props, children: props.children }));
});
CenterV.displayName = withPrefix("CenterV");
