import clsx from "clsx";
import { PartialPropsOf, StyleProps } from "@/src/types";
import Stack from "@/src/components/layout/Stack";
import Search from "@/src/components/input/base/Search";
import AllIcon from "@/src/components/icons/collection/WalletOutline";
import FolderIcon from "@/src/components/icons/collection/FolderOutline";
import FileIcon from "@/src/components/icons/collection/FileOutline";
import TreeView, { TreeViewStruct } from "@/src/components/navigation/treeview/TreeView";
import TreeViewItem from "@/src/components/navigation/treeview/TreeViewItem";
import React from "react";
import { useAppContext } from "./AppContextProvider";
import { useAlerts } from "@/src/contexts/AlertsProvider";
import CheckBox from "@/src/components/input/base/CheckBox";
import Tooltip from "@/src/components/dialogs/popover/Tooltip";

interface AppMenuProps extends StyleProps {}

const menuWidth = 250;

export default function AppMenu(props: AppMenuProps) {
    const { setFilter, previewsOnly, setPreviewsOnly, moduleNames, modules, dirs } = useAppContext();
    const { info } = useAlerts();
    const menuStruct = React.useMemo<TreeViewStruct>(() => {
        const struct: TreeViewStruct = {};

        for (const mod of modules) {
            const pathSegments = mod.path.split("/");
            if (pathSegments[0] === ".") pathSegments.shift();

            let subStruct = struct;
            let subPath = "";

            for (const seg of pathSegments) {
                subPath += subPath ? "/" + seg : seg;

                if (!subStruct[seg]) {
                    subStruct[seg] = {
                        props: itemProps(subPath),
                    };
                    subStruct = subStruct[seg].children = {};
                } else subStruct = subStruct[seg].children || {};
            }

            function itemProps(subPath: string): PartialPropsOf<typeof TreeViewItem> {
                const isFile = subPath.includes(".");

                return {
                    onClick: () => {
                        if (isFile) setFilter(mod.name);
                        else setFilter(subPath);
                    },
                };
            }
        }
        return struct;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modules]);

    return (
        <Stack tag="nav" style={{ width: menuWidth, minWidth: menuWidth, ...props.style }} className={clsx("border-r", props.className)}>
            <Tooltip enterDelay={300} enterNextDelay={600} content="Show only modules with previews">
                <CheckBox className="m-2" value={previewsOnly} onChange={e => setPreviewsOnly(e.currentTarget.checked)} label="Previews only" />
            </Tooltip>
            <Search
                placeholder="/layout/containers, ProgressBar, ..."
                className="mx-2 mb-2"
                options={inpValue => {
                    const root = { value: "", label: "Alle", icon: <AllIcon /> };
                    if (!inpValue) return [root];
                    const _v = inpValue.toLowerCase().trim();
                    const matchedDirs = dirs.filter(dir => dir.toLowerCase().includes(_v));
                    const matchedModules = Array.from(moduleNames).filter(mod => mod.toLowerCase().includes(_v));
                    return [
                        root,
                        ...matchedDirs.map(dir => ({ value: dir, label: dir, icon: <FolderIcon /> })),
                        ...matchedModules.map(mod => ({ value: mod, label: mod, icon: <FileIcon /> })),
                    ];
                }}
                onChange={value => setFilter(value)}
            />
            <TreeView depth={1} from={menuStruct} className="flex-grow min-h-0 overflow-y-auto" />
        </Stack>
    );
}
