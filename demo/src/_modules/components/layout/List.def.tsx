// auto generated by script 'demo-prepare'

import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./List.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "List.tsx", path: "components/layout/List.tsx", demos: demos || [] };

export default mod;