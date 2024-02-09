import React from "react";
import { randomId } from "../../system";

export default function useId() {
    const id = React.useMemo(() => randomId(), []);
    return id;
}
