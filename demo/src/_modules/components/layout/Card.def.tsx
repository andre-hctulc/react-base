// auto generated by script 'demo-prepare'

import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./Card.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "Card.tsx", path: "components/layout/Card.tsx", demos: demos || [] };

export default mod;