/* eslint-disable react-refresh/only-export-components */

import type { DemoDef, DemoProps } from "src/types";
import { themeColors } from "../../../helpers";

// demo_start

import Chip from "@react-base/src/components/data-display/Chip";

function ChipDemo({ demoProps }: DemoProps) {
    return (
        <Chip className="m-5" hoverEffect={demoProps.hoverEffect} variant={demoProps?.variant} color={demoProps?.color}>
            Chip
        </Chip>
    );
}

// demo_end

const def: DemoDef = {
    name: "default",
    render: ChipDemo,
    demoProps: [
        {
            propName: "color",
            type: "string",
            listValues: themeColors,
        },
        {
            propName: "variant",
            type: "string",
            listValues: ["contained", "outlined", "pale"],
        },
        {
            propName: "hoverEffect",
            type: "boolean",
        },
    ],
};

export default def;
