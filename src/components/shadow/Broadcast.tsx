import React from "react";

type BroadcastProps<T = any> = {
    props:
        | Partial<T>
        | ((
              child: React.ReactElement<Partial<T>, string | React.JSXElementConstructor<Partial<T>>>
          ) => T | null);
    children?: React.ReactNode;
    filter?: (child: React.ReactElement<T, string | React.JSXElementConstructor<T>>) => boolean;
};

/**
 * Broadcast props to children
 */
export default function Broadcast<T = any>(props: BroadcastProps<T>) {
    const children = React.Children.map(props.children, (child) => {
        if (React.isValidElement(child)) {
            if (props.filter && !props.filter(child as any)) return child;

            let p: any;

            if (typeof props.props === "function") p = (props.props as any)(child as any);
            else p = props.props;

            if (!p) return null;

            return React.cloneElement(child, { ...child.props, ...p });
        } else return child;
    });
    return children;
}
