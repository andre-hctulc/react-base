// auto generated by script 'demo-prepare'

import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./Droppable.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "Droppable.tsx", path: "components/dnd/Droppable.tsx", demos: demos || [] };

export default mod;
