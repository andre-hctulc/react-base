import React from "react";

export default function useMemoOnce<T>(factory: () => T) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const value = React.useMemo(factory, []);
    return value;
}
