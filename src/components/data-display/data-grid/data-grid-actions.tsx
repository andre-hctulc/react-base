"use client";

import React from "react";
import { Popover } from "../../dialog/popover";
import { IconButton } from "../../input";
import { MoreVertIcon } from "../../icons/more-vert";

interface DataGridActions {
    moreIcon?: React.ReactNode;
    row: any;
    render?: (row: any) => React.ReactNode;
}

export const DataGridActions: React.FC<DataGridActions> = ({ row, moreIcon, render }) => {
    const [open, setOpen] = React.useState(false);
    const btn = React.useRef<HTMLButtonElement>(null);

    return (
        <>
            <IconButton
                size="sm"
                color="neutral"
                variant="text"
                onClick={(e) => {
                    e.stopPropagation();
                    setOpen(true);
                }}
                ref={btn}
            >
                {moreIcon || <MoreVertIcon />}
            </IconButton>
            <Popover
                anchor={btn.current}
                open={open}
                onClose={() => setOpen(false)}
                zIndex="10"
                position="bottom-end"
            >
                {render ? render(row) : <i className="text-2 text-sm px-4 py-2">No actions</i>}
            </Popover>
        </>
    );
};
