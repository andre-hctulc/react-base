import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./GrowH.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "GrowH.tsx", path: "components/transitions/GrowH.tsx", demos: demos || [] };

export default mod;
