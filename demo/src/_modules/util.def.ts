import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./util.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "util.ts", path: "util.ts", demos: demos || [] };

export default mod;
