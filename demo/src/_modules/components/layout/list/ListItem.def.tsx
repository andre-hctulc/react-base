// auto generated by script 'demo-prepare'

import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./ListItem.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "ListItem.tsx", path: "components/layout/list/ListItem.tsx", demos: demos || [] };

export default mod;