import React from "react";
import TimeRangeInput, { TimeRange } from "../base/TimeRangeInput";
import { compareDates } from "u/src/compare";
import Stack from "../../layout/Stack";
import TimeText from "../../text/TimeText";
import Typography from "../../text/Typography";
import FilterInput from "./FilterInput";

export interface TimeRangeFilterProps {
    onChange?: (range: TimeRange) => void;
    defaultValue?: TimeRange;
    name: string;
    label?: string;
}

export function timeRangeIsEmpty(range: TimeRange | undefined | null) {
    return !range?.[0] && !range?.[1];
}

export default function TimeRangeFilter(props: TimeRangeFilterProps) {
    return (
        <FilterInput
            compareValues={(range1, range2) => compareDates(range1?.[0], range2?.[0]) && compareDates(range1?.[1], range2?.[1])}
            defaultValue={props.defaultValue || [null, null]}
            label={props.label || "Zeitraum"}
            input={<TimeRangeInput name={props.name} />}
            onChange={props.onChange}
            preview={range => (
                <Stack direction="row" align="center" className="text-text-disabled ml-2">
                    {range?.[0] ? <TimeText noTime disableTextFormat date={range[0]} /> : <Typography>leer</Typography>}
                    <span>&nbsp;-&nbsp;</span>
                    {range?.[1] ? <TimeText noTime disableTextFormat date={range[1]} /> : <Typography>leer</Typography>}
                </Stack>
            )}
        />
    );
}
