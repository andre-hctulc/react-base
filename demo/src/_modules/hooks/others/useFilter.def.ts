import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./useFilter.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "useFilter.ts", path: "hooks/others/useFilter.ts", demos: demos || [] };

export default mod;
