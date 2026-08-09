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

export interface SelectItem {
    label: string;
    value: string;
}

type SelectItemList = SelectItem[];

export type SelectItemGroupMap = { [groupLabel: string]: SelectItem[] };

export type SelectItems = SelectItemList | SelectItemGroupMap;

interface SelectFactoryProps extends ComponentProps<typeof Select> {
    options: SelectItems;
}

export const SelectFactory: FC<SelectFactoryProps> = ({ options, ...props }) => {
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
