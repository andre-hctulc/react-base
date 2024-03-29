// auto generated by script 'demo-prepare'

import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./Progress.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "Progress.tsx", path: "components/feedback/Progress.tsx", demos: demos || [] };

export default mod;
