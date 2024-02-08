import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./AlertsProvider.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "AlertsProvider.tsx", path: "contexts/AlertsProvider.tsx", demos: demos || [] };

export default mod;
