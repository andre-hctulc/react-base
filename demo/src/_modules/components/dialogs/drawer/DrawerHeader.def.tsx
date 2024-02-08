import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./DrawerHeader.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "DrawerHeader.tsx", path: "components/dialogs/drawer/DrawerHeader.tsx", demos: demos || [] };

export default mod;
