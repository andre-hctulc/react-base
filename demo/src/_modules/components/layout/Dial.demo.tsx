/* eslint-disable react-refresh/only-export-components */

import type { DemoDef, DemoProps } from "src/types";

// demo_start

import clsx from "clsx";
import { Dial, DialItemProps } from "@react-base/src/components/layout";
import { useRange } from "@react-base/src/hooks";
import { Typography } from "@react-base/src/components";

function Item(props: DialItemProps & { children?: number }) {
    return (
        /* Forward dial item props */
        <div onClick={props.onClick} className={clsx("rounded bg-bg-paper flex-shrink-0", props.className)} style={props.style}>
            <span>Scale: {props.scale}</span>
            <br />
            <span>Distance: {props.dist}</span>
            <Typography fontSize={20} fontWeight={"bold"}>
                {props.children}
            </Typography>
        </div>
    );
}

function DialDemo({ demoProps }: DemoProps) {
    const range = useRange(30);

    return (
        <Dial
            maxItemShrink={demoProps?.maxItemShrink}
            maxShrinkDist={demoProps?.maxShrinkDist}
            spacing={demoProps?.spacing}
            forwardDist
            forwardScale
            itemSize={{ width: 200, height: 200 }}
            className="mx-5 my-20"
            align={demoProps?.align}
        >
            {range.map(i => (
                <Item key={i}>{i}</Item>
            ))}
        </Dial>
    );
}

// demo_end

const def: DemoDef = {
    name: "default",
    render: DialDemo,
    demoProps: [
        {
            propName: "maxItemShrink",
            type: "number",
            range: [0, 1],
        },
        {
            propName: "maxShrinkDist",
            type: "number",
        },
        {
            propName: "align",
            type: "string",
            listValues: ["start", "center", "end"],
        },
        {
            propName: "spacing",
            type: "string",
            listValues: ["small", "medium", "large"],
        },
    ],
};

export default def;
