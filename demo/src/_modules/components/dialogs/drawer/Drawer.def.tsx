import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = Object.values(import.meta.glob("./Drawer.demo*.tsx", { import: "default", eager: true }));

const mod: ModuleDef = { name: "Drawer.tsx", path: "components/dialogs/drawer/Drawer.tsx", demos: demos || [] };

export default mod;
