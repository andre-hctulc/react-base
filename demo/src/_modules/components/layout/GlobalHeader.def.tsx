import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./GlobalHeader.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "GlobalHeader.tsx", path: "components/layout/GlobalHeader.tsx", demos: demos || [] };

export default mod;
