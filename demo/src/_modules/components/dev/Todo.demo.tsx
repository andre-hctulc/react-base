/* eslint-disable react-refresh/only-export-components */

import { DemoDef, DemoProps } from "src/types";

// demo_start

import React from "react";
import Button from "@react-base/src/components/input/buttons/Button";
import DevProvider from "@react-base/src/components/dev/DevProvider";
import Todo from "@react-base/src/components/dev/Todo";
import Flex from "@react-base/src/components/layout/Flex";

function DevDemo({ demoProps }: DemoProps) {
    const [devMode, setDevMode] = React.useState(false);

    return (
        /* devMode defaults to process.env.NODE_ENV === "development" without a custom `DevProvider` */
        <DevProvider devMode={devMode}>
            <Flex className="gap-4 p-4" align="start">
                <Button color="warning" variant="contained" onClick={() => setDevMode(!devMode)}>
                    {devMode ? "Deactivate dev mode" : "Activate dev mode"}
                </Button>
                <Todo style={{ width: 200 }}>Fix Bug 481</Todo>
            </Flex>
        </DevProvider>
    );
}

// demo_end

const def: DemoDef = {
    name: "default",
    render: DevDemo,
    demoProps: [],
};

export default def;
