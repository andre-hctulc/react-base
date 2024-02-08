import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./Help.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "Help.tsx", path: "components/dialogs/drawer/Help.tsx", demos: demos || [] };

export default mod;
