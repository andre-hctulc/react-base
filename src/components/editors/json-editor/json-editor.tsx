"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { JSForm } from "../../input";
import type { PropsOf } from "../../../types";
import type { JSONSchema7, JSONSchema7Definition } from "json-schema";
import { JSONInputSwitch } from "./json-input-switch";
import { getProperty, setProperty } from "dot-prop";
import { deepCopy } from "@andre-hctulc/util";

export interface JSONInputBaseProps {
    path: string;
    schema: JSONSchema7Definition;
    required: boolean;
    label: string | undefined;
    fallbackLabel: string | undefined;
}

const JSONEditorContext = createContext<JSONEditorContext | null>(null);

interface JSONEditorContext {
    valueObj: any;
    setValue: (path: string, value: any) => void;
    sourceSchema: JSONSchema7;
    forceReadonly: boolean;
}

export function useJSONEditor() {
    const ctx = useContext(JSONEditorContext);
    if (!ctx) throw new Error("`JSONEditorContext` not found");
    return ctx;
}

export function useJSONPathValue(path: string | undefined) {
    const { valueObj, setValue } = useJSONEditor();
    if (path === undefined) return { value: undefined, setValue: () => {} };
    return { value: getProperty(valueObj, path), setValue: (value: any) => setValue(path, value) };
}

interface JSONEditorProps<T extends object = any> {
    schema: JSONSchema7;
    className?: string;
    id?: string;
    label?: string;
    readOnly?: boolean;
    defaultValue?: T;
    rootLabel?: string;
}

export function JSONEditor<T extends object = any>({
    schema,
    className,
    id,
    readOnly,
    defaultValue,
    rootLabel,
    ...formProps
}: JSONEditorProps<T>) {
    const [valueObj, setValueObj] = useState(() => {
        return { _root: defaultValue };
    });
    const setValue = useCallback((path: string, pathValue: any) => {
        setValueObj((obj) => {
            const copy = deepCopy(obj);
            setProperty(copy, path, pathValue);
            return copy;
        });
    }, []);

    return (
        <JSForm<T> {...formProps} className={className} id={id}>
            <JSONEditorContext.Provider
                value={{
                    valueObj,
                    setValue,
                    forceReadonly: readOnly || false,
                    sourceSchema: schema,
                }}
            >
                {JSON.stringify(valueObj)}
                <JSONInputSwitch required schema={schema} path="_root" label={rootLabel} fallbackLabel="" />
            </JSONEditorContext.Provider>
        </JSForm>
    );
}
