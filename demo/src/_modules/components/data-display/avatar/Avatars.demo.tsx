/* eslint-disable react-refresh/only-export-components */

import type { DemoDef, DemoProps } from "src/types";

// demo_start

import Avatars from "@react-base/src/components/data-display/avatar/Avatars";
import Avatar from "@react-base/src/components/data-display/avatar/Avatar";
import useRange from "@react-base/src/hooks/iterable/useRange";

function AvatarsDemo({ demoProps }: DemoProps) {
    const range = useRange(5);
    return (
        <Avatars justify={demoProps?.justify} size={demoProps?.size} className="m-5">
            {range.map(i => (
                <Avatar key={i} src={`/cat${i}.jpg`} />
            ))}
        </Avatars>
    );
}

// demo_end

const def: DemoDef = {
    name: "default",
    render: AvatarsDemo,
    demoProps: [
        {
            propName: "size",
            type: "string",
            listValues: ["xsmall", "small", "medium", "large", "xlarge"],
        },
        {
            propName: "justify",
            type: "string",
            listValues: ["start", "center", "end"],
        },
    ],
};

export default def;