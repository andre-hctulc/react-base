// auto generated by script 'demo-prepare'

import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./IconButton.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "IconButton.tsx", path: "components/buttons/IconButton.tsx", demos: demos || [] };

export default mod;
