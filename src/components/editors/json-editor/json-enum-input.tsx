"use client";

import { type FC } from "react";
import { useJSONEditor, useJSONPathValue, type JSONInputBaseProps } from "./json-editor";
import type { JSONSchema7 } from "json-schema";
import { Labeled } from "../../text";
import { JSFormError, Select, type SelectOption } from "../../input";

export const JSONEnumInput: FC<JSONInputBaseProps> = ({ label, path, schema, fallbackLabel }) => {
    const schem = schema as JSONSchema7;
    const { forceReadonly } = useJSONEditor();
    const { value, setValue } = useJSONPathValue(path);

    if (!Array.isArray(schem.enum) || (schem.type !== "string" && schem.type !== "number")) {
        return null;
    }

    const values: any[] = schem.enum;

    return (
        <Labeled helperText={schem.description} label={label ?? schem.title ?? fallbackLabel}>
            {(id) => (
                <>
                    <Select
                        choiceValues={value ? [value] : []}
                        onChange={({ value }) => setValue(value[0].value)}
                        id={id}
                        readOnly={forceReadonly}
                        name={path}
                        options={values.map<SelectOption>((value) => ({
                            data: value,
                            label: value,
                            value: value + "",
                        }))}
                    />
                    {path && <JSFormError name={path} />}
                </>
            )}
        </Labeled>
    );
};
