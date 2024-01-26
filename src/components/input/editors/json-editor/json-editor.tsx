import Stack from "@react-client/components/layout/containers/Stack/Stack";
import React from "react";
import JSONFields from "./json-fields";
import PlusIcon from "@react-client/components/icons/collection/plus";
import TrashIcon from "@react-client/components/icons/collection/trash";
import Select, { SelectOption } from "@react-client/components/input/base/Select/Select";
import IconButton from "@react-client/components/input/buttons/IconButton/IconButton";
import Input from "@react-client/components/input/base/Input/Input";
import CheckBox from "@react-client/components/input/base/CheckBox/CheckBox";

type JSONFieldType = "object" | "string" | "boolean" | "number";
type JSONFieldValue = string | number | boolean | object | boolean;

interface JSONEditorProps {
    onChange?: (value: string) => void;
}

const dataTypes: SelectOption[] = [
    { value: "string", label: "Text" },
    { value: "number", label: "Zahl" },
    { value: "boolean", label: "Ja/Nein" },
];

export default function JSONEditor(props: JSONEditorProps) {
    const [obj, setObj] = React.useState<{ [key: string]: any }>({});
    const keys = React.useMemo(() => {
        return Object.keys(obj);
    }, [obj]);
    const [currentFieldName, setCurrentFieldName] = React.useState<string>("");
    const [currentValue, setCurrentValue] = React.useState<JSONFieldValue>();
    const [currentDataType, setCurrentDataType] = React.useState<JSONFieldType>("string");
    const inpType = React.useMemo(() => {
        switch (currentDataType) {
            case "boolean":
                return "";
            case "number":
                return "number";
            case "string":
                return "text";
            case "object":
                return "";
        }
    }, [currentDataType]);
    const currentValueIsEmpty = React.useMemo(() => {
        switch (currentDataType) {
            case "boolean":
                return typeof currentValue !== "boolean";
            case "number":
                return typeof currentValue !== "number";
            case "string":
                return !currentValue;
            case "object":
                return !currentValue;
        }
    }, [currentValue, currentDataType]);
    const currentValid = !!currentFieldName && !currentValueIsEmpty;

    React.useEffect(() => {
        if (props.onChange) props.onChange(JSON.stringify(obj));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [obj]);

    function clear() {
        setCurrentFieldName("");
        setCurrentValue("");
    }

    function addFieldToObject() {
        setObj({ ...obj, [currentFieldName]: currentValue });
        clear();
    }

    function deleteField(key: string) {
        if (!key) return;

        const newObj = { ...obj };
        delete newObj[key];

        setObj(newObj);
    }

    return (
        <Stack className="" minW0>
            <div className="grid max-w-full overflow-x-auto" style={{ gridTemplateColumns: `33% 33% 25% 9%` }}>
                {keys.map(key => (
                    <>
                        <span style={{ gridColumn: "span 1" }}>{key}</span>
                        <span style={{ gridColumn: "span 2" }}>{obj[key]}</span>
                        <span className="flex items-center justify-center">
                            <IconButton
                                size="small"
                                className="self-center"
                                onClick={() => {
                                    deleteField(key);
                                }}
                            >
                                <TrashIcon />
                            </IconButton>
                        </span>
                    </>
                ))}

                <Input
                    value={currentFieldName}
                    slotProps={{ input: { className: "!rounded-none" } }}
                    placeholder="Feld"
                    onChange={e => {
                        setCurrentFieldName(e.target.value);
                    }}
                ></Input>
                {currentDataType === "boolean" ? (
                    <div className="border flex items-center px-2">
                        <CheckBox
                            value={!!currentValue}
                            onChange={e => {
                                setCurrentValue(e.target.checked);
                            }}
                        />
                    </div>
                ) : (
                    <Input
                        value={currentValue}
                        type={inpType}
                        slotProps={{ input: { className: "!rounded-none" } }}
                        placeholder="Wert"
                        onChange={e => {
                            if (currentDataType === "number") setCurrentValue(e.target.valueAsNumber);
                            else setCurrentValue(e.target.value);
                        }}
                    />
                )}
                <Select
                    emptyOption={null}
                    required
                    defaultValue="string"
                    slotProps={{ currentWrapper: { className: "!rounded-none" } }}
                    options={dataTypes}
                    placeholder="Datentyp"
                    onChange={value => {
                        if (value) setCurrentDataType(value as any);
                    }}
                />
                <span className="flex items-center justify-center">
                    <IconButton disabled={!currentValid} variant="contained" size="small" className="self-center" onClick={() => addFieldToObject()}>
                        <PlusIcon />
                    </IconButton>
                </span>
            </div>
            <JSONFields object={obj} />
        </Stack>
    );
}
