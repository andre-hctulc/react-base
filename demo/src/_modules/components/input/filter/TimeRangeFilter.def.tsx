import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./TimeRangeFilter.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "TimeRangeFilter.tsx", path: "components/input/filter/TimeRangeFilter.tsx", demos: demos || [] };

export default mod;
