"use client";

import type { FC } from "react";
import { useJSONPathValue, type JSONInputBaseProps } from "./json-editor";
import { FormControl, Input } from "../../input";
import type { JSONSchema7 } from "json-schema";

export const JSONAnyInput: FC<JSONInputBaseProps> = ({ path, label, schema, fallbackLabel }) => {
    const schem = schema as JSONSchema7;
    const { value, setValue } = useJSONPathValue(path);

    return (
        <FormControl helperText={schem.description} label={label ?? schem.title ?? fallbackLabel} name={path}>
            <Input value={value} onChange={({ value }) => setValue(value)} name={path} />
        </FormControl>
    );
};
