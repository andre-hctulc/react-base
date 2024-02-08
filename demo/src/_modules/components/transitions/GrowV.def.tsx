import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./GrowV.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "GrowV.tsx", path: "components/transitions/GrowV.tsx", demos: demos || [] };

export default mod;
