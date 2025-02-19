import React from "react";
export function findChildren(children, type) {
    if (Array.isArray(children)) {
        return children.filter((child) => child.type === type);
    }
    else {
        return typeof children === "object" && children?.type === type ? [children] : null;
    }
}
/** Sets the value of one or more references */
export function setRef(refValue, ...targetRefs) {
    for (const ref of targetRefs) {
        if (typeof ref === "function")
            ref(refValue);
        else if (ref && typeof ref === "object")
            ref.current = refValue;
    }
}
export function hasChildren(children) {
    if (!children)
        return false;
    return React.Children.count(children) !== 0;
}
