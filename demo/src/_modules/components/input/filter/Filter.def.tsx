import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./Filter.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "Filter.tsx", path: "components/input/filter/Filter.tsx", demos: demos || [] };

export default mod;
