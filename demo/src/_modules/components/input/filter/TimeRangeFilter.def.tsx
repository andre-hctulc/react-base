import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./TimeRangeFilter.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "TimeRangeFilter.tsx", path: "components/input/filter/TimeRangeFilter.tsx", demos: demos || [] };

export default mod;
