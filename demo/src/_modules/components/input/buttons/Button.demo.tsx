/* eslint-disable react-refresh/only-export-components */

import type { DemoDef, DemoProps } from "src/types";
import { themeColors } from "../../../../helpers";

// demo_start

import { Button } from "@react-base/src/components";
import { useAlerts } from "@react-base/src/hooks";

function ButtonDemo({ demoProps }: DemoProps) {
    const { info } = useAlerts();

    return (
        <Button
            color={demoProps?.color}
            variant={demoProps?.variant}
            size={demoProps?.size}
            onClick={() => info("Button clicked")}
            className="m-4"
            {...demoProps}
        >
            Click Me!
        </Button>
    );
}

// demo_end

const def: DemoDef = {
    name: "default",
    render: ButtonDemo,
    demoProps: [
        { propName: "variant", type: "string", listValues: ["contained", "text", "outlined"] },
        { propName: "size", type: "string", listValues: ["small", "medium", "large"] },
        { propName: "color", type: "string", listValues: themeColors },
    ],
};

export default def;
