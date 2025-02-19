import React from "react";
/**
 * Broadcast props to children
 *
 * ### Props
 * - `props` - The props to broadcast to children
 * - `children` - The children to broadcast props to
 * - `filter` - A filter function to filter children
 */
export const Broadcast = (props) => {
    return React.Children.map(props.children, (child) => {
        if (React.isValidElement(child)) {
            if (props.filter && !props.filter(child))
                return child;
            let p;
            if (typeof props.props === "function") {
                p = props.props(child);
            }
            else {
                p = props.props;
            }
            if (!p) {
                return child;
            }
            return React.cloneElement(child, p);
        }
        else {
            return child;
        }
    });
};
