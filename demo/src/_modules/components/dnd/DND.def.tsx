// auto generated by script 'demo-prepare'

import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./DND.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "DND.tsx", path: "components/dnd/DND.tsx", demos: demos || [] };

export default mod;