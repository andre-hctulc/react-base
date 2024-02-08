/* eslint-disable react-refresh/only-export-components */

import { DemoDef, DemoProps } from "src/types";
import Stack from "@/src/components/layout/Stack";

const boxColors = ["red", "green", "blue", "yellow"];

function StackDemo({ demoProps }: DemoProps) {
    return (
        <Stack className="m-4 p-3 border border-highlight" style={{ height: 300 }} {...demoProps}>
            {boxColors.map((color, i) => (
                <div key={color} style={{ backgroundColor: color, height: 40, width: 40 }} className="m-3 flex-shrink-0">
                    {i + 1}
                </div>
            ))}
        </Stack>
    );
}

const def: DemoDef = {
    name: "default",
    render: StackDemo,
    demoProps: [
        { propName: "direction", type: "string", listValues: ["row", "col"] },
        { propName: "align", type: "string", listValues: ["start", "end", "center"] },
        { propName: "justify", type: "string", listValues: ["start", "end", "center"] },
        { propName: "reverse", type: "boolean" },
    ],
};

export default def;
