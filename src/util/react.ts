import clsx from "clsx";
import {
    Children,
    cloneElement,
    isValidElement,
    type ChangeEvent,
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
    if (!children) return true;
    return Children.count(children) !== 0;
}

export function deepFlatChildren(children: ReactNode): ReactNode[] {
    const arr = Children.toArray(children);
    const flatChildren: ReactNode[] = [];
    for (const child of arr) {
        if (Array.isArray(child)) {
            flatChildren.push(...deepFlatChildren(child));
        } else {
            flatChildren.push(child);
        }
    }
    return flatChildren;
}

interface PopulatePropsOptions {
    mergeStrategy?: "left" | "right" | "merge" | { merge: MergePropsOptions };
    populateIf?: (element: ReactElement) => boolean;
    /**
     * @default true
     */
    deepFlatChildren?: boolean;
}

/**
 * @param mergeStrategy "left": element props take precedence over `props`, "right": `props` overwrite element props (default)
 */
export function populateProps<P extends object>(
    children: ReactNode,
    props: P | ((element: ReactElement) => P),
    options: PopulatePropsOptions = {}
): ReactNode[] {
    const arr = options.deepFlatChildren === false ? Children.toArray(children) : deepFlatChildren(children);

    return arr.map((child) => {
        if (!isValidElement(child)) return child;

        if (!options.populateIf || options.populateIf(child)) {
            const addProps = typeof props === "function" ? props(child) : props;
            let newProps: any;

            if (options.mergeStrategy === "merge") {
                newProps = mergeProps([child.props as any, addProps]);
            } else if (options.mergeStrategy === "left") {
                newProps = { ...addProps, ...(child.props as any) };
            } else if (typeof options.mergeStrategy === "object") {
                newProps = mergeProps([child.props as any, addProps], options.mergeStrategy.merge);
            } else {
                newProps = addProps;
            }

            return cloneElement(child, newProps);
        }

        return child;
    });
}

export function inputEventToValue(event: ChangeEvent<HTMLInputElement>, type: string): any {
    // SEE HiddenInput
    if (event.currentTarget.dataset.rbjsoninp) {
        if (!event.currentTarget.value) {
            return undefined;
        }
        return JSON.parse(event.currentTarget.value);
    }

    if (event.currentTarget.files) {
        return event.currentTarget.files;
    }

    if (type === "checkbox") {
        return event.currentTarget.checked;
    }
    if (type.includes("date")) {
        return event.currentTarget.valueAsDate;
    }
    if (type === "number") {
        return event.currentTarget.valueAsNumber;
    }

    return event.currentTarget.value;
}

interface MergePropsOptions {
    mergeClasses?: boolean;
    mergeStyles?: boolean;
    mergeEvents?: boolean;
    omitUndefined?: boolean;
}

/**
 * Latter props overwrite former ones
 *
 * By default events, styles, and classes are merged. Control this with {@link mergeOptions}
 *
 * @param props List of props to merge
 * @param mergeOptions Merge options
 */
export function mergeProps<P extends object>(
    props: (Partial<P> | undefined | null | false)[],
    {
        mergeClasses = true,
        mergeStyles = true,
        mergeEvents = true,
        omitUndefined = true,
    }: MergePropsOptions = {}
): P {
    const mergedProps: any = {};

    for (const propsItem of props) {
        if (!propsItem) continue;

        for (const key in propsItem) {
            const value: any = propsItem[key];

            if (omitUndefined && value === undefined) {
                continue;
            }

            if (mergeClasses && key === "className") {
                mergedProps[key] = mergedProps[key] ? clsx(mergedProps[key], value) : value;
            } else if (mergeStyles && key === "style") {
                mergedProps[key] = { ...mergedProps[key], ...value };
            } else if (mergeEvents && /^on[A-Z]/.test(key)) {
                const existingHandler = mergedProps[key];
                mergedProps[key] = existingHandler
                    ? (...args: any[]) => {
                          existingHandler(...args);
                          value?.(...args);
                      }
                    : value;
            } else {
                mergedProps[key] = value;
            }
        }
    }

    return mergedProps;
}
