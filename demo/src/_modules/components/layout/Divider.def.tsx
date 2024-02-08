import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./Divider.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "Divider.tsx", path: "components/layout/Divider.tsx", demos: demos || [] };

export default mod;
