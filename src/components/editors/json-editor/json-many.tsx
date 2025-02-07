"use client";

import type { JSONSchema7, JSONSchema7Definition } from "json-schema";
import { useJSONEditor, type JSONInputBaseProps } from "./json-editor";
import { useMemo, useState, type FC } from "react";
import { Select, type SelectOption } from "../../input";
import { typeLabel } from "./json-util";
import { Labeled } from "../../text";
import { JSONInputSwitch } from "./json-input-switch";

interface JSONOrInputProps extends JSONInputBaseProps {
    schemas: JSONSchema7Definition[] | JSONSchema7Definition | undefined;
}

export const JSONMany: FC<JSONOrInputProps> = ({ path, schemas, label, schema, fallbackLabel, required }) => {
    const schem = schema as JSONSchema7;
    const schems = Array.isArray(schemas) ? schemas : schemas ? [schemas] : [true];
    const { forceReadonly } = useJSONEditor();
    const [activeType, setActiveType] = useState("0");
    const options = useMemo(
        () =>
            schems.map<SelectOption>((subSchema, i) => {
                if (typeof subSchema === "boolean") {
                    return {
                        label: subSchema ? "Any" : "None",
                        value: String(i),
                    };
                }

                return {
                    label: typeLabel(subSchema.type),
                    value: String(i),
                };
            }),
        [schems]
    );
    const activeIndex = parseInt(activeType);
    const multiple = schems.length > 1 && !forceReadonly;

    if (!multiple) {
        return (
            <JSONInputSwitch
                required={required}
                path={path}
                label={label}
                fallbackLabel={fallbackLabel}
                schema={schems[0]}
            />
        );
    }

    return (
        <Labeled helperText={schem.description} label={label ?? schem.title ?? fallbackLabel}>
            {(id) => (
                <>
                    <Select
                        id={id}
                        defaultChoiceValues={[activeType]}
                        onChange={({ value }) => setActiveType(value[0].value)}
                        size="sm"
                        required
                        name={path}
                        options={options}
                    />
                    <JSONInputSwitch
                        required={required}
                        path={path}
                        fallbackLabel=""
                        label=""
                        schema={schems[activeIndex]}
                    />
                </>
            )}
        </Labeled>
    );
};
