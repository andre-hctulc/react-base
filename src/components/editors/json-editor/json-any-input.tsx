"use client";

import type { FC } from "react";
import { useJSONPathValue, type JSONInputBaseProps } from "./json-editor";
import { Input, JSFormError } from "../../input";
import { Labeled } from "../../text";
import type { JSONSchema7 } from "json-schema";

export const JSONAnyInput: FC<JSONInputBaseProps> = ({ path, label, schema, fallbackLabel }) => {
    const schem = schema as JSONSchema7;
    const { value, setValue } = useJSONPathValue(path);

    return (
        <Labeled helperText={schem.description} label={label ?? schem.title ?? fallbackLabel}>
            {(id) => (
                <>
                    <Input id={id} value={value} onChange={({ value }) => setValue(value)} name={path} />
                    {path && <JSFormError name={path} />}
                </>
            )}
        </Labeled>
    );
};
