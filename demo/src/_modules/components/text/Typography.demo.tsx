/* eslint-disable react-refresh/only-export-components */

import { DemoDef, DemoProps } from "src/types";

// demo_start

import Typography from "@react-base/src/components/text/Typography";

function SelectDemo({ demoProps }: DemoProps) {
    return (
        <Typography
            className="p-2"
            secondary={demoProps?.secondary}
            disabled={demoProps?.disabled}
            truncate={demoProps?.truncate}
            long={demoProps?.long}
            variant={demoProps?.variant}
        >
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At
            vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
            amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua
        </Typography>
    );
}

// demo_end

const def: DemoDef = {
    name: "default",
    render: SelectDemo,
    demoProps: [
        { propName: "variant", type: "string", listValues: ["body1", "body2", "h1", "h2", "h3", "h4", "h5", "h6", "subtitle1", "subtitle2", "caption"] },
        { propName: "secondary", type: "boolean" },
        { propName: "disabled", type: "boolean" },
        { propName: "truncate", type: "boolean" },
        { propName: "long", type: "boolean" },
    ],
};

export default def;
