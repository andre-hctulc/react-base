"use client";

import { type FC } from "react";
import { useJSONEditor, useJSONPathValue, type JSONInputBaseProps } from "./json-editor";
import type { JSONSchema7 } from "json-schema";
import { FormControl, Input } from "../../input";
import { collapse } from "@edgeshiftlabs/util";

export const JSONSimpleInput: FC<JSONInputBaseProps> = ({ path, schema, label, required, fallbackLabel }) => {
    const schem = schema as JSONSchema7;
    const { forceReadonly } = useJSONEditor();
    const { value, setValue } = useJSONPathValue(path);

    if (
        schem.type !== "string" &&
        schem.type !== "number" &&
        schem.type !== "boolean" &&
        schem.type !== "integer"
    ) {
        return null;
    }

    const inpType = collapse(schem.type, {
        string: "text",
        number: "number",
        integer: "number",
        boolean: "checkbox",
    });

    return (
        <FormControl helperText={schem.description} label={label ?? schem.title ?? fallbackLabel} name={path}>
            <Input
                placeholder={path}
                value={value ?? ""}
                onChange={({ value }) => setValue(value)}
                readOnly={forceReadonly || schem.readOnly}
                type={inpType}
                required={required}
                minLength={schem.minLength}
                maxLength={schem.maxLength}
                pattern={schem.pattern}
                step={schem.multipleOf}
                min={schem.minimum}
                max={schem.maximum}
            />
        </FormControl>
    );
};
