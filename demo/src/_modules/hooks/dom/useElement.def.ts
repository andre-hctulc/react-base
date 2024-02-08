import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./useElement.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "useElement.ts", path: "hooks/dom/useElement.ts", demos: demos || [] };

export default mod;
