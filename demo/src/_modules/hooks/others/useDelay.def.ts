import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./useDelay.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "useDelay.ts", path: "hooks/others/useDelay.ts", demos: demos || [] };

export default mod;
