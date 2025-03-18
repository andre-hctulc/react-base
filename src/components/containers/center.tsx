import clsx from "clsx";
import React from "react";
import { withPrefix } from "../../util/system.js";

export interface CenterProps extends React.ComponentProps<"div"> {}

/**
 * A container that centers its children both horizontally and vertically.
 */
export const Center = React.forwardRef<HTMLDivElement, CenterProps>(({ className, ...props }, ref) => {
    return (
        <div ref={ref} className={clsx("flex items-center justify-center", className)} {...props}>
            {props.children}
        </div>
    );
});

Center.displayName = withPrefix("Center");

/**
 * A container that centers its children horizontally.
 */
export const CenterH = React.forwardRef<HTMLDivElement, CenterProps>(({ className, ...props }, ref) => {
    return (
        <div ref={ref} className={clsx("flex justify-center", className)} {...props}>
            {props.children}
        </div>
    );
});

CenterH.displayName = withPrefix("CenterH");

/**
 * A container that centers its children vertically.
 */
export const CenterV = React.forwardRef<HTMLDivElement, CenterProps>(({ className, ...props }, ref) => {
    return (
        <div ref={ref} className={clsx("flex items-center", className)} {...props}>
            {props.children}
        </div>
    );
});

CenterV.displayName = withPrefix("CenterV");
