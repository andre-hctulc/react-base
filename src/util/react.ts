import {
    Children,
    cloneElement,
    isValidElement,
    type ComponentProps,
    type ElementType,
    type ForwardedRef,
    type LegacyRef,
    type ReactElement,
    type ReactNode,
} from "react";

export function findChildren<P>(children: ReactNode, type: ElementType<P>): ReactElement<P>[] {
    if (Array.isArray(children)) {
        return children.filter((child) => child.type === type);
    } else {
        return typeof children === "object" && (children as any)?.type === type ? ([children] as any) : [];
    }
}

/** Sets the value of one or more references */
export function setRef<T = any>(
    refValue: T,
    ...targetRefs: (ForwardedRef<T> | LegacyRef<T> | undefined | null)[]
) {
    for (const ref of targetRefs) {
        if (typeof ref === "function") ref(refValue);
        else if (ref && typeof ref === "object") (ref.current as any) = refValue;
    }
}

export function nodeIsEmpty(children: ReactNode) {
    if (!children) return false;
    return Children.count(children) !== 0;
}

export function populateProps<P extends object>(
    children: ReactNode,
    props: P,
    populateIf?: (element: ReactElement) => boolean
): ReactNode[] {
    const arr = Children.toArray(children);
    return arr.map((child) => {
        if (!isValidElement(child)) return child;
        if (!populateIf || populateIf(child)) {
            return cloneElement(child, props);
        }
        return child;
    });
}
