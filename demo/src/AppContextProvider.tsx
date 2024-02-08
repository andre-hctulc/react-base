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
    activeModules: Set<string>;
    dirs: string[];
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
    const sortedModules = React.useMemo(() => modules.filter(mod => !previewsOnly || !!mod.demos.length).sort((a, b) => a.path.localeCompare(b.path)), [previewsOnly]);
    const moduleNames = React.useMemo(() => sortedModules.map(d => d.name), [sortedModules]);
    const moduleNamesSet = React.useMemo(() => new Set(moduleNames), [moduleNames]);
    const dirs = React.useMemo(
        () =>
            Array.from(new Set(sortedModules.map(d => dirname(d.path))))
                .filter(dir => dir !== ".")
                .sort(),
        [sortedModules]
    );
    const activeModules = React.useMemo(() => {
        let compsArr: string[];
        if (!filter) compsArr = moduleNames;
        const fil = filter.toLowerCase();
        compsArr = sortedModules.filter(mod => mod.path.toLowerCase().startsWith(fil) || mod.name.toLowerCase() === fil).map(mod => mod.name);
        return new Set(compsArr);
    }, [filter, moduleNames, sortedModules]);

    return (
        <AppContext.Provider
            value={{
                dirs,
                previewsOnly,
                setPreviewsOnly,
                filter,
                setFilter,
                modules: sortedModules,
                moduleNames: moduleNames,
                moduleNamesSet,
                activeModules: activeModules,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
}
