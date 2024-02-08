import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./SelectFilter.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "SelectFilter.tsx", path: "components/input/filter/SelectFilter.tsx", demos: demos || [] };

export default mod;
