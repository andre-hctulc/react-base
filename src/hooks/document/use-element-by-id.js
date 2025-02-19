import React from "react";
export function useElementById(id, deps) {
    const [element, setElement] = React.useState(null);
    React.useEffect(() => {
        if (id) {
            setElement(document.getElementById(id));
        }
    }, [id, ...(deps || [])]);
    return element;
}
