/* eslint-disable react-refresh/only-export-components */

import { DemoDef, DemoProps } from "src/types";

// demo_start

import React from "react";
import Flex from "@react-base/src/components/layout/Flex";
import Select, { SelectOption } from "@react-base/src/components/input/base/Select";

const names = ["New York", "Ottawa", "Katovice"];
const options: SelectOption[] = names.map(name => ({ label: name, value: name }));

function SelectDemo({ demoProps }: DemoProps) {
    const [value, setValue] = React.useState<string>();

    return (
        <Flex className="gap-2 p-6">
            <Select
                label="Ort auswählen"
                options={options}
                style={{ width: 200 }}
                placeholder={demoProps?.placeholder}
                dense={demoProps?.dense}
                helperText={demoProps?.helperText}
                onChange={value => setValue(value)}
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
    render: SelectDemo,
    demoProps: [
        { propName: "helperText", type: "string" },
        { propName: "placeholder", type: "string" },
        { propName: "dense", type: "boolean" },
    ],
};

export default def;
