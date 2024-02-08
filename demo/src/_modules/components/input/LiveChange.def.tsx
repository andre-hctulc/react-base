import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./LiveChange.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "LiveChange.tsx", path: "components/input/LiveChange.tsx", demos: demos || [] };

export default mod;
