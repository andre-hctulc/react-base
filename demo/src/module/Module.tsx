import Typography from "@/src/components/text/Typography";
import { StyleProps } from "@/src/types";
import Stack from "@/src/components/layout/Stack";
import { ModuleDef } from "src/types";
import ModuleDemo from "./ModuleDemo";
import Code from "../Code";
import Chip from "@/src/components/data-display/Chip";
import React from "react";
import ChevronUpIcon from "@/src/components/icons/collection/ChevronUp";
import Placeholder from "@/src/components/data-display/feedback/Placeholder";

interface ModuleProps extends StyleProps {
    mod: ModuleDef;
}

export default function Module({ mod, ...props }: ModuleProps) {
    const sourceCode = "/code/" + mod.path;
    const [showCode, setShowCode] = React.useState(false);

    return (
        <Stack className={props.className} style={props.style}>
            <Typography variant="h2" underline fontWeight={"normal"}>
                {mod.name}
            </Typography>
            <Chip className="self-start mt-1" onClick={() => setShowCode(!showCode)} endIcon={<ChevronUpIcon rotate={showCode ? 0 : 180} />}>
                Code
            </Chip>
            {showCode && <Code className="rounded border px-3 py-2 mt-3" style={{ maxHeight: 700 }} path={sourceCode} />}
            {mod.demos.length ? (
                mod.demos.map(demo => {
                    return <ModuleDemo className="mt-5" path={mod.path} key={demo.name} demo={demo} />;
                })
            ) : (
                <Placeholder py>No Demos defined</Placeholder>
            )}
        </Stack>
    );
}
