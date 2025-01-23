"use client";

import { useMemo, useState, type FC } from "react";
import { useJSONEditor, useJSONPathValue, type JSONInputBaseProps } from "./json-editor";
import type { JSONSchema7, JSONSchema7Definition } from "json-schema";
import { Labeled } from "../../text";
import { IconButton, Input, InputList, JSFormError, Select, type SelectOption } from "../../input";
import { JSONMany } from "./json-many";
import { typeLabel } from "./json-util";
import { PlusIcon } from "../../icons/plus";

interface ListItem {
    key: string;
    schemas: JSONSchema7Definition | JSONSchema7Definition[];
    value: any;
}

const findPatternSchemas = (key: string | null, patternProperties: JSONSchema7["patternProperties"]) => {
    const schemas: JSONSchema7Definition[] = [];

    for (const [pattern, schema] of Object.entries(patternProperties || {})) {
        if (key === null) {
            schemas.push(schema);
        } else if (new RegExp(pattern).test(key)) {
            schemas.push(schema);
        }
    }
    return schemas;
};
export const JSONObjectInput: FC<JSONInputBaseProps> = ({ path, schema, label, fallbackLabel }) => {
    const schem = schema as JSONSchema7;
    const { forceReadonly } = useJSONEditor();
    const { value, setValue } = useJSONPathValue(path);
    const values = useMemo<ListItem[]>(() => {
        const result: ListItem[] = [];

        Object.entries(schem.properties || {}).forEach(([key, subSchema]) => {
            if (!value?.[key]) {
                result.push({
                    key,
                    schemas: subSchema,
                    value: undefined,
                });
            }
        });

        Object.entries(value || {}).map(([key, value]) => {
            let schemas: JSONSchema7Definition[] | JSONSchema7Definition | undefined =
                schem.properties?.[key];

            if (!schemas) {
                const patternSchemas = findPatternSchemas(key, schem.patternProperties);
                if (patternSchemas.length) {
                    schemas = patternSchemas;
                } else {
                    schemas = schem.additionalProperties ?? {};
                }
            }

            result.push({ key, schemas, value });
        });

        return result;
    }, [value, schem.properties]);
    const [newPropName, setNewPropName] = useState<string>();
    const addableSchemas = useMemo<JSONSchema7Definition[]>(() => {
        const addable: JSONSchema7Definition[] = [];

        if (schem.additionalProperties !== false) {
            addable.push(schem.additionalProperties ?? true);
        }

        if (schem.patternProperties || !newPropName) {
            addable.push(...findPatternSchemas(null, schem.patternProperties));
        }

        return addable;
    }, []);
    const [newPropSchema, setNewPropSchema] = useState<JSONSchema7Definition | undefined>(addableSchemas[0]);

    if (schem.type !== "object") {
        return null;
    }

    return (
        <Labeled
            helperTextTop
            labelProps={{ as: "span" }}
            helperText={schem.description}
            label={label ?? schem.title ?? fallbackLabel}
        >
            <div className="pl-5 pt-2">
                <InputList<ListItem>
                    reverse
                    unique
                    sort={(a, b) => a.key.localeCompare(b.key)}
                    value={values}
                    readOnly={
                        forceReadonly ||
                        (schem.additionalProperties === false && !schem.patternProperties) ||
                        schem.readOnly
                    }
                    onChange={({ value }) => {
                        setValue(value.reduce((acc, { key, value }) => ({ ...acc, [key]: value }), {}));
                    }}
                    renderInput={({ add }) => (
                        <div className="flex items-center gap-3 pl-5">
                            <Input onBlur={(e) => setNewPropName(e.target.value)} />
                            <Select
                                defaultSelectedKeys={addableSchemas.length ? ["0"] : []}
                                onChange={({ value }) =>
                                    setNewPropSchema(addableSchemas[parseInt(value[0].value)])
                                }
                                options={addableSchemas.map<SelectOption>((as, i) => ({
                                    label: typeLabel(as),
                                    value: String(i),
                                }))}
                            />
                            <IconButton
                                type="button"
                                disabled={!addableSchemas.length || !newPropName || !newPropSchema}
                                className="ml-auto"
                                onClick={() => {
                                    if (!newPropName || !newPropSchema) return;
                                    add({ key: newPropName, schemas: newPropSchema, value: undefined });
                                    setNewPropName(undefined);
                                }}
                            >
                                <PlusIcon />
                            </IconButton>
                        </div>
                    )}
                    renderValues={({ values }) => (
                        <div className="pl-5 flex flex-col gap-2 pt-5">
                            {values.map(({ key }) => {
                                let subSchema: JSONSchema7Definition | JSONSchema7Definition[] | undefined;

                                if (schem.properties?.[key]) {
                                    subSchema = schem.properties[key];
                                } else if (schem.patternProperties) {
                                    for (const [pattern, schema] of Object.entries(schem.patternProperties)) {
                                        if (new RegExp(pattern).test(key)) {
                                            subSchema = schema;
                                            break;
                                        }
                                    }
                                }

                                if (!subSchema && schem.additionalProperties !== false) {
                                    subSchema = schem.additionalProperties || {};
                                }

                                return (
                                    <JSONMany
                                        key={key}
                                        path={`${path}.${key}`}
                                        fallbackLabel={key}
                                        label={undefined}
                                        required={!!schem.required?.includes(key)}
                                        schemas={subSchema}
                                        schema={false}
                                    />
                                );
                            })}
                        </div>
                    )}
                />
                {path && <JSFormError name={path} />}
            </div>
        </Labeled>
    );
};
