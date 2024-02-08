import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./useRange.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "useRange.tsx", path: "hooks/others/useRange.tsx", demos: demos || [] };

export default mod;
