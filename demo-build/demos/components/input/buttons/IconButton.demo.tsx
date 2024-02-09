/* eslint-disable react-refresh/only-export-components */

import { DemoDef, DemoProps } from "src/types";
import BellAlert from "@/src/components/icons/collection/BellAlert";
import { useAlerts } from "@/src/contexts/AlertsProvider";
import IconButton from "@/src/components/input/buttons/IconButton";

function IconButtonDemo({ demoProps }: DemoProps) {
    const { info } = useAlerts();

    return (
        <IconButton variant={demoProps?.variant} size={demoProps?.size} onClick={() => info("IconButton clicked")} className="m-4" {...demoProps}>
            <BellAlert />
        </IconButton>
    );
}

const def: DemoDef = {
    name: "default",
    render: IconButtonDemo,
    demoProps: [
        { propName: "variant", type: "string", listValues: ["contained", "outlined"] },
        { propName: "size", type: "string", listValues: ["small", "medium", "large"] },
    ],
};

export default def;
