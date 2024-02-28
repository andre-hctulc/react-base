import React from "react";
import { randomId } from "../../system";

export default function useId(length?: number) {
    const id = React.useMemo(() => randomId(length), [length]);
    return id;
}
