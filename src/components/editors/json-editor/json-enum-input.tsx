"use client";

import { type FC } from "react";
import { useJSONEditor, useJSONPathValue, type JSONInputBaseProps } from "./json-editor";
import type { JSONSchema7 } from "json-schema";
import { FormControl, Select, type SelectOption } from "../../input";

export const JSONEnumInput: FC<JSONInputBaseProps> = ({ label, path, schema, fallbackLabel }) => {
    const schem = schema as JSONSchema7;
    const { forceReadonly } = useJSONEditor();
    const { value, setValue } = useJSONPathValue(path);

    if (!Array.isArray(schem.enum) || (schem.type !== "string" && schem.type !== "number")) {
        return null;
    }

    const values: any[] = schem.enum;

    return (
        <FormControl name={path} helperText={schem.description} label={label ?? schem.title ?? fallbackLabel}>
            <Select
                choiceValues={value ? [value] : []}
                onChange={({ value }) => setValue(value[0].value)}
                readOnly={forceReadonly}
                options={values.map<SelectOption>((value) => ({
                    data: value,
                    label: value,
                    value: value + "",
                }))}
            />
        </FormControl>
    );
};
