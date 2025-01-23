import type { JSONSchema7, JSONSchema7Definition } from "json-schema";
import { capitalize } from "@andre-hctulc/util";

export function typeLabel(type: JSONSchema7["type"] | boolean | JSONSchema7Definition) {
    // Boolean
    if (type === true || type === undefined) return "Any";
    if (type === false) return "None";

    // Definition
    if (!Array.isArray(type) && typeof type === "object") {
        return typeLabel(type.type);
    }

    // Type
    if (typeof type === "string") {
        return capitalize(type);
    }

    // None
    if (!type) return "None";

    // Array
    return type.map(capitalize).join(" or ");
}
