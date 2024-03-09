/* eslint-disable react-refresh/only-export-components */

import type { DemoDef, DemoProps } from "src/types";

// demo_start

import Alert from "@react-base/src/components/feedback/alerts/Alert";
import { AlertTitle } from "@react-base/src/components";

function AlertDemo({ demoProps }: DemoProps) {
    return (
        <Alert style={{ maxWidth: 500 }} className="m-5" severity={demoProps?.severity}>
            <AlertTitle>{demoProps?.title}</AlertTitle>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
            sed diam voluptua.
        </Alert>
    );
}

// demo_end

const def: DemoDef = {
    name: "default",
    render: AlertDemo,
    demoProps: [
        {
            propName: "severity",
            type: "string",
            listValues: ["info", "success", "warning", "error"],
        },
        {
            propName: "title",
            type: "string",
        },
    ],
};

export default def;
