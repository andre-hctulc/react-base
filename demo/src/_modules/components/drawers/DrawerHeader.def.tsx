// auto generated by script 'demo-prepare'

import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./DrawerHeader.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "DrawerHeader.tsx", path: "components/drawers/DrawerHeader.tsx", demos: demos || [] };

export default mod;
