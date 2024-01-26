import React from "react";
import ShortText from "@react-client/components/text/ShortText/ShortText";
import FilterInput from "./filter-input";
import RadioButtons from "../base/RadioButtons/RadioButtons";

export default function RadioButtonsFilter(props: {
    label: string;
    icon?: React.ReactElement;
    options: { value: string; label: string }[];
    defaultValue?: string;
    name: string;
    onChange?: (value: string) => void;
}) {
    const valueLabelMap = React.useMemo<Map<string, string>>(() => new Map(props.options.map(option => [option.value, option.label])), [props.options]);

    if (!props.defaultValue) return null;

    return (
        <FilterInput
            closeOnChange
            onChange={props.onChange}
            defaultValue={props.defaultValue}
            icon={props.icon}
            label={props.label}
            preview={value =>
                !!value && (
                    <ShortText className="max-w-100 ml-2" disabled>
                        {valueLabelMap.get(value)}
                    </ShortText>
                )
            }
            input={<RadioButtons name={props.name} defaultValue={props.defaultValue} options={props.options} slotProps={{ main: { className: "!bg-bg" } }} />}
        />
    );
}
