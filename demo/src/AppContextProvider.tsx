/* eslint-disable react-refresh/only-export-components */

import React from "react";
import modules from "./modules";
import { useLocalStorage } from "usehooks-ts";
import { ModuleDef } from "./types";
import { dirname } from "./helpers";

interface AppContext {
    filter: string;
    setFilter: (f: string) => void;
    modules: ModuleDef[];
    moduleNames: string[];
    moduleNamesSet: Set<string>;
    activeModules: ModuleDef[];
    dirs: string[];
    dirsSet: Set<string>;
    previewsOnly: boolean;
    setPreviewsOnly: (previewsOnly: boolean) => void;
}

export const AppContext = React.createContext<AppContext | null>(null);

export function useAppContext() {
    const ctx = React.useContext(AppContext);
    if (!ctx) throw new Error("`AppContext` required");
    return ctx;
}

export default function AppContextProvider(props: { children: React.ReactNode }) {
    const [previewsOnly, setPreviewsOnly] = useLocalStorage("only-with-previews", false);
    const [filter, setFilter] = useLocalStorage("active-modules", "");
    const filteredModules = React.useMemo(() => modules.filter(mod => !previewsOnly || !!mod.demos.length), [previewsOnly]);
    const moduleNames = React.useMemo(() => filteredModules.map(d => d.name), [filteredModules]);
    const moduleNamesSet = React.useMemo(() => new Set(moduleNames), [moduleNames]);
    const dirs = React.useMemo(
        () =>
            Array.from(new Set(filteredModules.map(d => dirname(d.path))))
                .filter(dir => dir !== ".")
                .sort(),
        [filteredModules]
    );
    const dirsSet = React.useMemo(() => new Set(dirs), [dirs]);
    const activeModules = React.useMemo(() => {
        let compsArr: string[];
        if (!filter) compsArr = moduleNames;
        const fil = !filter || filter === "_all" ? "" : filter.toLowerCase();
        return filteredModules.filter(mod => mod.path.toLowerCase().startsWith(fil) || mod.name.toLowerCase() === fil);
    }, [filter, moduleNames, filteredModules]);

    return (
        <AppContext.Provider
            value={{
                dirs,
                dirsSet,
                previewsOnly,
                setPreviewsOnly,
                filter,
                setFilter,
                modules: filteredModules,
                moduleNames: moduleNames,
                moduleNamesSet,
                activeModules: activeModules,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
}
