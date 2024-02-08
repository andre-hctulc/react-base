import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./Transition.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "Transition.tsx", path: "components/transitions/Transition.tsx", demos: demos || [] };

export default mod;
