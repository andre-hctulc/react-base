import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./useProgressAlert.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "useProgressAlert.tsx", path: "hooks/progress/useProgressAlert.tsx", demos: demos || [] };

export default mod;