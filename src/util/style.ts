import { collapse } from "./helpers";
import type { Align } from "../types";

export function alignClass(align: Align) {
    return collapse(align || "center", {
        center: "items-center",
        start: "items-start",
        end: "items-end",
        none: "",
    });
}

export function alignSelfClass(align: Align) {
    return collapse(align, { start: "self-start", end: "self-end", center: "self-center", none: "" });
}

export function justifyClass(justify: Align) {
    return collapse(justify || "center", {
        end: "justify-end",
        center: "justify-center",
        start: "justify-start",
        none: "",
    });
}
