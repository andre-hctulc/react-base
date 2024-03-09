/* eslint-disable react-refresh/only-export-components */

import type { DemoDef, DemoProps } from "src/types";

// demo_start

import Avatar from "@react-base/src/components/data-display/avatars/Avatar";
import { Badge } from "@react-base/src/components";

function AvatarDemo({ demoProps }: DemoProps) {
    return (
        <Badge className="m-5">
            <Avatar src="/cat3.jpg" size={demoProps?.size} />
        </Badge>
    );
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
