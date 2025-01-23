"use client";

import type { FC } from "react";
import { JSONAnyInput } from "./json-any-input";
import type { JSONInputBaseProps } from "./json-editor";
import { JSONMany } from "./json-many";
import { JSONEnumInput } from "./json-enum-input";
import { JSONObjectInput } from "./json-object-input";
import { JSONSimpleInput } from "./json-simple-input";
import { JSONArrayInput } from "./json-array-input";

export const JSONInputSwitch: FC<JSONInputBaseProps> = (props) => {
    const { schema } = props;

    if (typeof schema === "boolean") {
        if (!schema) return null;
        return <JSONAnyInput {...props} />;
    }

    if (schema.anyOf) {
        return <JSONMany schemas={schema.anyOf} {...props} />;
    }

    if (schema.oneOf) {
        return <JSONMany schemas={schema.oneOf} {...props} />;
    }

    if (!schema?.type) {
        return <JSONAnyInput {...props} />;
    }

    if (schema.enum) {
        return <JSONEnumInput {...props} />;
    }

    if (schema.type === "object") {
        return <JSONObjectInput {...props} />;
    }

    if (schema.type === "array") {
        return <JSONArrayInput {...props} />;
    }

    if (
        schema.type === "string" ||
        schema.type === "boolean" ||
        schema.type === "number" ||
        schema.type === "integer"
    ) {
        return <JSONSimpleInput {...props} />;
    }

    if (Array.isArray(schema.type)) {
        return <JSONMany schemas={schema.type.map((t) => ({ ...schema, type: t }))} {...props} />;
    }

    if (!schema.type) {
        return <JSONAnyInput {...props} />;
    }

    return <JSONSimpleInput {...props} />;
};
