import React from "react";

export default function useFilter<T = any>(arr: T[], filter: (item: T) => boolean) {
    const filtered = React.useMemo(() => {
        return arr.filter(item => filter(item));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [arr]);

    return filtered;
}
