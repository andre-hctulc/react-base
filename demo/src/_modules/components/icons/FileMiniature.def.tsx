import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./FileMiniature.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "FileMiniature.tsx", path: "components/icons/FileMiniature.tsx", demos: demos || [] };

export default mod;
