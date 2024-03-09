/* eslint-disable react-refresh/only-export-components */

import { DemoDef, DemoProps } from "src/types";

// demo_start

import React from "react";
import Input from "@react-base/src/components/input/base/Input";
import { Flex } from "@react-base/src/components";

function InputDemo({ demoProps }: DemoProps) {
    const [value, setValue] = React.useState<string>();

    return (
        <Flex className="gap-2 p-6">
            <Input
                style={{ width: 200 }}
                placeholder={demoProps?.placeholder}
                dense={demoProps?.dense}
                label={demoProps?.label}
                helperText={demoProps?.helperText}
                onChange={e => setValue(e.target.value)}
            />
            {value && (
                <p>
                    <i>current value:</i> {value}
                </p>
            )}
        </Flex>
    );
}

// demo_end

const def: DemoDef = {
    name: "default",
    render: InputDemo,
    demoProps: [
        { propName: "label", type: "string" },
        { propName: "helperText", type: "string" },
        { propName: "placeholder", type: "string" },
        { propName: "dense", type: "boolean" },
    ],
};

export default def;
