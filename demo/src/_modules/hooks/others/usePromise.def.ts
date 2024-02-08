import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./usePromise.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "usePromise.ts", path: "hooks/others/usePromise.ts", demos: demos || [] };

export default mod;
