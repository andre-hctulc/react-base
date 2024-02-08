import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./AlertsProvider.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "AlertsProvider.tsx", path: "contexts/AlertsProvider.tsx", demos: demos || [] };

export default mod;
