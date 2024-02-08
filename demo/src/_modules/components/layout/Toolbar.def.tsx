import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./Toolbar.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "Toolbar.tsx", path: "components/layout/Toolbar.tsx", demos: demos || [] };

export default mod;
