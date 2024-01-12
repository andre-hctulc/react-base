import { randomColor } from "@client-util/style-util.js";
import React from "react";

export default function useRandomColor() {
    const color = React.useMemo(() => randomColor(), []);
    return color;
}
