import React from "react";
import { randomColor } from "../../util";

export default function useRandomColor() {
    const color = React.useMemo(() => randomColor(), []);
    return color;
}
