import React from "react";

export function findChildren<P>(
    children: React.ReactNode,
    type: React.ElementType<P>
): React.ReactElement<P>[] {
    if (Array.isArray(children)) {
        return children.filter((child) => child.type === type);
    } else {
        return typeof children === "object" && (children as any)?.type === type ? ([children] as any) : null;
    }
}

/**
 * @param children
 * @param mapper New children are replaced and props are added. Use `overwriteProps` to replace previous props.
 * @param overwriteProps
 * @returns
 */
export function mapChildren<P extends Record<string, any> = Record<string, any>>(
    children: React.ReactNode,
    mapper: (
        child: React.ReactElement<P, string | React.JSXElementConstructor<P>>,
        index: number
    ) => { props?: P; children?: React.ReactNode | null } | void | null | React.ReactNode,
    only?: boolean
) {
    let c = children;

    // Onyl one child
    if (only) c = React.Children.only(children);

    const mapped = React.Children.map(c, (child, index) => {
        if (React.isValidElement(child)) {
            const mapperResult = mapper(child as any, index);

            if (mapperResult === null) return;
            else if (mapperResult === undefined) {
                return React.cloneElement(child, child.props, child.props.children);
            } else if (React.isValidElement(mapperResult)) {
                return mapperResult;
            } else {
                return React.cloneElement(
                    child,
                    (mapperResult as any).props || {},
                    (mapperResult as any).children === null
                        ? undefined
                        : (mapperResult as any).children || child.props.children
                );
            }
        }
    });

    if (only) return mapped && mapped[0];
    else return mapped;
}

type ReactChildrenArray = ReturnType<typeof React.Children.toArray>;

/** Flattens Fragments and Arrays */
export function flattenChildren(children: React.ReactNode, flattenElements?: any[]): ReactChildrenArray {
    const arr = React.Children.toArray(children);

    return arr.reduce((flatChildren: ReactChildrenArray, child) => {
        if (
            (child as React.ReactElement<any>).type === React.Fragment ||
            Array.isArray(child) ||
            flattenElements?.includes((child as React.ReactElement<any>).type)
        )
            return flatChildren.concat(flattenChildren((child as React.ReactElement<any>).props.children));
        flatChildren.push(child);
        return flatChildren;
    }, []);
}

/** Sets the value of one or more references */
export function setRef<T = any>(
    refValue: T,
    ...targetRefs: (React.ForwardedRef<T> | React.LegacyRef<T> | undefined | null)[]
) {
    for (const ref of targetRefs) {
        if (typeof ref === "function") ref(refValue);
        else if (ref && typeof ref === "object") (ref.current as any) = refValue;
    }
}

export function hasChildren(children: React.ReactNode) {
    if (!children) return false;
    return React.Children.count(children) !== 0;
}

export function eventProps(props: Record<string, any>) {
    const result: Record<string, any> = {};
    for (const propName in props) if (/on[A-Z].*/.test(propName)) result[propName] = props[propName];
    return result;
}
