// auto generated by script 'demo-prepare'

import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./TreeView.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "TreeView.tsx", path: "components/navigation/TreeView.tsx", demos: demos || [] };

export default mod;
