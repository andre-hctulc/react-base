import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./SelectFilter.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "SelectFilter.tsx", path: "components/input/filter/SelectFilter.tsx", demos: demos || [] };

export default mod;
