/* eslint-disable react-refresh/only-export-components */

import type { DemoDef, DemoProps } from "src/types";

// demo_start

import Button from "@react-base/src/components/input/buttons/Button";
import React from "react";
import Popover from "@react-base/src/components/dialogs/popover/Popover";

function PopoverDemo({ demoProps }: DemoProps) {
    const [open, setOpen] = React.useState(false);
    const anchor = React.useRef<HTMLButtonElement>(null);

    return (
        <div className="p-20 flex flex-wrap">
            <Popover
                anchor={anchor.current}
                open={open}
                position={{ horizontal: demoProps?.horizontal, vertical: demoProps?.vertical }}
                onClose={() => setOpen(false)}
                {...demoProps}
            >
                Popover Content
            </Popover>
            <Button variant="outlined" ref={anchor} onClick={() => setOpen(!open)}>
                Open{demoProps?.disablePointerEvents && "/Close"} Popover
            </Button>
        </div>
    );
}

// demo_end

const def: DemoDef = {
    name: "default",
    render: PopoverDemo,
    demoProps: [
        {
            propName: "horizontal",
            helperText: "position.horizontal",
            type: "string",
            listValues: ["left", "start", "right", "end", "center"],
        },
        { propName: "vertical", helperText: "position.vertical", type: "string", listValues: ["top", "start", "bottom", "end", "center"] },
        { propName: "disablePointerEvents", type: "boolean" },
    ],
};

export default def;
