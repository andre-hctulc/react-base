import { randomColor } from "@react-client/util";
import React from "react";

export default function useRandomColor() {
    const color = React.useMemo(() => randomColor(), []);
    return color;
}
