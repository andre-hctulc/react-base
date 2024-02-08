import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./DevProvider.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "DevProvider.tsx", path: "contexts/DevProvider.tsx", demos: demos || [] };

export default mod;
