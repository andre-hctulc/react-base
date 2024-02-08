import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./FilterInput.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "FilterInput.tsx", path: "components/input/filter/FilterInput.tsx", demos: demos || [] };

export default mod;
