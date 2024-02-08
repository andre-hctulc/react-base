import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./BreakpointsProvider.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "BreakpointsProvider.tsx", path: "contexts/BreakpointsProvider.tsx", demos: demos || [] };

export default mod;
