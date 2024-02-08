import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./TimeRangeInput.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "TimeRangeInput.tsx", path: "components/input/base/TimeRangeInput.tsx", demos: demos || [] };

export default mod;
