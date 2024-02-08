import React from "react";
import FilterInput from "./FilterInput";
import RadioButtons from "../base/RadioButtons";
import Typography from "../../text/Typography";

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
                    <Typography tag="span" truncate className="max-w-100 ml-2" disabled>
                        {valueLabelMap.get(value)}
                    </Typography>
                )
            }
            input={<RadioButtons name={props.name} defaultValue={props.defaultValue} options={props.options} slotProps={{ main: { className: "!bg-bg" } }} />}
        />
    );
}
