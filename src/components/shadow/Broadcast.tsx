"use client";

import React from "react";

type BroadcastProps<P = any> = {
    props:
        | Partial<P>
        | ((
              child:
                  | React.ReactPortal
                  | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>
          ) => P | null);
    children?: React.ReactNode;
    filter?: (
        child: React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>
    ) => boolean;
};

/**
 * Broadcast props to children
 *
 * ### Props
 * - `props` - The props to broadcast to children
 * - `children` - The children to broadcast props to
 * - `filter` - A filter function to filter children
 */
export const Broadcast = <P = any,>(props: BroadcastProps<P>) => {
    return React.Children.map(props.children, (child) => {
        if (React.isValidElement(child)) {
            if (props.filter && !props.filter(child)) return child;

            let p: any;

            if (typeof props.props === "function") {
                p = props.props(child);
            } else {
                p = props.props;
            }

            if (!p) {
                return child;
            }

            return React.cloneElement(child, p);
        } else {
            return child;
        }
    });
};
