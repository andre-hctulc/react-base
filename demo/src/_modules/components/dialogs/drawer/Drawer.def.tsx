import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./Drawer.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "Drawer.tsx", path: "components/dialogs/drawer/Drawer.tsx", demos: demos || [] };

export default mod;
