// auto generated by script 'demo-prepare'

import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./ErrorsCollector.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "ErrorsCollector.tsx", path: "components/alerts/ErrorsCollector.tsx", demos: demos || [] };

export default mod;