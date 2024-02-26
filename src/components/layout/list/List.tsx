import React from "react";
import Flex from "../../layout/Flex";
import Placeholder from "../../feedback/Placeholder";
import ListItem from "./ListItem";
import type { SelectOption } from "../../input/base/Select";

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
        <Flex className={props.className} style={props.style} tag="ol">
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
        </Flex>
    );
}
