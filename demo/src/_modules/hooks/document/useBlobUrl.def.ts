// auto generated by script 'demo-prepare'

import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./useBlobUrl.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "useBlobUrl.ts", path: "hooks/document/useBlobUrl.ts", demos: demos || [] };

export default mod;