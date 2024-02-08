import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./GrowH.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "GrowH.tsx", path: "components/transitions/GrowH.tsx", demos: demos || [] };

export default mod;
