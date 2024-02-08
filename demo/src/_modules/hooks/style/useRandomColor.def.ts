import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./useRandomColor.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "useRandomColor.ts", path: "hooks/style/useRandomColor.ts", demos: demos || [] };

export default mod;
