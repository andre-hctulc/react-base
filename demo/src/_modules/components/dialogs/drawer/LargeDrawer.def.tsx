import type { ModuleDef, DemoDef } from "src/types";

const demos: DemoDef[] = (await Promise.all(Object.values(import.meta.glob("./LargeDrawer.demo*.tsx", { import: "default" })).map(imp => imp()))) as any;

const mod: ModuleDef = { name: "LargeDrawer.tsx", path: "components/dialogs/drawer/LargeDrawer.tsx", demos: demos || [] };

export default mod;
