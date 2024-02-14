/* eslint-disable react-refresh/only-export-components */

import type { DemoDef, DemoProps } from "src/types";

// demo_start

import Flex from "@react-base/src/components/layout/Flex";

const boxColors = ["red", "green", "blue", "yellow"];

function FlexDemo({ demoProps }: DemoProps) {
    return (
        <Flex className="m-4 p-3 border border-highlight" style={{ height: 300 }} {...demoProps}>
            {boxColors.map((color, i) => (
                <div key={color} style={{ backgroundColor: color, height: 40, width: 40 }} className="m-3 flex-shrink-0">
                    {i + 1}
                </div>
            ))}
        </Flex>
    );
}

// demo_end

const def: DemoDef = {
    name: "default",
    render: FlexDemo,
    demoProps: [
        { propName: "direction", type: "string", listValues: ["row", "col"] },
        { propName: "align", type: "string", listValues: ["start", "end", "center"] },
        { propName: "justify", type: "string", listValues: ["start", "end", "center"] },
        { propName: "reverse", type: "boolean" },
    ],
};

export default def;
