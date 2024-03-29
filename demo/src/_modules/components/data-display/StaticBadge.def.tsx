// auto generated by script 'demo-prepare'

import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./StaticBadge.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "StaticBadge.tsx", path: "components/data-display/StaticBadge.tsx", demos: demos || [] };

export default mod;
