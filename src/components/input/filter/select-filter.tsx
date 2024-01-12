import React from "react";
import FilterInput from "./filter-input";
import Select, { SelectOption } from "../base/select";

export interface SelectFilterProps {
    label: string;
    icon?: React.ReactElement;
    options: SelectOption[];
    defaultValue?: string;
    name: string;
    onChange?: (value: string) => void;
    /** @default 140 */
    selectWidth?: number;
}

export default function SelectFilter(props: SelectFilterProps) {
    if (props.defaultValue === undefined) return null;

    return (
        <FilterInput
            centerLabel
            onChange={props.onChange}
            defaultValue={props.defaultValue}
            icon={props.icon}
            label={props.label}
            preview="input_is_preview"
            className="!py-0 !pr-0"
            input={
                <Select
                    className="ml-2"
                    style={{ width: props.selectWidth || 140 }}
                    size="small"
                    name={props.name}
                    defaultValue={props.defaultValue}
                    options={props.options}
                    slotProps={{ currentWrapper: { className: "!border-none" } }}
                />
            }
        />
    );
}
