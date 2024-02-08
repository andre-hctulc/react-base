import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./TimeInput.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "TimeInput.tsx", path: "components/input/base/TimeInput.tsx", demos: demos || [] };

export default mod;
