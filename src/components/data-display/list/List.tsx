import React from "react";
import ListItem from "./ListItem";
import { SelectOption } from "../../input/base/Select";
import Stack from "../../layout/Stack";
import Placeholder from "../feedback/Placeholder";

interface ListProps<T = string> {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    /** @default "ol" */
    tag?: string;
    options?: SelectOption<T>[];
    onActivateOption?: (e: React.MouseEvent, option: SelectOption<T>) => void;
    emptyText?: string;
}

export default function List<T = string>(props: ListProps<T>) {
    const isEmpty = !props.children && !props.options?.length;

    return (
        <Stack className={props.className} style={props.style} tag="ol">
            {isEmpty && props.emptyText && (
                <Placeholder tag="li" py>
                    {props.emptyText}
                </Placeholder>
            )}
            {props.options?.map(opt => {
                const key: string = opt.value && typeof opt.value === "object" ? JSON.stringify(opt.value) : opt.value + "";

                return (
                    <ListItem
                        hoverEffect
                        onClick={e => {
                            if (!opt.actionIcon) props.onActivateOption?.(e, opt);
                        }}
                        onAction={e => {
                            if (opt.actionIcon) props.onActivateOption?.(e, opt);
                        }}
                        key={key}
                        className={opt.className}
                        style={opt.style}
                        icon={opt.icon}
                    >
                        {opt.label}
                    </ListItem>
                );
            })}
            {props.children}
        </Stack>
    );
}
