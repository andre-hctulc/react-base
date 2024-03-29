// auto generated by script 'demo-prepare'

import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./LinkContainer.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "LinkContainer.tsx", path: "components/navigation/LinkContainer.tsx", demos: demos || [] };

export default mod;
