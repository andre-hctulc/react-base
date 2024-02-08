import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./index.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "index.ts", path: "index.ts", demos: demos || [] };

export default mod;
