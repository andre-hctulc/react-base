"use client";

import { Children, cloneElement, isValidElement, type JSXElementConstructor, type ReactElement, type ReactNode, type ReactPortal } from "react";


type BroadcastProps<P = any> = {
    props:
        | Partial<P>
        | ((
              child:
                  | ReactPortal
                  | ReactElement<unknown, string | JSXElementConstructor<any>>
          ) => P | null);
    children?: ReactNode;
    filter?: (
        child: ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>>
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
    return Children.map(props.children, (child) => {
        if (isValidElement(child)) {
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

            return cloneElement(child, p);
        } else {
            return child;
        }
    });
};
