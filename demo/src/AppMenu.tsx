import clsx from "clsx";
import type { PartialPropsOf, StyleProps } from "@react-base/src/types";
import { CheckBox, Flex, Search, Tooltip, TreeView, TreeViewItem, TreeViewStruct } from "@react-base/src/components";
import AllIcon from "@react-base/src/components/icons/collection/WalletOutline";
import FolderIcon from "@react-base/src/components/icons/collection/FolderOutline";
import FileIcon from "@react-base/src/components/icons/collection/FileOutline";
import React from "react";
import { useAppContext } from "./AppContextProvider";
import { ModuleDef } from "./types";
import { SelectOption } from "@react-base/src/components/inputs/Select";

interface AppMenuProps extends StyleProps {}

const menuWidth = 250;

export default function AppMenu(props: AppMenuProps) {
    const { setFilter, previewsOnly, setPreviewsOnly, filter, modules, dirs, dirsSet } = useAppContext();
    const allOptions = React.useMemo<SelectOption[]>(
        () => [
            { value: "_all", label: "All", icon: <AllIcon /> },
            // dirs
            ...dirs.map(dir => ({ value: dir, label: dir, icon: <FolderIcon /> })),
            // files
            ...modules.map(mod => ({ value: mod.name, label: mod.name, icon: <FileIcon /> })),
        ],
        [dirs, modules]
    );
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
                        props: itemProps(mod, subPath),
                    };
                    subStruct = subStruct[seg].children = {};
                } else subStruct = subStruct[seg].children || {};
            }

            function itemProps(mod: ModuleDef, subPath: string): PartialPropsOf<typeof TreeViewItem> {
                const isModule = subPath.includes(".");
                const canActivate = dirsSet.has(subPath) || isModule;
                const active = filter === subPath || (filter === mod.name && isModule);

                return {
                    onClick: canActivate
                        ? () => {
                              if (isModule) setFilter(mod.name);
                              else setFilter(subPath);
                          }
                        : undefined,
                    active,
                };
            }
        }
        return struct;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modules, dirsSet, filter]);

    return (
        <Flex tag="nav" style={{ width: menuWidth, minWidth: menuWidth, ...props.style }} className={clsx("border-r", props.className)}>
            <Tooltip enterDelay={300} enterNextDelay={600} content="Show only modules with previews">
                <CheckBox className="m-2" value={previewsOnly} onChange={e => setPreviewsOnly(e.currentTarget.checked)} label="Previews only" />
            </Tooltip>
            <Search
                placeholder="/layout/containers, ProgressBar, ..."
                className="mx-2 mb-2"
                options={inpValue => {
                    // only show "All" option
                    if (!inpValue) return allOptions.length ? [allOptions[0]] : [];
                    // filtered
                    else return allOptions.filter(opt => opt.value.toLowerCase().includes(inpValue.toLowerCase())) as SelectOption[];
                }}
                value={filter}
                onChange={value => {
                    setFilter(value);
                }}
                defaultOptions={allOptions}
            />
            <TreeView depth={1} from={menuStruct} className="flex-grow min-h-0 overflow-y-auto" />
        </Flex>
    );
}
