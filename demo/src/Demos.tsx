import Stack from "@/src/components/layout/Stack";
import { StyleProps } from "@/src/types";
import clsx from "clsx";
import Module from "./module/Module";
import Typography from "@/src/components/text/Typography";
import { useAppContext } from "./AppContextProvider";
import { dirname } from "./helpers";
import React from "react";

interface DemosProps extends StyleProps {}

export default function Demos(props: DemosProps) {
    const { modules, filter, activeModules } = useAppContext();
    let preDir: string | undefined;
    const _activerModules = React.useMemo(() => modules.filter(mod => activeModules.has(mod.name)), [modules, activeModules]);

    return (
        <Stack style={props.style} className={clsx(props.className, "overflow-y-auto")}>
            {_activerModules.map(mod => {
                const dir = dirname(mod.path);
                const dirDiffers = dir !== preDir;

                preDir = dir;

                return (
                    <React.Fragment key={mod.path}>
                        {dirDiffers && (
                            <Typography fontWeight="normal" secondary variant="h2" className="border-b pb-1 mt-5">
                                {dir}
                            </Typography>
                        )}
                        <Module mod={mod} />
                    </React.Fragment>
                );
            })}
        </Stack>
    );
}
