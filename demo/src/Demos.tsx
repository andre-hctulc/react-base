import Flex from "@react-base/src/components/layout/Flex";
import { StyleProps } from "@react-base/src/types";
import clsx from "clsx";
import Module from "./module/Module";
import Typography from "@react-base/src/components/text/Typography";
import { useAppContext } from "./AppContextProvider";
import { dirname } from "./helpers";
import React from "react";
import FolderOutlineIcon from "@react-base/src/components/icons/collection/FolderOutline";

interface DemosProps extends StyleProps {}

export default function Demos(props: DemosProps) {
    const { activeModules } = useAppContext();
    let preDir: string | undefined;

    return (
        <Flex style={props.style} className={clsx(props.className, "overflow-y-auto")}>
            {activeModules.map(mod => {
                const dir = dirname(mod.path);
                const dirDiffers = dir !== preDir;

                preDir = dir;

                return (
                    <React.Fragment key={mod.path}>
                        {dirDiffers && (
                            <Typography alignCenter fontWeight="normal" secondary variant="h2" className="border-b pb-1 mt-5">
                                <FolderOutlineIcon size={20} className="mr-2" /> {dir}
                            </Typography>
                        )}
                        <Module mod={mod} />
                    </React.Fragment>
                );
            })}
        </Flex>
    );
}
