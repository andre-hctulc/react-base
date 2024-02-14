/* eslint-disable react-refresh/only-export-components */

import type { DemoDef, DemoProps } from "src/types";

// demo_start

import IconButton from "@react-base/src/components/input/buttons/IconButton";
import Tooltip from "@react-base/src/components/dialogs/popover/Tooltip";
import UserOutlineIcon from "@react-base/src/components/icons/collection/UserOutline";

function TooltipDemo({ demoProps }: DemoProps) {
    return (
        <div className="p-20 flex flex-wrap">
            <Tooltip content="Edit profile" enterNextDelay={demoProps?.enterNextDelay} enterDelay={demoProps?.enterDelay} inactive={demoProps?.inactive}>
                <IconButton variant="contained">
                    <UserOutlineIcon />
                </IconButton>
            </Tooltip>
        </div>
    );
}

// demo_end

const def: DemoDef = {
    name: "default",
    render: TooltipDemo,
    demoProps: [
        { propName: "enterDelay", type: "number", helperText: "Milliseconds" },
        { propName: "enterNextDelay", type: "number", helperText: "Milliseconds" },
        { propName: "inactive", type: "boolean" },
    ],
};

export default def;
