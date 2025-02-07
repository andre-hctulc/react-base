"use client";

import { useMemo, useState, type FC } from "react";
import { useJSONEditor, useJSONPathValue, type JSONInputBaseProps } from "./json-editor";
import type { JSONSchema7, JSONSchema7Definition } from "json-schema";
import { Labeled } from "../../text";
import { IconButton, InputList, JSFormError, Select, type SelectOption } from "../../input";
import { JSONMany } from "./json-many";
import { typeLabel } from "./json-util";
import { PlusIcon } from "../../icons/plus";

interface ListItem {
    schemas: JSONSchema7Definition | JSONSchema7Definition[];
    value: any;
}

export const JSONArrayInput: FC<JSONInputBaseProps> = ({ path, schema, label, fallbackLabel }) => {
    const schem = schema as JSONSchema7;
    const { forceReadonly } = useJSONEditor();
    const { value, setValue } = useJSONPathValue(path);
    const values = useMemo<ListItem[]>(() => {
        return (value || []).map<ListItem>((value) => {
            return { schemas: schem.items || {}, value };
        });
    }, [value, schem.properties]);
    const itemsSchema = useMemo<JSONSchema7Definition[]>(() => {
        const addable: JSONSchema7Definition[] = [];

        if (schem.items !== false) {
            if (Array.isArray(schem.items)) {
                addable.push(...schem.items);
            } else {
                addable.push(schem.items ?? {});
            }
        }

        return addable;
    }, []);
    const [newPropSchema, setNewPropSchema] = useState<JSONSchema7Definition | undefined>(itemsSchema[0]);

    if (schem.type !== "array") {
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
                    unique
                    value={values}
                    readOnly={forceReadonly || schem.readOnly}
                    onChange={({ value }) => {
                        setValue(value.map(({ value }) => value));
                    }}
                    renderInput={({ add }) => (
                        <div className="flex items-center gap-3 pl-5">
                            <Select
                                defaultChoiceValues={itemsSchema.length ? ["0"] : []}
                                className="flex-grow"
                                onChange={({ value }) =>
                                    setNewPropSchema(itemsSchema[parseInt(value[0].value)])
                                }
                                options={itemsSchema.map<SelectOption>((as, i) => ({
                                    label: typeLabel(as),
                                    value: String(i),
                                }))}
                            />
                            <IconButton
                                type="button"
                                disabled={!itemsSchema.length || !newPropSchema}
                                className="ml-auto"
                                onClick={() => {
                                    if (!newPropSchema) return;
                                    add({ schemas: newPropSchema, value: undefined });
                                }}
                            >
                                <PlusIcon />
                            </IconButton>
                        </div>
                    )}
                    renderValues={({ values }) => (
                        <div className="pl-5 flex flex-col gap-2 pt-5">
                            {values.map(({ value }, i) => {
                                return (
                                    <JSONMany
                                        key={i}
                                        path={`${path}[${i}]`}
                                        fallbackLabel=""
                                        label=""
                                        required
                                        schemas={schem.items}
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
