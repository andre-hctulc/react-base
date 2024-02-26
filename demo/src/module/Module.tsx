import Typography from "@react-base/src/components/text/Typography";
import { StyleProps } from "@react-base/src/types";
import Flex from "@react-base/src/components/layout/Flex";
import { ModuleDef } from "src/types";
import ModulePreview from "./ModulePreview";
import Code from "../Code";
import Chip from "@react-base/src/components/data-display/Chip";
import React from "react";
import ChevronUpIcon from "@react-base/src/components/icons/collection/ChevronUp";
import Placeholder from "@react-base/src/components/feedback/Placeholder";

interface ModuleProps extends StyleProps {
    mod: ModuleDef;
}

export default function Module({ mod, ...props }: ModuleProps) {
    const sourceCode = "src/" + mod.path;
    const [showCode, setShowCode] = React.useState(false);

    return (
        <Flex className={props.className} style={props.style}>
            <Typography alignCenter variant="h2" underline fontWeight={"normal"}>
                {mod.name}
            </Typography>
            <Chip className="self-start mt-1" onClick={() => setShowCode(!showCode)} endIcon={<ChevronUpIcon rotate={showCode ? 0 : 180} />}>
                Code
            </Chip>
            {showCode && <Code className="rounded border px-3 py-2 mt-3" style={{ maxHeight: 700 }} path={sourceCode} />}
            {mod.demos.length ? (
                mod.demos.map(demo => {
                    return <ModulePreview className="mt-5" path={mod.path} key={demo.name} demo={demo} />;
                })
            ) : (
                <Placeholder py>No Demos defined</Placeholder>
            )}
        </Flex>
    );
}
