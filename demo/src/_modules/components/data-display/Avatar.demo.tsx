/* eslint-disable react-refresh/only-export-components */

import type { DemoDef, DemoProps } from "src/types";

// demo_start

import { Avatar } from "@react-base/src/components/data-display";

function AvatarDemo({ demoProps }: DemoProps) {
    return <Avatar src="/cat2.jpg" size={demoProps?.size} className="m-5" />;
}

// demo_end

const def: DemoDef = {
    name: "default",
    render: AvatarDemo,
    demoProps: [
        {
            propName: "size",
            type: "string",
            listValues: ["xsmall", "small", "medium", "large", "xlarge"],
        },
    ],
};

export default def;
