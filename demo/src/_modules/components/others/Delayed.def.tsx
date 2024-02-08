import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./Delayed.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "Delayed.tsx", path: "components/others/Delayed.tsx", demos: demos || [] };

export default mod;
