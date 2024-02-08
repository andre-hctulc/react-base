import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./Stack.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "Stack.tsx", path: "components/layout/Stack.tsx", demos: demos || [] };

export default mod;
