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

export function formEventToValues<T extends object = any>(event: React.FormEvent<HTMLFormElement>): T {
    const form = event.currentTarget;
    const fd = new FormData(form);
    return Object.fromEntries(fd) as T;
}

export function formEventToFormData(event: React.FormEvent<HTMLFormElement>): FormData {
    const form = event.currentTarget;
    return new FormData(form);
}
