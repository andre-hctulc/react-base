import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./useRandomColor.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "useRandomColor.ts", path: "hooks/style/useRandomColor.ts", demos: demos || [] };

export default mod;