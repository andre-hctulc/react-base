"use client";

import React, { useMemo } from "react";
import { Card, CardBody } from "../../containers";
import { Popover } from "../../dialog/popover";
import { IconButton, Select, type SelectOption } from "../../input";
import { GearIcon } from "../../icons/gear";
import { Subtitle } from "../../text";
import type { DataGridColDef } from "./types";

interface DataGridSettingsProps {
    icon?: React.ReactNode;
    hiddenCols: string[];
    cols: DataGridColDef<any>[];
    onChange?: (hiddenCols: string[]) => void;
}

export const DataGridSettings: React.FC<DataGridSettingsProps> = ({ icon, cols, hiddenCols, onChange }) => {
    const btn = React.useRef<HTMLButtonElement>(null);
    const [open, setOpen] = React.useState(false);
    const colOptions = useMemo<SelectOption[]>(() => {
        return cols
            .filter((col) => col.hidable !== false)
            .map<SelectOption>((col) => ({ label: col.label, value: col.path, data: col }));
    }, [cols]);
    const shownCols = useMemo<string[]>(() => {
        const hiddenSet = new Set(hiddenCols);
        return cols.filter((col) => !hiddenSet.has(col.path)).map((col) => col.path);
    }, [cols, hiddenCols]);

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
                {icon || <GearIcon />}
            </IconButton>
            <Popover
                anchor={btn.current}
                open={open}
                onClose={() => {
                    setOpen(false);
                }}
                zIndex="20"
                position="left-start"
            >
                <Card
                    width="sm"
                    onClick={(e) => {
                        console.log("test");
                    }}
                >
                    <CardBody>
                        <Subtitle mb="sm" variant="h3">
                            Columns
                        </Subtitle>
                        <Select
                            placeholder="Select columns to show"
                            multiple
                            options={colOptions}
                            choiceValues={shownCols}
                            onChange={({ value }) => {
                                const shownSet = new Set(value.map((col) => col.value));
                                onChange?.(
                                    cols
                                        .filter((col) => !shownSet.has(col.path) && col.hidable !== false)
                                        .map((col) => col.path)
                                );
                            }}
                        />
                    </CardBody>
                </Card>
            </Popover>
        </>
    );
};
