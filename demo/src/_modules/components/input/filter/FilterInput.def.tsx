import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./FilterInput.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "FilterInput.tsx", path: "components/input/filter/FilterInput.tsx", demos: demos || [] };

export default mod;
