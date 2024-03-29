// auto generated by script 'demo-prepare'

import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./Typography.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "Typography.tsx", path: "components/text/Typography.tsx", demos: demos || [] };

export default mod;
