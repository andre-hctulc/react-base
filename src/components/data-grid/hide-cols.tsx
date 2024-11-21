"use client";

import React from "react";
import { useAsSet } from "../../hooks";
import { List } from "../containers";
import { Popover } from "../dialog/popover";
import { IconButton } from "../input";
import type { DataGridColDef } from "./data-grid";
import { GearIcon } from "../icons/gear";

interface HideColsProps {
    colsIcon?: React.ReactNode;
    showIcon?: React.ReactNode;
    hideIcon?: React.ReactNode;
    hiddenCols: string[];
    cols: DataGridColDef<any>[];
    onChange?: (colKey: string, hidden: boolean) => void;
}

export const HideCols: React.FC<HideColsProps> = ({ colsIcon, cols, hiddenCols, ...props }) => {
    const hidden = useAsSet(hiddenCols);
    const btn = React.useRef<HTMLButtonElement>(null);
    const [open, setOpen] = React.useState(false);

    return (
        <>
            <IconButton
                ref={btn}
                size="sm"
                color="neutral"
                variant="text"
                onClick={(e) => {
                    e.stopPropagation();
                    setOpen(true);
                }}
            >
                {colsIcon || <GearIcon />}
            </IconButton>
            <Popover
                anchor={btn.current}
                open={open}
                onClose={() => setOpen(false)}
                zIndex="20"
                minWidth="xs"
            >
                <List
                    items={cols
                        .map((col) => {
                            if (col.hidable === false) return null;

                            return {
                                key: col.key,
                                label: col.label,
                                icon: hidden.has(col.key) ? props.showIcon || "➕" : props.hideIcon || "➖",
                            };
                        })
                        .filter((item) => !!item)}
                    onItemClick={(item) => {
                        props.onChange?.(item.key, hidden.has(item.key));
                    }}
                />
            </Popover>
        </>
    );
};
