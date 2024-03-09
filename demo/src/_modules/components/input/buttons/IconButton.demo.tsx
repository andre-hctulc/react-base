/* eslint-disable react-refresh/only-export-components */

import type { DemoDef, DemoProps } from "src/types";

// demo_start

import IconButton from "@react-base/src/components/input/buttons/IconButton";
import BellAlertIcon from "@react-base/src/components/icons/collection/BellAlert";
import { useAlerts } from "@react-base/src/hooks";

function IconButtonDemo({ demoProps }: DemoProps) {
    const { success } = useAlerts();

    return (
        <IconButton variant={demoProps?.variant} size={demoProps?.size} onClick={() => success("IconButton clicked")} className="m-4" {...demoProps}>
            <BellAlertIcon />
        </IconButton>
    );
}

// demo_end

const def: DemoDef = {
    name: "default",
    render: IconButtonDemo,
    demoProps: [
        { propName: "variant", type: "string", listValues: ["contained", "outlined"] },
        { propName: "size", type: "string", listValues: ["small", "medium", "large"] },
    ],
};

export default def;
