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

interface SelectFactoryProps extends Omit<ComponentProps<typeof Select>, "items"> {
    items: SelectItems;
    id?: string;
    triggerProps?: ComponentProps<typeof SelectTrigger>;
}

export const SelectFactory: FC<SelectFactoryProps> = ({ items, id, triggerProps, ...props }) => {
    const len = Array.isArray(items) ? items.length : Object.keys(items).length;

    return (
        <Select {...props}>
            <SelectTrigger id={id} {...triggerProps}>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {Array.isArray(items) ? (
                    <SelectGroup>
                        {items.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                                {item.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                ) : (
                    Object.entries(items).map(([groupLabel, groupOptions]) => {
                        const isLast = Object.keys(items).indexOf(groupLabel) === len - 1;
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
