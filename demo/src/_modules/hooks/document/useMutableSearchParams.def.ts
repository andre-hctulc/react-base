// auto generated by script 'demo-prepare'

import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./useMutableSearchParams.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "useMutableSearchParams.ts", path: "hooks/document/useMutableSearchParams.ts", demos: demos || [] };

export default mod;
