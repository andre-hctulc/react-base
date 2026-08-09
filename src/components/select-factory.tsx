import { Fragment, type ComponentProps, type FC } from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export interface SelectOption {
    label: string;
    value: string;
}

type SelectOptionList = SelectOption[];
type SelectOptionMap = { [title: string]: SelectOption[] };

export type SelectOptions = SelectOptionList | SelectOptionMap;

interface SelectFactoryProps extends ComponentProps<typeof Select> {
    options: SelectOptions;
}

export const RadioGroupFactory: FC<SelectFactoryProps> = ({ options, ...props }) => {
    const optionsLength = Array.isArray(options) ? options.length : Object.keys(options).length;

    return (
        <Select {...props}>
            <SelectTrigger className="w-full max-w-48">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {Array.isArray(options) ? (
                    <SelectGroup>
                        {options.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                                {item.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                ) : (
                    Object.entries(options).map(([groupLabel, groupOptions]) => {
                        const isLast = Object.keys(options).indexOf(groupLabel) === optionsLength - 1;
                        return (
                            <Fragment key={groupLabel}>
                                {!isLast && <SelectSeparator />}
                                <SelectGroup>
                                    <SelectLabel>{groupLabel}</SelectLabel>
                                    {groupOptions.map((item) => (
                                        <SelectItem key={item.value} value={item.value}>
                                            {item.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </Fragment>
                        );
                    })
                )}
            </SelectContent>
        </Select>
    );
};
