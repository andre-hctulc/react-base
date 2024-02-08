import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./DevProvider.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "DevProvider.tsx", path: "contexts/DevProvider.tsx", demos: demos || [] };

export default mod;
