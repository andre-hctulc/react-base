// auto generated by script 'demo-prepare'

import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./FormControl.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "FormControl.tsx", path: "components/inputs/FormControl.tsx", demos: demos || [] };

export default mod;