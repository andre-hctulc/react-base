import { randomId } from "@client-util/strings";
import React from "react";

export default function useId() {
    const id = React.useMemo(() => randomId(), []);
    return id;
}
